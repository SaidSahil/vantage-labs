'use client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTheme } from '@/lib/theme'
import { business, promise } from '@/lib/offer'
import { NodeAxisMark, PillButton } from '@/components/ui'

const links = [
  { href: '/services', label: 'Services' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/work', label: 'Demo' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const ease = [0.22, 1, 0.36, 1] as const

function PhoneIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      onClick={toggle}
      className="na-icon-btn"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}

function isActive(pathname: string, href: string) {
  if (href.includes('#')) return false
  return pathname === href || pathname.startsWith(`${href}/`)
}

export default function Navbar() {
  const pathname = usePathname() ?? '/'
  const reduce = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const openBtnRef = useRef<HTMLButtonElement>(null)
  const closeBtnRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    // Return focus to the trigger once the overlay is gone.
    requestAnimationFrame(() => openBtnRef.current?.focus())
  }, [])

  // Body scroll lock, Escape to close, focus trap while the menu is open.
  useEffect(() => {
    if (!menuOpen) return
    const { body } = document
    const prevOverflow = body.style.overflow
    body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeMenu()
        return
      }
      if (e.key !== 'Tab' || !menuRef.current) return
      const focusables = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen, closeMenu])

  const fade = reduce ? { duration: 0 } : { duration: 0.35, ease }

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: 'var(--na-gutter)',
          pointerEvents: 'none',
        }}
      >
        <nav
          aria-label="Main"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            minHeight: 64,
            padding: '8px 8px 8px clamp(16px, 2vw, 24px)',
            borderRadius: 999,
            background: scrolled ? 'var(--na-nav-bg)' : 'transparent',
            backdropFilter: scrolled ? 'blur(16px) saturate(1.4)' : 'none',
            WebkitBackdropFilter: scrolled ? 'blur(16px) saturate(1.4)' : 'none',
            border: `1px solid ${scrolled ? 'var(--na-border)' : 'transparent'}`,
            boxShadow: scrolled ? '0 8px 30px -18px rgba(18,19,22,0.25)' : 'none',
            transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
            color: 'var(--na-text)',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            aria-label={`${business.name} home`}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 9, minHeight: 44, color: 'var(--na-logo-color)' }}
          >
            <NodeAxisMark />
            <span style={{ fontFamily: 'var(--na-font-display)', fontSize: 18, fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--na-text)' }}>
              {business.name}
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden lg:flex" style={{ alignItems: 'center', gap: 'clamp(16px, 2vw, 32px)', listStyle: 'none' }}>
            {links.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="na-nav-link"
                  aria-current={isActive(pathname, link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <a
              href={business.phoneHref}
              className="na-nav-link hidden xl:inline-flex"
              style={{ gap: 8, color: 'var(--na-text)', marginRight: 6 }}
            >
              <PhoneIcon />
              <span>{business.phoneDisplay}</span>
            </a>
            <PillButton href={promise.ctaHref} size="sm" className="hidden sm:inline-flex">
              Free audit
            </PillButton>
            <ThemeToggle />
            <button
              ref={openBtnRef}
              type="button"
              className="na-icon-btn lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M4 8h16M4 16h16" />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen dark menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="na-inverse lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={fade}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              background: 'var(--na-inv-bg)',
              color: 'var(--na-inv-text)',
              display: 'flex',
              flexDirection: 'column',
              padding: 'calc(var(--na-gutter) + 8px) clamp(20px, 5vw, 32px) max(24px, env(safe-area-inset-bottom))',
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 64 }}>
              <Link
                href="/"
                onClick={closeMenu}
                aria-label={`${business.name} home`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 9, minHeight: 44 }}
              >
                <NodeAxisMark />
                <span style={{ fontFamily: 'var(--na-font-display)', fontSize: 18, fontWeight: 600, letterSpacing: '-0.03em' }}>
                  {business.name}
                </span>
              </Link>
              <button ref={closeBtnRef} type="button" className="na-icon-btn" aria-label="Close menu" onClick={closeMenu}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            <nav aria-label="Mobile" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 0' }}>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, textAlign: 'center' }}>
                {[{ href: '/', label: 'Home' }, ...links].map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={reduce ? { duration: 0 } : { duration: 0.45, ease, delay: 0.05 + i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      className="na-menu-link"
                      aria-current={(link.href === '/' ? pathname === '/' : isActive(pathname, link.href)) ? 'page' : undefined}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 16, borderTop: '1px solid var(--na-inv-border)' }}>
              <PillButton href={promise.ctaHref} size="lg" block arrow onClick={() => setMenuOpen(false)}>
                {promise.cta}
              </PillButton>
              <PillButton href={business.phoneHref} variant="ghost" size="lg" block icon={<PhoneIcon size={16} />}>
                Call {business.phoneDisplay}
              </PillButton>
              <p style={{ fontSize: 13, color: 'var(--na-inv-muted)', textAlign: 'center', marginTop: 4 }}>
                {business.hours} · Serving {business.city} and nearby
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
