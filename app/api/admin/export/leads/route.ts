import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { toCsv } from '@/lib/csv'

export async function GET() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' } })

  const csv = toCsv(leads, ['createdAt', 'name', 'email', 'service', 'budget', 'message', 'path', 'referrer', 'country'])

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="leads.csv"',
    },
  })
}
