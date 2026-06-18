import { NextRequest, NextResponse } from "next/server"

function isString(v: unknown): v is string {
  return typeof v === "string"
}

// ── Best-effort rate limiting ──────────────────────────────────
// NOTE: This Map lives in per-serverless-instance memory only. It is
// best-effort and will not coordinate across multiple instances/regions,
// and resets on cold start. For hardened limits use a shared store (e.g. KV).
const RATE_LIMIT_MAX = 5            // max submissions per window
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000  // 10-minute rolling window
const rateLimitHits = new Map<string, number[]>()

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for")
  if (fwd) return fwd.split(",")[0].trim()
  return req.headers.get("x-real-ip")?.trim() || "unknown"
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const recent = (rateLimitHits.get(ip) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS)
  if (recent.length >= RATE_LIMIT_MAX) {
    rateLimitHits.set(ip, recent)
    return true
  }
  recent.push(now)
  rateLimitHits.set(ip, recent)
  return false
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req)
    if (isRateLimited(ip)) {
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

    const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      return NextResponse.json({ error: "Submission failed" }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
