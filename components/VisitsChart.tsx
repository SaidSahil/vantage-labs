'use client'
import { useState } from 'react'

type Day = { day: string; label: string; count: number }

const W = 100
const H = 40

export default function VisitsChart({ days }: { days: Day[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const maxDay = Math.max(1, ...days.map(d => d.count))

  const yOf = (count: number) => H - (count / maxDay) * (H - 4)
  const xOf = (i: number) => (i / (days.length - 1)) * W

  const linePath = days.map((d, i) => `${i === 0 ? 'M' : 'L'} ${xOf(i)},${yOf(d.count)}`).join(' ')
  const areaPath = `${linePath} L ${W},${H} L 0,${H} Z`

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const fraction = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    setActiveIndex(Math.round(fraction * (days.length - 1)))
  }

  const active = activeIndex !== null ? days[activeIndex] : null

  return (
    <div
      className="relative h-40 select-none"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setActiveIndex(null)}
    >
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="visitsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--na-inv-accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--na-inv-accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map(p => (
          <line
            key={p}
            x1="0"
            x2={W}
            y1={H * p}
            y2={H * p}
            stroke="var(--na-inv-border)"
            strokeWidth="0.3"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        <path d={areaPath} fill="url(#visitsGradient)" stroke="none" />
        <path
          d={linePath}
          fill="none"
          stroke="var(--na-inv-accent)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        {active && (
          <>
            <line
              x1={xOf(activeIndex!)}
              x2={xOf(activeIndex!)}
              y1="0"
              y2={H}
              stroke="var(--na-inv-border)"
              strokeWidth="0.4"
              vectorEffect="non-scaling-stroke"
            />
            <circle
              cx={xOf(activeIndex!)}
              cy={yOf(active.count)}
              r="1.6"
              fill="var(--na-inv-bg)"
              stroke="var(--na-inv-accent)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </>
        )}
      </svg>

      {active && (
        <div
          className="pointer-events-none absolute -top-1 whitespace-nowrap rounded-md border border-[var(--na-inv-border)] bg-[var(--na-inv-bg)] px-2.5 py-1.5 text-[11px] shadow-lg z-10"
          style={{
            left: `${(xOf(activeIndex!) / W) * 100}%`,
            transform: `translate(${activeIndex! < days.length / 2 ? '8px' : 'calc(-100% - 8px)'}, -100%)`,
          }}
        >
          <div className="text-[var(--na-inv-muted)]">{active.label}</div>
          <div className="font-semibold tabular-nums">{active.count} visit{active.count === 1 ? '' : 's'}</div>
        </div>
      )}
    </div>
  )
}
