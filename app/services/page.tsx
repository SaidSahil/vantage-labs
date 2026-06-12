'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus, Check } from 'lucide-react'
import { fadeUp, stagger, viewport } from '@/lib/animations'
import { useTheme } from '@/lib/theme'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const services = [
  {
    num: '01',
    title: 'Websites & Landing Pages',
    price: 'Starting at $399',
    tagline: 'Mobile-first, custom-coded sites that load fast, rank well, and actually convert.',
    bullets: [
      'Fully responsive — built for every screen size',
      'Clean semantic HTML/CSS — zero page builders',
      'Contact form with email delivery',
      'Basic on-page SEO: titles, meta, alt text',
      'Lighthouse 90+ performance target',
      'Full source files delivered on completion',
    ],
  },
  {
    num: '02',
    title: 'Custom Systems & Dashboards',
    price: 'Quoted per project',
    tagline: 'Booking systems, client portals, internal tools — built exactly to how your business operates.',
    bullets: [
      'Custom booking and appointment systems',
      'Admin dashboards with live data',
      'Client-facing portals and login flows',
      'Third-party API integrations',
      'Internal tools built for real workflows',
    ],
  },
  {
    num: '03',
    title: 'Ongoing Support & Maintenance',
    price: '$75 / month',
    tagline: 'Updates, edits, and monitoring after launch. We stay on so you can focus on your business.',
    bullets: [
      'Content and copy updates on request',
      'Security patches and dependency updates',
      'Monthly performance check',
      'Priority email support',
      'Minor layout tweaks included',
    ],
  },
  {
    num: '04',
    title: 'Add-ons & Enhancements',
    price: 'From $100',
    tagline: 'Bolt on exactly what you need — animations, booking embeds, branding, SEO. Nothing extra.',
    bullets: [
      'Animation & motion effects (+$100)',
      'Appointment booking embed (+$150)',
      'Logo & branding package (+$150)',
      'On-page SEO pass (+$120)',
      'OG image & social assets (+$75)',
    ],
  },
  {
    num: '05',
    title: 'Full Custom Build',
    price: 'Price discussed per project',
    tagline: 'Something bigger in mind? We scope it together — price depends entirely on what you need built.',
    bullets: [
      'Scoped collaboratively — you bring the idea, we define the build',
      'No fixed template — architecture designed around your requirements',
      'Can include any combination of our services',
      'Complex integrations, multi-user systems, or unique digital products',
      'Transparent breakdown of cost before any work begins',
      'Dedicated communication throughout — no guessing, no surprises',
    ],
  },
]

const tiers = [
  {
    name: 'Starter',
    price: '$399',
    sub: '1–3 pages',
    desc: 'For local businesses that need a clean, fast, professional web presence.',
    features: [
      '1–3 custom pages',
      'Mobile responsive design',
      'Contact form',
      'Basic on-page SEO',
      'Fast load times',
      'Source files included',
    ],
    cta: 'Start Here',
    highlight: false,
  },
  {
    name: 'Growth',
    price: '$799',
    sub: 'Up to 6 pages',
    desc: 'For businesses ready to scale with animation, custom design, and a CMS.',
    features: [
      'Up to 6 custom pages',
      'Framer Motion animations',
      'CMS or blog integration',
      'Custom design system',
      'Advanced SEO setup',
      'Priority support',
    ],
    cta: 'Most Popular',
    highlight: true,
  },
  {
    name: 'Pro',
    price: '$1,299+',
    sub: 'Full build',
    desc: 'Full-stack builds with booking systems, dashboards, and complex functionality.',
    features: [
      'Full custom site',
      'Booking or portal system',
      'Dashboard & data views',
      'Third-party integrations',
      'Performance optimized',
      '30-day post-launch support',
    ],
    cta: "Let's Talk",
    highlight: false,
  },
]

const addons = [
  { label: 'Animation & Motion Effects', price: '+$100' },
  { label: 'Appointment Booking Embed', price: '+$150' },
  { label: 'Logo & Branding Package', price: '+$150' },
  { label: 'On-Page SEO Pass', price: '+$120' },
  { label: 'OG Image & Social Assets', price: '+$75' },
  { label: 'Monthly Maintenance', price: '+$75/mo' },
]

