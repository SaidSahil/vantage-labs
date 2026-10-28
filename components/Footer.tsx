import Link from 'next/link'
import { business, promise, tiers } from '@/lib/offer'
import { NodeAxisMark, PillButton } from '@/components/ui'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/work', label: 'Demo' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Insights' },
  { href: '/contact', label: 'Contact' },
]

// Dark rounded panel footer with giant wordmark (Lumóra reference).
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <div style={{ padding: 'var(--na-gutter)', paddingTop: 'clamp(24px, 4vw, 48px)' }}>
      <footer
        className="na-panel na-panel--dark na-inverse"
        style={{ padding: 'clamp(28px, 5vw, 64px) clamp(22px, 4.5vw, 56px) clamp(22px, 3vw, 32px)' }}
      >
        {/* Wordmark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 24,
            flexWrap: 'wrap',
            paddingBottom: 'clamp(28px, 4vw, 48px)',
            borderBottom: '1px solid var(--na-inv-border)',
          }}
        >
          <p className="na-wordmark" aria-hidden="true">{business.name}</p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 14, maxWidth: 340 }}>
            <p style={{ fontSize: 17, lineHeight: 1.5, color: 'var(--na-inv-text)' }}>
              Helping {business.city} trades get more calls, more reviews, less paperwork.
            </p>
            <PillButton href={promise.ctaHref} arrow>
              {promise.cta}
            </PillButton>
          </div>
        </div>

        {/* Columns */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]"
          style={{ gap: 'clamp(28px, 4vw, 48px)', padding: 'clamp(28px, 4vw, 48px) 0' }}
        >
          <div>
            <h2 className="na-foot-heading">Talk to us</h2>
            <a
              href={`mailto:${business.email}`}
              className="na-foot-link"
              style={{
                fontFamily: 'var(--na-font-display)',
                fontSize: 'clamp(22px, 2.4vw, 30px)',
                letterSpacing: '-0.03em',
                textDecoration: 'underline',
                textUnderlineOffset: 6,
                textDecorationThickness: 1,
                opacity: 1,
              }}
            >
              {business.email}
            </a>
            <div style={{ marginTop: 8 }}>
              <a
                href={business.phoneHref}
                className="na-foot-link"
                style={{ fontFamily: 'var(--na-font-display)', fontSize: 'clamp(20px, 2vw, 24px)', letterSpacing: '-0.02em', opacity: 1 }}
              >
                {business.phoneDisplay}
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <h2 className="na-foot-heading">Navigation</h2>
            <ul style={{ listStyle: 'none' }}>
              {navLinks.map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="na-foot-link">{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="na-foot-heading">Services</h2>
            <ul style={{ listStyle: 'none' }}>
              {tiers.map(t => (
                <li key={t.id}>
                  <Link href={t.id === 'audit' ? promise.ctaHref : `/services#${t.id}`} className="na-foot-link">
                    {t.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="na-foot-heading">Contact</h2>
            <dl style={{ display: 'grid', gap: 12, fontSize: 15, lineHeight: 1.5 }}>
              <div>
                <dt className="sr-only">Hours</dt>
                <dd>{business.hours}</dd>
              </div>
              <div>
                <dt style={{ fontSize: 13, color: 'var(--na-inv-muted)' }}>Service area</dt>
                <dd>{business.serviceArea.join(', ')}</dd>
              </div>
              <div>
                <dt className="sr-only">Meetings</dt>
                <dd style={{ color: 'var(--na-inv-muted)' }}>We meet you in person, anywhere in {business.city} and nearby.</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px 24px',
            paddingTop: 20,
            borderTop: '1px solid var(--na-inv-border)',
            fontSize: 13,
            color: 'var(--na-inv-muted)',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <NodeAxisMark size={16} />
            © {year} {business.name} · {business.city}, {business.region}
          </span>
          <span style={{ display: 'inline-flex', gap: 20 }}>
            <Link href="/privacy" className="na-foot-link" style={{ fontSize: 13 }}>Privacy Policy</Link>
            <Link href="/terms" className="na-foot-link" style={{ fontSize: 13 }}>Terms of Service</Link>
          </span>
        </div>
      </footer>
    </div>
  )
}
