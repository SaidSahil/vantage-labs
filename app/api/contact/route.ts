import { NextRequest, NextResponse } from "next/server"

function isString(v: unknown): v is string {
  return typeof v === "string"
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

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
