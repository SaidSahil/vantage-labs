'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { X, Menu } from 'lucide-react'
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
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track which section is in view and highlight the matching nav link
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

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
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
          <span style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '-0.01em',
            color: '#1C1C1E',
          }}>
            Vantage Labs
          </span>
        </Link>

        {/* Desktop links */}
        <ul
          style={{ display: 'flex', gap: 40, listStyle: 'none', margin: 0, padding: 0 }}
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

        {/* Right: divider + CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          style={{ display: 'flex', alignItems: 'center', gap: 20 }}
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

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
          className="md:hidden"
          type="button"
          style={{
            background: 'none',
            border: 'none',
            padding: 4,
            color: '#1C1C1E',
          }}
        >
          <Menu size={22} strokeWidth={1.5} />
        </button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              background: '#FAFAF8',
              display: 'flex',
              flexDirection: 'column',
              padding: '28px clamp(24px, 6vw, 48px)',
            }}
          >
            {/* Mobile header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 64 }}>
              <Link
                href={isHome ? '#hero' : '/'}
                onClick={() => setMobileOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}
              >
                <VMark />
                <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em', color: '#1C1C1E' }}>
                  Vantage Labs
                </span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                type="button"
              style={{ background: 'none', border: 'none', padding: 4, color: '#1C1C1E' }}
              >
                <X size={22} strokeWidth={1.5} />
              </button>
            </div>

            {/* Mobile links */}
            <nav style={{ flex: 1 }}>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.07, duration: 0.35, ease: 'easeOut' }}
                    style={{ borderBottom: '1px solid #E2E1DC' }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: 'block',
                        fontSize: 'clamp(28px, 8vw, 44px)',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        color: '#1C1C1E',
                        textDecoration: 'none',
                        paddingTop: 24,
                        paddingBottom: 24,
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Mobile CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.35 }}
            >
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'inline-block',
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#FAFAF8',
                  textDecoration: 'none',
                  padding: '14px 28px',
                  background: '#1C1C1E',
                  borderRadius: 100,
                  marginTop: 40,
                }}
              >
                Start a Project →
              </Link>
            </motion.div>

            {/* Mobile footer line */}
            <div style={{
              marginTop: 32,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(28,28,30,0.3)',
            }}>
              © 2026 Vantage Labs — BC, Canada
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
