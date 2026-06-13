'use client'
import { CSSProperties, Fragment, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeLeft, fadeUp, stagger, viewport } from '@/lib/animations'
import { useCountUp } from '@/lib/useCountUp'

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

const milestones = [
  { year: '2026', event: 'Founded', desc: 'NodeAxis launches in BC, Canada' },
  { year: '2026', event: 'First Build', desc: 'First custom site delivered on time' },
  { year: 'NOW', event: 'Growing', desc: 'Expanding across Canada' },
]

const _ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

/* ── Word-by-word clip reveal (matches Hero) ─────────────────── */
function WordReveal({ words, baseDelay = 0 }: { words: string[]; baseDelay?: number }) {
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
            <motion.span
              initial={{ y: '110%' }}
              whileInView={{ y: '0%' }}
              viewport={viewport}
              transition={{ delay: baseDelay + i * 0.1, duration: 0.72, ease: _ease }}
              style={{ display: 'inline-block' }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && (
            <span style={{ display: 'inline-block', width: '0.28em' }} />
          )}
        </Fragment>
      ))}
    </>
  )
}

/* ── Stat display components ─────────────────────────────────── */
function WeeksDisplay() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span style={statNumStyle}>~2</span>
      <span style={statLabelStyle}>Weeks avg delivery</span>
    </div>
  )
}

function PriceCountUp() {
  const { count, ref } = useCountUp(399, 1200)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span style={statNumStyle}>
        $<span ref={ref}>{count}</span>
      </span>
      <span style={statLabelStyle}>Starting price</span>
    </div>
  )
}

function PercentCountUp() {
  const { count, ref } = useCountUp(100, 900)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span style={statNumStyle}>
        <span ref={ref}>{count}</span>%
      </span>
      <span style={statLabelStyle}>Custom code</span>
    </div>
  )
}

const statNumStyle: CSSProperties = {
  fontSize: 'clamp(48px, 7vw, 96px)',
  fontWeight: 800,
  letterSpacing: '-0.04em',
  lineHeight: 1,
  color: 'var(--na-text)',
}

const statLabelStyle: CSSProperties = {
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--na-muted)',
  marginTop: 14,
}

/* ── Pillar row (hover state) ────────────────────────────────── */
function PillarRow({ pillar }: { pillar: typeof pillars[0] }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'grid',
        alignItems: 'start',
        gap: 'clamp(16px, 3vw, 40px)',
        padding: 'clamp(24px, 3vw, 40px) clamp(12px, 2vw, 24px)',
        borderTop: '1px solid var(--na-border-mid)',
        background: hovered ? 'var(--na-accent-dim)' : 'transparent',
        transition: 'background 0.22s ease',
        cursor: 'default',
      }}
      className="grid-cols-[40px_1fr] md:grid-cols-[56px_200px_1fr]"
    >
      <span style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase' as const,
        color: 'var(--na-accent)',
        paddingTop: 3,
      }}>
        {pillar.num}
      </span>
      <div style={{
        fontSize: 'clamp(16px, 2vw, 22px)',
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: 'var(--na-text)',
      }}>
        {pillar.title}
      </div>
      <p
        className="hidden md:block"
        style={{
          fontSize: 14,
          lineHeight: 1.75,
          color: 'var(--na-muted)',
          maxWidth: 480,
        }}
      >
        {pillar.body}
      </p>
    </motion.div>
  )
}

