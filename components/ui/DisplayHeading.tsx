import type { CSSProperties, ReactNode } from 'react'
import { cx } from './cx'

export type DisplaySize = 'xl' | 'lg' | 'md' | 'sm' | 'statement'

export interface DisplayHeadingProps {
  /** Heading level / element. Default 'h2'. Use 'p' for big statement paragraphs. */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div'
  /** xl ≈56→140px (hero), lg ≈44→96, md ≈32→64, sm ≈26→44, statement ≈26→46 (looser leading). Default 'lg'. */
  size?: DisplaySize
  /** Ink part of the text. May contain <ImageChip/>s. */
  children: ReactNode
  /** Optional muted second half (two-tone Lumóra effect). A space is inserted before it. */
  muted?: ReactNode
  id?: string
  className?: string
  style?: CSSProperties
}

/** Inter Tight display headline with tight tracking and optional two-tone muted tail. */
export function DisplayHeading({
  as: Tag = 'h2',
  size = 'lg',
  children,
  muted,
  id,
  className,
  style,
}: DisplayHeadingProps) {
  return (
    <Tag id={id} className={cx('na-display', `na-display--${size}`, className)} style={style}>
      {children}
      {muted !== undefined && muted !== null && (
        <>
          {' '}
          <span className="na-display__tail">{muted}</span>
        </>
      )}
    </Tag>
  )
}
