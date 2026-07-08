import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const path = typeof body?.path === 'string' ? body.path.slice(0, 500) : null
  const sessionId = typeof body?.sessionId === 'string' ? body.sessionId.slice(0, 100) : null
  const referrer = typeof body?.referrer === 'string' ? body.referrer.slice(0, 500) : undefined

  if (!path || !sessionId) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  const country = req.headers.get('x-vercel-ip-country') ?? undefined
  const region = req.headers.get('x-vercel-ip-country-region') ?? undefined
  const cityHeader = req.headers.get('x-vercel-ip-city')
  const city = cityHeader ? decodeURIComponent(cityHeader) : undefined
  const userAgent = req.headers.get('user-agent')?.slice(0, 300) ?? undefined

  await prisma.visit.create({
    data: { path, referrer, sessionId, country, region, city, userAgent },
  })

  return new NextResponse(null, { status: 204 })
}
