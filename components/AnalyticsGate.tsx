'use client'
import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/next'

const STORAGE_KEY = 'nodeaxis-cookie-consent'

export default function AnalyticsGate() {
  const [accepted, setAccepted] = useState(false)

  useEffect(() => {
    try {
      setAccepted(localStorage.getItem(STORAGE_KEY) === 'accepted')
    } catch {
      /* storage unavailable — stay opted out */
    }

    function onConsentChange(e: Event) {
      const choice = (e as CustomEvent<'accepted' | 'declined'>).detail
      setAccepted(choice === 'accepted')
    }

    window.addEventListener('nodeaxis-consent-change', onConsentChange)
    return () => window.removeEventListener('nodeaxis-consent-change', onConsentChange)
  }, [])

  if (!accepted) return null
  return <Analytics />
}
