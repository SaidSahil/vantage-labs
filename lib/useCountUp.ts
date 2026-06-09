'use client'
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

export function useCountUp(target: number, duration = 1400) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref as React.RefObject<Element>, { once: true, amount: 0.6 })
  const started = useRef(false)

  useEffect(() => {
    if (!isInView || started.current) return
    started.current = true

    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, target, duration])

  return { count, ref }
}
