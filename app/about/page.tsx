'use client'
import { CSSProperties, Fragment } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { fadeLeft, fadeUp, stagger, viewport } from '@/lib/animations'
import { useCountUp } from '@/lib/useCountUp'

const _ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const pillars = [
  {
    num: '01',
    title: 'Senior-level craft',
    body: 'Not juniors learning on your budget — 20+ years of combined experience from day one.',
  },
  {
    num: '02',
    title: 'Lower Mainland first',
    body: 'Based in BC. Same timezone, same community — Metro Vancouver knows us personally.',
  },
  {
    num: '03',
    title: 'Canada-wide reach',
    body: 'Coast to coast, every client gets the same focused senior-level attention.',
  },
]

const services = [
  { num: '01', title: 'Custom Web Design', desc: 'Hand-coded, mobile-first sites that reflect your brand and load fast.' },
  { num: '02', title: 'Landing Pages', desc: 'High-converting single pages built for paid traffic, campaigns, or local SEO.' },
  { num: '03', title: 'Small Business Sites', desc: 'Multi-page sites for local service businesses — contractors, clinics, and more.' },
  { num: '04', title: 'SEO-Optimized Builds', desc: 'Semantic HTML, clean URLs, structured data and meta baked in from day one.' },
]

const cities = [
  'Vancouver', 'Surrey', 'Burnaby', 'Richmond', 'Kelowna',
  'Victoria', 'Langley', 'Abbotsford', 'Coquitlam', 'Kamloops',
  'Nanaimo', '+ All of BC',
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

/* ── Word-by-word fade-up reveal ──────────────────────────────── */
function WordReveal({ words, baseDelay = 0, style }: { words: string[]; baseDelay?: number; style?: CSSProperties }) {
  return (
    <span style={{ display: 'block', ...style }}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <motion.span
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: baseDelay + i * 0.1, duration: 0.72, ease: _ease }}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span style={{ display: 'inline-block', width: '0.28em' }} />}
        </Fragment>
      ))}
    </span>
  )
}

/* ── Stat count-up components ─────────────────────────────────── */
function PriceCountUp() {
  const { count, ref } = useCountUp(399, 1200)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span style={statNum}>$<span ref={ref}>{count}</span></span>
      <span style={statLabel}>Starting price</span>
    </div>
  )
}
function PercentCountUp() {
  const { count, ref } = useCountUp(100, 900)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span style={statNum}><span ref={ref}>{count}</span>%</span>
      <span style={statLabel}>Custom code</span>
    </div>
  )
}

const statNum: CSSProperties = {
  fontSize: 'clamp(44px, 6.5vw, 88px)',
  fontWeight: 800,
  letterSpacing: '-0.04em',
  lineHeight: 1,
  color: 'var(--na-text)',
}
const statLabel: CSSProperties = {
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--na-muted)',
  marginTop: 12,
}

