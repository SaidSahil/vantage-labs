import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getClientIp, isRateLimited } from "@/lib/rateLimit"

function isString(v: unknown): v is string {
  return typeof v === "string"
}

/** Trimmed, length-capped string field, or "" when missing / not a string. */
function field(v: unknown, max: number): string {
  return isString(v) ? v.trim().slice(0, max) : ""
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isValidEmail(v: string): boolean {
  return v.length > 0 && v.length <= 200 && EMAIL_RE.test(v)
}

/** A callable phone number has at least 7 digits (lenient: formats vary). */
function isValidPhone(v: string): boolean {
  const digits = v.replace(/\D/g, "")
  return digits.length >= 7 && digits.length <= 15
}

const RATE_LIMIT_MAX = 5            // max submissions per window
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000  // 10-minute rolling window

/*
 * Accepts two payload shapes:
 *  - New audit form: { name, business, trade, phone, email?, website?, message? }
 *  - Legacy contact form: { name, email, service?, budget?, message }
 * Both are mapped onto the existing Lead columns (no migration):
 *   email   = email or ""
 *   service = trade (or legacy service)
 *   budget  = legacy budget or ""
 *   message = "Business: …\nPhone: …\nWebsite: …\n\n<message>" (non-empty lines only)
 */
export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req)
    if (ip && isRateLimited(`contact:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a few minutes." },
        { status: 429 },
      )
    }

    const body: unknown = await req.json().catch(() => null)
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 })
    }
    const b = body as Record<string, unknown>

    // Honeypot: bots fill hidden fields humans never see. If "company"
    // has any value, silently accept (200) without storing or forwarding
    // so the bot gets no signal that it was dropped.
    if (isString(b.company) && b.company.trim().length > 0) {
      return NextResponse.json({ ok: true })
    }

    const name = field(b.name, 200)
    const email = field(b.email, 200)
    const phone = field(b.phone, 40)
    const business = field(b.business, 200)
    const website = field(b.website, 300)
    const service = field(b.trade, 200) || field(b.service, 200)
    const budget = field(b.budget, 100)
    const note = field(b.message, 5000)

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }
    if (email && !isValidEmail(email)) {
      return NextResponse.json({ error: "Please check your email address" }, { status: 400 })
    }
    if (phone && !isValidPhone(phone)) {
      return NextResponse.json({ error: "Please check your phone number" }, { status: 400 })
    }
    if (!phone && !email) {
      return NextResponse.json({ error: "A phone number or email is required" }, { status: 400 })
    }

    const header = [
      business && `Business: ${business}`,
      phone && `Phone: ${phone}`,
      website && `Website: ${website}`,
    ].filter(Boolean).join("\n")
    const message = [header, note].filter(Boolean).join("\n\n").slice(0, 6000)

    const formspreeId = process.env.FORMSPREE_ID
    if (!formspreeId) {
      return NextResponse.json({ error: "Contact form not configured" }, { status: 503 })
    }

    const payload = { name, email, service, budget, message }

    // First-party capture: store the lead in our own DB so it shows up in the
    // admin dashboard regardless of whether the Formspree email notification
    // succeeds. Best-effort — a DB hiccup shouldn't block the actual submission.
    let leadStored = false
    try {
      await prisma.lead.create({
        data: {
          ...payload,
          path: isString(b.path) ? b.path.slice(0, 200) : undefined,
          referrer: req.headers.get("referer") ?? undefined,
          country: req.headers.get("x-vercel-ip-country") ?? undefined,
          sessionId: isString(b.sessionId) ? b.sessionId.slice(0, 100) : undefined,
        },
      })
      leadStored = true
    } catch (err) {
      console.error("Failed to store lead", err)
    }

    // Formspree gets the same composed message plus the raw fields so the
    // notification email is readable at a glance.
    const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...payload,
        phone,
        business,
        website,
        ...(email ? { _replyto: email } : {}),
        _subject: business ? `New audit request: ${business}` : `New enquiry from ${name}`,
      }),
    }).catch(() => null)

    if (!res || !res.ok) {
      // The lead is still captured first-party even if the email notification failed.
      if (leadStored) return NextResponse.json({ ok: true })
      return NextResponse.json({ error: "Submission failed" }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
