'use client'
import { MotionConfig, motion, type Variants } from 'framer-motion'
import type { CSSProperties, ReactNode } from 'react'
import { ease, fadeUp, stagger, viewport } from '@/lib/animations'

/**
 * Honours the visitor's reduced-motion setting for every Framer animation on the
 * homepage: transforms are dropped, only opacity fades remain.
 */
export function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}

const tags = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
}

interface RevealProps {
  as?: keyof typeof tags
  className?: string
  style?: CSSProperties
  children?: ReactNode
  /** Seconds to wait before animating (single reveals only). */
  delay?: number
  id?: string
}

function delayed(delay: number): Variants {
  return {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease, delay } },
  }
}

/** Fade + slide up once when scrolled into view. */
export function Reveal({ as = 'div', className, style, children, delay = 0, id }: RevealProps) {
  const M = tags[as]
  return (
    <M
      id={id}
      className={className}
      style={style}
      variants={delay ? delayed(delay) : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </M>
  )
}

/** Parent that staggers its <RevealItem> children into view. */
export function RevealGroup({ as = 'div', className, style, children, id }: Omit<RevealProps, 'delay'>) {
  const M = tags[as]
  return (
    <M
      id={id}
      className={className}
      style={style}
      variants={stagger(0.09)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </M>
  )
}

/** Child of <RevealGroup>; inherits the parent's animation state. */
export function RevealItem({ as = 'div', className, style, children, id }: Omit<RevealProps, 'delay'>) {
  const M = tags[as]
  return (
    <M id={id} className={className} style={style} variants={fadeUp}>
      {children}
    </M>
  )
}
