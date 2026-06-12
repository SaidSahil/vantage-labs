'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Mail, MapPin, Clock, ChevronDown } from 'lucide-react'
import { fadeUp, stagger, viewport } from '@/lib/animations'
import { useTheme } from '@/lib/theme'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const trustPoints = [
  'Response within 24 hours — guaranteed.',
  'No commitment required to get a quote.',
  'Transparent pricing from the very first call.',
]

const contactDetails = [
  { Icon: Mail,   label: 'Email',        value: 'hello@nodeaxis.ca',         href: 'mailto:hello@nodeaxis.ca' },
  { Icon: MapPin, label: 'Location',     value: 'BC, Canada',                href: null },
  { Icon: Clock,  label: 'Availability', value: 'Mon — Fri, 9am — 6pm PST',  href: null },
]

const serviceOptions = [
  'Website or Landing Page',
  'Custom System or Dashboard',
  'Ongoing Support & Maintenance',
  'Full Custom Build',
  "Not sure yet — let's talk",
]

const budgetOptions = [
  'Under $500',
  '$500 — $1,000',
  '$1,000 — $2,500',
  '$2,500+',
  "Let's discuss",
]

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactPage() {
  const [scrolled, setScrolled] = useState(false)
  const [focused, setFocused] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', service: '', budget: '', message: '' })
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

  function update(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('https://formspree.io/f/xanyzkov', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  function fieldStyle(name: string): React.CSSProperties {
    const active = focused === name
    return {
      width: '100%',
      padding: '14px 16px',
      fontSize: 15,
      fontFamily: 'inherit',
      background: 'var(--na-bg)',
      border: `1.5px solid ${active ? 'var(--na-accent)' : 'var(--na-border-mid)'}`,
      borderRadius: 8,
      color: 'var(--na-text)',
      outline: 'none',
      transition: 'border-color 200ms ease-out, box-shadow 200ms ease-out',
      boxShadow: active ? '0 0 0 3px var(--na-accent-dim)' : 'none',
    }
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--na-muted)',
    marginBottom: 8,
  }

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
            { href: '/work',     label: 'Work',     active: false },
            { href: '/services', label: 'Services', active: false },
            { href: '/contact',  label: 'Contact',  active: true  },
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
        <div ref={menuRef} className="md:hidden" style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8 }}>
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

      {/* ── Hero ─────────────────────────────────────────────── */}
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
          06
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
            <div className="section-label">06 — Get in Touch</div>
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
            Let&apos;s build<br />
            <span style={{ fontWeight: 300, fontStyle: 'italic', color: 'var(--na-muted)' }}>something.</span>
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
            Tell us what you&apos;re building. We&apos;ll scope it, price it honestly,
            and get back to you within a day.
          </motion.p>
        </motion.div>
      </section>

      {/* ── Content ─────────────────────────────────────────── */}
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

        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gap: 'clamp(48px, 7vw, 100px)',
            alignItems: 'start',
          }}
          className="grid-cols-1 md:grid-cols-2"
        >

          {/* ─ Left: info ─ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger(0.1)}
          >
            <motion.h2
              variants={fadeUp}
              style={{
                fontSize: 'clamp(24px, 3vw, 36px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--na-text)',
                marginBottom: 16,
              }}
            >
              Start the conversation.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              style={{ fontSize: 16, color: 'var(--na-muted)', lineHeight: 1.75, marginBottom: 48, maxWidth: 380 }}
            >
              No sales pitch. No commitment. Just an honest conversation about what you need and what it costs.
            </motion.p>

            {/* Trust points */}
            <motion.div variants={stagger(0.08)} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 52 }}>
              {trustPoints.map((pt, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  style={{ display: 'flex', alignItems: 'center', gap: 14 }}
                >
                  <div style={{
                    width: 24, height: 24,
                    borderRadius: '50%',
                    border: '1px solid var(--na-border-mid)',
                    background: 'var(--na-bg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Check size={11} color="var(--na-accent)" strokeWidth={2.5} />
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--na-text)' }}>{pt}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Divider */}
            <motion.div
              variants={fadeUp}
              style={{ borderTop: '1px solid var(--na-border-mid)', paddingTop: 40, display: 'flex', flexDirection: 'column', gap: 24 }}
            >
              {contactDetails.map(({ Icon, label, value, href }, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{
                    width: 36, height: 36,
                    borderRadius: 8,
                    border: '1px solid var(--na-border-mid)',
                    background: 'var(--na-surface)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={15} color="var(--na-accent)" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--na-muted)', marginBottom: 3 }}>
                      {label}
                    </div>
                    {href ? (
                      <a href={href} style={{ fontSize: 14, fontWeight: 500, color: 'var(--na-text)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--na-accent)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--na-text)')}
                      >
                        {value}
                      </a>
                    ) : (
                      <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--na-text)' }}>{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ─ Right: form ─ */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.65, ease }}
          >
            <div style={{
              background: 'var(--na-surface)',
              border: '1px solid var(--na-border-mid)',
              borderRadius: 16,
              padding: 'clamp(32px, 4vw, 48px)',
            }}>
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease }}
                    style={{ textAlign: 'center', padding: '52px 24px' }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15, duration: 0.4, ease }}
                      style={{
                        width: 56, height: 56,
                        borderRadius: '50%',
                        border: '1px solid var(--na-border-mid)',
                        background: 'var(--na-bg)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 28px',
                      }}
                    >
                      <Check size={22} color="var(--na-accent)" strokeWidth={2} />
                    </motion.div>
                    <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--na-text)', letterSpacing: '-0.02em', marginBottom: 12 }}>
                      Message sent.
                    </h2>
                    <p style={{ fontSize: 15, color: 'var(--na-muted)', lineHeight: 1.65 }}>
                      We&apos;ll be in touch within 24 hours.<br />Talk soon.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    exit={{ opacity: 0 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: 22 }}
                  >
                    <div style={{ marginBottom: 4 }}>
                      <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--na-text)', letterSpacing: '-0.02em', marginBottom: 6 }}>
                        Tell us about your project
                      </h2>
                      <p style={{ fontSize: 14, color: 'var(--na-muted)', lineHeight: 1.6 }}>
                        We read every message and respond personally.
                      </p>
                    </div>

                    {/* Name + Email */}
                    <div style={{ display: 'grid', gap: 14 }} className="grid-cols-1 sm:grid-cols-2">
                      <div>
                        <label htmlFor="c-name" style={labelStyle}>Name</label>
                        <input
                          id="c-name"
                          type="text"
                          required
                          placeholder="Your name"
                          value={form.name}
                          onChange={e => update('name', e.target.value)}
                          onFocus={() => setFocused('name')}
                          onBlur={() => setFocused(null)}
                          style={fieldStyle('name')}
                        />
                      </div>
                      <div>
                        <label htmlFor="c-email" style={labelStyle}>Email</label>
                        <input
                          id="c-email"
                          type="email"
                          required
                          placeholder="you@email.com"
                          value={form.email}
                          onChange={e => update('email', e.target.value)}
                          onFocus={() => setFocused('email')}
                          onBlur={() => setFocused(null)}
                          style={fieldStyle('email')}
                        />
                      </div>
                    </div>

                    {/* Service */}
                    <div>
                      <label htmlFor="c-service" style={labelStyle}>What are you looking for?</label>
                      <div style={{ position: 'relative' }}>
                        <select
                          id="c-service"
                          required
                          value={form.service}
                          onChange={e => update('service', e.target.value)}
                          onFocus={() => setFocused('service')}
                          onBlur={() => setFocused(null)}
                          style={{ ...fieldStyle('service'), appearance: 'none', cursor: 'pointer', paddingRight: 42 }}
                        >
                          <option value="">Select a service…</option>
                          {serviceOptions.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <ChevronDown size={14} color="var(--na-muted)" strokeWidth={2} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                      </div>
                    </div>

                    {/* Budget */}
                    <div>
                      <label htmlFor="c-budget" style={labelStyle}>Budget range</label>
                      <div style={{ position: 'relative' }}>
                        <select
                          id="c-budget"
                          value={form.budget}
                          onChange={e => update('budget', e.target.value)}
                          onFocus={() => setFocused('budget')}
                          onBlur={() => setFocused(null)}
                          style={{ ...fieldStyle('budget'), appearance: 'none', cursor: 'pointer', paddingRight: 42 }}
                        >
                          <option value="">Select a range…</option>
                          {budgetOptions.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                        <ChevronDown size={14} color="var(--na-muted)" strokeWidth={2} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="c-message" style={labelStyle}>Message</label>
                      <textarea
                        id="c-message"
                        required
                        rows={5}
                        placeholder="Tell us what you're building, what you need, or just say hello."
                        value={form.message}
                        onChange={e => update('message', e.target.value)}
                        onFocus={() => setFocused('message')}
                        onBlur={() => setFocused(null)}
                        style={{ ...fieldStyle('message'), resize: 'vertical', minHeight: 120 }}
                      />
                    </div>

                    {/* Error */}
                    {status === 'error' && (
                      <p style={{ fontSize: 13, color: '#c0392b', fontWeight: 500 }}>
                        Something went wrong. Email us at{' '}
                        <a href="mailto:hello@nodeaxis.ca" style={{ color: '#c0392b' }}>
                          hello@nodeaxis.ca
                        </a>
                      </p>
                    )}

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      whileHover={{ scale: status === 'loading' ? 1 : 1.015 }}
                      whileTap={{ scale: status === 'loading' ? 1 : 0.98 }}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 10,
                        padding: '15px 32px',
                        background: 'var(--na-text)',
                        color: 'var(--na-bg)',
                        border: 'none',
                        borderRadius: 100,
                        fontSize: 12,
                        fontWeight: 700,
                        fontFamily: 'inherit',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                        opacity: status === 'loading' ? 0.7 : 1,
                        transition: 'opacity 200ms ease-out, box-shadow 200ms ease-out',
                      }}
                    >
                      {status === 'loading' ? (
                        <>
                          <span style={{
                            width: 14, height: 14,
                            border: '2px solid rgba(255,255,255,0.3)',
                            borderTopColor: '#fff',
                            borderRadius: '50%',
                            animation: 'spin 0.7s linear infinite',
                            display: 'inline-block',
                            flexShrink: 0,
                          }} />
                          Sending…
                        </>
                      ) : (
                        <>
                          Send Message
                          <ArrowRight size={14} strokeWidth={2} />
                        </>
                      )}
                    </motion.button>

                    <p style={{ fontSize: 12, color: 'var(--na-muted)', textAlign: 'center' }}>
                      Or email us directly at{' '}
                      <a href="mailto:hello@nodeaxis.ca" style={{ color: 'var(--na-muted)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--na-accent)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--na-muted)')}
                      >
                        hello@nodeaxis.ca
                      </a>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
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
          <Link href="/work"     className="footer-link">Work</Link>
          <Link href="/services" className="footer-link">Services</Link>
          <Link href="/contact"  className="footer-link" style={{ color: 'rgba(255,255,255,0.55)' }}>Contact</Link>
        </div>

        <span style={{ fontSize: 11, color: 'var(--na-inv-muted)', fontWeight: 500, letterSpacing: '0.06em' }}>
          © 2026 NodeAxis · BC, Canada
        </span>
      </footer>

    </main>
  )
}