/* ── Line-art character illustration (inline SVG) ────────────── */
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
      {/* ── FLOATING ELEMENTS ── */}
      {/* Checkbox top-left */}
      <rect x="18" y="36" width="21" height="21" rx="3" stroke="currentColor" strokeWidth="1.5" opacity="0.6"/>
      <path d="M23 47 L28 53 L37 41" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>

      {/* Trend graph top-right */}
      <path d="M244 52 L260 38 L276 56 L296 28 L318 42" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.55"/>
      <circle cx="244" cy="52" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="260" cy="38" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="276" cy="56" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="296" cy="28" r="3" fill="currentColor" opacity="0.5"/>
      <circle cx="318" cy="42" r="3" fill="currentColor" opacity="0.5"/>
      <path d="M238 65 L326 65" stroke="currentColor" strokeWidth="0.7" opacity="0.18"/>

      {/* Diamond / sparkle mid-right */}
      <path d="M340 122 L344 112 L348 122 L358 126 L348 130 L344 140 L340 130 L330 126 Z"
            stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.4"/>

      {/* Scattered ambient dots */}
      <circle cx="7"   cy="98"  r="3"   fill="currentColor" opacity="0.22"/>
      <circle cx="234" cy="96"  r="2"   fill="currentColor" opacity="0.18"/>
      <circle cx="354" cy="70"  r="2.5" fill="currentColor" opacity="0.22"/>
      <circle cx="182" cy="18"  r="1.5" fill="currentColor" opacity="0.18"/>

      {/* ── PERSON 1 — left, holding clipboard ── */}
      <circle cx="91" cy="74" r="25" stroke="currentColor" strokeWidth="1.5"/>
      {/* hair arc */}
      <path d="M66 68 C66 43 116 43 116 68" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* eyes */}
      <circle cx="82"  cy="74" r="3.5" fill="currentColor" opacity="0.85"/>
      <circle cx="100" cy="74" r="3.5" fill="currentColor" opacity="0.85"/>
      <circle cx="83.5" cy="72.5" r="1" fill="white" opacity="0.55"/>
      <circle cx="101.5" cy="72.5" r="1" fill="white" opacity="0.55"/>
      {/* smile */}
      <path d="M83 87 C87 93 95 93 99 87" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      {/* neck */}
      <path d="M85 99 L85 115 M97 99 L97 115" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* collar */}
      <path d="M85 115 L77 128 M97 115 L105 128" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      {/* torso */}
      <path d="M54 130 L54 196 L128 196 L128 130 C128 119 115 114 91 114 C67 114 54 119 54 130 Z"
            stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      {/* left arm + clipboard */}
      <path d="M54 144 C41 152 29 162 25 177" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <rect x="9" y="170" width="32" height="45" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M22 164 L22 178" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <rect x="17" y="160" width="11" height="8" rx="2" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M15 184 L35 184 M15 191 L35 191 M15 198 L27 198" stroke="currentColor" strokeWidth="0.9" opacity="0.5"/>
      {/* right arm gesturing */}
      <path d="M128 148 C141 151 152 160 156 170" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* legs */}
      <path d="M70 196 L67 255" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M112 196 L115 255" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* feet */}
      <path d="M61 255 L76 255" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M110 255 L126 255" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>

      {/* ── PERSON 2 — right, ponytail, pointing ── */}
      <circle cx="265" cy="70" r="23" stroke="currentColor" strokeWidth="1.5"/>
      {/* hair */}
      <path d="M242 64 C242 41 288 41 288 64" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      {/* ponytail */}
      <path d="M287 60 C302 50 310 62 308 76 C306 86 296 84 290 74"
            stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
      <ellipse cx="290" cy="67" rx="5" ry="4" stroke="currentColor" strokeWidth="1.2"/>
      {/* eyes */}
      <circle cx="257" cy="70" r="3.2" fill="currentColor" opacity="0.85"/>
      <path d="M271 67 C275 65 279 67" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M272 70 C275 72 279 70" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.45"/>
      {/* smile */}
      <path d="M257 82 C261 88 272 88 276 82" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
      {/* freckles */}
      <circle cx="272" cy="77" r="1.5" fill="currentColor" opacity="0.4"/>
      <circle cx="257" cy="77" r="1.5" fill="currentColor" opacity="0.4"/>
      {/* neck */}
      <path d="M259 93 L259 108 M271 93 L271 108" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* collar */}
      <path d="M259 108 L251 121 M271 108 L279 121" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      {/* torso */}
      <path d="M228 123 L228 190 L302 190 L302 123 C302 112 290 107 265 107 C240 107 228 112 228 123 Z"
            stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"/>
      {/* right arm — extended toward board */}
      <path d="M302 132 C316 127 328 122 336 118" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* pointing finger */}
      <path d="M334 116 C338 111 344 114 341 119 C339 122 334 120 334 116 Z"
            stroke="currentColor" strokeWidth="1.2" fill="none"/>
      {/* left arm — hip */}
      <path d="M228 137 C216 144 213 158 217 172" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M215 170 C211 174 213 181 220 179" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      {/* legs */}
      <path d="M242 190 L239 255" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M288 190 L291 255" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* feet */}
      <path d="M233 255 L248 255" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M286 255 L302 255" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>

      {/* ── BOARD / PRESENTATION SCREEN ── */}
      {/* stand */}
      <path d="M344 110 L344 230" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M336 230 L352 230" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      {/* board frame */}
      <rect x="316" y="78" width="56" height="72" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      {/* bar chart inside board */}
      <rect x="322" y="118" width="8" height="24" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
      <rect x="334" y="104" width="8" height="38" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.65"/>
      <rect x="346" y="110" width="8" height="32" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.55"/>
      <rect x="358" y="96"  width="8" height="46" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.75"/>
      {/* chart baseline */}
      <path d="M320 142 L370 142" stroke="currentColor" strokeWidth="0.8" opacity="0.25"/>
    </svg>
  )
}

