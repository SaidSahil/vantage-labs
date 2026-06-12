'use client'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from '@/lib/animations'

const testimonials = [
  {
    quote: "We had a basic WordPress site that was embarrassing to hand out. NodeAxis turned it around in under two weeks — it looks like we spent ten times what we paid.",
    name: 'Marcus T.',
    business: 'Security Services, Metro Vancouver',
  },
  {
    quote: "I was skeptical that a $500 build could be serious work. It absolutely was. The site converts — we're getting inquiry calls we weren't getting before.",
    name: 'Priya R.',
    business: 'Restaurant Owner, Surrey BC',
  },
  {
    quote: "What stood out was how little back-and-forth there was. They got what we needed immediately and just built it. No drawn-out process, no surprises on the invoice.",
    name: 'Daniel K.',
    business: 'Fitness Studio, Burnaby BC',
  },
]

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{
        background: 'var(--na-bg)',
        padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 56px)',
        borderTop: '1px solid var(--na-border-mid)',
      }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          paddingBottom: 24,
          borderBottom: '1px solid var(--na-border-mid)',
          marginBottom: 'clamp(40px, 5vw, 64px)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--na-text)' }}>Client Voices</span>
        </div>
        <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--na-muted)' }}>
          {testimonials.length} Reviews
        </span>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger(0.12)}
        style={{ display: 'grid', gap: 0 }}
        className="grid-cols-1 md:grid-cols-3"
      >
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            variants={fadeUp}
            className="testimonial-card"
            style={{
              padding: i === 0
                ? 'clamp(28px, 3vw, 40px) clamp(28px, 3vw, 48px) clamp(28px, 3vw, 40px) 0'
                : i === 1
                ? 'clamp(28px, 3vw, 40px) clamp(28px, 3vw, 48px)'
                : 'clamp(28px, 3vw, 40px) 0 clamp(28px, 3vw, 40px) clamp(28px, 3vw, 48px)',
              borderRight: i < 2 ? '1px solid var(--na-border-mid)' : 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
            }}
          >
            <svg width="24" height="18" viewBox="0 0 24 18" fill="none" aria-hidden="true">
              <path d="M0 18V10.8C0 7.2 1.2 4.2 3.6 1.8L5.4 0l1.8 1.2C5.4 2.8 4.4 4.8 4.2 7.2H7.2V18H0zm13.2 0V10.8c0-3.6 1.2-6.6 3.6-9L18.6 0l1.8 1.2c-1.8 1.6-2.8 3.6-3 6H20.4V18h-7.2z" fill="var(--na-accent)" opacity="0.2" />
            </svg>

            <p style={{
              fontSize: 'clamp(14px, 1.3vw, 16px)',
              lineHeight: 1.75,
              color: 'var(--na-text)',
              fontWeight: 400,
              flex: 1,
            }}>
              &ldquo;{t.quote}&rdquo;
            </p>

            <div style={{ borderTop: '1px solid var(--na-border-mid)', paddingTop: 20 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--na-text)', letterSpacing: '-0.01em', marginBottom: 4 }}>
                {t.name}
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--na-muted)' }}>
                {t.business}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
