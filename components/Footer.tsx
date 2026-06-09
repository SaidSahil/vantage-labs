import Link from 'next/link'

function VMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="10" height="10" rx="1.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <rect x="11" y="11" width="10" height="10" rx="1.5" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
      <rect x="11" y="1" width="10" height="10" rx="1.5" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export default function Footer() {
  return (
    <footer
      data-cursor-dark
      style={{
        background: '#141416',
        padding: 'clamp(40px, 5vw, 60px) clamp(24px, 4vw, 48px)',
        borderTop: '1px solid #2a2a2c',
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: 'grid',
          alignItems: 'start',
          gap: 32,
          paddingBottom: 'clamp(28px, 4vw, 40px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          marginBottom: 'clamp(24px, 3vw, 32px)',
        }}
        className="grid-cols-1 md:grid-cols-[1fr_auto]"
      >
        {/* Logo + tagline */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontSize: 14,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.6)',
            marginBottom: 10,
          }}>
            <VMark />
            Vantage Labs
          </div>
          <p style={{
            fontSize: 13,
            color: 'rgba(255,255,255,0.22)',
            lineHeight: 1.6,
            maxWidth: 280,
          }}>
            Custom websites and systems for businesses across Canada. Starting at $399.
          </p>
        </div>

        {/* Nav links */}
        <nav aria-label="Footer navigation">
          <ul style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
            listStyle: 'none',
            alignItems: 'flex-end',
          }}
          className="items-start md:items-end"
          >
            <li><Link href="/work" className="footer-link">Work</Link></li>
            <li><Link href="/services" className="footer-link">Services</Link></li>
            <li><Link href="/contact" className="footer-link">Contact</Link></li>
            <li>
              <a
                href="https://linkedin.com/company/vantage-labs"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 7 }}
              >
                <LinkedInIcon />
                LinkedIn →
              </a>
            </li>
            <li>
              <a href="mailto:hello@vantagelabs.ca" className="footer-link">
                hello@vantagelabs.ca
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Bottom row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <span style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.2)',
        }}>
          © 2026 Vantage Labs — BC, Canada
        </span>
        <span style={{
          fontSize: 11,
          color: 'rgba(255,255,255,0.12)',
          letterSpacing: '0.06em',
        }}>
          Hand-coded. No templates.
        </span>
      </div>
    </footer>
  )
}
