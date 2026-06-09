'use client'
import { motion } from 'framer-motion'
import { fadeLeft, fadeRight, fadeUp, stagger, viewport } from '@/lib/animations'

const stats = [
  { value: '~2 weeks', label: 'Avg delivery time' },
  { value: '$399', label: 'Starting price' },
  { value: '100%', label: 'Custom code' },
]

const pillars = [
  {
    title: 'Senior-level craft',
    body: 'Our developers team brings 20+ years of combined experience. Not juniors learning on your budget — seasoned professionals from day one.',
  },
  {
    title: 'Lower Mainland first',
    body: 'Based in BC, we prioritize the Lower Mainland and Metro Vancouver — same timezone, same community, faster turnaround.',
  },
  {
    title: 'Canada-wide reach',
    body: 'We serve businesses coast to coast. Wherever you are in Canada, you get the same focused, senior-level work.',
  },
]

function StatBlock({ value, label }: { value: string; label: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <span style={{
        fontSize: 'clamp(28px, 3.5vw, 42px)',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        lineHeight: 1,
        color: '#1C1C1E',
      }}>
        {value}
      </span>
      <span style={{
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#8A8A8E',
        marginTop: 8,
      }}>
        {label}
      </span>
    </div>
  )
}

export default function About() {
  return (
    <section
      id="about"
      style={{
        background: '#FAFAF8',
        padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 56px)',
        borderTop: '1px solid #E2E1DC',
      }}
    >
      {/* Top row: label + headline */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(32px, 6vw, 80px)',
        alignItems: 'end',
        paddingBottom: 'clamp(48px, 6vw, 80px)',
        borderBottom: '1px solid #E2E1DC',
        marginBottom: 'clamp(48px, 6vw, 80px)',
      }}
      className="grid-cols-1 md:grid-cols-2"
      >
        {/* Left */}
        <div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeLeft}
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#3D5A80',
              marginBottom: 28,
            }}
          >
            05 — Who We Are
          </motion.div>

          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: '105%' }}
              whileInView={{ y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: '#1C1C1E',
              }}
            >
              Senior talent.<br />
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#3D5A80' }}>
                Local roots.
              </em>
            </motion.h2>
          </div>
        </div>

        {/* Right: identity + lead copy */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeRight}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <div style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #3D5A80 0%, #5C7FA8 100%)',
              border: '2px solid #E2E1DC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: 18,
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
            }}>
              A
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#1C1C1E', letterSpacing: '-0.01em' }}>
                Adam Sahil
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8A8A8E', marginTop: 3 }}>
                Founder, Vantage Labs
              </div>
            </div>
          </div>
          <p style={{
            fontSize: 'clamp(15px, 1.4vw, 18px)',
            lineHeight: 1.75,
            color: '#8A8A8E',
            maxWidth: 480,
          }}>
            I started Vantage Labs after years of watching local BC businesses pay agency-tier rates for cookie-cutter templates that never quite fit.{' '}
            <strong style={{ color: '#1C1C1E', fontWeight: 600 }}>
              Every project here is custom-built from scratch
            </strong>{' '}
            — no themes, no page builders, no shortcuts.{' '}
            Our work is deliberately boutique: a small roster of clients, handled personally, with a starting price that makes senior-level craft{' '}
            <strong style={{ color: '#1C1C1E', fontWeight: 600 }}>
              actually accessible.
            </strong>
          </p>
        </motion.div>
      </div>

      {/* Pillars */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger(0.1)}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 0,
          marginBottom: 'clamp(48px, 6vw, 80px)',
        }}
        className="grid-cols-1 md:grid-cols-3"
      >
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            variants={fadeUp}
            style={{
              padding: i === 0
                ? 'clamp(28px, 3vw, 40px) clamp(28px, 3vw, 48px) clamp(28px, 3vw, 40px) 0'
                : i === 1
                ? 'clamp(28px, 3vw, 40px) clamp(28px, 3vw, 48px)'
                : 'clamp(28px, 3vw, 40px) 0 clamp(28px, 3vw, 40px) clamp(28px, 3vw, 48px)',
              borderRight: i < 2 ? '1px solid #E2E1DC' : 'none',
            }}
          >
            <div style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#3D5A80',
              marginBottom: 20,
            }} />
            <div style={{
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: '-0.01em',
              color: '#1C1C1E',
              marginBottom: 12,
            }}>
              {p.title}
            </div>
            <p style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: '#8A8A8E',
            }}>
              {p.body}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger(0.08)}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          borderTop: '1px solid #E2E1DC',
          paddingTop: 'clamp(32px, 4vw, 48px)',
        }}
        className="grid-cols-3"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={fadeUp}
            style={{
              padding: i === 0 ? '0 24px 0 0' : i === 1 ? '0 24px' : '0 0 0 24px',
              borderRight: i < 2 ? '1px solid #E2E1DC' : 'none',
            }}
          >
            <StatBlock value={stat.value} label={stat.label} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