/* ── Inline SVG character illustration ───────────────────────── */
function CharacterIllustration() {
  return (
    <svg
      width="100%"
      viewBox="0 0 360 280"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ color: 'var(--na-text)', maxWidth: 400 }}
      aria-hidden="true"
    >
      {/* Floating: checkbox */}
      <rect x="18" y="36" width="21" height="21" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
      <path d="M23 47 L28 53 L37 41" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
      {/* Floating: trend graph */}
      <path d="M244 52 L260 38 L276 56 L296 28 L318 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.55"/>
      <circle cx="244" cy="52" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="260" cy="38" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="276" cy="56" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="296" cy="28" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="318" cy="42" r="3" fill="currentColor" opacity="0.5"/>
      <path d="M238 65 L326 65" stroke="currentColor" strokeWidth="0.7" opacity="0.18"/>
      {/* Floating: diamond */}
      <path d="M340 122 L344 112 L348 122 L358 126 L348 130 L344 140 L340 130 L330 126 Z" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4"/>
      {/* Ambient dots */}
      <circle cx="7" cy="98" r="3" fill="currentColor" opacity="0.22"/>
      <circle cx="234" cy="96" r="2" fill="currentColor" opacity="0.18"/>
      <circle cx="354" cy="70" r="2.5" fill="currentColor" opacity="0.22"/>
      {/* Person 1 */}
      <circle cx="91" cy="74" r="25" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M66 68 C66 43 116 43 116 68" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <circle cx="82" cy="74" r="3.5" fill="currentColor" opacity="0.85"/>
      <circle cx="100" cy="74" r="3.5" fill="currentColor" opacity="0.85"/>
      <circle cx="83.5" cy="72.5" r="1" fill="white" opacity="0.55"/>
      <circle cx="101.5" cy="72.5" r="1" fill="white" opacity="0.55"/>
      <path d="M83 87 C87 93 95 93 99 87" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      <path d="M85 99 L85 115 M97 99 L97 115" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M85 115 L77 128 M97 115 L105 128" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M54 130 L54 196 L128 196 L128 130 C128 119 115 114 91 114 C67 114 54 119 54 130 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      <path d="M54 144 C41 152 29 162 25 177" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="9" y="170" width="32" height="45" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M22 164 L22 178" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <rect x="17" y="160" width="11" height="8" rx="2" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M15 184 L35 184 M15 191 L35 191 M15 198 L27 198" stroke="currentColor" strokeWidth="0.9" opacity="0.5"/>
      <path d="M128 148 C141 151 152 160 156 170" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M70 196 L67 255" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M112 196 L115 255" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M61 255 L76 255" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M110 255 L126 255" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Person 2 */}
      <circle cx="265" cy="70" r="23" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M242 64 C242 41 288 41 288 64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <path d="M287 60 C302 50 310 62 308 76 C306 86 296 84 290 74" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <ellipse cx="290" cy="67" rx="5" ry="4" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="257" cy="70" r="3.2" fill="currentColor" opacity="0.85"/>
      <path d="M271 67 C275 65 279 67" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M257 82 C261 88 272 88 276 82" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      <circle cx="272" cy="77" r="1.5" fill="currentColor" opacity="0.4"/>
      <circle cx="257" cy="77" r="1.5" fill="currentColor" opacity="0.4"/>
      <path d="M259 93 L259 108 M271 93 L271 108" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M259 108 L251 121 M271 108 L279 121" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M228 123 L228 190 L302 190 L302 123 C302 112 290 107 265 107 C240 107 228 112 228 123 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      <path d="M302 132 C316 127 328 122 336 118" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M334 116 C338 111 344 114 341 119 C339 122 334 120 334 116 Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
      <path d="M228 137 C216 144 213 158 217 172" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M242 190 L239 255" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M288 190 L291 255" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M233 255 L248 255" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M286 255 L302 255" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* Board */}
      <path d="M344 110 L344 230" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M336 230 L352 230" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="316" y="78" width="56" height="72" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="322" y="118" width="8" height="24" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      <rect x="334" y="104" width="8" height="38" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.65"/>
      <rect x="346" y="110" width="8" height="32" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.55"/>
      <rect x="358" y="96"  width="8" height="46" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.75"/>
      <path d="M320 142 L370 142" stroke="currentColor" strokeWidth="0.8" opacity="0.25"/>
    </svg>
  )
}

