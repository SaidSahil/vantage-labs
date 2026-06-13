'use client'
import { CSSProperties } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { fadeUp, fadeLeft, stagger, viewport } from '@/lib/animations'
import { useCountUp } from '@/lib/useCountUp'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

/* ── Sub-components for count-up stats (hooks need their own component scope) ── */
function StatPrice() {
  const { count, ref } = useCountUp(399, 1400)
  return (
    <div style={statWrap}>
      <span style={statNum}><span style={{ fontSize: '0.55em', fontWeight: 400, opacity: 0.6 }}>$</span><span ref={ref}>{count}</span></span>
      <span style={statLabel}>Starting price</span>
    </div>
  )
}
function StatPercent() {
  const { count, ref } = useCountUp(100, 1000)
  return (
    <div style={statWrap}>
      <span style={statNum}><span ref={ref}>{count}</span><span style={{ fontSize: '0.55em', fontWeight: 400, opacity: 0.6 }}>%</span></span>
      <span style={statLabel}>Custom code</span>
    </div>
  )
}
function StatWeeks() {
  return (
    <div style={statWrap}>
      <span style={statNum}>~<span style={{ fontSize: '0.9em' }}>2</span><span style={{ fontSize: '0.38em', fontWeight: 400, opacity: 0.55, letterSpacing: '0.08em' }}> WK</span></span>
      <span style={statLabel}>Avg. delivery</span>
    </div>
  )
}

const statWrap: CSSProperties = {
  display: 'flex', flexDirection: 'column', alignItems: 'center',
}
const statNum: CSSProperties = {
  fontSize: 'clamp(48px, 7vw, 96px)',
  fontWeight: 800,
  letterSpacing: '-0.04em',
  lineHeight: 1,
  color: 'var(--na-inv-text)',
}
const statLabel: CSSProperties = {
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: 'var(--na-inv-muted)',
  marginTop: 16,
}

/* ── Chapter label ── */
function ChapterLabel({ n, title }: { n: string; title: string }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}
      style={{ marginBottom: 'clamp(40px, 5vw, 64px)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'var(--na-accent)', opacity: 0.7,
        }}>
          {n}
        </span>
        <div style={{ width: 24, height: 1, background: 'var(--na-accent)', opacity: 0.4 }} />
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '0.22em',
          textTransform: 'uppercase', color: 'var(--na-accent)',
        }}>
          {title}
        </span>
      </div>
    </motion.div>
  )
}

/* ── Ghost letter watermark ── */
function Ghost({ children, right, left, opacity = 0.025 }: { children: string; right?: string | number; left?: string | number; opacity?: number }) {
  return (
    <div aria-hidden style={{
      position: 'absolute',
      ...(right !== undefined ? { right } : {}),
      ...(left !== undefined ? { left } : {}),
      top: '50%', transform: 'translateY(-50%)',
      fontSize: 'clamp(160px, 26vw, 360px)',
      fontWeight: 800, letterSpacing: '-0.06em',
      color: 'var(--na-text)', opacity,
      lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
      zIndex: 0,
    }}>
      {children}
    </div>
  )
}

const beliefs = [
  {
    n: '1',
    headline: 'No templates. Ever.',
    body: 'Every line of code is written for your business specifically. Not dragged, dropped, or pulled from a theme marketplace.',
  },
  {
    n: '2',
    headline: 'Senior craft, accessible price.',
    body: '20+ years of combined experience across web, systems, and databases. Starting at $399. That gap shouldn\'t exist — so we closed it.',
  },
  {
    n: '3',
    headline: 'Local first. Canada-wide.',
    body: 'Rooted in BC — same timezone, same community. Clients from Vancouver to Halifax get the same focused senior-level attention.',
  },
]

