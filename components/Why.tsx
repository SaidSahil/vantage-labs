'use client'
import { motion } from 'framer-motion'
import { Crosshair, MapPin, Shield } from 'lucide-react'
import { fadeUp, fadeLeft, stagger, viewport } from '@/lib/animations'

const reasons = [
  {
    num: '01',
    icon: Crosshair,
    title: 'Precision Built',
    desc: 'No templates. No page builders. Every site is hand-coded for your business specifically — it shows in the speed, the quality, and the results.',
  },
  {
    num: '02',
    icon: MapPin,
    title: 'Local Focused',
    desc: 'Based in BC, Canada. We know the Lower Mainland market and the businesses that make it work. Your clients are our neighbours.',
  },
  {
    num: '03',
    icon: Shield,
    title: 'Nothing Hidden',
    desc: 'Clear pricing. Clear timelines. Clear communication. You always know what you\'re getting, what it costs, and when it arrives.',
  },
]

export default function Why() {
  return (
    <section
      id="why"
      style={{
        padding: 'clamp(80px, 10vw, 100px) clamp(24px, 4vw, 48px)',
        background: 'var(--na-bg)',
        borderTop: '1px solid var(--na-border-mid)',
        position: 'relative',
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

      <div style={{
        display: 'grid',
        alignItems: 'start',
        position: 'relative',
      }}
      className="grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-20"
      >
        {/* Left — label + big headline */}
        <div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeLeft}
            className="section-label"
            style={{ marginBottom: 8 }}
          >
            The Standard
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeLeft}
            style={{
              fontSize: 'clamp(48px, 6vw, 88px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              marginTop: 32,
              color: 'var(--na-text)',
            }}
          >
            Why<br />
            NodeAxis
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--na-heading)' }}>.</em>
          </motion.h2>
        </div>

        {/* Right — 3 items */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger(0.1)}
          style={{ paddingTop: 'clamp(0px, 5vw, 64px)' }}
        >
          {reasons.map((r) => {
            const Icon = r.icon
            return (
              <motion.div
                key={r.num}
                variants={fadeUp}
                className="why-item"
                style={{
                  padding: '32px 0',
                  borderTop: '1px solid var(--na-border-mid)',
                  display: 'grid',
                  gridTemplateColumns: '40px 1fr',
                  gap: 24,
                  transition: 'background 0.2s ease',
                }}
              >
                <span style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--na-accent)',
                  paddingTop: 4,
                }}>
                  {r.num}
                </span>
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 10,
                  }}>
                    <Icon size={20} strokeWidth={1.5} color="var(--na-accent)" />
                    <h3 style={{
                      fontSize: 22,
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      margin: 0,
                    }}>
                      {r.title}
                    </h3>
                  </div>
                  <p style={{ fontSize: 15, color: 'var(--na-muted)', lineHeight: 1.7 }}>
                    {r.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
