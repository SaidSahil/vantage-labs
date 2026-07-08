import Link from 'next/link'
import { prisma } from '@/lib/db'
import LogoutButton from '@/components/LogoutButton'
import VisitsChart from '@/components/VisitsChart'
import { Eye, TrendingUp, TrendingDown, Minus, Users, Globe, Link2, MousePointerClick, Clock, ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

function formatDuration(ms: number) {
  const s = Math.round(ms / 1000)
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  const rem = s % 60
  return `${m}m ${rem}s`
}

function daysAgo(days: number) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000)
}

function dateKey(d: Date) {
  return d.toISOString().slice(0, 10)
}

const card =
  'rounded-2xl border border-[var(--na-inv-border)] bg-[var(--na-inv-surface)] p-6 shadow-[0_1px_0_rgba(255,255,255,0.03)_inset] transition-[border-color,box-shadow,transform] duration-200 hover:border-white/[0.12] hover:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.6)]'
const label = 'text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--na-inv-muted)]'

function trend(current: number, previous: number): { pct: number | null; direction: 'up' | 'down' | 'flat' } {
  if (previous === 0) return { pct: null, direction: current > 0 ? 'up' : 'flat' }
  const pct = ((current - previous) / previous) * 100
  return { pct, direction: pct > 1 ? 'up' : pct < -1 ? 'down' : 'flat' }
}