export default function ServicesPage() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState<string | null>('01')
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  return (
    <main style={{ background: 'var(--na-bg)', minHeight: '100vh' }}>

      {/* ── Navbar ─────────────────────────────────────────── */}
      <nav
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 'clamp(24px, 4vw, 56px)',
          paddingRight: 'clamp(24px, 4vw, 56px)',
          paddingTop: scrolled ? 16 : 28,
          paddingBottom: scrolled ? 16 : 28,
          background: 'var(--na-nav-bg)',
          backdropFilter: 'blur(18px)',
          borderBottom: '1px solid var(--na-border-mid)',
          transition: 'padding 0.35s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
          <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="3" stroke="var(--na-accent)" strokeWidth="1.5"/>
            <line x1="11" y1="1" x2="11" y2="7" stroke="var(--na-accent)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="11" y1="15" x2="11" y2="21" stroke="var(--na-accent)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="1" y1="11" x2="7" y2="11" stroke="var(--na-accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
            <line x1="15" y1="11" x2="21" y2="11" stroke="var(--na-accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
          </svg>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--na-text)' }}>
            NodeAxis
          </span>
        </Link>

        <ul
          style={{ gap: 40, listStyle: 'none', margin: 0, padding: 0 }}
          className="hidden md:flex"
        >
          {[
            { href: '/work',  label: 'Work' },
            { href: '/services', label: 'Services', active: true },
            { href: '/contact', label: 'Contact' },
          ].map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                style={{
                  fontSize: 12,
                  fontWeight: link.active ? 600 : 400,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: link.active ? 'var(--na-text)' : 'var(--na-muted)',
                  textDecoration: 'none',
                  position: 'relative',
                  paddingBottom: 2,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => { if (!link.active) e.currentTarget.style.color = 'var(--na-text)' }}
                onMouseLeave={e => { if (!link.active) e.currentTarget.style.color = 'var(--na-muted)' }}
              >
                {link.label}
                {link.active && (
                  <span style={{
                    position: 'absolute',
                    bottom: -4,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 4,
                    height: 4,
                    borderRadius: '50%',
                    background: 'var(--na-accent)',
                  }} />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 12 }}>
          <div style={{ width: 1, height: 18, background: 'var(--na-border-mid)' }} />
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="theme-toggle"
          >
            {theme === 'dark' ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
          <Link
            href="/contact"
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--na-text)',
              textDecoration: 'none',
              padding: '9px 20px',
              border: '1px solid var(--na-border-mid)',
              borderRadius: 100,
              transition: 'all 0.22s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--na-text)'
              e.currentTarget.style.color = 'var(--na-bg)'
              e.currentTarget.style.borderColor = 'var(--na-text)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'var(--na-text)'
              e.currentTarget.style.borderColor = 'var(--na-border-mid)'
            }}
          >
            Start a Project
          </Link>
        </div>
        {/* Mobile menu */}
        <div ref={menuRef} className="flex md:hidden" style={{ position: 'relative', alignItems: 'center', gap: 8 }}>
          <button
            type="button"
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="theme-toggle"
          >
            {theme === 'dark' ? (
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
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
              borderColor: menuOpen ? 'var(--na-text)' : 'var(--na-border-mid)',
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
              color: menuOpen ? 'var(--na-bg)' : 'var(--na-text)',
              transition: 'color 0.2s ease',
            }}>
              Menu
            </span>
            <motion.svg
              width="10" height="10" viewBox="0 0 10 10" fill="none"
              animate={{ rotate: menuOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              aria-hidden="true"
            >
              <path d="M2 3.5L5 6.5L8 3.5" stroke={menuOpen ? 'var(--na-bg)' : 'var(--na-text)'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
                  zIndex: 100,
                }}
              >
                {[
                  { href: '/work', label: 'Work' },
                  { href: '/services', label: 'Services' },
                  { href: '/contact', label: 'Contact' },
                ].map((link, i, arr) => (
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
                      borderBottom: i < arr.length - 1 ? '1px solid var(--na-border-mid)' : 'none',
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
                      color: 'var(--na-bg)',
                      textDecoration: 'none',
                      padding: '10px 16px',
                      background: 'var(--na-text)',
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

      {/* ── Hero ───────────────────────────────────────────── */}
      <section
        style={{
          minHeight: '55vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(120px, 16vw, 180px) clamp(24px, 4vw, 56px) clamp(64px, 8vw, 88px)',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid var(--na-border-mid)',
        }}
      >
        {/* Ghost number */}
        <div
          aria-hidden="true"
          className="hidden md:block"
          style={{
            position: 'absolute',
            right: 'clamp(24px, 4vw, 56px)',
            bottom: -16,
            fontSize: 'clamp(120px, 22vw, 260px)',
            fontWeight: 800,
            letterSpacing: '-0.06em',
            color: 'var(--na-text)',
            opacity: 0.04,
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          03
        </div>

        {/* Decorative SVG */}
        <svg
          aria-hidden="true"
          width="220" height="220"
          viewBox="0 0 220 220"
          className="hidden md:block"
          style={{
            position: 'absolute',
            top: 80,
            right: 'clamp(80px, 10vw, 140px)',
            opacity: 0.08,
            pointerEvents: 'none',
          }}
        >
          <rect x="10" y="10" width="90" height="90" rx="4" stroke="var(--na-accent)" strokeWidth="1.5" fill="none" transform="rotate(15, 55, 55)" />
          <rect x="90" y="90" width="110" height="110" rx="4" stroke="var(--na-accent)" strokeWidth="1.5" fill="none" transform="rotate(15, 145, 145)" />
        </svg>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger(0.1)}
        >
          {/* Back + label */}
          <motion.div variants={fadeUp} style={{ marginBottom: 28 }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--na-muted)',
                textDecoration: 'none',
                marginBottom: 20,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--na-text)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--na-muted)')}
            >
              <ArrowLeft size={11} strokeWidth={2.5} />
              Home
            </Link>
            <div className="section-label">03 — What We Build</div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: 'clamp(48px, 9vw, 124px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              color: 'var(--na-text)',
              marginBottom: 32,
            }}
          >
            We build<br />
            <span style={{ fontWeight: 300, fontStyle: 'italic', color: 'var(--na-muted)' }}>what works.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 'clamp(14px, 1.4vw, 17px)',
              fontWeight: 400,
              color: 'var(--na-muted)',
              maxWidth: 460,
              lineHeight: 1.75,
            }}
          >
            Every project starts from scratch. No templates, no shortcuts.
            Just custom-built digital that your business actually needs.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Services Accordion ─────────────────────────────── */}
      <section
        style={{
          background: 'var(--na-bg)',
          padding: 'clamp(72px, 9vw, 112px) clamp(24px, 4vw, 56px)',
          position: 'relative',
        }}
      >
        {/* Left vertical accent */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: 2,
            background: 'var(--na-accent)',
            opacity: 0.12,
          }}
        />

        {/* Header row */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: 14,
          }}
        >
          <span className="section-label">Services</span>
          <span style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--na-muted)',
          }}>
            Click to expand
          </span>
        </motion.div>

        {/* Top rule */}
        <motion.div
          initial={{ scaleX: 0, originX: '0%' }}
          whileInView={{ scaleX: 1 }}
          viewport={viewport}
          transition={{ duration: 0.6, ease }}
          style={{ height: 1, background: 'var(--na-border-mid)', marginBottom: 0 }}
        />

        {/* Rows */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger(0.07)}
        >
          {services.map((svc) => {
            const isOpen = open === svc.num
            return (
              <motion.div key={svc.num} variants={fadeUp}>
                <button
                  onClick={() => setOpen(isOpen ? null : svc.num)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    background: isOpen ? 'var(--na-surface)' : 'transparent',
                    border: 'none',
                    borderBottom: isOpen ? 'none' : '1px solid var(--na-border-mid)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    padding: `28px ${isOpen ? '20px' : '0px'}`,
                    transition: 'background 0.25s ease, padding 0.25s ease',
                    display: 'grid',
                    gridTemplateColumns: '44px 1fr auto auto',
                    alignItems: 'center',
                    gap: 20,
                  }}
                >
                  {/* Number */}
                  <span style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: isOpen ? 'var(--na-accent)' : 'var(--na-muted)',
                    transition: 'color 0.25s ease',
                  }}>
                    {svc.num}
                  </span>

                  {/* Title + tagline */}
                  <div>
                    <div style={{
                      fontSize: 'clamp(17px, 2.2vw, 26px)',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      color: 'var(--na-text)',
                      lineHeight: 1.2,
                      marginBottom: isOpen ? 0 : 4,
                    }}>
                      {svc.title}
                    </div>
                    {!isOpen && (
                      <div style={{
                        fontSize: 13,
                        color: 'var(--na-muted)',
                        lineHeight: 1.5,
                        fontWeight: 400,
                      }}>
                        {svc.tagline}
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <span
                    className="hidden sm:block"
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--na-accent)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {svc.price}
                  </span>

                  {/* Toggle icon */}
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      border: `1px solid ${isOpen ? 'var(--na-text)' : 'var(--na-border-mid)'}`,
                      background: isOpen ? 'var(--na-text)' : 'transparent',
                      color: isOpen ? 'var(--na-bg)' : 'var(--na-text)',
                      flexShrink: 0,
                      transition: 'background 0.25s ease, color 0.25s ease, border-color 0.25s ease',
                    }}
                  >
                    <Plus size={13} strokeWidth={2} />
                  </motion.span>
                </button>

                {/* Expanded panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.38, ease }}
                      style={{ overflow: 'hidden', borderBottom: '1px solid var(--na-border-mid)' }}
                    >
                      <div
                        style={{ background: 'var(--na-surface)', padding: 'clamp(24px, 3vw, 36px) 20px clamp(32px, 4vw, 44px)' }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                      >
                        {/* Bullets */}
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 13 }}>
                          {svc.bullets.map((b, i) => (
                            <motion.li
                              key={b}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.04 + i * 0.045, duration: 0.32, ease }}
                              style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 12,
                                fontSize: 14,
                                color: 'var(--na-text)',
                                lineHeight: 1.6,
                              }}
                            >
                              <span style={{
                                width: 18,
                                height: 18,
                                borderRadius: '50%',
                                background: 'var(--na-accent-dim)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                marginTop: 2,
                              }}>
                                <Check size={10} strokeWidth={2.5} color="var(--na-accent)" />
                              </span>
                              {b}
                            </motion.li>
                          ))}
                        </ul>

                        {/* CTA block */}
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.14, duration: 0.38, ease }}
                          style={{ display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'flex-start' }}
                        >
                          <div style={{
                            fontSize: 11,
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'var(--na-accent)',
                          }}>
                            {svc.price}
                          </div>
                          <Link
                            href="/contact"
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: 10,
                              fontSize: 12,
                              fontWeight: 700,
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                              color: 'var(--na-bg)',
                              background: 'var(--na-text)',
                              padding: '13px 24px',
                              borderRadius: 100,
                              textDecoration: 'none',
                              width: 'fit-content',
                              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.transform = 'translateY(-2px)'
                              e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.18)'
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.transform = 'translateY(0)'
                              e.currentTarget.style.boxShadow = 'none'
                            }}
                          >
                            Get a Quote
                            <ArrowUpRight size={13} strokeWidth={2} />
                          </Link>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      </section>

      {/* ── Pricing ────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--na-surface)',
          padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 56px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Dot grid */}
        <svg
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          <defs>
            <pattern id="srv-dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="var(--na-text)" opacity="0.06" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#srv-dots)" />
        </svg>

        <div style={{ position: 'relative' }}>
          {/* Section header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            style={{ marginBottom: 64 }}
          >
            <span className="section-label" style={{ display: 'block', marginBottom: 16 }}>
              Transparent Pricing
            </span>
            <h2 style={{
              fontSize: 'clamp(32px, 5vw, 60px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--na-text)',
              lineHeight: 1.05,
            }}>
              No surprises.<br />
              <span style={{ fontWeight: 300, fontStyle: 'italic', color: 'var(--na-muted)' }}>Just clear numbers.</span>
            </h2>
          </motion.div>

          {/* Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger(0.1)}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {tiers.map((tier) => (
              <motion.div
                key={tier.name}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                style={{
                  background: tier.highlight ? 'var(--na-text)' : 'var(--na-bg)',
                  border: tier.highlight ? 'none' : '1px solid var(--na-border-mid)',
                  borderRadius: 12,
                  padding: 'clamp(28px, 3vw, 40px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 24,
                  boxShadow: tier.highlight
                    ? '0 20px 60px rgba(0,0,0,0.14)'
                    : '0 2px 16px rgba(0,0,0,0.04)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Top accent on highlighted card */}
                {tier.highlight && (
                  <div style={{
                    position: 'absolute',
                    top: 0, left: 0, right: 0,
                    height: 2,
                    background: 'var(--na-accent)',
                  }} />
                )}

                {/* Tier header */}
                <div>
                  <div style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'var(--na-accent)',
                    marginBottom: 10,
                  }}>
                    {tier.name}
                  </div>
                  <div style={{
                    fontSize: 'clamp(36px, 5vw, 54px)',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    color: tier.highlight ? 'var(--na-inv-text)' : 'var(--na-text)',
                    lineHeight: 1,
                    marginBottom: 4,
                  }}>
                    {tier.price}
                  </div>
                  <div style={{
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    color: tier.highlight ? 'var(--na-inv-muted)' : 'var(--na-muted)',
                    marginBottom: 14,
                  }}>
                    {tier.sub}
                  </div>
                  <p style={{
                    fontSize: 13,
                    lineHeight: 1.65,
                    color: tier.highlight ? 'var(--na-inv-muted)' : 'var(--na-muted)',
                  }}>
                    {tier.desc}
                  </p>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: tier.highlight ? 'rgba(255,255,255,0.08)' : 'var(--na-border-mid)' }} />

                {/* Features */}
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 11, flex: 1 }}>
                  {tier.features.map(f => (
                    <li
                      key={f}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                        fontSize: 13,
                        color: tier.highlight ? 'rgba(255,255,255,0.72)' : 'var(--na-text)',
                        lineHeight: 1.5,
                      }}
                    >
                      <span style={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        background: tier.highlight ? 'rgba(61,90,128,0.45)' : 'var(--na-accent-dim)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: 1,
                      }}>
                        <Check size={9} strokeWidth={2.5} color="var(--na-accent)" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href="/contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: tier.highlight ? 'var(--na-text)' : 'var(--na-bg)',
                    background: tier.highlight ? 'var(--na-inv-text)' : 'var(--na-text)',
                    padding: '14px 24px',
                    borderRadius: 100,
                    textDecoration: 'none',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,0.15)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  {tier.cta}
                  <ArrowRight size={13} strokeWidth={2} />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Payment note */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={fadeUp}
            style={{
              marginTop: 32,
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: '0.04em',
              color: 'var(--na-muted)',
              textAlign: 'center',
            }}
          >
            50% upfront · 50% on delivery · No hidden fees
          </motion.p>
        </div>
      </section>

      {/* ── Add-ons ────────────────────────────────────────── */}
      <section
        style={{
          background: 'var(--na-bg)',
          padding: 'clamp(72px, 9vw, 112px) clamp(24px, 4vw, 56px)',
          borderTop: '1px solid var(--na-border-mid)',
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          style={{ marginBottom: 52 }}
        >
          <span className="section-label" style={{ display: 'block', marginBottom: 16 }}>
            Add-ons
          </span>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 48px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'var(--na-text)',
            lineHeight: 1.1,
          }}>
            Bolt on what you need.
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger(0.055)}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          {addons.map((addon) => (
            <motion.div
              key={addon.label}
              variants={fadeUp}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 0',
                borderBottom: '1px solid var(--na-border-mid)',
                gap: 20,
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--na-text)', lineHeight: 1.4 }}>
                {addon.label}
              </span>
              <span style={{
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--na-accent)',
                whiteSpace: 'nowrap',
                letterSpacing: '0.04em',
              }}>
                {addon.price}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          style={{
            marginTop: 32,
            fontSize: 13,
            fontStyle: 'italic',
            color: 'var(--na-accent)',
            lineHeight: 1.6,
          }}
        >
          "Need something not listed? We'll quote it."
        </motion.p>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section
        data-cursor-dark
        style={{
          background: 'var(--na-inv-bg)',
          padding: 'clamp(100px, 14vw, 160px) clamp(24px, 4vw, 56px)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Diagonal lines */}
        <svg
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            opacity: 0.06,
          }}
        >
          <line x1="0" y1="100%" x2="100%" y2="0" stroke="#FFFFFF" strokeWidth="1" />
          <line x1="0" y1="75%" x2="75%" y2="0" stroke="#FFFFFF" strokeWidth="1" />
        </svg>

        {/* Ghost char */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 'clamp(200px, 40vw, 420px)',
            fontWeight: 800,
            color: '#FFFFFF',
            opacity: 0.02,
            lineHeight: 1,
            letterSpacing: '-0.05em',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          ?
        </div>

        <div style={{ position: 'relative' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger(0.12)}
          >
            <motion.span
              variants={fadeUp}
              style={{
                display: 'block',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'var(--na-inv-muted)',
                marginBottom: 24,
              }}
            >
              Let's Build Together
            </motion.span>

            <motion.h2
              variants={fadeUp}
              style={{
                fontSize: 'clamp(52px, 11vw, 128px)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                color: 'var(--na-inv-text)',
                lineHeight: 0.92,
                marginBottom: 32,
              }}
            >
              Ready to build?
            </motion.h2>

            <motion.p
              variants={fadeUp}
              style={{
                fontSize: 'clamp(14px, 1.4vw, 17px)',
                color: 'var(--na-inv-muted)',
                maxWidth: 460,
                margin: '0 auto 52px',
                lineHeight: 1.75,
                fontWeight: 300,
              }}
            >
              Book a free 30-minute call or send a message.
              No pressure, no sales pitch.
            </motion.p>

            <motion.div
              variants={fadeUp}
              style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
            >
              <button
                className="btn-primary"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).Calendly) {
                    (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/nodeaxis' })
                  }
                }}
                style={{ cursor: 'pointer' }}
              >
                Book a Call
                <ArrowRight size={15} strokeWidth={2} />
              </button>
              <Link href="/contact" className="btn-ghost">
                Send a Message
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer
        style={{
          background: 'var(--na-inv-bg)',
          borderTop: '1px solid var(--na-inv-border)',
          padding: 'clamp(28px, 4vw, 44px) clamp(24px, 4vw, 56px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
          <svg width="18" height="18" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="3" stroke="var(--na-inv-accent)" strokeWidth="1.5"/>
            <line x1="11" y1="1" x2="11" y2="7" stroke="var(--na-inv-accent)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="11" y1="15" x2="11" y2="21" stroke="var(--na-inv-accent)" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="1" y1="11" x2="7" y2="11" stroke="var(--na-inv-accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
            <line x1="15" y1="11" x2="21" y2="11" stroke="var(--na-inv-accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
          </svg>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--na-inv-text)' }}>
            NodeAxis
          </span>
        </Link>

        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          <Link href="/work" className="footer-link">Work</Link>
          <Link href="/services" className="footer-link" style={{ color: 'rgba(255,255,255,0.55)' }}>Services</Link>
          <Link href="/contact" className="footer-link">Contact</Link>
        </div>

        <span style={{
          fontSize: 11,
          color: 'var(--na-inv-muted)',
          fontWeight: 500,
          letterSpacing: '0.06em',
        }}>
          © 2026 NodeAxis · BC, Canada
        </span>
      </footer>

    </main>
  )
}
