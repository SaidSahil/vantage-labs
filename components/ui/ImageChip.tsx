import Image from 'next/image'
import type { CSSProperties } from 'react'
import { cx } from './cx'

export interface ImageChipProps {
  /** Image path, e.g. '/images/plumber.jpg'. */
  src: string
  /** Alt text. Pass '' if purely decorative (the headline text carries the meaning). */
  alt: string
  /** Width ÷ height. Default 1.6 (landscape). Height is 0.78em of the surrounding font. */
  aspect?: number
  /** Slight rotation in degrees for a playful Muse.Studio feel. Default 0. */
  tilt?: number
  /** Load eagerly (use for chips in the hero headline). Default false. */
  priority?: boolean
  className?: string
}

/** Small rounded photo that sits inline inside a headline; sized in em so it scales with the text. */
export function ImageChip({ src, alt, aspect = 1.6, tilt = 0, priority = false, className }: ImageChipProps) {
  const style = {
    width: `${(0.78 * aspect).toFixed(3)}em`,
    '--na-chip-tilt': `${tilt}deg`,
  } as CSSProperties
  return (
    <span className={cx('na-chip', className)} style={style} aria-hidden={alt === '' ? true : undefined}>
      <Image src={src} alt={alt} fill sizes="(max-width: 768px) 120px, 220px" priority={priority} />
    </span>
  )
}
