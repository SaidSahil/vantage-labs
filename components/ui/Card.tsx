import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import { cx } from './cx'

export type CardVariant = 'white' | 'soft' | 'dark' | 'accent' | 'outline'

export interface CardProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. Default 'div'. Use 'article' / 'li' for semantic lists. */
  as?: 'div' | 'article' | 'li' | 'section' | 'aside'
  /** white (with soft shadow), soft (grey), dark (always-dark), accent (blue), outline. Default 'white'. */
  variant?: CardVariant
  /** Inner padding scale. Default 'sm'. */
  padding?: 'none' | 'sm' | 'md' | 'lg'
  /** Gentle lift + shadow on hover. Default false. */
  hover?: boolean
  children?: ReactNode
  style?: CSSProperties
}

/** Rounded card (radius 18–24px) for bento grids, tiers, steps and floating info cards. */
export function Card({
  as: Tag = 'div',
  variant = 'white',
  padding = 'sm',
  hover = false,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Tag
      className={cx(
        'na-card',
        `na-card--${variant}`,
        `na-pad-${padding}`,
        hover && 'na-card--hover',
        (variant === 'dark' || variant === 'accent') && 'na-inverse',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
