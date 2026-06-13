'use client'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
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

      {/* Rocket character — absolute positioned, right side */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
        aria-hidden="true"
        className="hidden md:block"
        style={{
          position: 'absolute',
          right: 'clamp(48px, 8vw, 120px)',
          bottom: 0,
          zIndex: 0,
          pointerEvents: 'none',
          width: 'clamp(140px, 16vw, 220px)',
        }}
      >
        <svg
          viewBox="0 0 200 280"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ color: 'var(--na-inv-text)', opacity: 0.18, width: '100%' }}
        >
          {/* Floating stars / sparkles */}
          {/* Star top-left */}
          <path
            d="M28 36 L31 28 L34 36 L42 39 L34 42 L31 50 L28 42 L20 39 Z"
            stroke="currentColor"
            strokeWidth="1.4"
            fill="none"
          />
          {/* Small star top-right */}
          <path
            d="M162 22 L164 16 L166 22 L172 24 L166 26 L164 32 L162 26 L156 24 Z"
            stroke="currentColor"
            strokeWidth="1.3"
            fill="none"
          />
          {/* Dot sparkles */}
          <circle cx="14" cy="90" r="2.5" fill="currentColor" />
          <circle cx="180" cy="60" r="2" fill="currentColor" />
          <circle cx="54" cy="18" r="1.8" fill="currentColor" />
          <circle cx="148" cy="100" r="1.5" fill="currentColor" />
          {/* Cross sparkle */}
          <path
            d="M176 140 L176 148 M172 144 L180 144"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          {/* Small cross */}
          <path
            d="M38 160 L38 166 M35 163 L41 163"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
          />

          {/* ── ROCKET BODY ── */}
          {/* Main body — elongated ellipse-like shape */}
          <path
            d="M100 20 C84 20 72 40 72 70 L72 160 C72 166 76 170 100 170 C124 170 128 166 128 160 L128 70 C128 40 116 20 100 20 Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Nose cone */}
          <path
            d="M72 70 C72 40 85 22 100 20 C115 22 128 40 128 70"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
          {/* Window porthole */}
          <circle cx="100" cy="90" r="16" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="100" cy="90" r="8" stroke="currentColor" strokeWidth="1.2" />
          {/* Cross hairs in window */}
          <path
            d="M84 90 L116 90 M100 74 L100 106"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinecap="round"
            opacity={0.6}
          />
          {/* Body center stripe */}
          <path
            d="M72 120 L128 120"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            opacity={0.5}
          />
          {/* Body lower stripe */}
          <path
            d="M74 144 L126 144"
            stroke="currentColor"
            strokeWidth="0.9"
            strokeLinecap="round"
            opacity={0.4}
          />

          {/* ── LEFT FIN ── */}
          <path
            d="M72 140 C60 140 48 152 46 170 L72 162 Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
            fill="none"
          />
          {/* ── RIGHT FIN ── */}
          <path
            d="M128 140 C140 140 152 152 154 170 L128 162 Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
            fill="none"
          />
          {/* ── SMALL SIDE WINGS ── */}
          <path
            d="M72 110 C62 106 56 98 58 90 L72 100 Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M128 110 C138 106 144 98 142 90 L128 100 Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
            fill="none"
          />

          {/* ── EXHAUST / FLAMES ── */}
          {/* Nozzle base */}
          <path
            d="M80 170 L80 182 L120 182 L120 170"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Center flame — tall */}
          <path
            d="M100 182 C96 196 88 210 92 228 C94 238 100 242 100 242 C100 242 106 238 108 228 C112 210 104 196 100 182 Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Left flame */}
          <path
            d="M85 182 C80 194 76 206 80 218 C82 226 86 228 86 228 C86 228 92 222 90 210 C88 198 86 190 85 182 Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Right flame */}
          <path
            d="M115 182 C120 194 124 206 120 218 C118 226 114 228 114 228 C114 228 108 222 110 210 C112 198 114 190 115 182 Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />

          {/* ── SMALL ASTRONAUT FIGURE riding the rocket ── */}
          {/* Head */}
          <circle cx="100" cy="48" r="10" stroke="currentColor" strokeWidth="1.4" />
          {/* Helmet visor */}
          <path
            d="M93 46 C93 42 107 42 107 46"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
          {/* Body / suit */}
          <path
            d="M92 58 L88 76 L112 76 L108 58 C106 54 94 54 92 58 Z"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinejoin="round"
            fill="none"
          />
          {/* Arms */}
          <path d="M88 62 L80 68" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M112 62 L120 68" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          {/* Legs */}
          <path d="M92 76 L90 84" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M108 76 L110 84" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* Content */}
      <div
        style={{
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
              textTransform: 'uppercase' as const,
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
              build.
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
          <p
            style={{
              fontSize: 15,
              color: 'var(--na-inv-muted)',
              maxWidth: 260,
              lineHeight: 1.7,
              marginBottom: 32,
            }}
            className="mr-0 md:ml-auto"
          >
            Based in BC, Canada. Book a free 30-minute call — no pitch, no pressure, just a
            conversation about your project.
          </p>
          <div
            style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 12 }}
            className="justify-start md:justify-end"
          >
            <Link
              href="/contact"
              className="btn-primary"
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              Get in Touch
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
            <a
              href="https://calendly.com/nodeaxis"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
              style={{ textDecoration: 'none' }}
            >
              Book a Call
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
