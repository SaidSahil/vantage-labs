import { useSyncExternalStore } from 'react'

const CONSENT_KEY = 'nodeaxis-cookie-consent'
const SESSION_KEY = 'na-session-id'
const CONSENT_EVENT = 'nodeaxis-consent-change'

export function hasAnalyticsConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'accepted'
  } catch {
    return false
  }
}

// Consent writers (CookieConsent, privacy ConsentControls) save to localStorage
// before dispatching CONSENT_EVENT, so re-reading storage on the event is accurate.
function subscribeToConsent(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}

/** Live analytics-consent flag; always false during SSR. */
export function useAnalyticsConsent(): boolean {
  return useSyncExternalStore(subscribeToConsent, hasAnalyticsConsent, () => false)
}

export function getSessionId(): string {
  try {
    let id = sessionStorage.getItem(SESSION_KEY)
    if (!id) {
      id = crypto.randomUUID()
      sessionStorage.setItem(SESSION_KEY, id)
    }
    return id
  } catch {
    return crypto.randomUUID()
  }
}

export function sendBeaconJson(url: string, payload: unknown) {
  const body = JSON.stringify(payload)
  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' })
    navigator.sendBeacon(url, blob)
  } else {
    fetch(url, { method: 'POST', body, headers: { 'Content-Type': 'application/json' }, keepalive: true }).catch(() => {})
  }
}
