'use client'
import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { useAnalyticsConsent, getSessionId, sendBeaconJson } from '@/lib/tracking'

export default function Tracker() {
  const pathname = usePathname()
  const consented = useAnalyticsConsent()
  const lastSent = useRef<string | null>(null)

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
