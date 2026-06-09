'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const faqs = [
  {
    q: 'Do I own the website after it\'s built?',
    a: 'Yes — full ownership is transferred on delivery. Your code, your domain, your hosting.',
  },
  {
    q: 'How long does it take?',
    a: 'Most projects ship in 2 weeks from kickoff. Complex builds may take 3–4 weeks.',
  },
  {
    q: 'What if I need changes later?',
    a: 'We offer maintenance packages and one-off updates at a flat rate. No surprises.',
  },
  {
    q: 'Do you use templates or page builders?',
    a: 'Never. Every site is hand-coded from scratch — no WordPress, no Webflow, no Squarespace.',
  },
  {
    q: "What's the minimum budget?",
    a: 'Projects start at $399 for a clean, fast landing page. Most small business sites fall in the $399–$999 range.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section
      style={{
        background: '#141416',
        padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 56px)',
        position: 'relative',
        overflow: 'hidden',
      }}
      data-cursor-dark
    >
      {/* Subtle dot grid */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0.04,
        }}
      >
        <defs>
          <pattern id="faq-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#faq-dots)" />
      </svg>

      <div style={{ position: 'relative', maxWidth: 760, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-72px' }}
          transition={{ duration: 0.55, ease }}
          style={{ marginBottom: 56 }}
        >
          <span
            style={{
              display: 'block',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#3D5A80',
              marginBottom: 16,
            }}
          >
            Common Questions
          </span>
          <h2
            style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: '#FFFFFF',
              margin: 0,
            }}
          >
            Answers before{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'rgba(255,255,255,0.35)' }}>
              you ask.
            </em>
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-72px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
        >
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
                }}
                style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    padding: 'clamp(20px, 2.5vw, 28px) 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 20,
                  }}
                >
                  <span
                    style={{
                      fontSize: 'clamp(15px, 1.5vw, 18px)',
                      fontWeight: 600,
                      letterSpacing: '-0.01em',
                      color: isOpen ? '#FFFFFF' : 'rgba(255,255,255,0.72)',
                      lineHeight: 1.4,
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {faq.q}
                  </span>

                  {/* +/- toggle */}
                  <span
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      border: `1px solid ${isOpen ? '#3D5A80' : 'rgba(255,255,255,0.12)'}`,
                      background: isOpen ? 'rgba(61,90,128,0.2)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: isOpen ? '#5A7FAD' : 'rgba(255,255,255,0.4)',
                      fontSize: 20,
                      lineHeight: 1,
                      fontWeight: 300,
                      transition: 'background 0.25s ease, border-color 0.25s ease, color 0.25s ease',
                    }}
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease }}
                      style={{ overflow: 'hidden' }}
                    >
                      <p
                        style={{
                          fontSize: 'clamp(14px, 1.3vw, 16px)',
                          color: 'rgba(255,255,255,0.48)',
                          lineHeight: 1.75,
                          paddingBottom: 'clamp(20px, 2.5vw, 28px)',
                          margin: 0,
                          maxWidth: 600,
                        }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}

          {/* Bottom border */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }} />
        </motion.div>
      </div>
    </section>
  )
}
