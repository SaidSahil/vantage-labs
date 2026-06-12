'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

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
          id="intro-loader"
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
          {/* NodeAxis hex+circuit mark */}
          <motion.svg
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease }}
            width="48"
            height="48"
            viewBox="0 0 22 22"
            fill="none"
            aria-hidden="true"
          >
            <polygon
              points="11,1.5 19.5,6.25 19.5,15.75 11,20.5 2.5,15.75 2.5,6.25"
              stroke="rgba(79,142,247,0.9)" strokeWidth="1.3" strokeLinejoin="round"
            />
            <line x1="7" y1="7" x2="7"  y2="15" stroke="rgba(79,142,247,0.9)" strokeWidth="1.7" strokeLinecap="round"/>
            <line x1="7" y1="7" x2="15" y2="15" stroke="rgba(79,142,247,0.9)" strokeWidth="1.7" strokeLinecap="round"/>
            <line x1="15" y1="7" x2="15" y2="15" stroke="rgba(79,142,247,0.9)" strokeWidth="1.7" strokeLinecap="round"/>
            <circle cx="7"  cy="7"  r="1.2" fill="rgba(79,142,247,0.9)"/>
            <circle cx="15" cy="7"  r="1.2" fill="rgba(79,142,247,0.9)"/>
            <circle cx="7"  cy="15" r="1.2" fill="rgba(79,142,247,0.9)"/>
            <circle cx="15" cy="15" r="1.2" fill="rgba(79,142,247,0.9)"/>
          </motion.svg>

          {/* Wordmark — single fade-in */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.3, ease }}
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.22em',
              color: 'rgba(255,255,255,0.45)',
              fontFamily: 'var(--font-inter), Inter, sans-serif',
            }}
          >
            NODEAXIS
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
