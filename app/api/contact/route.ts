import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { getClientIp, isRateLimited } from "@/lib/rateLimit"

function isString(v: unknown): v is string {
  return typeof v === "string"
}

const RATE_LIMIT_MAX = 5            // max submissions per window
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000  // 10-minute rolling window

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req)
    if (ip && isRateLimited(`contact:${ip}`, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a few minutes." },
        { status: 429 },
      )
    }

    const body = await req.json()

    // Honeypot: bots fill hidden fields humans never see. If "company"
    // has any value, silently accept (200) without forwarding to Formspree
    // so the bot gets no signal that it was dropped.
    if (isString(body.company) && body.company.trim().length > 0) {
      return NextResponse.json({ ok: true })
    }

    if (!isString(body.name) || body.name.trim().length === 0) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 })
    }
    if (!isString(body.email) || !body.email.includes("@")) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 })
    }
    if (!isString(body.message) || body.message.trim().length === 0) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    const formspreeId = process.env.FORMSPREE_ID
    if (!formspreeId) {
      return NextResponse.json({ error: "Contact form not configured" }, { status: 503 })
    }

    const payload = {
      name: body.name.trim().slice(0, 200),
      email: body.email.trim().slice(0, 200),
      service: isString(body.service) ? body.service.slice(0, 200) : "",
      budget: isString(body.budget) ? body.budget.slice(0, 100) : "",
      message: body.message.trim().slice(0, 5000),
    }

    // First-party capture: store the lead in our own DB so it shows up in the
    // admin dashboard regardless of whether the Formspree email notification
    // succeeds. Best-effort — a DB hiccup shouldn't block the actual submission.
    let leadStored = false
    try {
      await prisma.lead.create({
        data: {
          ...payload,
          path: isString(body.path) ? body.path.slice(0, 200) : undefined,
          referrer: req.headers.get("referer") ?? undefined,
          country: req.headers.get("x-vercel-ip-country") ?? undefined,
          sessionId: isString(body.sessionId) ? body.sessionId.slice(0, 100) : undefined,
        },
      })
      leadStored = true
    } catch (err) {
      console.error("Failed to store lead", err)
    }

    const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
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