export default async function AnalyticsDashboard() {
  const since = daysAgo(30)

  const [visits, topPages, topReferrers, topCountries, engagement, recentVisits, totalVisits] =
    await Promise.all([
      prisma.visit.findMany({ where: { createdAt: { gte: since } }, select: { createdAt: true, sessionId: true } }),
      prisma.visit.groupBy({
        by: ['path'],
        _count: { _all: true },
        orderBy: { _count: { path: 'desc' } },
        take: 10,
      }),
      prisma.visit.groupBy({
        by: ['referrer'],
        where: { referrer: { not: null } },
        _count: { _all: true },
        orderBy: { _count: { referrer: 'desc' } },
        take: 10,
      }),
      prisma.visit.groupBy({
        by: ['country'],
        where: { country: { not: null } },
        _count: { _all: true },
        orderBy: { _count: { country: 'desc' } },
        take: 10,
      }),
      prisma.sectionEngagement.groupBy({
        by: ['path', 'section'],
        _sum: { viewMs: true, clicks: true },
        orderBy: { _sum: { viewMs: 'desc' } },
        take: 20,
      }),
      prisma.visit.findMany({ orderBy: { createdAt: 'desc' }, take: 20 }),
      prisma.visit.count(),
    ])

  // Build a full 30-day series (including zero days) so the chart reads as a
  // trend rather than a handful of stray bars when data is sparse.
  const byDay = new Map<string, number>()
  for (const v of visits) {
    const day = dateKey(v.createdAt)
    byDay.set(day, (byDay.get(day) ?? 0) + 1)
  }
  const days = Array.from({ length: 30 }, (_, i) => {
    const d = daysAgo(29 - i)
    const key = dateKey(d)
    return { day: key, label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), count: byDay.get(key) ?? 0 }
  })
  const uniqueSessions = new Set(visits.map(v => v.sessionId)).size

  const firstHalf = days.slice(0, 15).reduce((sum, d) => sum + d.count, 0)
  const secondHalf = days.slice(15).reduce((sum, d) => sum + d.count, 0)
  const visitsTrend = trend(secondHalf, firstHalf)

  const stats = [
    { icon: Eye, label: 'Total visits', value: totalVisits.toLocaleString() },
    { icon: TrendingUp, label: 'Last 30 days', value: visits.length.toLocaleString(), trend: visitsTrend },
    { icon: Users, label: 'Unique sessions', value: uniqueSessions.toLocaleString() },
    { icon: Globe, label: 'Top page', value: topPages[0]?.path ?? '—', small: true },
  ]

  return (
    <div className="min-h-screen bg-[var(--na-inv-bg)] text-[var(--na-inv-text)]">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 space-y-8">
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-[var(--na-inv-border)]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--na-inv-accent)] mb-2 hover:opacity-70 transition-opacity"
            >
              <ArrowLeft size={12} /> NodeAxis
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          </div>
          <LogoutButton />
        </div>

        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(s => (
            <div key={s.label} className={card}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-lg bg-[rgba(var(--na-inv-accent-rgb),0.12)] flex items-center justify-center">
                  <s.icon size={15} className="text-[var(--na-inv-accent)]" strokeWidth={2} />
                </div>
                {s.trend && (
                  <span
                    className={`inline-flex items-center gap-0.5 text-[11px] font-semibold tabular-nums ${
                      s.trend.direction === 'up'
                        ? 'text-emerald-400'
                        : s.trend.direction === 'down'
                          ? 'text-rose-400'
                          : 'text-[var(--na-inv-muted)]'
                    }`}
                  >
                    {s.trend.direction === 'up' && <TrendingUp size={12} />}
                    {s.trend.direction === 'down' && <TrendingDown size={12} />}
                    {s.trend.direction === 'flat' && <Minus size={12} />}
                    {s.trend.pct === null ? 'new' : `${Math.abs(Math.round(s.trend.pct))}%`}
                  </span>
                )}
              </div>
              <div className={`truncate font-bold tabular-nums ${s.small ? 'text-sm' : 'text-2xl'}`} title={s.value}>
                {s.value}
              </div>
              <div className={`${label} mt-1`}>{s.label}</div>
            </div>
          ))}
        </section>

        <section className={card}>
          <div className="flex items-center justify-between mb-6">
            <h2 className={label}>Visits over time</h2>
            <span className="rounded-full border border-[var(--na-inv-border)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--na-inv-muted)]">
              Last 30 days
            </span>
          </div>
          <VisitsChart days={days} />
          <div className="flex justify-between mt-3 text-[10px] text-[var(--na-inv-muted)] tabular-nums">
            <span>{days[0].label}</span>
            <span>{days[Math.floor(days.length / 2)].label}</span>
            <span>{days[days.length - 1].label}</span>
          </div>
        </section>

        <div className="grid md:grid-cols-3 gap-6">
          <section className={card}>
            <h2 className={`${label} mb-4 flex items-center gap-2`}>
              <Eye size={13} /> Top pages
            </h2>
            <ul className="space-y-1">
              {topPages.map(p => (
                <li key={p.path} className="flex justify-between items-baseline gap-3 py-2 border-b border-[var(--na-inv-border)] last:border-0">
                  <span className="truncate text-sm">{p.path}</span>
                  <span className="text-sm font-semibold tabular-nums text-[var(--na-inv-muted)]">{p._count._all}</span>
                </li>
              ))}
              {topPages.length === 0 && <p className="text-sm text-[var(--na-inv-muted)] py-2">No data yet.</p>}
            </ul>
          </section>

          <section className={card}>
            <h2 className={`${label} mb-4 flex items-center gap-2`}>
              <Link2 size={13} /> Top referrers
            </h2>
            <ul className="space-y-1">
              {topReferrers.map(r => (
                <li key={r.referrer} className="flex justify-between items-baseline gap-3 py-2 border-b border-[var(--na-inv-border)] last:border-0">
                  <span className="truncate text-sm">{r.referrer}</span>
                  <span className="text-sm font-semibold tabular-nums text-[var(--na-inv-muted)]">{r._count._all}</span>
                </li>
              ))}
              {topReferrers.length === 0 && <p className="text-sm text-[var(--na-inv-muted)] py-2">No data yet.</p>}
            </ul>
          </section>

          <section className={card}>
            <h2 className={`${label} mb-4 flex items-center gap-2`}>
              <Globe size={13} /> Top locations
            </h2>
            <ul className="space-y-1">
              {topCountries.map(c => (
                <li key={c.country} className="flex justify-between items-baseline gap-3 py-2 border-b border-[var(--na-inv-border)] last:border-0">
                  <span className="text-sm">{c.country}</span>
                  <span className="text-sm font-semibold tabular-nums text-[var(--na-inv-muted)]">{c._count._all}</span>
                </li>
              ))}
              {topCountries.length === 0 && <p className="text-sm text-[var(--na-inv-muted)] py-2">No data yet.</p>}
            </ul>
          </section>
        </div>

        <section className={card}>
          <h2 className={`${label} mb-4 flex items-center gap-2`}>
            <MousePointerClick size={13} /> Section engagement — where people interact most
          </h2>
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full text-sm min-w-[520px]">
              <thead>
                <tr className="text-left border-b border-[var(--na-inv-border)]">
                  <th className={`${label} py-2 pr-4 font-medium`}>Page</th>
                  <th className={`${label} py-2 pr-4 font-medium`}>Section</th>
                  <th className={`${label} py-2 pr-4 font-medium`}>
                    <span className="inline-flex items-center gap-1"><Clock size={12} /> View time</span>
                  </th>
                  <th className={`${label} py-2 font-medium`}>Clicks</th>
                </tr>
              </thead>
              <tbody>
                {engagement.map(e => (
                  <tr key={`${e.path}-${e.section}`} className="border-b border-[var(--na-inv-border)] last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="py-2.5 pr-4">{e.path}</td>
                    <td className="py-2.5 pr-4 text-[var(--na-inv-muted)]">{e.section}</td>
                    <td className="py-2.5 pr-4 tabular-nums">{formatDuration(e._sum.viewMs ?? 0)}</td>
                    <td className="py-2.5 tabular-nums">{e._sum.clicks ?? 0}</td>
                  </tr>
                ))}
                {engagement.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-4 text-[var(--na-inv-muted)]">No engagement data yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className={card}>
          <h2 className={`${label} mb-4`}>Recent visits</h2>
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full text-sm min-w-[560px]">
              <thead>
                <tr className="text-left border-b border-[var(--na-inv-border)]">
                  <th className={`${label} py-2 pr-4 font-medium`}>Time</th>
                  <th className={`${label} py-2 pr-4 font-medium`}>Page</th>
                  <th className={`${label} py-2 pr-4 font-medium`}>Location</th>
                  <th className={`${label} py-2 font-medium`}>Referrer</th>
                </tr>
              </thead>
              <tbody>
                {recentVisits.map(v => (
                  <tr key={v.id} className="border-b border-[var(--na-inv-border)] last:border-0 hover:bg-white/[0.02] transition-colors">
                    <td className="py-2.5 pr-4 whitespace-nowrap text-[var(--na-inv-muted)] tabular-nums">
                      {v.createdAt.toLocaleString()}
                    </td>
                    <td className="py-2.5 pr-4">{v.path}</td>
                    <td className="py-2.5 pr-4 text-[var(--na-inv-muted)]">
                      {[v.city, v.region, v.country].filter(Boolean).join(', ') || '—'}
                    </td>
                    <td className="py-2.5 truncate max-w-xs text-[var(--na-inv-muted)]">{v.referrer ?? '—'}</td>
                  </tr>
                ))}
                {recentVisits.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-4 text-[var(--na-inv-muted)]">No visits recorded yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
