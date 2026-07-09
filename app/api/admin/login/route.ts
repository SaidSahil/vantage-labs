import { NextRequest, NextResponse } from 'next/server'
import { makeSession } from '@/lib/session'
import { getClientIp, isRateLimited } from '@/lib/rateLimit'

const LOGIN_RATE_LIMIT_MAX = 5             // max attempts per window
const LOGIN_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000  // 10-minute rolling window

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  if (ip && isRateLimited(`admin-login:${ip}`, LOGIN_RATE_LIMIT_MAX, LOGIN_RATE_LIMIT_WINDOW_MS)) {
    return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 })
  }

  const body = await req.json().catch(() => ({}))
  const { password } = body as { password?: string }

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    await new Promise(r => setTimeout(r, 500))
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set('na_admin_session', makeSession(), {
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  })
  return res
}
