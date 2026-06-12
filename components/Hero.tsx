'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const meta = [
  { label: 'Location', value: 'BC, Canada' },
  { label: 'Est.',     value: '2026' },
  { label: 'Specialty', value: 'Web & Systems' },
]

const line1 = ['We', 'build']
const line2 = ['digital', 'that', 'works.']

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
        <span
          key={i}
          style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
        >
          <motion.span
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ delay: baseDelay + i * 0.07, duration: 0.55, ease }}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && (
            <span style={{ display: 'inline-block', width: '0.28em' }} />
          )}
        </span>
      ))}
    </span>
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
              Custom websites starting at $399. No templates, no page builders — hand-coded for your business, built to rank and convert.
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
