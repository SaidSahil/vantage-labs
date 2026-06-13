'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, viewport } from '@/lib/animations'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const testimonials = [
  {
    quote:
      "We had a basic WordPress site that was embarrassing to hand out. NodeAxis turned it around in under two weeks — it looks like we spent ten times what we paid.",
    name: 'Marcus T.',
    role: 'Owner',
    business: 'Security Services, Metro Vancouver',
  },
  {
    quote:
      "I was skeptical that a $500 build could be serious work. It absolutely was. The site converts — we're getting inquiry calls we weren't getting before.",
    name: 'Priya R.',
    role: 'Owner',
    business: 'Restaurant Owner, Surrey BC',
  },
  {
    quote:
      "What stood out was how little back-and-forth there was. They got what we needed immediately and just built it. No drawn-out process, no surprises on the invoice.",
    name: 'Daniel K.',
    role: 'Owner',
    business: 'Fitness Studio, Burnaby BC',
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<1 | -1>(1)

  function goNext() {
    setDirection(1)
    setCurrentIndex((i) => (i + 1) % testimonials.length)
  }

  function goPrev() {
    setDirection(-1)
    setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  }

  const t = testimonials[currentIndex]

  return (
    <section
      id="testimonials"
      style={{
        background: 'var(--na-bg)',
        padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 56px)',
        borderTop: '1px solid var(--na-border-mid)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Section header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          paddingBottom: 20,
          borderBottom: '1px solid var(--na-border-mid)',
          marginBottom: 'clamp(40px, 5vw, 64px)',
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            color: 'var(--na-text)',
          }}
        >
          Client Voices
        </span>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            color: 'var(--na-muted)',
          }}
        >
          {testimonials.length} Reviews
        </span>
      </motion.div>

      {/* Quote block */}
      <div style={{ position: 'relative', minHeight: 'clamp(220px, 28vw, 320px)' }}>
        {/* Large decorative opening quote */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '-0.15em',
            left: '-0.08em',
            fontSize: 'clamp(120px, 18vw, 200px)',
            fontWeight: 800,
            lineHeight: 1,
            color: 'var(--na-accent)',
            opacity: 0.12,
            pointerEvents: 'none',
            userSelect: 'none',
            fontFamily: 'Georgia, serif',
          }}
        >
          &ldquo;
        </div>

        <AnimatePresence mode="wait" initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            initial={{ opacity: 0, x: direction * 48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -48 }}
            transition={{ duration: 0.42, ease }}
            style={{ position: 'relative', zIndex: 1 }}
          >
            {/* Quote text */}
            <p
              style={{
                fontSize: 'clamp(20px, 2.8vw, 36px)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.5,
                color: 'var(--na-text)',
                paddingLeft: 'clamp(20px, 4vw, 60px)',
                maxWidth: 820,
                marginBottom: 'clamp(28px, 3.5vw, 48px)',
              }}
            >
              {t.quote}
            </p>

            {/* Author row */}
            <div
              style={{
                paddingLeft: 'clamp(20px, 4vw, 60px)',
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(12px, 2vw, 24px)',
                flexWrap: 'wrap' as const,
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  color: 'var(--na-text)',
                }}
              >
                {t.name}
              </span>
              <span
                style={{
                  width: 1,
                  height: 14,
                  background: 'var(--na-border-mid)',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.09em',
                  textTransform: 'uppercase' as const,
                  color: 'var(--na-muted)',
                }}
              >
                {t.role} — {t.business}
              </span>
              {/* 5 star dots */}
              <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: 'var(--na-accent)',
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom row: progress pills + nav buttons */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'clamp(40px, 5vw, 64px)',
          gap: 16,
        }}
      >
        {/* Progress pills */}
        <div style={{ display: 'flex', gap: 8 }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1)
                setCurrentIndex(i)
              }}
              aria-label={`Go to testimonial ${i + 1}`}
              style={{
                height: 4,
                width: i === currentIndex ? 40 : 16,
                borderRadius: 2,
                background: i === currentIndex ? 'var(--na-accent)' : 'var(--na-border-mid)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* Prev / Next buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={goPrev}
            aria-label="Previous testimonial"
            style={{
              width: 44,
              height: 44,
              minWidth: 44,
              minHeight: 44,
              borderRadius: '50%',
              border: '1px solid var(--na-border-mid)',
              background: 'transparent',
              color: 'var(--na-text)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'border-color 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--na-accent)'
              e.currentTarget.style.background = 'var(--na-accent-dim)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--na-border-mid)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            {/* Arrow left SVG */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M10 3 L5 8 L10 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            onClick={goNext}
            aria-label="Next testimonial"
            style={{
              width: 44,
              height: 44,
              minWidth: 44,
              minHeight: 44,
              borderRadius: '50%',
              border: '1px solid var(--na-border-mid)',
              background: 'transparent',
              color: 'var(--na-text)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'border-color 0.2s ease, background 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--na-accent)'
              e.currentTarget.style.background = 'var(--na-accent-dim)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--na-border-mid)'
              e.currentTarget.style.background = 'transparent'
            }}
          >
            {/* Arrow right SVG */}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M6 3 L11 8 L6 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