const services = [
  { num: '01', title: 'Custom Web Design', desc: 'Hand-coded, mobile-first sites that reflect your brand and load fast.' },
  { num: '02', title: 'Landing Pages', desc: 'High-converting single pages built for paid traffic, campaigns, or local SEO.' },
  { num: '03', title: 'Systems & Dashboards', desc: 'Booking systems, client portals, admin dashboards, and internal tools — built to how your business actually operates.' },
  { num: '04', title: 'Database & Backend', desc: 'Custom databases, API integrations, and full-stack digital infrastructure — designed and built from scratch.' },
]

const cities = [
  'Vancouver', 'Surrey', 'Burnaby', 'Richmond', 'Kelowna',
  'Victoria', 'Langley', 'Abbotsford', 'Coquitlam', 'Kamloops',
  'Nanaimo', '+ All of BC',
]

const tickerWords = [
  'HAND-CODED', '·', 'NO TEMPLATES', '·', 'BC-BASED', '·',
  'SENIOR CRAFT', '·', 'STARTING AT $399', '·', 'CUSTOM CODE ONLY', '·',
  '20+ YEARS COMBINED', '·', 'CANADA-WIDE', '·',
]

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
    email: 'info@nodeaxis.ca',
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ═══════════════════════════════════════════════
          HERO — The Statement
      ════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative',
        padding: 'clamp(120px, 16vw, 200px) clamp(24px, 4vw, 56px) clamp(80px, 10vw, 120px)',
        borderBottom: '1px solid var(--na-border-mid)',
        overflow: 'hidden',
      }}>
        {/* Blueprint grid */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(var(--na-border) 1px, transparent 1px), linear-gradient(90deg, var(--na-border) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 90% 80% at 40% 55%, black 10%, transparent 78%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 40% 55%, black 10%, transparent 78%)',
          pointerEvents: 'none',
        }} />
        {/* Accent glow */}
        <div aria-hidden style={{
          position: 'absolute', top: '5%', left: '10%',
          width: 'clamp(320px, 55vw, 760px)',
          height: 'clamp(200px, 32vw, 500px)',
          background: 'radial-gradient(ellipse, var(--na-accent-dim) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        {/* Vertical page label */}
        <div aria-hidden style={{
          position: 'absolute', right: 0, top: '50%',
          transform: 'translateY(-50%) rotate(90deg)',
          transformOrigin: 'center center',
          fontSize: 9, fontWeight: 700, letterSpacing: '0.28em',
          textTransform: 'uppercase', color: 'var(--na-text)',
          opacity: 0.07, whiteSpace: 'nowrap', pointerEvents: 'none',
        }}>
          NodeAxis — Who We Are — About
        </div>

        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 'clamp(40px, 5vw, 64px)', position: 'relative', zIndex: 1 }}
        >
          <Link href="/" style={{
            fontSize: 11, fontWeight: 600, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: 'var(--na-muted)',
          }}>
            ← Home
          </Link>
          <span style={{ color: 'var(--na-border-mid)' }}>/</span>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--na-accent)' }}>
            Who We Are
          </span>
        </motion.div>

        {/* Hero layout: giant headline + right column */}
        <div style={{ display: 'grid', gap: 'clamp(32px, 5vw, 64px)', position: 'relative', zIndex: 1, alignItems: 'end' }}
          className="grid-cols-1 lg:grid-cols-[1fr_340px]"
        >
          {/* LEFT: Giant headline */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 48 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, ease, delay: 0.08 }}
              style={{
                fontSize: 'clamp(52px, 11vw, 150px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
                color: 'var(--na-text)',
                margin: 0,
              }}
            >
              THE WEB
              <br />
              <em style={{
                fontStyle: 'italic',
                fontWeight: 300,
                color: 'var(--na-heading)',
              }}>
                DESERVES
              </em>
              <br />
              BETTER.
            </motion.h1>
          </div>

          {/* RIGHT: Context column — desktop only */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.38 }}
            className="hidden lg:block"
            style={{ paddingBottom: '0.15em' }}
          >
            <div style={{ width: 32, height: 2, background: 'var(--na-accent)', marginBottom: 22 }} />
            <p style={{
              fontSize: 'clamp(14px, 1.15vw, 16px)',
              color: 'var(--na-muted)',
              lineHeight: 1.82,
              marginBottom: 28,
            }}>
              Most businesses get handed a template and told it's web design. NodeAxis builds
              websites, systems, databases, and digital infrastructure — from scratch, to senior standard.
            </p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: 'var(--na-accent)',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--na-accent)', flexShrink: 0 }} />
              Hand-coded · BC-based · From $399
            </div>
          </motion.div>
        </div>

        {/* Mobile sub-copy */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.5 }}
          className="lg:hidden"
          style={{
            fontSize: 14, color: 'var(--na-muted)',
            lineHeight: 1.82, marginTop: 'clamp(24px, 3vw, 40px)',
            position: 'relative', zIndex: 1, maxWidth: 480,
          }}
        >
          Most businesses get handed a template and told it's web design. NodeAxis builds
          websites, systems, databases, and digital infrastructure — from scratch, senior standard. From $399.
        </motion.p>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="hidden sm:flex"
          style={{
            position: 'absolute', bottom: 'clamp(24px, 3vw, 40px)', right: 'clamp(24px, 4vw, 56px)',
            alignItems: 'center', gap: 10, zIndex: 1,
          }}
        >
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--na-muted)' }}>
            Scroll
          </span>
          <div className="hero-scroll-line" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          MANIFESTO TICKER
      ════════════════════════════════════════════════ */}
      <div style={{
        borderBottom: '1px solid var(--na-border-mid)',
        overflow: 'hidden',
        padding: '16px 0',
        background: 'var(--na-surface)',
      }}>
        <div className="ticker-track" aria-hidden>
          {[...tickerWords, ...tickerWords].map((word, i) => (
            <span key={i} style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.22em',
              textTransform: 'uppercase', padding: '0 18px',
              color: word === '·' ? 'var(--na-accent)' : 'var(--na-muted)',
              flexShrink: 0,
            }}>
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════
          I — THE ORIGIN
      ════════════════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(80px, 10vw, 128px) clamp(24px, 4vw, 56px)',
        borderBottom: '1px solid var(--na-border-mid)',
        position: 'relative', overflow: 'hidden',
      }}>
        <Ghost right="-1%">I</Ghost>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <ChapterLabel n="I" title="The Origin" />

          <div style={{ display: 'grid', gap: 'clamp(48px, 7vw, 96px)', alignItems: 'start' }}
            className="grid-cols-1 lg:grid-cols-2"
          >
            {/* Pull quote */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={viewport} variants={fadeLeft}
            >
              <blockquote style={{
                fontSize: 'clamp(20px, 2.8vw, 34px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.2,
                color: 'var(--na-text)',
                margin: 0,
                position: 'relative',
                paddingLeft: 'clamp(20px, 2.5vw, 32px)',
              }}>
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  width: 3, background: 'var(--na-accent)', borderRadius: 2,
                }} />
                "I've built systems, databases, and digital products. NodeAxis exists because small businesses
                {' '}<em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--na-heading)' }}>
                  deserve that same senior-level craft — without the agency price tag.
                </em>"
              </blockquote>
              <p style={{
                fontSize: 12, fontWeight: 700, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--na-muted)',
                marginTop: 24, paddingLeft: 'clamp(20px, 2.5vw, 32px)',
              }}>
                — Adam Sahil, Founder
              </p>
            </motion.div>

            {/* Narrative + founder card */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.85, ease, delay: 0.15 }}
            >
              {/* Founder card */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 18,
                padding: 'clamp(20px, 2.5vw, 28px)',
                border: '1px solid var(--na-border-mid)',
                borderRadius: 4,
                background: 'var(--na-surface)',
                marginBottom: 'clamp(24px, 3vw, 36px)',
                position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: 0, left: 0,
                  width: 3, height: '100%', background: 'var(--na-accent)',
                }} />
                <div style={{
                  width: 54, height: 54, borderRadius: '50%',
                  background: 'var(--na-accent)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: 20, fontWeight: 800, color: '#fff',
                }}>
                  A
                </div>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--na-text)', marginBottom: 4 }}>
                    Adam Sahil
                  </div>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--na-muted)' }}>
                    Founder & Developer — NodeAxis
                  </div>
                </div>
              </div>

              <p style={{ fontSize: 14, color: 'var(--na-muted)', lineHeight: 1.88, marginBottom: 18 }}>
                Background in web, systems, databases, and full-stack digital. NodeAxis channels that into
                one thing — real, senior-level builds that small businesses can actually afford.
                No account managers. No juniors. You work directly with the person writing the code.
              </p>
              <p style={{ fontSize: 14, color: 'var(--na-muted)', lineHeight: 1.88 }}>
                Based in British Columbia. Metro Vancouver clients know us by name.
                Coast to coast, every project — whether it's a landing page or a custom system — gets the
                same focused attention.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          II — WHAT WE BELIEVE
      ════════════════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(80px, 10vw, 128px) clamp(24px, 4vw, 56px)',
        borderBottom: '1px solid var(--na-border-mid)',
        position: 'relative', overflow: 'hidden',
      }}>
        <Ghost left="-2%">II</Ghost>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <ChapterLabel n="II" title="What We Believe" />

          <motion.div
            initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}
            style={{ marginBottom: 'clamp(48px, 6vw, 72px)' }}
          >
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 72px)',
              fontWeight: 800, letterSpacing: '-0.04em',
              lineHeight: 0.92, color: 'var(--na-text)',
              maxWidth: 700,
            }}>
              Three things we'll{' '}
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--na-heading)' }}>
                never&nbsp;compromise.
              </em>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={viewport} variants={stagger(0.09)}
          >
            {beliefs.map((b) => (
              <motion.div
                key={b.n}
                variants={fadeUp}
                style={{
                  display: 'grid',
                  gap: 'clamp(16px, 3vw, 52px)',
                  padding: 'clamp(28px, 3.5vw, 48px) 0',
                  borderTop: '1px solid var(--na-border-mid)',
                }}
                className="grid-cols-[52px_1fr] md:grid-cols-[80px_1fr_1fr]"
              >
                <span style={{
                  fontSize: 'clamp(36px, 4.5vw, 64px)',
                  fontWeight: 800, letterSpacing: '-0.06em',
                  color: 'var(--na-accent)', lineHeight: 1, opacity: 0.35,
                }}>
                  {b.n}
                </span>
                <div style={{
                  fontSize: 'clamp(17px, 2.2vw, 28px)',
                  fontWeight: 700, letterSpacing: '-0.025em',
                  color: 'var(--na-text)', lineHeight: 1.2, alignSelf: 'center',
                }}>
                  {b.headline}
                </div>
                <p className="hidden md:block" style={{
                  fontSize: 14, lineHeight: 1.85,
                  color: 'var(--na-muted)', alignSelf: 'center',
                }}>
                  {b.body}
                </p>
              </motion.div>
            ))}
            <div style={{ borderTop: '1px solid var(--na-border-mid)' }} />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          III — THE PROOF (dark panel)
      ════════════════════════════════════════════════ */}
      <section
        data-cursor-dark
        style={{
          background: 'var(--na-inv-bg)',
          padding: 'clamp(80px, 10vw, 128px) clamp(24px, 4vw, 56px)',
          borderBottom: '1px solid var(--na-border-mid)',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Ghost III */}
        <div aria-hidden style={{
          position: 'absolute', right: '-2%', top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(130px, 20vw, 280px)',
          fontWeight: 800, letterSpacing: '-0.06em',
          color: '#fff', opacity: 0.018,
          lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        }}>
          III
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}
            style={{ marginBottom: 'clamp(48px, 6vw, 80px)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--na-inv-muted)', opacity: 0.7 }}>III</span>
              <div style={{ width: 24, height: 1, background: 'var(--na-inv-muted)', opacity: 0.3 }} />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--na-inv-muted)' }}>The Proof</span>
            </div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewport} variants={stagger(0.12)}
            style={{ display: 'grid' }}
            className="grid-cols-1 sm:grid-cols-3"
          >
            {[
              { content: <StatWeeks /> },
              { content: <StatPrice /> },
              { content: <StatPercent /> },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="stat-cell"
                style={{
                  display: 'flex', justifyContent: 'center',
                  padding: 'clamp(40px, 5vw, 68px) clamp(16px, 2vw, 32px)',
                  borderRight: i < 2 ? '1px solid var(--na-inv-border)' : 'none',
                  borderBottom: '1px solid var(--na-inv-border)',
                }}
              >
                {item.content}
              </motion.div>
            ))}
          </motion.div>

          {/* Pull sentence */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.75, ease, delay: 0.28 }}
            style={{
              fontSize: 'clamp(16px, 2vw, 22px)',
              fontWeight: 300, fontStyle: 'italic',
              color: 'var(--na-inv-muted)',
              lineHeight: 1.55, maxWidth: 620,
              marginTop: 'clamp(40px, 5vw, 64px)',
            }}
          >
            Numbers that reflect a commitment:{' '}
            <strong style={{ color: 'var(--na-inv-text)', fontWeight: 700, fontStyle: 'normal' }}>
              affordable doesn't mean compromise.
            </strong>
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          IV — WHAT WE BUILD
      ════════════════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(80px, 10vw, 128px) clamp(24px, 4vw, 56px)',
        borderBottom: '1px solid var(--na-border-mid)',
        position: 'relative', overflow: 'hidden',
      }}>
        <Ghost left="-2%">IV</Ghost>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}
            style={{
              display: 'flex', alignItems: 'center', gap: 20,
              marginBottom: 'clamp(40px, 5vw, 64px)', flexWrap: 'wrap',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--na-accent)', opacity: 0.7 }}>IV</span>
              <div style={{ width: 24, height: 1, background: 'var(--na-accent)', opacity: 0.4 }} />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--na-accent)' }}>What We Build</span>
            </div>
            <div style={{ flex: 1, height: 1, background: 'var(--na-border-mid)', minWidth: 40 }} />
            <Link href="/services" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontSize: 11, fontWeight: 600, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: 'var(--na-muted)', flexShrink: 0,
            }}>
              Full Pricing <ArrowRight size={12} />
            </Link>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={viewport} variants={stagger(0.07)}
          >
            {services.map((s) => (
              <motion.div
                key={s.num}
                variants={fadeUp}
                style={{
                  display: 'grid',
                  gap: 'clamp(16px, 3vw, 52px)',
                  padding: 'clamp(24px, 3vw, 40px) 0',
                  borderTop: '1px solid var(--na-border-mid)',
                }}
                className="grid-cols-[44px_1fr] md:grid-cols-[68px_240px_1fr]"
              >
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--na-accent)', paddingTop: 4, opacity: 0.6 }}>
                  {s.num}
                </span>
                <div style={{ fontSize: 'clamp(16px, 2vw, 22px)', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--na-text)', alignSelf: 'center' }}>
                  {s.title}
                </div>
                <p className="hidden md:block" style={{ fontSize: 14, lineHeight: 1.82, color: 'var(--na-muted)', alignSelf: 'center' }}>
                  {s.desc}
                </p>
              </motion.div>
            ))}
            <div style={{ borderTop: '1px solid var(--na-border-mid)' }} />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          V — THE TERRITORY
      ════════════════════════════════════════════════ */}
      <section style={{
        padding: 'clamp(80px, 10vw, 128px) clamp(24px, 4vw, 56px)',
        borderBottom: '1px solid var(--na-border-mid)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Ghost BC */}
        <div aria-hidden className="hidden lg:block" style={{
          position: 'absolute', right: 'clamp(24px, 4vw, 56px)', top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(150px, 23vw, 320px)',
          fontWeight: 800, letterSpacing: '-0.05em',
          color: 'var(--na-text)', opacity: 0.028,
          lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
        }}>
          BC
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 720 }}>
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}
            style={{ marginBottom: 'clamp(24px, 3vw, 40px)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 'clamp(24px, 3vw, 36px)' }}>
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--na-accent)', opacity: 0.7 }}>V</span>
              <div style={{ width: 24, height: 1, background: 'var(--na-accent)', opacity: 0.4 }} />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--na-accent)' }}>The Territory</span>
            </div>

            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 72px)',
              fontWeight: 800, letterSpacing: '-0.04em',
              lineHeight: 0.92, color: 'var(--na-text)',
              marginBottom: 'clamp(20px, 2.5vw, 32px)',
            }}>
              Local roots.{' '}
              <em style={{ fontWeight: 300, fontStyle: 'italic', color: 'var(--na-heading)' }}>
                Canada&#8209;wide reach.
              </em>
            </h2>

            <p style={{
              fontSize: 'clamp(14px, 1.3vw, 16px)',
              color: 'var(--na-muted)', lineHeight: 1.88,
              marginBottom: 'clamp(32px, 4vw, 48px)', maxWidth: 520,
            }}>
              Based in BC — same timezone, same community. Metro Vancouver clients know us personally.
              Vancouver to Halifax, every project gets the same focused senior-level attention.
            </p>
          </motion.div>

          <motion.div
            initial="hidden" whileInView="visible" viewport={viewport} variants={stagger(0.04)}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}
          >
            {cities.map((city) => (
              <motion.span
                key={city}
                variants={fadeUp}
                style={{
                  display: 'inline-block',
                  fontSize: 11, fontWeight: 600,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--na-accent)',
                  background: 'var(--na-accent-dim)',
                  padding: '8px 16px', borderRadius: 100,
                  border: '1px solid rgba(var(--na-accent-rgb), 0.18)',
                }}
              >
                {city}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          FINALE — CTA
      ════════════════════════════════════════════════ */}
      <section
        data-cursor-dark
        style={{
          background: 'var(--na-inv-bg)',
          padding: 'clamp(100px, 14vw, 168px) clamp(24px, 4vw, 56px)',
          textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}
      >
        {/* Diagonal lines */}
        <svg aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.05 }}>
          <line x1="0" y1="100%" x2="100%" y2="0" stroke="#fff" strokeWidth="1" />
          <line x1="0" y1="70%" x2="70%" y2="0" stroke="#fff" strokeWidth="1" />
          <line x1="30%" y1="100%" x2="100%" y2="30%" stroke="#fff" strokeWidth="1" />
        </svg>
        {/* Ghost N */}
        <div aria-hidden className="hidden sm:block" style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(200px, 42vw, 500px)', fontWeight: 800,
          color: '#fff', opacity: 0.016, lineHeight: 1,
          letterSpacing: '-0.06em', userSelect: 'none', pointerEvents: 'none',
        }}>
          N
        </div>

        <div style={{ position: 'relative' }}>
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp}
          >
            <span style={{
              display: 'block', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--na-inv-muted)', marginBottom: 28, opacity: 0.6,
            }}>
              The Next Step
            </span>
            <h2 style={{
              fontSize: 'clamp(48px, 10vw, 128px)',
              fontWeight: 800, letterSpacing: '-0.04em',
              color: 'var(--na-inv-text)', lineHeight: 0.9,
              marginBottom: 36,
            }}>
              LET'S BUILD
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(232,232,240,0.38)' }}>
                something real.
              </em>
            </h2>
            <p style={{
              fontSize: 'clamp(14px, 1.4vw, 17px)',
              color: 'var(--na-inv-muted)',
              maxWidth: 440, margin: '0 auto 52px',
              lineHeight: 1.82, fontWeight: 300,
            }}>
              Ready to get your business online with a site that actually works?
              Tell us what you need — we'll respond within one business day.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-primary">
                Start a Project
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/services" className="btn-ghost">View Services</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
