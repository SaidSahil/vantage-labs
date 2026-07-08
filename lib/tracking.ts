const CONSENT_KEY = 'nodeaxis-cookie-consent'
const SESSION_KEY = 'na-session-id'

export function hasAnalyticsConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'accepted'
  } catch {
    return false
  }
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
