'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeLeft, fadeUp, stagger, viewport } from '@/lib/animations'

const reasons = [
  {
    num: '01',
    title: 'Precision Built',
    desc: 'No templates. No page builders. Every site is hand-coded for your business specifically — it shows in the speed, the quality, and the results.',
  },
  {
    num: '02',
    title: 'Local Focused',
    desc: 'Based in BC, Canada. We know the Lower Mainland market and the businesses that make it work. Your clients are our neighbours.',
  },
  {
    num: '03',
    title: 'Nothing Hidden',
    desc: "Clear pricing. Clear timelines. Clear communication. You always know what you're getting, what it costs, and when it arrives.",
  },
]

function ReasonRow({ reason }: { reason: typeof reasons[0] }) {
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
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase' as const,
          color: 'var(--na-accent)',
          paddingTop: 3,
        }}
      >
        {reason.num}
      </span>
      <div
        style={{
          fontSize: 'clamp(16px, 2vw, 22px)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--na-text)',
        }}
      >
        {reason.title}
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
        {reason.desc}
      </p>
    </motion.div>
  )
}

export default function Why() {
  return (
    <section
      id="why"
      style={{
        padding: 'clamp(80px, 10vw, 100px) clamp(24px, 4vw, 48px)',
        background: 'var(--na-bg)',
        borderTop: '1px solid var(--na-border-mid)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dot grid */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, var(--na-text) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          opacity: 0.035,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'grid',
          alignItems: 'start',
          position: 'relative',
        }}
        className="grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-20"
      >
        {/* Left — headline + character */}
        <div style={{ position: 'relative' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeLeft}
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase' as const,
              color: 'var(--na-accent)',
              marginBottom: 8,
            }}
          >
            The Standard
          </motion.div>

          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeLeft}
            style={{
              fontSize: 'clamp(64px, 10vw, 120px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              marginTop: 24,
              color: 'var(--na-text)',
              position: 'relative',
              zIndex: 1,
            }}
          >
            WHY
            <br />
            <em
              style={{
                fontStyle: 'italic',
                fontWeight: 300,
                color: 'var(--na-heading)',
              }}
            >
              NODEAXIS?
            </em>
          </motion.h2>

          {/* Inline SVG character — person with checkmark */}
          <svg
            aria-hidden="true"
            className="hidden md:block"
            viewBox="0 0 200 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              position: 'absolute',
              left: 'clamp(24px, 5vw, 80px)',
              bottom: 0,
              width: 'clamp(120px, 18vw, 200px)',
              zIndex: 0,
              color: 'var(--na-text)',
              opacity: 0.12,
              pointerEvents: 'none',
            }}
          >
            {/* Floating star sparkle top-right */}
            <path
              d="M168 28 L171 20 L174 28 L182 31 L174 34 L171 42 L168 34 L160 31 Z"
              stroke="currentColor"
              strokeWidth="1.3"
              fill="none"
            />
            {/* Small checkmark box top-left */}
            <rect x="14" y="22" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.4" />
            <path
              d="M18.5 31 L22.5 36 L30.5 25"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Ambient dot */}
            <circle cx="186" cy="68" r="2.5" fill="currentColor" />
            <circle cx="10" cy="80" r="2" fill="currentColor" />

            {/* ── PERSON BODY ── */}
            {/* Head */}
            <circle cx="82" cy="64" r="24" stroke="currentColor" strokeWidth="1.5" />
            {/* Hair arc */}
            <path
              d="M58 58 C58 35 106 35 106 58"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
            {/* Eyes */}
            <circle cx="74" cy="64" r="3" fill="currentColor" />
            <circle cx="90" cy="64" r="3" fill="currentColor" />
            <circle cx="75" cy="63" r="1" fill="white" />
            <circle cx="91" cy="63" r="1" fill="white" />
            {/* Smile */}
            <path
              d="M74 76 C78 82 86 82 90 76"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              fill="none"
            />
            {/* Neck */}
            <path d="M76 88 L76 102 M88 88 L88 102" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            {/* Collar */}
            <path d="M76 102 L68 114 M88 102 L96 114" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            {/* Torso */}
            <path
              d="M46 116 L46 190 L118 190 L118 116 C118 106 106 101 82 101 C58 101 46 106 46 116 Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Left arm — raised, extended forward */}
            <path
              d="M46 130 C32 118 18 112 8 116"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            {/* Hand/fist at end of left arm */}
            <circle cx="8" cy="118" r="5" stroke="currentColor" strokeWidth="1.3" />
            {/* Thumb up */}
            <path
              d="M4 113 C2 108 6 104 10 107 L14 104 C14 100 18 100 18 104 L18 114 C18 118 14 120 10 120"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              fill="none"
            />

            {/* Right arm — at side */}
            <path
              d="M118 134 C130 140 138 152 136 166"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Legs */}
            <path d="M62 190 L58 255" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M102 190 L106 255" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            {/* Feet */}
            <path d="M52 255 L68 255" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M100 255 L116 255" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

            {/* Large checkmark to the right of the person */}
            <path
              d="M126 130 L148 158 L192 110"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Circle around checkmark */}
            <circle cx="159" cy="134" r="34" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </div>

        {/* Right — 3 reasons */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger(0.1)}
          style={{ paddingTop: 'clamp(0px, 5vw, 64px)' }}
        >
          {reasons.map((r) => (
            <ReasonRow key={r.num} reason={r} />
          ))}
          {/* Closing border */}
          <div style={{ borderTop: '1px solid var(--na-border-mid)' }} />
        </motion.div>
      </div>
    </section>
  )
}
