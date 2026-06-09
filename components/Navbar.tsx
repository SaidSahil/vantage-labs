'use client'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import MagneticButton from '@/components/MagneticButton'

function VMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="10" height="10" rx="1.5" stroke="#3D5A80" strokeWidth="1.5" />
      <rect x="11" y="11" width="10" height="10" rx="1.5" stroke="#3D5A80" strokeWidth="1.5" />
      <rect x="11" y="1" width="10" height="10" rx="1.5" stroke="#3D5A80" strokeWidth="1.5" opacity="0.3" />
    </svg>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  const links = [
    { href: '/work',     label: 'Work' },
    { href: '/services', label: 'Services' },
    { href: '/contact',  label: 'Contact' },
  ]

  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('')
  const menuRef = useRef<HTMLDivElement>(null)

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

  // Close dropdown when clicking outside
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
        background: scrolled ? 'rgba(250,250,248,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: scrolled ? '1px solid #E2E1DC' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <Link
        href={isHome ? '#hero' : '/'}
        aria-label="Vantage Labs home"
        style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}
      >
        <VMark />
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em', color: '#1C1C1E' }}>
          Vantage Labs
        </span>
      </Link>

      {/* Desktop links */}
      <ul
        style={{ gap: 40, listStyle: 'none', margin: 0, padding: 0 }}
        className="hidden md:flex"
        role="list"
      >
        {links.map((link, i) => (
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
                fontWeight: activeHref === link.href ? 600 : 400,
                letterSpacing: '0.06em',
                color: activeHref === link.href ? '#1C1C1E' : 'rgba(28,28,30,0.55)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                transition: 'color 0.2s ease, font-weight 0.2s ease',
                position: 'relative',
                paddingBottom: 2,
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#1C1C1E')}
              onMouseLeave={e => (e.currentTarget.style.color = activeHref === link.href ? '#1C1C1E' : 'rgba(28,28,30,0.55)')}
            >
              {link.label}
              {activeHref === link.href && (
                <span style={{
                  position: 'absolute',
                  bottom: -4,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: '#3D5A80',
                }} />
              )}
            </Link>
          </motion.li>
        ))}
      </ul>

      {/* Desktop CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        style={{ alignItems: 'center', gap: 20 }}
        className="hidden md:flex"
      >
        <div style={{ width: 1, height: 18, background: '#E2E1DC' }} />
        <MagneticButton strength={0.3}>
          <Link
            href="/contact"
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#1C1C1E',
              textDecoration: 'none',
              padding: '9px 20px',
              border: '1px solid rgba(28,28,30,0.18)',
              borderRadius: 100,
              transition: 'all 0.22s ease',
              whiteSpace: 'nowrap',
              display: 'inline-block',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#1C1C1E'
              e.currentTarget.style.color = '#FAFAF8'
              e.currentTarget.style.borderColor = '#1C1C1E'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = '#1C1C1E'
              e.currentTarget.style.borderColor = 'rgba(28,28,30,0.18)'
            }}
          >
            Start a Project
          </Link>
        </MagneticButton>
      </motion.div>

      {/* Mobile — Menu dropdown */}
      <div ref={menuRef} className="md:hidden" style={{ position: 'relative' }}>
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          type="button"
          style={{
            background: menuOpen ? '#1C1C1E' : 'transparent',
            border: '1px solid',
            borderColor: menuOpen ? '#1C1C1E' : 'rgba(28,28,30,0.18)',
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
            color: menuOpen ? '#FAFAF8' : '#1C1C1E',
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
              stroke={menuOpen ? '#FAFAF8' : '#1C1C1E'}
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
                background: '#FAFAF8',
                border: '1px solid #E2E1DC',
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
                    color: '#1C1C1E',
                    textDecoration: 'none',
                    borderBottom: i < links.length - 1 ? '1px solid #E2E1DC' : 'none',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#F0EFE9')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  {link.label}
                </Link>
              ))}
              <div style={{ padding: '12px 20px', borderTop: '1px solid #E2E1DC' }}>
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
                    color: '#FAFAF8',
                    textDecoration: 'none',
                    padding: '10px 16px',
                    background: '#1C1C1E',
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