/* ── Main section ────────────────────────────────────────────── */
export default function About() {
  return (
    <section
      id="about"
      style={{
        background: 'var(--na-bg)',
        borderTop: '1px solid var(--na-border-mid)',
        overflow: 'hidden',
      }}
    >

      {/* ═══════════════════════════════════════════════════
          1 — EDITORIAL HERO BANNER
      ════════════════════════════════════════════════════ */}
      <div
        style={{
          position: 'relative',
          padding: 'clamp(80px, 10vw, 128px) clamp(24px, 4vw, 56px) clamp(60px, 8vw, 100px)',
          borderBottom: '1px solid var(--na-border-mid)',
          overflow: 'hidden',
        }}
      >
        {/* Blueprint grid overlay */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(var(--na-border) 1px, transparent 1px), linear-gradient(90deg, var(--na-border) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse 85% 80% at 45% 50%, black 0%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 85% 80% at 45% 50%, black 0%, transparent 80%)',
            pointerEvents: 'none',
          }}
        />

        {/* Accent glow blob */}
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
            zIndex: 0,
          }}
        />

        {/* Section label */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--na-accent)',
            marginBottom: 'clamp(24px, 3.5vw, 48px)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          05 — Who We Are
        </motion.div>

        {/* Massive editorial headline */}
        <h2
          style={{
            fontSize: 'clamp(56px, 12vw, 160px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            margin: 0,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <span style={{ display: 'block', color: 'var(--na-text)' }}>
            <WordReveal words={['SENIOR', 'CRAFT.']} baseDelay={0.05} />
          </span>
          <span
            style={{
              display: 'block',
              fontStyle: 'italic',
              fontWeight: 300,
              color: 'var(--na-heading)',
              marginTop: '0.06em',
            }}
          >
            <WordReveal words={['LOCAL', 'ROOTS.']} baseDelay={0.24} />
          </span>
        </h2>

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
            maxWidth: 440,
            marginTop: 'clamp(32px, 4.5vw, 60px)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          I started NodeAxis after years watching BC businesses pay agency rates for cookie-cutter
          templates.{' '}
          <strong style={{ color: 'var(--na-text)', fontWeight: 600 }}>
            Every project is custom-built from scratch
          </strong>
          {' '}— no themes, no page builders, no shortcuts.
        </motion.p>
      </div>

      {/* ═══════════════════════════════════════════════════
          2 — FOUNDER IDENTITY + CHARACTER
      ════════════════════════════════════════════════════ */}
      <div
        style={{
          padding: 'clamp(60px, 8vw, 104px) clamp(24px, 4vw, 56px)',
          borderBottom: '1px solid var(--na-border-mid)',
        }}
      >
        <div
          style={{
            display: 'grid',
            gap: 'clamp(48px, 6vw, 88px)',
            alignItems: 'center',
          }}
          className="grid-cols-1 md:grid-cols-[1fr_1.15fr]"
        >

          {/* Left: statement + founder card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeLeft}
          >
            {/* Editorial identity statement */}
            <p
              style={{
                fontSize: 'clamp(22px, 3.8vw, 44px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: 'var(--na-text)',
                marginBottom: 'clamp(36px, 4.5vw, 56px)',
              }}
            >
              NODEAXIS IS
              <br />
              <em
                style={{
                  fontStyle: 'italic',
                  fontWeight: 300,
                  color: 'var(--na-accent)',
                }}
              >
                ADAM SAHIL.
              </em>
            </p>

            {/* Founder card */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                padding: 'clamp(20px, 2.5vw, 28px) clamp(20px, 2.5vw, 28px)',
                border: '1px solid var(--na-border-mid)',
                borderRadius: 4,
                background: 'var(--na-surface)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Left accent bar */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 3,
                  height: '100%',
                  background: 'var(--na-accent)',
                  borderRadius: '4px 0 0 4px',
                }}
              />
              {/* Initial avatar */}
              <div
                style={{
                  width: 62,
                  height: 62,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--na-accent) 0%, var(--na-accent) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  fontSize: 26,
                  fontWeight: 800,
                  color: '#FFFFFF',
                  letterSpacing: '-0.02em',
                }}
              >
                A
              </div>
              <div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: 'var(--na-text)',
                    marginBottom: 4,
                  }}
                >
                  Adam Sahil
                </div>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: 'var(--na-muted)',
                  }}
                >
                  Founder & Developer — NodeAxis
                </div>
              </div>
            </div>

            {/* Accent rule + sub-copy */}
            <div
              style={{
                width: 40,
                height: 2,
                background: 'var(--na-accent)',
                margin: 'clamp(28px, 3.5vw, 44px) 0 clamp(16px, 2vw, 22px)',
              }}
            />
            <p
              style={{
                fontSize: 14,
                color: 'var(--na-muted)',
                lineHeight: 1.78,
                maxWidth: 380,
              }}
            >
              A deliberately boutique operation — small roster of clients, handled personally,
              with a starting price that makes senior-level craft actually accessible.
            </p>
          </motion.div>

          {/* Right: SVG character — tilted slightly */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport}
            transition={{ duration: 0.9, ease: _ease, delay: 0.12 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              transform: 'rotate(1.5deg)',
              transformOrigin: 'center 85%',
            }}
          >
            <CharacterIllustration />
          </motion.div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════
          3 — MANIFESTO / PILLARS
      ════════════════════════════════════════════════════ */}
      <div
        style={{
          padding: 'clamp(60px, 8vw, 100px) clamp(24px, 4vw, 56px)',
          borderBottom: '1px solid var(--na-border-mid)',
        }}
      >
        {/* Section label + rule */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 20,
            marginBottom: 'clamp(32px, 4vw, 56px)',
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--na-accent)',
              flexShrink: 0,
            }}
          >
            The Standard
          </span>
          <div style={{ flex: 1, height: 1, background: 'var(--na-border-mid)' }} />
        </motion.div>

        {/* Pillar rows */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger(0.08)}
        >
          {pillars.map((p) => (
            <PillarRow key={p.num} pillar={p} />
          ))}
          {/* Closing border */}
          <div style={{ borderTop: '1px solid var(--na-border-mid)' }} />
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════
          4 — MILESTONE TIMELINE
      ════════════════════════════════════════════════════ */}
      <div
        style={{
          padding: 'clamp(60px, 8vw, 100px) clamp(24px, 4vw, 56px)',
          borderBottom: '1px solid var(--na-border-mid)',
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--na-accent)',
            marginBottom: 'clamp(44px, 5.5vw, 80px)',
          }}
        >
          Our Journey
        </motion.div>

        {/* Timeline grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger(0.13)}
          style={{ display: 'grid', position: 'relative' }}
          className="grid-cols-1 md:grid-cols-3"
        >
          {/* Horizontal connector — desktop */}
          <div
            className="hidden md:block"
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: 'calc(clamp(14px, 2vw, 20px) - 0.5px)',
              left: '10%',
              right: '10%',
              height: 1,
              background: 'var(--na-border-mid)',
            }}
          />

          {milestones.map((m, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                paddingBottom: 'clamp(32px, 4vw, 0px)',
              }}
            >
              {/* Timeline dot */}
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: i === milestones.length - 1 ? 'var(--na-accent)' : 'var(--na-bg)',
                  border: '2px solid var(--na-accent)',
                  marginBottom: 'clamp(20px, 2.8vw, 36px)',
                  position: 'relative',
                  zIndex: 1,
                  flexShrink: 0,
                  boxShadow: i === milestones.length - 1
                    ? '0 0 0 4px var(--na-accent-dim)'
                    : 'none',
                }}
              />
              {/* Year */}
              <div
                style={{
                  fontSize: 'clamp(32px, 4.5vw, 56px)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  color: 'var(--na-accent)',
                  marginBottom: 10,
                }}
              >
                {m.year}
              </div>
              {/* Event */}
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--na-text)',
                  marginBottom: 8,
                }}
              >
                {m.event}
              </div>
              {/* Description */}
              <p
                style={{
                  fontSize: 13,
                  color: 'var(--na-muted)',
                  lineHeight: 1.65,
                  maxWidth: 180,
                }}
              >
                {m.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════════
          5 — STATS ROW — DRAMATIC NUMBERS
      ════════════════════════════════════════════════════ */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger(0.1)}
        style={{ display: 'grid' }}
        className="grid-cols-1 sm:grid-cols-3"
      >
        <motion.div
          variants={fadeUp}
          className="stat-cell"
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: 'clamp(48px, 6vw, 80px) clamp(16px, 2vw, 32px)',
            borderRight: '1px solid var(--na-border-mid)',
            borderBottom: '1px solid var(--na-border-mid)',
          }}
        >
          <WeeksDisplay />
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="stat-cell"
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: 'clamp(48px, 6vw, 80px) clamp(16px, 2vw, 32px)',
            borderRight: '1px solid var(--na-border-mid)',
            borderBottom: '1px solid var(--na-border-mid)',
          }}
        >
          <PriceCountUp />
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="stat-cell"
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: 'clamp(48px, 6vw, 80px) clamp(16px, 2vw, 32px)',
            borderBottom: '1px solid var(--na-border-mid)',
          }}
        >
          <PercentCountUp />
        </motion.div>
      </motion.div>

    </section>
  )
}
