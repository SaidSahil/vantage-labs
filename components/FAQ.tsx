'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const faqs = [
  {
    q: 'Do you work with small businesses across BC?',
    a: 'Yes — we work with small businesses all across British Columbia, including the Lower Mainland, Fraser Valley, Vancouver Island, and the Interior. Everything is handled remotely, so location is never a barrier. If you\'re a BC-based business looking for a professional website, we\'re built for exactly that.',
  },
  {
    q: 'How much does a website cost for a small business in BC?',
    a: 'Our projects start at $399 for a clean, fast landing page. Most small business sites in BC fall in the $399–$999 range depending on the number of pages and features required. We\'ll give you a firm quote upfront — no hourly billing, no surprise invoices.',
  },
  {
    q: 'Do I own the website after it\'s built?',
    a: 'Yes — full ownership is transferred on delivery. You get the source code, you control your own domain and hosting, and you\'re never locked into a platform or monthly fee with us. It\'s your website, period.',
  },
  {
    q: 'How long does it take to build my website?',
    a: 'Most projects ship within 2 weeks from kickoff. More complex builds — multi-page sites, booking systems, or custom dashboards — may take 3–4 weeks. We work in tight sprints and keep you updated throughout so there are no delays.',
  },
  {
    q: 'Do you use templates or page builders like WordPress or Squarespace?',
    a: 'Never. Every site is hand-coded from scratch. No WordPress, no Webflow, no Squarespace, no drag-and-drop builders. This means your site loads faster, ranks better in search, and is built exactly to your business — not constrained by someone else\'s template.',
  },
  {
    q: 'What if I need updates or changes after launch?',
    a: 'We offer a flat-rate maintenance package at $75/month that covers updates, edits, and monitoring. You can also request one-off changes at a fixed cost. Either way, you\'ll always know the price before any work begins — no surprises.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section
      style={{
        background: 'var(--na-inv-bg)',
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
              color: 'var(--na-inv-accent)',
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
              color: 'var(--na-inv-text)',
              margin: 0,
            }}
          >
            Answers before{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--na-inv-muted)' }}>
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
                style={{ borderTop: '1px solid var(--na-inv-border)' }}
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
                      color: isOpen ? 'var(--na-inv-text)' : 'var(--na-inv-muted)',
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
                      border: isOpen ? '1px solid var(--na-inv-accent)' : '1px solid var(--na-inv-border)',
                      background: isOpen ? 'rgba(var(--na-inv-accent-rgb), 0.15)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: isOpen ? 'var(--na-inv-accent)' : 'var(--na-inv-muted)',
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
                          color: 'var(--na-inv-muted)',
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
