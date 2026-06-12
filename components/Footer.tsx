import Link from 'next/link'

function NodeAxisMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <polygon points="11,1.5 19.5,6.25 19.5,15.75 11,20.5 2.5,15.75 2.5,6.25" stroke="var(--na-muted)" strokeWidth="1.3" strokeLinejoin="round"/>
      <line x1="7" y1="7" x2="7"  y2="15" stroke="var(--na-muted)" strokeWidth="1.7" strokeLinecap="round"/>
      <line x1="7" y1="7" x2="15" y2="15" stroke="var(--na-muted)" strokeWidth="1.7" strokeLinecap="round"/>
      <line x1="15" y1="7" x2="15" y2="15" stroke="var(--na-muted)" strokeWidth="1.7" strokeLinecap="round"/>
      <circle cx="7"  cy="7"  r="1.2" fill="var(--na-muted)"/>
      <circle cx="15" cy="7"  r="1.2" fill="var(--na-muted)"/>
      <circle cx="7"  cy="15" r="1.2" fill="var(--na-muted)"/>
      <circle cx="15" cy="15" r="1.2" fill="var(--na-muted)"/>
    </svg>
  )
}

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--na-bg)',
        borderTop: '1px solid var(--na-border-mid)',
        padding: '20px clamp(24px, 4vw, 48px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 16,
      }}
    >
      <Link
        href="/"
        style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}
        aria-label="NodeAxis home"
      >
        <NodeAxisMark />
        <span style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '-0.01em',
          color: 'var(--na-muted)',
        }}>
          NodeAxis
        </span>
      </Link>

      <nav aria-label="Footer navigation">
        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
          <Link href="/work"     className="footer-link">Work</Link>
          <Link href="/services" className="footer-link">Services</Link>
          <Link href="/contact"  className="footer-link">Contact</Link>
          <a
            href="https://linkedin.com/company/nodeaxis"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            LinkedIn
          </a>
        </div>
      </nav>

      <span style={{
        fontSize: 11,
        fontWeight: 500,
        color: 'var(--na-muted)',
        letterSpacing: '0.06em',
        opacity: 0.6,
      }}>
        © 2026 NodeAxis · BC, Canada
      </span>
    </footer>
  )
}
