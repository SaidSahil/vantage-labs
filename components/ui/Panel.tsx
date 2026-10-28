import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'
import { cx } from './cx'

export type PanelVariant = 'canvas' | 'white' | 'soft' | 'dark'
export type PanelPadding = 'none' | 'sm' | 'md' | 'lg'

export interface PanelProps extends HTMLAttributes<HTMLElement> {
  /** Element to render. Default 'section'. */
  as?: 'section' | 'div' | 'header' | 'footer' | 'aside' | 'article'
  /** Background: canvas (cream), white, soft (grey), dark (always-dark). Default 'white'. */
  variant?: PanelVariant
  /** Inner padding scale. Default 'lg'. */
  padding?: PanelPadding
  /** Inset from the viewport edge by --na-gutter (cards-on-a-table look). Default true. */
  inset?: boolean
  children?: ReactNode
  style?: CSSProperties
}

/** Big rounded section container (radius 22–32px), inset from the viewport edge. */
export function Panel({
  as: Tag = 'section',
  variant = 'white',
  padding = 'lg',
  inset = true,
  className,
  children,
  ...rest
}: PanelProps) {
  return (
    <Tag
      className={cx(
        'na-panel',
        `na-panel--${variant}`,
        `na-pad-${padding}`,
        inset && 'na-panel--inset',
        variant === 'dark' && 'na-inverse',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
