'use client'
import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface Props {
  children: React.ReactNode
  strength?: number
}

export default function MagneticButton({ children, strength = 0.35 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 180, damping: 18, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 180, damping: 18, mass: 0.5 })

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  )
}
