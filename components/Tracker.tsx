'use client'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { hasAnalyticsConsent, getSessionId, sendBeaconJson } from '@/lib/tracking'

export default function Tracker() {
  const pathname = usePathname()
  const [consented, setConsented] = useState(false)
  const lastSent = useRef<string | null>(null)

  useEffect(() => {
    setConsented(hasAnalyticsConsent())

    function onConsentChange(e: Event) {
      const choice = (e as CustomEvent<'accepted' | 'declined'>).detail
      setConsented(choice === 'accepted')
    }

    window.addEventListener('nodeaxis-consent-change', onConsentChange)
    return () => window.removeEventListener('nodeaxis-consent-change', onConsentChange)
  }, [])

  useEffect(() => {
    if (!consented || !pathname || lastSent.current === pathname) return
    lastSent.current = pathname
    sendBeaconJson('/api/track/visit', {
      path: pathname,
      referrer: document.referrer || undefined,
      sessionId: getSessionId(),
    })
  }, [consented, pathname])

  return null
}
