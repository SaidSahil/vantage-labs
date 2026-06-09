'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]
const CHARS = 'VANTAGE LABS'.split('')

export default function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(false), 600)
    const t2 = setTimeout(() => onComplete(), 1200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.45, ease }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: '#0D0D0F',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
          }}
        >
          {/* VMark */}
          <motion.svg
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease }}
            width="40"
            height="40"
            viewBox="0 0 22 22"
            fill="none"
            aria-hidden="true"
          >
            <rect x="1" y="1" width="10" height="10" rx="1.5" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" />
            <rect x="11" y="11" width="10" height="10" rx="1.5" stroke="rgba(255,255,255,0.65)" strokeWidth="1.5" />
            <rect x="11" y="1" width="10" height="10" rx="1.5" stroke="#3D5A80" strokeWidth="1.5" />
          </motion.svg>

          {/* Char-by-char wordmark */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {CHARS.map((char, i) => (
              <div
                key={i}
                style={{ overflow: 'hidden', display: 'inline-block' }}
              >
                <motion.span
                  initial={{ y: 32, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.25 + i * 0.045,
                    duration: 0.5,
                    ease,
                  }}
                  style={{
                    display: 'block',
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: char === ' ' ? '0.5em' : '0.22em',
                    color: 'rgba(255,255,255,0.45)',
                    fontFamily: 'var(--font-inter), Inter, sans-serif',
                    width: char === ' ' ? 12 : 'auto',
                  }}
                >
                  {char === ' ' ? ' ' : char}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div style={{
            width: 100,
            height: 1,
            background: 'rgba(255,255,255,0.08)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                inset: 0,
                background: '#3D5A80',
                transformOrigin: 'left',
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
