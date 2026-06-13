'use client'
import { Fragment } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const meta = [
  { label: 'Location', value: 'BC, Canada' },
  { label: 'Est.',     value: '2026' },
  { label: 'Specialty', value: 'Web, Apps & Systems' },
]

const line1 = ['Web', 'Design,']
const line2 = ['Apps,', 'Systems.']

function WordReveal({
  words,
  baseDelay,
  style,
}: {
  words: string[]
  baseDelay: number
  style?: React.CSSProperties
}) {
  return (
    <span style={{ display: 'block', ...style }}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
            <motion.span
              initial={{ y: '110%' }}
              animate={{ y: '0%' }}
              transition={{ delay: baseDelay + i * 0.07, duration: 0.55, ease }}
              style={{ display: 'inline-block' }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && (
            <span style={{ display: 'inline-block', width: '0.35em' }} />
          )}
        </Fragment>
      ))}
    </span>
  )
}

function CoderSVG() {
  return (
    <svg
      viewBox="0 0 340 320"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{
        width: 'clamp(260px, 35vw, 420px)',
        height: 'auto',
        color: 'var(--na-text)',
      }}
    >
      {/* Chair back */}
      <rect x="192" y="100" width="22" height="72" rx="3" strokeWidth="1.4" opacity="0.6" />

      {/* Head */}
      <circle cx="220" cy="68" r="26" strokeWidth="1.5" />

      {/* Hair — arc over head */}
      <path
        d="M196 60 C198 38 218 30 238 36 C248 40 248 52 246 60"
        strokeWidth="1.8"
        fill="none"
      />
      <path
        d="M196 60 C194 54 194 48 198 44"
        strokeWidth="1.4"
        fill="none"
      />

      {/* Eyes looking at screen — slightly down */}
      <circle cx="211" cy="70" r="2.5" fill="currentColor" stroke="none" />
      <circle cx="229" cy="70" r="2.5" fill="currentColor" stroke="none" />

      {/* Pupils — directional (looking slightly left/down at screen) */}
      <circle cx="210" cy="71" r="1" fill="var(--na-bg)" stroke="none" />
      <circle cx="228" cy="71" r="1" fill="var(--na-bg)" stroke="none" />

      {/* Neck */}
      <path d="M215 94 L215 108" strokeWidth="1.4" />
      <path d="M225 94 L225 108" strokeWidth="1.4" />

      {/* Torso — hunched forward */}
      <path
        d="M195 108 C190 110 184 120 182 138 C180 152 181 162 183 170 L183 182"
        strokeWidth="1.5"
      />
      <path
        d="M245 108 C250 110 256 120 258 138 C260 152 259 162 257 170 L257 182"
        strokeWidth="1.5"
      />
      {/* Shoulder line */}
      <path d="M195 108 L245 108" strokeWidth="1.5" />
      {/* Mid back line */}
      <path d="M183 145 L257 145" strokeWidth="1.2" opacity="0.5" />

      {/* Left arm extended to keyboard */}
      <path
        d="M195 115 C185 125 175 148 168 172 L155 180"
        strokeWidth="1.5"
      />
      {/* Right arm extended to keyboard */}
      <path
        d="M245 115 C255 125 265 148 272 172 L285 180"
        strokeWidth="1.5"
      />

      {/* Desk surface */}
      <rect x="88" y="180" width="240" height="10" rx="2" strokeWidth="1.5" />

      {/* Desk left leg */}
      <path d="M100 190 L96 260" strokeWidth="1.4" />
      {/* Desk right leg */}
      <path d="M316 190 L320 260" strokeWidth="1.4" />
      {/* Desk cross brace */}
      <path d="M100 240 L316 240" strokeWidth="1" opacity="0.4" />

      {/* Monitor left — large */}
      <rect x="110" y="108" width="80" height="64" rx="3" strokeWidth="1.5" />
      {/* Monitor left screen inner */}
      <rect x="115" y="113" width="70" height="54" rx="2" strokeWidth="1" opacity="0.5" />
      {/* Monitor left stand */}
      <path d="M150 172 L150 180" strokeWidth="1.4" />
      <path d="M138 180 L162 180" strokeWidth="1.4" />

      {/* Monitor right — main */}
      <rect x="210" y="100" width="100" height="72" rx="3" strokeWidth="1.5" />
      {/* Monitor right screen inner */}
      <rect x="216" y="106" width="88" height="60" rx="2" strokeWidth="1" opacity="0.5" />
      {/* Monitor right stand */}
      <path d="M260 172 L260 180" strokeWidth="1.4" />
      <path d="M248 180 L272 180" strokeWidth="1.4" />

      {/* Code on left monitor — horizontal bars at varying widths */}
      <path d="M120 122 L168 122" strokeWidth="1" opacity="0.6" />
      <path d="M120 129 L155 129" strokeWidth="1" opacity="0.5" />
      <path d="M125 136 L162 136" strokeWidth="1" opacity="0.5" />
      <path d="M125 143 L148 143" strokeWidth="1" opacity="0.4" />
      <path d="M120 150 L170 150" strokeWidth="1" opacity="0.6" />
      <path d="M120 157 L158 157" strokeWidth="1" opacity="0.4" />

      {/* Code on right monitor */}
      <path d="M222 116 L290 116" strokeWidth="1" opacity="0.6" />
      <path d="M222 124 L270 124" strokeWidth="1" opacity="0.5" />
      <path d="M228 132 L285 132" strokeWidth="1" opacity="0.5" />
      <path d="M228 140 L258 140" strokeWidth="1" opacity="0.4" />
      <path d="M222 148 L288 148" strokeWidth="1" opacity="0.6" />
      <path d="M222 156 L274 156" strokeWidth="1" opacity="0.4" />

      {/* Keyboard */}
      <rect x="158" y="182" width="104" height="14" rx="2" strokeWidth="1.3" />
      {/* Keyboard key rows */}
      <path d="M164 186 L256 186" strokeWidth="0.8" opacity="0.4" />
      <path d="M164 190 L256 190" strokeWidth="0.8" opacity="0.4" />

      {/* Coffee cup */}
      <rect x="92" y="168" width="16" height="14" rx="2" strokeWidth="1.3" />
      {/* Cup handle */}
      <path d="M108 171 C114 171 114 178 108 178" strokeWidth="1.2" />
      {/* Saucer */}
      <path d="M89 182 L121 182" strokeWidth="1.2" />
      {/* Steam squiggles */}
      <path d="M97 163 C97 159 100 157 100 153" strokeWidth="1" opacity="0.5" />
      <path d="M103 162 C103 158 106 156 106 152" strokeWidth="1" opacity="0.5" />

      {/* Floating code snippet top-left of scene */}
      <g opacity="0.35" transform="translate(88, 50)">
        {/* Code tag lines */}
        <path d="M0 0 L8 4 L0 8" strokeWidth="1.2" fill="none" />
        <path d="M14 0 L6 4 L14 8" strokeWidth="1.2" fill="none" />
        <path d="M18 3 L30 3" strokeWidth="1" />
        <path d="M18 8 L26 8" strokeWidth="1" />
      </g>

      {/* Floating "/> _ </" code hint far left */}
      <g opacity="0.25" transform="translate(90, 78)">
        <path d="M0 0 L10 5 L0 10" strokeWidth="1.1" fill="none" />
        <path d="M14 0 L4 5 L14 10" strokeWidth="1.1" fill="none" />
        <path d="M18 4 L24 4" strokeWidth="1.2" />
      </g>
    </svg>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '0 clamp(24px, 4vw, 48px) 64px',
        position: 'relative',
        overflow: 'hidden',
        borderBottom: '1px solid var(--na-border-mid)',
        background: 'var(--na-bg)',
      }}
    >
      {/* Blueprint grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'linear-gradient(var(--na-border) 1px, transparent 1px), linear-gradient(90deg, var(--na-border) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 60% 40%, black 0%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 60% 40%, black 0%, transparent 80%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Accent glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: 'clamp(200px, 30vw, 450px)',
          height: 'clamp(200px, 30vw, 450px)',
          background: 'radial-gradient(circle, var(--na-accent-dim) 0%, transparent 70%)',
          pointerEvents: 'none',
          borderRadius: '50%',
          zIndex: 0,
        }}
      />

      {/* Decorative top-right axis/crosshair mark */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          right: 'clamp(24px, 5vw, 80px)',
          width: 'clamp(120px, 15vw, 200px)',
          opacity: 0.08,
          pointerEvents: 'none',
        }}
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="100" r="60" stroke="var(--na-accent)" strokeWidth="1"/>
        <circle cx="100" cy="100" r="90" stroke="var(--na-accent)" strokeWidth="0.5"/>
        <line x1="100" y1="0" x2="100" y2="200" stroke="var(--na-accent)" strokeWidth="0.8"/>
        <line x1="0" y1="100" x2="200" y2="100" stroke="var(--na-accent)" strokeWidth="0.8"/>
        <circle cx="100" cy="100" r="6" fill="var(--na-accent)"/>
      </svg>

      {/* Bottom-left faint circle */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: -120,
          left: -120,
          width: 400,
          height: 400,
          opacity: 0.04,
          pointerEvents: 'none',
        }}
        viewBox="0 0 400 400"
        fill="none"
      >
        <circle cx="200" cy="200" r="199" stroke="var(--na-text)" strokeWidth="1.5" />
      </svg>

      {/* Coder character SVG — desktop only, right side, partially clipped */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="hidden lg:block"
        style={{
          position: 'absolute',
          right: 'clamp(-60px, -4vw, -30px)',
          top: '50%',
          transform: 'translateY(-52%)',
          zIndex: 0,
          opacity: 0.7,
          pointerEvents: 'none',
        }}
        aria-hidden="true"
      >
        <CoderSVG />
      </motion.div>

      {/* Meta row — top left */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: 'clamp(90px, 12vh, 130px)',
          left: 'clamp(24px, 4vw, 48px)',
          display: 'flex',
          gap: 48,
          zIndex: 1,
        }}
        className="hidden md:flex"
      >
        {meta.map(item => (
          <div key={item.label} style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--na-muted)',
              marginBottom: 4,
            }}>
              {item.label}
            </span>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--na-text)' }}>
              {item.value}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Vertical descriptor — top right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: 'clamp(90px, 12vh, 130px)',
          right: 'clamp(24px, 4vw, 48px)',
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--na-muted)',
          writingMode: 'vertical-rl',
          zIndex: 1,
        }}
        className="hidden md:block"
      >
        Digital Agency — BC, Canada
      </motion.div>

      {/* Main headline — word-split reveal */}
      <h1
        style={{
          fontSize: 'clamp(52px, 9.5vw, 140px)',
          fontWeight: 800,
          lineHeight: 0.92,
          letterSpacing: '-0.04em',
          marginBottom: 32,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <WordReveal words={line1} baseDelay={0} />
        <WordReveal
          words={line2}
          baseDelay={line1.length * 0.07 + 0.04}
          style={{
            fontStyle: 'italic',
            fontWeight: 300,
            color: 'var(--na-heading)',
          }}
        />
      </h1>

      {/* Bottom row: subtext + scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.6, ease: 'easeOut' }}
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 24,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }} className="sm:max-w-[380px]">
          <div>
            <p style={{ fontSize: 16, color: 'var(--na-muted)', lineHeight: 1.65, marginBottom: 12 }}>
              Custom websites, web apps, dashboards & software from $399. No templates, no shortcuts — hand-coded for your business.
            </p>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--na-accent)',
              background: 'var(--na-accent-dim)',
              border: '1px solid rgba(var(--na-accent-rgb), 0.2)',
              borderRadius: 100,
              padding: '5px 14px',
            }}>
              Starting at $399
            </span>
          </div>
          <Link
            href="/work"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--na-accent)',
            }}
            aria-label="See our work"
          >
            See Our Work
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>

        {/* Scroll cue — desktop */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--na-muted)',
            flexShrink: 0,
          }}
          className="hidden sm:flex"
        >
          <div className="hero-scroll-line" />
          Scroll
        </div>

        {/* Scroll cue — mobile only */}
        <motion.div
          className="flex sm:hidden"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--na-muted)',
          }}
          aria-hidden="true"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 3v10M5 10l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
