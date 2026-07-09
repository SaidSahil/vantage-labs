import Link from 'next/link'
import { prisma } from '@/lib/db'
import LogoutButton from '@/components/LogoutButton'
import VisitsChart from '@/components/VisitsChart'
import { classifyDevice, classifyBrowser } from '@/lib/userAgent'
import {
  Eye, TrendingUp, TrendingDown, Minus, Users, Globe, Link2, MousePointerClick, Clock,
  ArrowLeft, Mail, Target, Smartphone, Tablet, Monitor, ChevronLeft, ChevronRight, Download,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

const PAGE_SIZE = 20
const ALLOWED_RANGES = [7, 30, 90] as const
type Range = (typeof ALLOWED_RANGES)[number]
type SearchParams = { [key: string]: string | string[] | undefined }

function first(v: string | string[] | undefined): string | undefined {
  return Array.isArray(v) ? v[0] : v
}

function parseRange(v: string | string[] | undefined): Range {
  const n = Number(first(v))
  return (ALLOWED_RANGES as readonly number[]).includes(n) ? (n as Range) : 30
}

function parsePage(v: string | string[] | undefined): number {
  const n = Number(first(v))
  return Number.isInteger(n) && n > 0 ? n : 1
}

function qs(params: Record<string, string | number | undefined>) {
  const usp = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== '') usp.set(k, String(v))
  }
  const s = usp.toString()
  return s ? `?${s}` : ''
}

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

function deviceIcon(name: string) {
  if (name === 'Mobile') return Smartphone
  if (name === 'Tablet') return Tablet
  return Monitor
}

const card =
  'rounded-2xl border border-[var(--na-inv-border)] bg-[var(--na-inv-surface)] p-6 shadow-[0_1px_0_rgba(255,255,255,0.03)_inset] transition-[border-color,box-shadow,transform] duration-200 hover:border-white/[0.12] hover:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.6)]'
const label = 'text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--na-inv-muted)]'
const pill = 'rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider transition-colors'
const pillActive = 'border-[var(--na-inv-accent)] text-[var(--na-inv-accent)]'
const pillInactive = 'border-[var(--na-inv-border)] text-[var(--na-inv-muted)] hover:text-[var(--na-inv-text)]'
const selectStyle =
  'rounded-lg border border-[var(--na-inv-border)] bg-[var(--na-inv-bg)] px-2.5 py-1.5 text-xs text-[var(--na-inv-text)] outline-none'
const btnStyle =
  'inline-flex items-center gap-1.5 rounded-full border border-[var(--na-inv-border)] px-3 py-1.5 text-[11px] font-semibold text-[var(--na-inv-muted)] transition-colors hover:border-[var(--na-inv-accent)] hover:text-[var(--na-inv-text)]'

function trend(current: number, previous: number): { pct: number | null; direction: 'up' | 'down' | 'flat' } {
  if (previous === 0) return { pct: null, direction: current > 0 ? 'up' : 'flat' }
  const pct = ((current - previous) / previous) * 100
  return { pct, direction: pct > 1 ? 'up' : pct < -1 ? 'down' : 'flat' }
}

