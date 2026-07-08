import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const path = typeof body?.path === 'string' ? body.path.slice(0, 500) : null
  const section = typeof body?.section === 'string' ? body.section.slice(0, 100) : null
  const sessionId = typeof body?.sessionId === 'string' ? body.sessionId.slice(0, 100) : null
  const viewMs = Number.isFinite(body?.viewMs) ? Math.max(0, Math.round(body.viewMs)) : 0
  const clicks = Number.isFinite(body?.clicks) ? Math.max(0, Math.round(body.clicks)) : 0

  if (!path || !section || !sessionId || (viewMs === 0 && clicks === 0)) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 })
  }

  await prisma.sectionEngagement.upsert({
    where: { sessionId_path_section: { sessionId, path, section } },
    create: { sessionId, path, section, viewMs, clicks },
    update: { viewMs: { increment: viewMs }, clicks: { increment: clicks } },
  })

  return new NextResponse(null, { status: 204 })
}
