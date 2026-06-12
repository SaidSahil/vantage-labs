'use client'
import { motion } from 'framer-motion'
import { fadeUp, viewport } from '@/lib/animations'

const items = [
  'Starting at $399',
  '2-Week Delivery',
  '100% Custom Code',
  'No Templates',
  'BC-Based Team',
  'Hand-Coded',
  'Lighthouse 90+ Performance',
  'Full Source Delivered',
]

function Dot() {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 5,
        height: 5,
        borderRadius: '50%',
        background: 'var(--na-inv-accent)',
        flexShrink: 0,
        display: 'inline-block',
      }}
    />
  )
}

export default function Marquee() {
  const doubled = [...items, ...items]

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={fadeUp}
      role="region"
      aria-label="Services and pricing overview"
      style={{
        overflow: 'hidden',
        background: 'var(--na-inv-bg)',
        padding: '14px 0',
        borderTop: '1px solid var(--na-inv-border)',
        borderBottom: '1px solid var(--na-inv-border)',
      }}
    >
      <div className="ticker-track">
        {doubled.map((item, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              padding: '0 32px',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--na-inv-muted)',
              whiteSpace: 'nowrap',
            }}
          >
            <Dot />
            {item}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
