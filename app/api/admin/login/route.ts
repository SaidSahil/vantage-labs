import { NextRequest, NextResponse } from 'next/server'
import { makeSession } from '@/lib/session'

export async function POST(req: NextRequest) {
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
