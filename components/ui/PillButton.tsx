import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cx } from './cx'

export type PillVariant = 'primary' | 'secondary' | 'dark' | 'light' | 'ghost'
export type PillSize = 'sm' | 'md' | 'lg'

interface PillBaseProps {
  /** primary = blue CTA; secondary = white + border; dark = ink fill; light = cream fill (on dark panels); ghost = outline in currentColor. Default 'primary'. */
  variant?: PillVariant
  /** All sizes keep a ≥44px touch target. Default 'md'. */
  size?: PillSize
  /** Show a trailing → arrow that nudges on hover. Default false. */
  arrow?: boolean
  /** Optional leading icon (e.g. a phone glyph). */
  icon?: ReactNode
  /** Stretch to full width. */
  block?: boolean
  className?: string
  children: ReactNode
}

export type PillLinkProps = PillBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'> & { href: string }

export type PillButtonOnlyProps = PillBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & { href?: undefined }

export type PillButtonProps = PillLinkProps | PillButtonOnlyProps

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Pill-shaped CTA. Renders next/link for internal hrefs, <a> for tel:/mailto:/http, else <button>. */
export function PillButton(props: PillButtonProps) {
  const { variant = 'primary', size = 'md', arrow = false, icon, block = false, className, children } = props
  const classes = cx('na-pill', `na-pill--${variant}`, size !== 'md' && `na-pill--${size}`, block && 'na-pill--block', className)

  const content = (
    <>
      {icon && <span className="na-pill__lead" aria-hidden="true" style={{ display: 'inline-flex' }}>{icon}</span>}
      <span>{children}</span>
      {arrow && <span className="na-pill__icon"><Arrow /></span>}
    </>
  )

  if (props.href !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { variant: _v, size: _s, arrow: _a, icon: _i, block: _b, className: _c, children: _ch, href, ...anchorRest } = props
    const isExternal = /^(https?:|tel:|mailto:|sms:)/.test(href)
    if (isExternal) {
      return (
        <a href={href} className={classes} {...anchorRest}>
          {content}
        </a>
      )
    }
    return (
      <Link href={href} className={classes} {...anchorRest}>
        {content}
      </Link>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { variant: _v, size: _s, arrow: _a, icon: _i, block: _b, className: _c, children: _ch, href: _h, type = 'button', ...buttonRest } = props
  return (
    <button type={type} className={classes} {...buttonRest}>
      {content}
    </button>
  )
}
