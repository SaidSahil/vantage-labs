import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About NodeAxis',
  url: 'https://nodeaxis.ca/about',
  description: 'NodeAxis is a web design and development agency based in British Columbia, Canada.',
  mainEntity: {
    '@type': 'LocalBusiness',
    name: 'NodeAxis',
    telephone: '+17782408911',
    email: 'sahil.sodais@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'British Columbia',
      addressRegion: 'BC',
      addressCountry: 'CA',
    },
    areaServed: 'British Columbia, Canada',
    url: 'https://nodeaxis.ca',
  },
}

export default function AboutPage() {
  return (
    <main style={{ background: 'var(--na-bg)', minHeight: '100vh' }}>
      <Navbar />

      {/* ── Hero / Intro ──────────────────────────────────────── */}
      <section
        style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(120px, 16vw, 180px) clamp(24px, 4vw, 56px) clamp(64px, 8vw, 88px)',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid var(--na-border-mid)',
        }}
      >
        {/* Ghost number */}
        <div
          aria-hidden="true"
          className="hidden md:block"
          style={{
            position: 'absolute',
            right: 'clamp(24px, 4vw, 56px)',
            bottom: -20,
            fontSize: 'clamp(120px, 22vw, 280px)',
            fontWeight: 800,
            letterSpacing: '-0.06em',
            color: 'var(--na-text)',
            opacity: 0.04,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          02
        </div>

        {/* Decorative SVG grid */}
        <svg
          aria-hidden="true"
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="hidden md:block"
          style={{
            position: 'absolute',
            top: 80,
            right: 'clamp(80px, 10vw, 160px)',
            opacity: 0.07,
            pointerEvents: 'none',
          }}
        >
          <circle cx="100" cy="100" r="90" stroke="var(--na-accent)" strokeWidth="1" fill="none" />
          <circle cx="100" cy="100" r="60" stroke="var(--na-accent)" strokeWidth="1" fill="none" />
          <circle cx="100" cy="100" r="30" stroke="var(--na-accent)" strokeWidth="1" fill="none" />
          <line x1="10" y1="100" x2="190" y2="100" stroke="var(--na-accent)" strokeWidth="0.8" />
          <line x1="100" y1="10" x2="100" y2="190" stroke="var(--na-accent)" strokeWidth="0.8" />
        </svg>

        {/* Breadcrumb label */}
        <div style={{ marginBottom: 28 }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--na-muted)',
              textDecoration: 'none',
              marginBottom: 20,
              transition: 'color 0.2s ease',
            }}
          >
            ← Home
          </Link>
          <div className="section-label">02 — Who We Are</div>
        </div>

        {/* H1 */}
        <h1
          style={{
            fontSize: 'clamp(44px, 8.5vw, 118px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 0.93,
            color: 'var(--na-text)',
            marginBottom: 32,
          }}
        >
          Web Design Agency<br />
          <span
            style={{
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--na-heading)',
            }}
          >
            in British Columbia.
          </span>
        </h1>

        {/* Subtext */}
        <p
          style={{
            fontSize: 'clamp(14px, 1.4vw, 17px)',
            fontWeight: 400,
            color: 'var(--na-muted)',
            maxWidth: 500,
            lineHeight: 1.75,
          }}
        >
          NodeAxis builds hand-coded, custom websites for small businesses across BC — no templates,
          no page builders, no filler. Just clean, fast sites that actually rank and convert.
          Starting at $399.
        </p>
      </section>

      {/* ── What We Build ─────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--na-bg)',
          padding: 'clamp(72px, 9vw, 112px) clamp(24px, 4vw, 56px)',
          borderBottom: '1px solid var(--na-border-mid)',
          position: 'relative',
        }}
      >
        {/* Left vertical accent */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 2,
            background: 'var(--na-accent)',
            opacity: 0.12,
          }}
        />

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-16"
          style={{ position: 'relative' }}
        >
          {/* Left: header */}
          <div>
            <span
              className="section-label"
              style={{ display: 'block', marginBottom: 20 }}
            >
              Services
            </span>
            <h2
              style={{
                fontSize: 'clamp(30px, 4.5vw, 56px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: 'var(--na-text)',
                lineHeight: 1.05,
                marginBottom: 20,
              }}
            >
              What we build.
            </h2>
            <p
              style={{
                fontSize: 15,
                color: 'var(--na-muted)',
                lineHeight: 1.75,
                maxWidth: 380,
              }}
            >
              Every engagement starts with a conversation. We scope it, price it fairly,
              and build exactly what you need — nothing more, nothing less.
            </p>
          </div>

          {/* Right: service list */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
            }}
          >
            {[
              {
                num: '01',
                title: 'Custom Web Design',
                desc: 'Hand-coded, mobile-first sites that reflect your brand and load in under 2 seconds.',
              },
              {
                num: '02',
                title: 'Landing Pages',
                desc: 'High-converting single pages built for paid traffic, campaigns, or local SEO.',
              },
              {
                num: '03',
                title: 'Small Business Sites',
                desc: 'Multi-page websites for local service businesses — cleaners, contractors, clinics, and more.',
              },
              {
                num: '04',
                title: 'SEO-Optimized Builds',
                desc: 'Semantic HTML, proper meta, fast load times, and Google-ready structure baked in from day one.',
              },
            ].map((item) => (
              <div
                key={item.num}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr',
                  gap: 20,
                  padding: '28px 0',
                  borderBottom: '1px solid var(--na-border-mid)',
                  alignItems: 'start',
                }}
              >
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    color: 'var(--na-accent)',
                    paddingTop: 3,
                  }}
                >
                  {item.num}
                </span>
                <div>
                  <div
                    style={{
                      fontSize: 'clamp(16px, 1.8vw, 20px)',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      color: 'var(--na-text)',
                      marginBottom: 7,
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: 'var(--na-muted)',
                      lineHeight: 1.65,
                    }}
                  >
                    {item.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why NodeAxis ──────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--na-surface)',
          padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 56px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Dot grid bg */}
        <svg
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          <defs>
            <pattern id="about-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="var(--na-text)" opacity="0.055" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-dots)" />
        </svg>

        <div style={{ position: 'relative' }}>
          <span
            className="section-label"
            style={{ display: 'block', marginBottom: 20 }}
          >
            Our Approach
          </span>
          <h2
            style={{
              fontSize: 'clamp(30px, 4.5vw, 56px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--na-text)',
              lineHeight: 1.05,
              marginBottom: 64,
            }}
          >
            Why NodeAxis?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px">
            {[
              {
                icon: '⌨',
                title: 'Hand-Coded Only',
                body: 'No Wix. No Squarespace. No WordPress drag-and-drop. Every line is written by hand — which means faster, leaner, cleaner.',
              },
              {
                icon: '⚡',
                title: 'Built for Speed',
                body: 'We target Lighthouse 90+ on every build. Fast sites rank higher, convert better, and keep visitors from bouncing.',
              },
              {
                icon: '🔍',
                title: 'SEO from Day One',
                body: 'Proper semantic HTML, clean URLs, meta tags, and structured data built in — not bolted on later.',
              },
              {
                icon: '💲',
                title: 'Honest Pricing',
                body: 'Sites starting at $399. No surprise invoices. No retainer traps. You know what you\'re paying before we start.',
              },
              {
                icon: '📍',
                title: 'BC-Based',
                body: 'We\'re a British Columbia business working with BC businesses. Same time zone. No overseas handoffs.',
              },
              {
                icon: '📦',
                title: 'You Own Everything',
                body: 'Source files are yours on delivery. No lock-in, no monthly licensing fees to keep your site alive.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="why-item"
                style={{
                  background: 'var(--na-bg)',
                  border: '1px solid var(--na-border-mid)',
                  padding: 'clamp(28px, 3vw, 40px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                  transition: 'background 0.2s ease',
                }}
              >
                <span
                  aria-hidden="true"
                  style={{ fontSize: 22, lineHeight: 1 }}
                >
                  {card.icon}
                </span>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: 'var(--na-text)',
                  }}
                >
                  {card.title}
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: 'var(--na-muted)',
                    lineHeight: 1.7,
                  }}
                >
                  {card.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Area ──────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--na-bg)',
          padding: 'clamp(72px, 9vw, 112px) clamp(24px, 4vw, 56px)',
          borderTop: '1px solid var(--na-border-mid)',
          borderBottom: '1px solid var(--na-border-mid)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ghost text */}
        <div
          aria-hidden="true"
          className="hidden lg:block"
          style={{
            position: 'absolute',
            right: 'clamp(24px, 4vw, 56px)',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 'clamp(80px, 14vw, 180px)',
            fontWeight: 800,
            letterSpacing: '-0.05em',
            color: 'var(--na-text)',
            opacity: 0.03,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          BC
        </div>

        <div style={{ position: 'relative', maxWidth: 680 }}>
          <span
            className="section-label"
            style={{ display: 'block', marginBottom: 20 }}
          >
            Where We Work
          </span>
          <h2
            style={{
              fontSize: 'clamp(30px, 4.5vw, 56px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--na-text)',
              lineHeight: 1.05,
              marginBottom: 24,
            }}
          >
            Serving businesses across{' '}
            <span
              style={{
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'var(--na-heading)',
              }}
            >
              British Columbia.
            </span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(15px, 1.4vw, 17px)',
              color: 'var(--na-muted)',
              lineHeight: 1.8,
              marginBottom: 40,
            }}
          >
            We serve businesses across British Columbia — Vancouver, Surrey, Burnaby,
            Richmond, Kelowna, Victoria, and beyond. We work remotely with clients throughout BC
            and Canada. If you need a website, we can help — wherever you are in the province.
          </p>

          {/* City pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
            }}
          >
            {[
              'Vancouver',
              'Surrey',
              'Burnaby',
              'Richmond',
              'Kelowna',
              'Victoria',
              'Langley',
              'Abbotsford',
              'Coquitlam',
              'Kamloops',
              'Nanaimo',
              '+ All of BC',
            ].map((city) => (
              <span
                key={city}
                style={{
                  display: 'inline-block',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--na-accent)',
                  background: 'var(--na-accent-dim)',
                  padding: '7px 14px',
                  borderRadius: 100,
                  border: '1px solid rgba(var(--na-accent-rgb), 0.18)',
                }}
              >
                {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Get in Touch ──────────────────────────────────────── */}
      <section
        data-cursor-dark
        style={{
          background: 'var(--na-inv-bg)',
          padding: 'clamp(100px, 14vw, 160px) clamp(24px, 4vw, 56px)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Diagonal lines */}
        <svg
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            opacity: 0.06,
          }}
        >
          <line x1="0" y1="100%" x2="100%" y2="0" stroke="#FFFFFF" strokeWidth="1" />
          <line x1="0" y1="75%" x2="75%" y2="0" stroke="#FFFFFF" strokeWidth="1" />
        </svg>

        {/* Ghost char */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 'clamp(200px, 40vw, 420px)',
            fontWeight: 800,
            color: '#FFFFFF',
            opacity: 0.018,
            lineHeight: 1,
            letterSpacing: '-0.05em',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          N
        </div>

        <div style={{ position: 'relative' }}>
          <span
            style={{
              display: 'block',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--na-inv-muted)',
              marginBottom: 24,
            }}
          >
            Get in Touch
          </span>

          <h2
            style={{
              fontSize: 'clamp(48px, 10vw, 120px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              color: 'var(--na-inv-text)',
              lineHeight: 0.92,
              marginBottom: 28,
            }}
          >
            Let's talk.
          </h2>

          <p
            style={{
              fontSize: 'clamp(14px, 1.4vw, 17px)',
              color: 'var(--na-inv-muted)',
              maxWidth: 460,
              margin: '0 auto 48px',
              lineHeight: 1.75,
              fontWeight: 300,
            }}
          >
            Ready to get your business online? Tell us what you need and we'll
            get back to you within one business day.
          </p>

          {/* Contact details */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: 24,
              marginBottom: 48,
            }}
          >
            <a
              href="tel:+17782408911"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--na-inv-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                letterSpacing: '0.02em',
              }}
            >
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: '1px solid var(--na-inv-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                ✆
              </span>
              778-240-8911
            </a>

            <a
              href="mailto:sahil.sodais@gmail.com"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--na-inv-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                letterSpacing: '0.02em',
              }}
            >
              <span
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: '1px solid var(--na-inv-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 13,
                  flexShrink: 0,
                }}
                aria-hidden="true"
              >
                @
              </span>
              sahil.sodais@gmail.com
            </a>
          </div>

          {/* CTA buttons */}
          <div
            style={{
              display: 'flex',
              gap: 14,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link href="/contact" className="btn-primary">
              Start a Project
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/services" className="btn-ghost">
              View Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {/* ── JSON-LD Schema ────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  )
}
