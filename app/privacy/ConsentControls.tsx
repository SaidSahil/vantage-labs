'use client'
import { useEffect, useState } from 'react'

// Lets a visitor change their analytics choice after dismissing the banner.
// Uses the same storage key + event as components/CookieConsent.tsx, so
// AnalyticsGate, Tracker and Tracked react immediately.
const CONSENT_KEY = 'nodeaxis-cookie-consent'
const SESSION_KEY = 'na-session-id'

type Choice = 'accepted' | 'declined' | 'unset'

export default function ConsentControls() {
  const [choice, setChoice] = useState<Choice | null>(null)

  useEffect(() => {
    try {
      const v = localStorage.getItem(CONSENT_KEY)
      // Reads browser-only storage after mount (not available during SSR).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setChoice(v === 'accepted' || v === 'declined' ? v : 'unset')
    } catch {
      setChoice('unset')
    }
  }, [])

  function update(next: 'accepted' | 'declined') {
    try {
      localStorage.setItem(CONSENT_KEY, next)
      if (next === 'declined') sessionStorage.removeItem(SESSION_KEY)
      window.dispatchEvent(new CustomEvent('nodeaxis-consent-change', { detail: next }))
    } catch {
      /* storage unavailable */
    }
    setChoice(next)
  }

  const status =
    choice === null ? 'Checking…'
      : choice === 'accepted' ? 'On — you allowed analytics on this browser.'
        : choice === 'declined' ? 'Off — you declined analytics on this browser.'
          : 'Off — you haven’t made a choice yet.'

  return (
    <div className="rounded-[var(--na-radius-card)] p-5 flex flex-col gap-4" style={{ background: 'var(--na-card-soft)' }}>
      <p className="text-[15px]" role="status" aria-live="polite">
        <strong style={{ fontWeight: 600 }}>Analytics on this browser:</strong>{' '}
        <span style={{ color: 'var(--na-muted)' }}>{status}</span>
      </p>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="na-pill na-pill--primary na-pill--sm" onClick={() => update('accepted')}
          disabled={choice === 'accepted'} aria-pressed={choice === 'accepted'}>
          Allow analytics
        </button>
        <button type="button" className="na-pill na-pill--secondary na-pill--sm" onClick={() => update('declined')}
          disabled={choice === 'declined'} aria-pressed={choice === 'declined'}>
          Turn analytics off
        </button>
      </div>
    </div>
  )
}
