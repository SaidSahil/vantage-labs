'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, stagger, viewport } from '@/lib/animations'

// Honest credibility strip — the platforms and partners we actually build on,
// shown in place of client logos. Grouped: core engineering stack + the
// deployment/payments/cloud partners NodeAxis ships production work on.
const groups = [
  {
    label: 'Core Engineering',
    items: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    label: 'Platforms & Partners',
    items: ['Vercel', 'Stripe', 'AWS'],
  },
] as const

function Wordmark({ name }: { name: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: 'clamp(10px, 1.4vw, 16px) clamp(16px, 2vw, 24px)',
        border: '1px solid var(--na-border-mid)',
        borderRadius: 12,
        background: hovered ? 'var(--na-accent-dim)' : 'transparent',
        transition: 'background 0.22s ease, border-color 0.22s ease, transform 0.22s ease',
        borderColor: hovered ? 'var(--na-accent)' : 'var(--na-border-mid)',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        cursor: 'default',
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: hovered ? 'var(--na-accent)' : 'var(--na-muted)',
          transition: 'background 0.22s ease',
          flexShrink: 0,
        }}
      />
      <span
        style={{
          fontSize: 'clamp(15px, 1.8vw, 19px)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: hovered ? 'var(--na-text)' : 'var(--na-muted)',
          transition: 'color 0.22s ease',
          whiteSpace: 'nowrap',
        }}
      >
        {name}
      </span>
    </motion.div>
  )
}

export default function TechStack() {
  return (
    <section
      id="stack"
      style={{
        padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 48px)',
        background: 'var(--na-bg)',
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
          marginBottom: 'clamp(32px, 4vw, 48px)',
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
          The Stack
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
          Production Grade
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h2
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
        style={{
          fontSize: 'clamp(28px, 4.5vw, 56px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          color: 'var(--na-text)',
          maxWidth: 760,
          marginBottom: 14,
        }}
      >
        Built on infrastructure{' '}
        <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--na-heading)' }}>
          you can trust.
        </em>
      </motion.h2>

      <motion.p
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
        style={{
          fontSize: 'clamp(14px, 1.6vw, 17px)',
          lineHeight: 1.7,
          color: 'var(--na-muted)',
          maxWidth: 620,
          marginBottom: 'clamp(40px, 5vw, 64px)',
        }}
      >
        No page builders, no templates. Every project ships on the same modern,
        battle-tested stack the largest products in the world run on — fast,
        secure, and yours to own.
      </motion.p>

      {/* Groups */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(32px, 4vw, 48px)' }}>
        {groups.map((group) => (
          <div key={group.label}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase' as const,
                color: 'var(--na-accent)',
                marginBottom: 18,
              }}
            >
              {group.label}
            </div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger(0.06)}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'clamp(10px, 1.4vw, 16px)',
              }}
            >
              {group.items.map((name) => (
                <Wordmark key={name} name={name} />
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  )
}
