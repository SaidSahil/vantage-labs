'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let mx = 0, my = 0, cx = 0, cy = 0, raf = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const loop = () => {
      cx = lerp(cx, mx, 0.14)
      cy = lerp(cy, my, 0.14)
      cursor.style.left = cx + 'px'
      cursor.style.top = cy + 'px'
      raf = requestAnimationFrame(loop)
    }
    loop()

    document.addEventListener('mousemove', onMove, { passive: true })

    const bindHover = () => {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'))
        el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'))
      })
    }
    bindHover()
    setTimeout(bindHover, 600)

    const detectDark = () => {
      const darkSections = document.querySelectorAll('[data-cursor-dark]')
      if (!darkSections.length) return

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            cursor.classList.add('is-dark')
          } else {
            const anyDark = [...darkSections].some(s => {
              const r = s.getBoundingClientRect()
              return r.top < window.innerHeight / 2 && r.bottom > window.innerHeight / 2
            })
            if (!anyDark) cursor.classList.remove('is-dark')
          }
        })
      }, { threshold: 0.3 })

      darkSections.forEach(s => observer.observe(s))
      return observer
    }
    const observer = detectDark()

    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('mousemove', onMove)
      observer?.disconnect()
    }
  }, [])

  return (
    <div ref={cursorRef} id="cursor" aria-hidden="true">
      {/* Crosshair arms */}
      <div className="cursor-arm cursor-arm-h" />
      <div className="cursor-arm cursor-arm-v" />
      {/* Center dot */}
      <div className="cursor-dot" />
    </div>
  )
}
