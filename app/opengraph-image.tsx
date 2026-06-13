import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'NodeAxis — Web Design, Apps & Systems in BC, Canada'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0D0F1A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '36px',
          position: 'relative',
        }}
      >
        {/* Subtle grid background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(79,142,247,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,247,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            display: 'flex',
          }}
        />

        {/* Logo + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <svg
            width="100"
            height="100"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="32" height="32" rx="6" fill="#0D0F1A" />
            <polygon
              points="16,3 27,10 27,22 16,29 5,22 5,10"
              fill="none"
              stroke="rgba(255,255,255,0.85)"
              stroke-width="1.4"
              stroke-linejoin="round"
            />
            <line
              x1="9.5" y1="9" x2="9.5" y2="23"
              stroke="rgba(255,255,255,0.85)"
              stroke-width="2"
              stroke-linecap="round"
            />
            <line
              x1="9.5" y1="9" x2="22.5" y2="23"
              stroke="rgba(255,255,255,0.85)"
              stroke-width="2"
              stroke-linecap="round"
            />
            <line
              x1="22.5" y1="9" x2="22.5" y2="23"
              stroke="rgba(255,255,255,0.85)"
              stroke-width="2"
              stroke-linecap="round"
            />
            <circle cx="9.5" cy="9" r="1.6" fill="rgba(255,255,255,0.85)" />
            <circle cx="22.5" cy="9" r="1.6" fill="rgba(255,255,255,0.85)" />
            <circle cx="9.5" cy="23" r="1.6" fill="rgba(255,255,255,0.85)" />
            <circle cx="22.5" cy="23" r="1.6" fill="rgba(255,255,255,0.85)" />
          </svg>
          <span
            style={{
              color: '#FFFFFF',
              fontSize: '88px',
              fontWeight: '800',
              letterSpacing: '-4px',
              lineHeight: 1,
            }}
          >
            NodeAxis
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            width: '480px',
            height: '1px',
            background: 'rgba(255,255,255,0.12)',
            display: 'flex',
          }}
        />

        {/* Tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <span
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: '28px',
              textAlign: 'center',
              letterSpacing: '-0.5px',
            }}
          >
            Web Design, Apps &amp; Systems — BC, Canada
          </span>
          <span
            style={{
              color: '#4F8EF7',
              fontSize: '22px',
              letterSpacing: '0.5px',
            }}
          >
            nodeaxis.ca
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