export default function AboutPage() {
  return (
    <main style={{ background: 'var(--na-bg)', minHeight: '100vh' }}>
      <Navbar />

      {/* ═══════════════════════════════════════════
          1 — EDITORIAL HERO
      ════════════════════════════════════════════ */}
      <section
        style={{
          position: 'relative',
          padding: 'clamp(120px, 15vw, 180px) clamp(24px, 4vw, 56px) clamp(72px, 9vw, 112px)',
          borderBottom: '1px solid var(--na-border-mid)',
          overflow: 'hidden',
        }}
      >
        {/* Blueprint grid */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(var(--na-border) 1px, transparent 1px), linear-gradient(90deg, var(--na-border) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse 90% 80% at 45% 50%, black 0%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 45% 50%, black 0%, transparent 80%)',
            pointerEvents: 'none',
          }}
        />
        {/* Accent glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '10%',
            left: '20%',
            width: 'clamp(280px, 45vw, 650px)',
            height: 'clamp(180px, 28vw, 420px)',
            background: 'radial-gradient(ellipse, var(--na-accent-dim) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Breadcrumb */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          style={{ marginBottom: 'clamp(24px, 3vw, 40px)', position: 'relative', zIndex: 1 }}
        >
          <Link
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--na-muted)',
              marginBottom: 16,
            }}
          >
            ← Home
          </Link>
          <div style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--na-accent)',
          }}>
            Who We Are
          </div>
        </motion.div>

        {/* Massive headline */}
        <h1
          style={{
            fontSize: 'clamp(52px, 11vw, 150px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            margin: 0,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <WordReveal words={['SENIOR', 'CRAFT.']} baseDelay={0.05} style={{ color: 'var(--na-text)' }} />
          <WordReveal
            words={['LOCAL', 'ROOTS.']}
            baseDelay={0.24}
            style={{
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'var(--na-heading)',
              marginTop: '0.06em',
            }}
          />
        </h1>

        {/* Lead copy */}
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          style={{
            fontSize: 'clamp(14px, 1.3vw, 17px)',
            color: 'var(--na-muted)',
            lineHeight: 1.78,
            maxWidth: 480,
            marginTop: 'clamp(32px, 4.5vw, 60px)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          NodeAxis builds hand-coded, custom websites for small businesses across BC — no templates,
          no page builders, no filler. Just clean, fast sites that actually rank and convert.{' '}
          <strong style={{ color: 'var(--na-text)', fontWeight: 600 }}>Starting at $399.</strong>
        </motion.p>
      </section>

      {/* ═══════════════════════════════════════════
          2 — FOUNDER IDENTITY + CHARACTER
      ════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(72px, 9vw, 112px) clamp(24px, 4vw, 56px)',
          borderBottom: '1px solid var(--na-border-mid)',
        }}
      >
        <div
          style={{ display: 'grid', gap: 'clamp(48px, 6vw, 80px)', alignItems: 'center' }}
          className="grid-cols-1 md:grid-cols-[1fr_1.1fr]"
        >
          {/* Left */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeLeft}
          >
            <p style={{
              fontSize: 'clamp(20px, 3.5vw, 42px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: 'var(--na-text)',
              marginBottom: 'clamp(32px, 4vw, 48px)',
            }}>
              NODEAXIS IS
              <br />
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--na-accent)' }}>
                ADAM SAHIL.
              </em>
            </p>

            {/* Founder card */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              padding: 'clamp(20px, 2.5vw, 28px)',
              border: '1px solid var(--na-border-mid)',
              borderRadius: 4,
              background: 'var(--na-surface)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0,
                width: 3, height: '100%',
                background: 'var(--na-accent)',
                borderRadius: '4px 0 0 4px',
              }} />
              <div style={{
                width: 62, height: 62, borderRadius: '50%',
                background: 'var(--na-accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, fontSize: 26, fontWeight: 800, color: '#FFFFFF',
              }}>
                A
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--na-text)', marginBottom: 4 }}>
                  Adam Sahil
                </div>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--na-muted)' }}>
                  Founder & Developer — NodeAxis
                </div>
              </div>
            </div>

            <div style={{ width: 40, height: 2, background: 'var(--na-accent)', margin: 'clamp(28px, 3.5vw, 44px) 0 clamp(14px, 1.8vw, 20px)' }} />
            <p style={{ fontSize: 14, color: 'var(--na-muted)', lineHeight: 1.78, maxWidth: 380 }}>
              A deliberately boutique operation — small roster of clients, handled personally,
              with a starting price that makes senior-level craft actually accessible.
            </p>
          </motion.div>

          {/* Right: character */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.9, ease: _ease, delay: 0.12 }}
            className="hidden md:flex"
            style={{ justifyContent: 'center', transform: 'rotate(1.5deg)', transformOrigin: 'center 85%' }}
          >
            <CharacterIllustration />
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          3 — MANIFESTO PILLARS
      ════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(72px, 9vw, 112px) clamp(24px, 4vw, 56px)',
          borderBottom: '1px solid var(--na-border-mid)',
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 'clamp(32px, 4vw, 56px)' }}
        >
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--na-accent)', flexShrink: 0 }}>
            The Standard
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--na-border-mid)' }} />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          {pillars.map((p) => (
            <motion.div
              key={p.num}
              variants={fadeUp}
              style={{
                display: 'grid',
                gap: 'clamp(16px, 3vw, 40px)',
                padding: 'clamp(24px, 3vw, 40px) clamp(12px, 2vw, 20px)',
                borderTop: '1px solid var(--na-border-mid)',
              }}
              className="grid-cols-[40px_1fr] md:grid-cols-[56px_200px_1fr]"
            >
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--na-accent)', paddingTop: 3 }}>
                {p.num}
              </span>
              <div style={{ fontSize: 'clamp(16px, 2vw, 22px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--na-text)' }}>
                {p.title}
              </div>
              <p className="hidden md:block" style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--na-muted)' }}>
                {p.body}
              </p>
            </motion.div>
          ))}
          <div style={{ borderTop: '1px solid var(--na-border-mid)' }} />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          4 — STATS
      ════════════════════════════════════════════ */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger(0.1)}
        style={{ display: 'grid', borderBottom: '1px solid var(--na-border-mid)' }}
        className="grid-cols-1 sm:grid-cols-3"
      >
        {[
          { content: <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><span style={statNum}>~2</span><span style={statLabel}>Weeks avg delivery</span></div> },
          { content: <PriceCountUp /> },
          { content: <PercentCountUp /> },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            className="stat-cell"
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: 'clamp(48px, 6vw, 80px) clamp(16px, 2vw, 32px)',
              borderRight: i < 2 ? '1px solid var(--na-border-mid)' : 'none',
            }}
          >
            {item.content}
          </motion.div>
        ))}
      </motion.div>

      {/* ═══════════════════════════════════════════
          5 — WHAT WE BUILD
      ════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(72px, 9vw, 112px) clamp(24px, 4vw, 56px)',
          borderBottom: '1px solid var(--na-border-mid)',
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 'clamp(32px, 4vw, 56px)' }}
        >
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--na-accent)', flexShrink: 0 }}>
            Services
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--na-border-mid)' }} />
          <Link href="/services" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
            color: 'var(--na-muted)', flexShrink: 0,
          }}>
            Full Pricing <ArrowRight size={12} />
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger(0.07)}
        >
          {services.map((s) => (
            <motion.div
              key={s.num}
              variants={fadeUp}
              style={{
                display: 'grid',
                gap: 'clamp(16px, 3vw, 40px)',
                padding: 'clamp(24px, 3vw, 40px) clamp(12px, 2vw, 20px)',
                borderTop: '1px solid var(--na-border-mid)',
              }}
              className="grid-cols-[40px_1fr] md:grid-cols-[56px_220px_1fr]"
            >
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--na-accent)', paddingTop: 3 }}>
                {s.num}
              </span>
              <div style={{ fontSize: 'clamp(16px, 2vw, 21px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--na-text)' }}>
                {s.title}
              </div>
              <p className="hidden md:block" style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--na-muted)' }}>
                {s.desc}
              </p>
            </motion.div>
          ))}
          <div style={{ borderTop: '1px solid var(--na-border-mid)' }} />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          6 — WHERE WE WORK
      ════════════════════════════════════════════ */}
      <section
        style={{
          padding: 'clamp(72px, 9vw, 112px) clamp(24px, 4vw, 56px)',
          borderBottom: '1px solid var(--na-border-mid)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ghost "BC" */}
        <div
          aria-hidden="true"
          className="hidden lg:block"
          style={{
            position: 'absolute',
            right: 'clamp(24px, 4vw, 56px)',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 'clamp(120px, 20vw, 260px)',
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
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
          >
            <span style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--na-accent)', marginBottom: 'clamp(24px, 3vw, 40px)' }}>
              Where We Work
            </span>

            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 64px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: 'var(--na-text)',
              marginBottom: 'clamp(20px, 2.5vw, 32px)',
            }}>
              Serving businesses<br />
              <em style={{ fontWeight: 300, fontStyle: 'italic', color: 'var(--na-heading)' }}>across BC.</em>
            </h2>

            <p style={{
              fontSize: 'clamp(14px, 1.3vw, 16px)',
              color: 'var(--na-muted)',
              lineHeight: 1.8,
              marginBottom: 'clamp(28px, 3.5vw, 44px)',
              maxWidth: 520,
            }}>
              Vancouver, Surrey, Burnaby, Richmond, Kelowna, Victoria, and beyond — we work
              remotely with clients throughout BC and Canada.
            </p>
          </motion.div>

          {/* City pills */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger(0.04)}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}
          >
            {cities.map((city) => (
              <motion.span
                key={city}
                variants={fadeUp}
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
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          7 — CTA
      ════════════════════════════════════════════ */}
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
        <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.05 }}>
          <line x1="0" y1="100%" x2="100%" y2="0" stroke="#FFFFFF" strokeWidth="1" />
          <line x1="0" y1="70%" x2="70%" y2="0" stroke="#FFFFFF" strokeWidth="1" />
        </svg>
        {/* Ghost N */}
        <div aria-hidden="true" className="hidden sm:block" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: 'clamp(200px, 40vw, 420px)', fontWeight: 800, color: '#FFFFFF', opacity: 0.018, lineHeight: 1, letterSpacing: '-0.05em', userSelect: 'none', pointerEvents: 'none' }}>
          N
        </div>

        <div style={{ position: 'relative' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
          >
            <span style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--na-inv-muted)', marginBottom: 24 }}>
              Get in Touch
            </span>
            <h2 style={{ fontSize: 'clamp(48px, 10vw, 120px)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--na-inv-text)', lineHeight: 0.92, marginBottom: 28 }}>
              Let's talk.
            </h2>
            <p style={{ fontSize: 'clamp(14px, 1.4vw, 17px)', color: 'var(--na-inv-muted)', maxWidth: 460, margin: '0 auto 48px', lineHeight: 1.75, fontWeight: 300 }}>
              Ready to get your business online? Tell us what you need and we'll get back to you within one business day.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contact" className="btn-primary">
                Start a Project
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link href="/services" className="btn-ghost">View Services</Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </main>
  )
}
