import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { toCsv } from '@/lib/csv'

const ALLOWED_RANGES = new Set([7, 30, 90])

export async function GET(req: NextRequest) {
  const daysParam = Number(req.nextUrl.searchParams.get('days'))
  const days = ALLOWED_RANGES.has(daysParam) ? daysParam : 30
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

  const visits = await prisma.visit.findMany({
    where: { createdAt: { gte: since } },
    orderBy: { createdAt: 'desc' },
  })

  const csv = toCsv(visits, ['createdAt', 'path', 'referrer', 'country', 'region', 'city', 'sessionId', 'userAgent'])

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="visits-last-${days}d.csv"`,
    },
  })
}
