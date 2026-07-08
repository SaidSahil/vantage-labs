'use client'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'

const STORAGE_KEY = 'nodeaxis-cookie-consent'
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

// Records the visitor's choice and dispatches 'nodeaxis-consent-change',
// which AnalyticsGate listens for to start/stop Vercel Analytics.
export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
    } catch {
      /* storage unavailable — stay hidden */
    }
  }, [])

  function choose(choice: 'accepted' | 'declined') {
    try {
      localStorage.setItem(STORAGE_KEY, choice)
      window.dispatchEvent(new CustomEvent('nodeaxis-consent-change', { detail: choice }))
    } catch {
      /* ignore */
    }
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease }}
          style={{
            position: 'fixed',
            left: 'clamp(16px, 3vw, 28px)',
            right: 'clamp(16px, 3vw, 28px)',
            bottom: 'clamp(16px, 3vw, 28px)',
            zIndex: 9999,
            maxWidth: 520,
            marginInline: 'auto',
            background: 'var(--na-inv-bg)',
            border: '1px solid var(--na-inv-border)',
            borderRadius: 16,
            padding: 'clamp(20px, 3vw, 28px)',
            boxShadow: '0 24px 60px -24px rgba(0,0,0,0.6)',
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--na-inv-accent)',
              marginBottom: 10,
            }}
          >
            Cookies
          </div>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.65,
              color: 'var(--na-inv-text)',
              margin: '0 0 18px',
            }}
          >
            We use only what&apos;s needed to keep this site working. With your consent,
            we may also measure traffic to improve it. Read our{' '}
            <Link
              href="/privacy"
              style={{ color: 'var(--na-inv-accent)', textDecoration: 'underline', fontWeight: 600 }}
            >
              Privacy Policy
            </Link>
            .
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <button
              onClick={() => choose('accepted')}
              style={{
                flex: '1 1 auto',
                minHeight: 44,
                padding: '10px 20px',
                borderRadius: 10,
                border: 'none',
                background: 'var(--na-inv-accent)',
                color: 'var(--na-inv-bg)',
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Accept
            </button>
            <button
              onClick={() => choose('declined')}
              style={{
                flex: '1 1 auto',
                minHeight: 44,
                padding: '10px 20px',
                borderRadius: 10,
                border: '1px solid var(--na-inv-border)',
                background: 'transparent',
                color: 'var(--na-inv-text)',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                transition: 'background 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--na-inv-accent)'
                e.currentTarget.style.background = 'rgba(var(--na-inv-accent-rgb), 0.08)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--na-inv-border)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
