import { ImageResponse } from 'next/og'
import { business, promise } from '@/lib/offer'

export const runtime = 'edge'
export const alt = `NodeAxis — ${promise.headline} Local help for ${business.city}, BC trades.`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Brand colours mirror the --na-* tokens in app/globals.css (ImageResponse
// can't read CSS variables, so they are repeated here).
const CREAM = '#F3EEE6'
const INK = '#121316'
const MUTED = '#64635E'
const ACCENT = '#2E3BFF'
const WHITE = '#FFFFFF'

export default async function Image() {
  // "More calls. More 5-star reviews. Less paperwork." → one line per sentence.
  const lines = promise.headline.split(/(?<=\.)\s+/)

  return new ImageResponse(
    (
      <div
        style={{
          background: CREAM,
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: 28,
        }}
      >
        <div
          style={{
            background: WHITE,
            borderRadius: 40,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '56px 64px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* soft blue blob */}
          <div
            style={{
              position: 'absolute',
              right: -160,
              top: -200,
              width: 520,
              height: 520,
              borderRadius: 9999,
              background: 'rgba(46,59,255,0.14)',
              display: 'flex',
            }}
          />

          {/* Logo + wordmark */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <svg width="48" height="48" viewBox="0 0 22 22" fill="none">
              <polygon points="11,1.5 19.5,6.25 19.5,15.75 11,20.5 2.5,15.75 2.5,6.25" stroke={INK} strokeWidth="1.3" strokeLinejoin="round" />
              <line x1="7" y1="7" x2="7" y2="15" stroke={INK} strokeWidth="1.7" strokeLinecap="round" />
              <line x1="7" y1="7" x2="15" y2="15" stroke={INK} strokeWidth="1.7" strokeLinecap="round" />
              <line x1="15" y1="7" x2="15" y2="15" stroke={INK} strokeWidth="1.7" strokeLinecap="round" />
              <circle cx="7" cy="7" r="1.2" fill={INK} />
              <circle cx="15" cy="7" r="1.2" fill={INK} />
              <circle cx="7" cy="15" r="1.2" fill={INK} />
              <circle cx="15" cy="15" r="1.2" fill={INK} />
            </svg>
            <span style={{ color: INK, fontSize: 34, fontWeight: 600, letterSpacing: '-1px' }}>{business.name}</span>
          </div>

          {/* Headline */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {lines.map((line, i) => (
              <span
                key={line}
                style={{
                  color: i === lines.length - 1 ? MUTED : INK,
                  fontSize: 86,
                  fontWeight: 600,
                  letterSpacing: '-4px',
                  lineHeight: 1,
                }}
              >
                {line}
              </span>
            ))}
          </div>

          {/* Footer row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ color: INK, fontSize: 28, fontWeight: 500 }}>
              {`${business.name} · ${business.city}, ${business.region}`}
            </span>
            <span
              style={{
                display: 'flex',
                background: ACCENT,
                color: WHITE,
                fontSize: 24,
                fontWeight: 600,
                padding: '14px 28px',
                borderRadius: 9999,
              }}
            >
              {promise.cta}
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
