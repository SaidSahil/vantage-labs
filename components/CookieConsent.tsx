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
      // Reads browser-only storage after mount (not available during SSR).
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
          aria-label="Analytics consent"
          aria-live="polite"
          className="na-inverse"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease }}
          style={{
            position: 'fixed',
            left: 'var(--na-gutter)',
            right: 'var(--na-gutter)',
            bottom: 'max(var(--na-gutter), env(safe-area-inset-bottom))',
            zIndex: 9999,
            maxWidth: 460,
            marginInline: 'auto',
            background: 'var(--na-inv-bg)',
            color: 'var(--na-inv-text)',
            border: '1px solid var(--na-inv-border)',
            borderRadius: 'var(--na-radius-card)',
            padding: 'clamp(18px, 3vw, 24px)',
            boxShadow: 'var(--na-shadow-float)',
          }}
        >
          <p className="na-tag" style={{ marginBottom: 8 }}>Analytics</p>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.6,
              color: 'var(--na-inv-text)',
              margin: '0 0 16px',
            }}
          >
            No ad or tracking cookies. If you accept, we&apos;ll measure which pages and
            sections get viewed — with approximate location and device type — to improve
            the site. Decline and nothing is measured. You can change this any time in our{' '}
            <Link
              href="/privacy#consent"
              style={{ color: 'var(--na-inv-accent)', textDecoration: 'underline', textUnderlineOffset: 3, fontWeight: 500 }}
            >
              Privacy Policy
            </Link>
            .
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <button
              type="button"
              onClick={() => choose('accepted')}
              className="na-pill na-pill--primary na-pill--sm"
              style={{ flex: '1 1 auto' }}
            >
              Accept analytics
            </button>
            <button
              type="button"
              onClick={() => choose('declined')}
              className="na-pill na-pill--ghost na-pill--sm"
              style={{ flex: '1 1 auto', borderColor: 'var(--na-inv-border)' }}
            >
              Decline
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
