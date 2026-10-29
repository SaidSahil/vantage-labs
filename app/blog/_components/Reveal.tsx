'use client'
import { MotionConfig, motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, stagger, viewport } from '@/lib/animations'

/** Calm fade/slide-up wrapper so the blog pages can stay server components. */
export function Reveal({
  children,
  className,
  onMount = false,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  /** Animate on mount (hero) instead of on scroll into view. */
  onMount?: boolean
  as?: 'div' | 'ul'
}) {
  const Tag = as === 'ul' ? motion.ul : motion.div
  const trigger = onMount ? { animate: 'visible' } : { whileInView: 'visible', viewport }
  return (
    <MotionConfig reducedMotion="user">
      <Tag initial="hidden" {...trigger} variants={stagger(0.08)} className={className}>
        {children}
      </Tag>
    </MotionConfig>
  )
}

/** Child item of a <Reveal>; inherits the stagger. */
export function RevealItem({ children, className, as = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'li' }) {
  const Tag = as === 'li' ? motion.li : motion.div
  return (
    <Tag variants={fadeUp} className={className}>
      {children}
    </Tag>
  )
}
