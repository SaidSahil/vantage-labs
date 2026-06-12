'use client'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { fadeUp, viewport } from '@/lib/animations'

export default function CTA() {
  return (
    <section
      id="cta"
      data-cursor-dark
      style={{
        background: 'var(--na-inv-bg)',
        color: '#FFFFFF',
        padding: 'clamp(100px, 14vw, 140px) clamp(24px, 4vw, 48px)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid var(--na-inv-border)',
      }}
    >
      {/* Ghost background text */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          fontSize: 'clamp(100px, 20vw, 280px)',
          fontWeight: 800,
          letterSpacing: '-0.05em',
          color: '#FFFFFF',
          opacity: 0.025,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          lineHeight: 1,
        }}
      >
        Ready?
      </div>

      {/* Diagonal lines */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <line x1="0" y1="100%" x2="100%" y2="0" stroke="#FFFFFF" strokeWidth="1" opacity="0.06" />
        <line x1="20%" y1="100%" x2="120%" y2="0" stroke="#FFFFFF" strokeWidth="1" opacity="0.04" />
      </svg>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'grid',
        alignItems: 'end',
      }}
      className="grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-20"
      >
        {/* Left — headline */}
        <div>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--na-inv-muted)',
              marginBottom: 24,
            }}
          >
            Let&apos;s Work Together
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            style={{
              fontSize: 'clamp(52px, 7vw, 112px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
            }}
          >
            Ready to
            <br />
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--na-inv-muted)' }}>
              build?
            </em>
          </motion.h2>
        </div>

        {/* Right — buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
          style={{ flexShrink: 0 }}
          className="text-left md:text-right"
        >
          <p style={{
            fontSize: 15,
            color: 'var(--na-inv-muted)',
            maxWidth: 260,
            lineHeight: 1.7,
            marginBottom: 32,
          }}
          className="mr-0 md:ml-auto"
          >
            Book a free 30-minute call. No pitch, no pressure — just a conversation about your project.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}
            className="justify-start md:justify-end"
          >
            <a
              href="https://calendly.com/nodeaxis"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ textDecoration: 'none' }}
            >
              Book a Call
              <ArrowRight size={14} strokeWidth={1.5} />
            </a>
            <a href="mailto:info@nodeaxis.ca" className="btn-ghost">
              Email Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