export default async function AnalyticsDashboard({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams
  const days = parseRange(sp.days)
  const since = daysAgo(days)
  const sectionPath = first(sp.path) || undefined
  const visitPathFilter = first(sp.vpath) || undefined
  const visitsPage = parsePage(sp.vpage)
  const leadsPage = parsePage(sp.lpage)

  const [
    visits,
    topPages,
    topReferrers,
    topCountries,
    allVisitPaths,
    engagement,
    engagementPages,
    recentVisits,
    recentVisitsCount,
    totalVisits,
    leads,
    totalLeads,
    leadsInRange,
  ] = await Promise.all([
    prisma.visit.findMany({ where: { createdAt: { gte: since } }, select: { createdAt: true, sessionId: true, userAgent: true } }),
    prisma.visit.groupBy({
      by: ['path'],
      where: { createdAt: { gte: since } },
      _count: { _all: true },
      orderBy: { _count: { path: 'desc' } },
      take: 10,
    }),
    prisma.visit.groupBy({
      by: ['referrer'],
      where: { createdAt: { gte: since }, referrer: { not: null } },
      _count: { _all: true },
      orderBy: { _count: { referrer: 'desc' } },
      take: 10,
    }),
    prisma.visit.groupBy({
      by: ['country'],
      where: { createdAt: { gte: since }, country: { not: null } },
      _count: { _all: true },
      orderBy: { _count: { country: 'desc' } },
      take: 10,
    }),
    prisma.visit.groupBy({ by: ['path'], where: { createdAt: { gte: since } }, _count: { _all: true }, orderBy: { path: 'asc' } }),
    prisma.sectionEngagement.groupBy({
      by: ['path', 'section'],
      where: { createdAt: { gte: since }, ...(sectionPath ? { path: sectionPath } : {}) },
      _sum: { viewMs: true, clicks: true },
      orderBy: { _sum: { viewMs: 'desc' } },
      take: 20,
    }),
    prisma.sectionEngagement.groupBy({ by: ['path'], where: { createdAt: { gte: since } }, _count: { _all: true }, orderBy: { path: 'asc' } }),
    prisma.visit.findMany({
      where: { createdAt: { gte: since }, ...(visitPathFilter ? { path: visitPathFilter } : {}) },
      orderBy: { createdAt: 'desc' },
      skip: (visitsPage - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.visit.count({ where: { createdAt: { gte: since }, ...(visitPathFilter ? { path: visitPathFilter } : {}) } }),
    prisma.visit.count(),
    prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, skip: (leadsPage - 1) * PAGE_SIZE, take: PAGE_SIZE }),
    prisma.lead.count(),
    prisma.lead.count({ where: { createdAt: { gte: since } } }),
  ])

  // Build a full N-day series (including zero days) so the chart reads as a
  // trend rather than a handful of stray bars when data is sparse.
  const byDay = new Map<string, number>()
  for (const v of visits) {
    const day = dateKey(v.createdAt)
    byDay.set(day, (byDay.get(day) ?? 0) + 1)
  }
  const series = Array.from({ length: days }, (_, i) => {
    const d = daysAgo(days - 1 - i)
    const key = dateKey(d)
    return { day: key, label: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), count: byDay.get(key) ?? 0 }
  })
  const uniqueSessions = new Set(visits.map(v => v.sessionId)).size

  const mid = Math.floor(series.length / 2)
  const firstHalf = series.slice(0, mid).reduce((sum, d) => sum + d.count, 0)
  const secondHalf = series.slice(mid).reduce((sum, d) => sum + d.count, 0)
  const visitsTrend = trend(secondHalf, firstHalf)

  const deviceCounts = new Map<string, number>()
  const browserCounts = new Map<string, number>()
  for (const v of visits) {
    const device = classifyDevice(v.userAgent)
    deviceCounts.set(device, (deviceCounts.get(device) ?? 0) + 1)
    const browser = classifyBrowser(v.userAgent)
    browserCounts.set(browser, (browserCounts.get(browser) ?? 0) + 1)
  }
  const deviceBreakdown = Array.from(deviceCounts.entries()).sort((a, b) => b[1] - a[1])
  const browserBreakdown = Array.from(browserCounts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 5)

  const conversionRate = visits.length > 0 ? (leadsInRange / visits.length) * 100 : null
  const visitsTotalPages = Math.max(1, Math.ceil(recentVisitsCount / PAGE_SIZE))
  const leadsTotalPages = Math.max(1, Math.ceil(totalLeads / PAGE_SIZE))

  const stats = [
    { icon: Eye, label: 'Total visits', value: totalVisits.toLocaleString() },
    { icon: TrendingUp, label: `Last ${days} days`, value: visits.length.toLocaleString(), trend: visitsTrend },
    { icon: Users, label: 'Unique sessions', value: uniqueSessions.toLocaleString() },
    { icon: Globe, label: 'Top page', value: topPages[0]?.path ?? '—', small: true },
    { icon: Mail, label: 'Leads', value: leadsInRange.toLocaleString() },
    { icon: Target, label: 'Conversion rate', value: conversionRate === null ? '—' : `${conversionRate.toFixed(1)}%` },
  ]

  const baseParams = { path: sectionPath, vpath: visitPathFilter }

  return (
    <div className="min-h-screen bg-[var(--na-inv-bg)] text-[var(--na-inv-text)]">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-[var(--na-inv-border)]">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--na-inv-accent)] mb-2 hover:opacity-70 transition-opacity"
            >
              <ArrowLeft size={12} /> NodeAxis
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              {ALLOWED_RANGES.map(r => (
                <Link
                  key={r}
                  href={`/admin/analytics${qs({ ...baseParams, days: r })}`}
                  className={`${pill} ${r === days ? pillActive : pillInactive}`}
                >
                  {r}d
                </Link>
              ))}
            </div>
            <LogoutButton />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <a href={`/api/admin/export/visits${qs({ days })}`} className={btnStyle}>
            <Download size={12} /> Export visits CSV
          </a>
          <a href="/api/admin/export/leads" className={btnStyle}>
            <Download size={12} /> Export leads CSV
          </a>
        </div>

        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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
              Last {days} days
            </span>
          </div>
          <VisitsChart days={series} />
          <div className="flex justify-between mt-3 text-[10px] text-[var(--na-inv-muted)] tabular-nums">
            <span>{series[0].label}</span>
            <span>{series[Math.floor(series.length / 2)].label}</span>
            <span>{series[series.length - 1].label}</span>
          </div>
        </section>

        <section className={card}>
          <div className="flex items-center justify-between mb-4">
            <h2 className={`${label} flex items-center gap-2`}>
              <Mail size={13} /> Leads
            </h2>
            <span className="text-[11px] text-[var(--na-inv-muted)] tabular-nums">{totalLeads} total</span>
          </div>
          <div className="overflow-x-auto -mx-6 px-6">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="text-left border-b border-[var(--na-inv-border)]">
                  <th className={`${label} py-2 pr-4 font-medium`}>Time</th>
                  <th className={`${label} py-2 pr-4 font-medium`}>Name</th>
                  <th className={`${label} py-2 pr-4 font-medium`}>Email</th>
                  <th className={`${label} py-2 pr-4 font-medium`}>Service</th>
                  <th className={`${label} py-2 pr-4 font-medium`}>Budget</th>
                  <th className={`${label} py-2 font-medium`}>Message</th>
                </tr>
              </thead>
              <tbody>
                {leads.map(l => (
                  <tr key={l.id} className="border-b border-[var(--na-inv-border)] last:border-0 hover:bg-white/[0.02] transition-colors align-top">
                    <td className="py-2.5 pr-4 whitespace-nowrap text-[var(--na-inv-muted)] tabular-nums">
                      {l.createdAt.toLocaleString()}
                    </td>
                    <td className="py-2.5 pr-4">{l.name}</td>
                    <td className="py-2.5 pr-4">
                      <a href={`mailto:${l.email}`} className="text-[var(--na-inv-accent)] hover:underline">
                        {l.email}
                      </a>
                    </td>
                    <td className="py-2.5 pr-4 text-[var(--na-inv-muted)]">{l.service || '—'}</td>
                    <td className="py-2.5 pr-4 text-[var(--na-inv-muted)]">{l.budget || '—'}</td>
                    <td className="py-2.5 truncate max-w-xs text-[var(--na-inv-muted)]" title={l.message}>
                      {l.message}
                    </td>
                  </tr>
                ))}
                {leads.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-4 text-[var(--na-inv-muted)]">No leads yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {leadsTotalPages > 1 && (
            <div className="flex items-center justify-between mt-4 text-[11px] text-[var(--na-inv-muted)]">
              <span>Page {leadsPage} of {leadsTotalPages}</span>
              <div className="flex gap-2">
                {leadsPage > 1 && (
                  <Link href={`/admin/analytics${qs({ ...baseParams, days, lpage: leadsPage - 1 })}`} className={btnStyle}>
                    <ChevronLeft size={12} /> Prev
                  </Link>
                )}
                {leadsPage < leadsTotalPages && (
                  <Link href={`/admin/analytics${qs({ ...baseParams, days, lpage: leadsPage + 1 })}`} className={btnStyle}>
                    Next <ChevronRight size={12} />
                  </Link>
                )}
              </div>
            </div>
          )}
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

        <div className="grid md:grid-cols-2 gap-6">
          <section className={card}>
            <h2 className={`${label} mb-4 flex items-center gap-2`}>
              <Smartphone size={13} /> Devices
            </h2>
            <ul className="space-y-1">
              {deviceBreakdown.map(([name, count]) => {
                const Icon = deviceIcon(name)
                return (
                  <li key={name} className="flex justify-between items-baseline gap-3 py-2 border-b border-[var(--na-inv-border)] last:border-0">
                    <span className="flex items-center gap-2 text-sm"><Icon size={13} className="text-[var(--na-inv-muted)]" /> {name}</span>
                    <span className="text-sm font-semibold tabular-nums text-[var(--na-inv-muted)]">{count}</span>
                  </li>
                )
              })}
              {deviceBreakdown.length === 0 && <p className="text-sm text-[var(--na-inv-muted)] py-2">No data yet.</p>}
            </ul>
          </section>

          <section className={card}>
            <h2 className={`${label} mb-4 flex items-center gap-2`}>
              <Monitor size={13} /> Browsers
            </h2>
            <ul className="space-y-1">
              {browserBreakdown.map(([name, count]) => (
                <li key={name} className="flex justify-between items-baseline gap-3 py-2 border-b border-[var(--na-inv-border)] last:border-0">
                  <span className="text-sm">{name}</span>
                  <span className="text-sm font-semibold tabular-nums text-[var(--na-inv-muted)]">{count}</span>
                </li>
              ))}
              {browserBreakdown.length === 0 && <p className="text-sm text-[var(--na-inv-muted)] py-2">No data yet.</p>}
            </ul>
          </section>
        </div>

        <section className={card}>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className={`${label} flex items-center gap-2`}>
              <MousePointerClick size={13} /> Section engagement — where people interact most
            </h2>
            <form method="GET" action="/admin/analytics" className="flex items-center gap-2">
              <input type="hidden" name="days" value={days} />
              {visitPathFilter && <input type="hidden" name="vpath" value={visitPathFilter} />}
              <select name="path" defaultValue={sectionPath ?? ''} className={selectStyle}>
                <option value="">All pages</option>
                {engagementPages.map(p => (
                  <option key={p.path} value={p.path}>{p.path}</option>
                ))}
              </select>
              <button type="submit" className={btnStyle}>Filter</button>
            </form>
          </div>
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
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <h2 className={label}>Recent visits</h2>
            <form method="GET" action="/admin/analytics" className="flex items-center gap-2">
              <input type="hidden" name="days" value={days} />
              {sectionPath && <input type="hidden" name="path" value={sectionPath} />}
              <select name="vpath" defaultValue={visitPathFilter ?? ''} className={selectStyle}>
                <option value="">All pages</option>
                {allVisitPaths.map(p => (
                  <option key={p.path} value={p.path}>{p.path}</option>
                ))}
              </select>
              <button type="submit" className={btnStyle}>Filter</button>
            </form>
          </div>
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
          {visitsTotalPages > 1 && (
            <div className="flex items-center justify-between mt-4 text-[11px] text-[var(--na-inv-muted)]">
              <span>Page {visitsPage} of {visitsTotalPages}</span>
              <div className="flex gap-2">
                {visitsPage > 1 && (
                  <Link href={`/admin/analytics${qs({ ...baseParams, days, vpage: visitsPage - 1 })}`} className={btnStyle}>
                    <ChevronLeft size={12} /> Prev
                  </Link>
                )}
                {visitsPage < visitsTotalPages && (
                  <Link href={`/admin/analytics${qs({ ...baseParams, days, vpage: visitsPage + 1 })}`} className={btnStyle}>
                    Next <ChevronRight size={12} />
                  </Link>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
