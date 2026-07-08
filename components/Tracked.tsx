'use client'
import { useEffect, useRef, useState, ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { hasAnalyticsConsent, getSessionId, sendBeaconJson } from '@/lib/tracking'

const FLUSH_INTERVAL_MS = 10000

export default function Tracked({ id, children }: { id: string; children: ReactNode }) {
  const pathname = usePathname()
  const ref = useRef<HTMLDivElement>(null)
  const visibleSince = useRef<number | null>(null)
  const pendingClicks = useRef(0)
  const [consented, setConsented] = useState(false)

  useEffect(() => {
    setConsented(hasAnalyticsConsent())

    function onConsentChange(e: Event) {
      setConsented((e as CustomEvent<'accepted' | 'declined'>).detail === 'accepted')
    }

    window.addEventListener('nodeaxis-consent-change', onConsentChange)
    return () => window.removeEventListener('nodeaxis-consent-change', onConsentChange)
  }, [])

  useEffect(() => {
    if (!consented) return
    const el = ref.current
    if (!el) return

    function flush() {
      const now = Date.now()
      let viewMs = 0
      if (visibleSince.current !== null) {
        viewMs = now - visibleSince.current
        visibleSince.current = now
      }
      const clicks = pendingClicks.current
      pendingClicks.current = 0
      if (viewMs < 250 && clicks === 0) return
      sendBeaconJson('/api/track/engagement', {
        path: pathname,
        section: id,
        viewMs,
        clicks,
        sessionId: getSessionId(),
      })
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visibleSince.current = Date.now()
        } else if (visibleSince.current !== null) {
          flush()
          visibleSince.current = null
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)

    const interval = setInterval(flush, FLUSH_INTERVAL_MS)

    function onVisibilityChange() {
      if (document.visibilityState === 'hidden') flush()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('pagehide', flush)

    return () => {
      flush()
      observer.disconnect()
      clearInterval(interval)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('pagehide', flush)
    }
  }, [consented, pathname, id])

  return (
    <div ref={ref} onClickCapture={() => { pendingClicks.current += 1 }}>
      {children}
    </div>
  )
}
