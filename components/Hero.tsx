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
            transition={{ delay: baseDelay + i * 0.07, duration: 0.8, ease }}
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
        borderBottom: '1px solid #E2E1DC',
        background: '#FAFAF8',
      }}
    >
      {/* Decorative top-right geometric mark */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '20%',
          right: 'clamp(24px, 5vw, 80px)',
          width: 'clamp(120px, 15vw, 220px)',
          opacity: 0.07,
          transform: 'rotate(15deg)',
          pointerEvents: 'none',
        }}
        viewBox="0 0 200 200"
        fill="none"
      >
        <rect x="20" y="20" width="80" height="120" stroke="#3D5A80" strokeWidth="1.5" />
        <rect x="60" y="60" width="80" height="120" stroke="#3D5A80" strokeWidth="1.5" />
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
        <circle cx="200" cy="200" r="199" stroke="#1C1C1E" strokeWidth="1.5" />
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
              color: '#8A8A8E',
              marginBottom: 4,
            }}>
              {item.label}
            </span>
            <span style={{ fontSize: 13, fontWeight: 500, color: '#1C1C1E' }}>
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
          color: '#8A8A8E',
          writingMode: 'vertical-rl',
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
        }}
      >
        <WordReveal words={line1} baseDelay={0} />
        <WordReveal
          words={line2}
          baseDelay={line1.length * 0.07 + 0.04}
          style={{
            fontStyle: 'italic',
            fontWeight: 300,
            color: '#3D5A80',
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
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 380 }}>
          <div>
            <p style={{ fontSize: 16, color: '#8A8A8E', lineHeight: 1.65, marginBottom: 12 }}>
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
              color: '#3D5A80',
              background: 'rgba(61,90,128,0.08)',
              border: '1px solid rgba(61,90,128,0.18)',
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
              color: '#3D5A80',
            }}
            aria-label="See our work"
          >
            See Our Work
            <ArrowRight size={14} strokeWidth={2} />
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
            color: '#8A8A8E',
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
            color: '#C8C6C0',
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
