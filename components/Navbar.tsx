'use client'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import MagneticButton from '@/components/MagneticButton'
import { useTheme } from '@/lib/theme'

function NodeAxisMark({ light }: { light?: boolean }) {
  const c = light ? 'rgba(255,255,255,0.75)' : 'var(--na-accent)'
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="3" stroke={c} strokeWidth="1.5"/>
      <line x1="11" y1="1" x2="11" y2="7" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="11" y1="15" x2="11" y2="21" stroke={c} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="1" y1="11" x2="7" y2="11" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
      <line x1="15" y1="11" x2="21" y2="11" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    </svg>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const isWork = pathname === '/work'
  const { theme, toggle } = useTheme()

  const links = [
    { href: '/work',     label: 'Work' },
    { href: '/services', label: 'Services' },
    { href: '/contact',  label: 'Contact' },
  ]

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('')
  const menuRef = useRef<HTMLDivElement>(null)

  // true only on the work page before any scroll — triggers white text mode
  const light = isWork && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const map: Record<string, string> = {
      services: '#services',
      cta: '#cta',
    }
    const onScroll = () => {
      const scrollY = window.scrollY + 120
      let current = ''
      for (const id of Object.keys(map)) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollY) current = id
      }
      setActiveHref(map[current] ?? '')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  const textColor    = light ? '#FFFFFF'                : 'var(--na-text)'
  const mutedColor   = light ? 'rgba(255,255,255,0.55)' : 'var(--na-muted)'
  const borderColor  = light ? 'rgba(255,255,255,0.28)' : 'var(--na-border-mid)'
  const dividerColor = light ? 'rgba(255,255,255,0.18)' : 'var(--na-border-mid)'

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 'clamp(24px, 4vw, 56px)',
        paddingRight: 'clamp(24px, 4vw, 56px)',
        paddingTop: scrolled ? 16 : 28,
        paddingBottom: scrolled ? 16 : 28,
        transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
        background: scrolled ? 'var(--na-nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--na-border)' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <Link
        href={isHome ? '#hero' : '/'}
        aria-label="NodeAxis home"
        style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}
      >
        <NodeAxisMark light={light} />
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em', color: textColor, transition: 'color 0.35s ease' }}>
          NodeAxis
        </span>
      </Link>

      {/* Desktop links */}
      <ul
        style={{ gap: 40, listStyle: 'none', margin: 0, padding: 0 }}
        className="hidden md:flex"
        role="list"
      >
        {links.map((link, i) => {
          const isActive = activeHref === link.href
          return (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.07, duration: 0.45, ease: 'easeOut' }}
            >
              <Link
                href={link.href}
                style={{
                  fontSize: 12,
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: '0.06em',
                  color: isActive ? textColor : mutedColor,
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s ease, font-weight 0.2s ease',
                  position: 'relative',
                  paddingBottom: 2,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = textColor)}
                onMouseLeave={e => (e.currentTarget.style.color = isActive ? textColor : mutedColor)}
              >
                {link.label}
                {isActive && (
                  <span style={{
                    position: 'absolute',
                    bottom: -4,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: light ? '#FFFFFF' : 'var(--na-accent)',
                  }} />
                )}
              </Link>
            </motion.li>
          )
        })}
      </ul>

      {/* Desktop CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        style={{ alignItems: 'center', gap: 12 }}
        className="hidden md:flex"
      >
        <div style={{ width: 1, height: 18, background: dividerColor, transition: 'background 0.35s ease' }} />

        {/* Theme toggle */}
        <button
          type="button"
          onClick={toggle}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="theme-toggle"
        >
          {theme === 'dark' ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>

        <MagneticButton strength={0.3}>
          <Link
            href="/contact"
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: textColor,
              textDecoration: 'none',
              padding: '9px 20px',
              border: `1px solid ${borderColor}`,
              borderRadius: 100,
              transition: 'all 0.22s ease',
              whiteSpace: 'nowrap',
              display: 'inline-block',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = textColor
              e.currentTarget.style.color = light ? '#0D0F1A' : 'var(--na-bg)'
              e.currentTarget.style.borderColor = textColor
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = textColor
              e.currentTarget.style.borderColor = borderColor
            }}
          >
            Start a Project
          </Link>
        </MagneticButton>
      </motion.div>

      {/* Mobile — Menu dropdown */}
      <div ref={menuRef} className="flex md:hidden" style={{ position: 'relative', alignItems: 'center', gap: 8 }}>
        {/* Mobile theme toggle */}
        <button
          type="button"
          onClick={toggle}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="theme-toggle"
        >
          {theme === 'dark' ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/>
              <line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/>
              <line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </button>

        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          type="button"
          style={{
            background: menuOpen ? 'var(--na-text)' : 'transparent',
            border: '1px solid',
            borderColor: menuOpen ? 'var(--na-text)' : borderColor,
            borderRadius: 100,
            padding: '7px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <span style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: menuOpen ? 'var(--na-bg)' : textColor,
            transition: 'color 0.2s ease',
          }}>
            Menu
          </span>
          <motion.svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            animate={{ rotate: menuOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          >
            <path
              d="M2 3.5L5 6.5L8 3.5"
              stroke={menuOpen ? 'var(--na-bg)' : textColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              style={{
                position: 'absolute',
                top: 'calc(100% + 10px)',
                right: 0,
                background: 'var(--na-bg)',
                border: '1px solid var(--na-border-mid)',
                borderRadius: 16,
                boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
                minWidth: 180,
                overflow: 'hidden',
              }}
            >
              {links.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    padding: '14px 20px',
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'var(--na-text)',
                    textDecoration: 'none',
                    borderBottom: i < links.length - 1 ? '1px solid var(--na-border-mid)' : 'none',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--na-surface)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  {link.label}
                </Link>
              ))}
              <div style={{ padding: '12px 20px', borderTop: '1px solid var(--na-border-mid)' }}>
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--na-inv-text)',
                    textDecoration: 'none',
                    padding: '10px 16px',
                    background: 'var(--na-inv-bg)',
                    borderRadius: 100,
                  }}
                >
                  Start a Project
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
