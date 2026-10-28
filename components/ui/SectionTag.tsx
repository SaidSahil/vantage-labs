import type { ReactNode } from 'react'
import { cx } from './cx'

export interface SectionTagProps {
  /** Number shown in brackets; numbers are zero-padded (1 → "01"). Omit for label only. */
  index?: number | string
  /** The label text, rendered uppercase. */
  children: ReactNode
  className?: string
}

/** Small mono-style section label: `[01] THE PROBLEM`. Adapts automatically inside dark panels. */
export function SectionTag({ index, children, className }: SectionTagProps) {
  const idx = typeof index === 'number' ? String(index).padStart(2, '0') : index
  return (
    <p className={cx('na-tag', className)}>
      {idx !== undefined && <span className="na-tag__index">[{idx}]</span>}
      <span>{children}</span>
    </p>
  )
}
