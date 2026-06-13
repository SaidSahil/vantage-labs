'use client'
import { motion } from 'framer-motion'
import { fadeUp, viewport } from '@/lib/animations'
import Link from 'next/link'

function NodeAxisMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <polygon points="11,1.5 19.5,6.25 19.5,15.75 11,20.5 2.5,15.75 2.5,6.25" stroke="var(--na-inv-accent)" strokeWidth="1.3" strokeLinejoin="round"/>
      <line x1="7" y1="7" x2="7"  y2="15" stroke="var(--na-inv-accent)" strokeWidth="1.7" strokeLinecap="round"/>
      <line x1="7" y1="7" x2="15" y2="15" stroke="var(--na-inv-accent)" strokeWidth="1.7" strokeLinecap="round"/>
      <line x1="15" y1="7" x2="15" y2="15" stroke="var(--na-inv-accent)" strokeWidth="1.7" strokeLinecap="round"/>
      <circle cx="7"  cy="7"  r="1.2" fill="var(--na-inv-accent)"/>
      <circle cx="15" cy="7"  r="1.2" fill="var(--na-inv-accent)"/>
      <circle cx="7"  cy="15" r="1.2" fill="var(--na-inv-accent)"/>
      <circle cx="15" cy="15" r="1.2" fill="var(--na-inv-accent)"/>
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
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={fadeUp}
      data-cursor-dark
      style={{
        background: 'var(--na-inv-bg)',
        padding: 'clamp(40px, 5vw, 60px) clamp(24px, 4vw, 48px)',
        borderTop: '1px solid var(--na-inv-border)',
      }}
    >
      {/* Top row */}
      <div
        style={{
          display: 'grid',
          alignItems: 'start',
          gap: 32,
          paddingBottom: 'clamp(28px, 4vw, 40px)',
          borderBottom: '1px solid var(--na-inv-border)',
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
            color: 'var(--na-inv-text)',
            marginBottom: 10,
          }}>
            <NodeAxisMark />
            NodeAxis
          </div>
          <p style={{
            fontSize: 13,
            color: 'var(--na-inv-muted)',
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
            <li><Link href="/" className="footer-link">Home</Link></li>
            <li><Link href="/work" className="footer-link">Work</Link></li>
            <li><Link href="/services" className="footer-link">Services</Link></li>
            <li><Link href="/about" className="footer-link">About</Link></li>
            <li><Link href="/contact" className="footer-link">Contact</Link></li>
            <li>
              <a
                href="https://linkedin.com/company/nodeaxis"
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
              <a href="mailto:info@nodeaxis.ca" className="footer-link">
                info@nodeaxis.ca
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
          color: 'var(--na-inv-muted)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0 12px',
          alignItems: 'center',
        }}>
          <span>© 2026 NodeAxis — BC, Canada</span>
          <a
            href="tel:+17782408911"
            style={{
              color: 'var(--na-inv-muted)',
              textDecoration: 'none',
              fontWeight: 600,
              letterSpacing: '0.05em',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--na-inv-text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--na-inv-muted)')}
          >
            778-240-8911
          </a>
        </span>
        <span style={{
          fontSize: 11,
          color: 'var(--na-inv-border)',
          letterSpacing: '0.06em',
        }}>
          Hand-coded. No templates.
        </span>
      </div>
    </motion.footer>
  )
}
