'use client'
import { Analytics } from '@vercel/analytics/next'
import { useAnalyticsConsent } from '@/lib/tracking'

export default function AnalyticsGate() {
  const accepted = useAnalyticsConsent()
  if (!accepted) return null
  return <Analytics />
}
