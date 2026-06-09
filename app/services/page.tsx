'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus, Check } from 'lucide-react'
import { fadeUp, stagger, viewport } from '@/lib/animations'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

function VMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="10" height="10" rx="1.5" stroke="#3D5A80" strokeWidth="1.5" />
      <rect x="11" y="11" width="10" height="10" rx="1.5" stroke="#3D5A80" strokeWidth="1.5" />
      <rect x="11" y="1" width="10" height="10" rx="1.5" stroke="#3D5A80" strokeWidth="1.5" opacity="0.3" />
    </svg>
  )
}

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main style={{ background: '#FAFAF8', minHeight: '100vh' }}>

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
          background: 'rgba(250,250,248,0.94)',
          backdropFilter: 'blur(18px)',
          borderBottom: '1px solid #E2E1DC',
          transition: 'padding 0.35s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 9, textDecoration: 'none' }}>
          <VMark />
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '-0.01em', color: '#1C1C1E' }}>
            Vantage Labs
          </span>
        </Link>

        <ul
          style={{ display: 'flex', gap: 40, listStyle: 'none', margin: 0, padding: 0 }}
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
                  color: link.active ? '#1C1C1E' : 'rgba(28,28,30,0.55)',
                  textDecoration: 'none',
                  position: 'relative',
                  paddingBottom: 2,
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => { if (!link.active) e.currentTarget.style.color = '#1C1C1E' }}
                onMouseLeave={e => { if (!link.active) e.currentTarget.style.color = 'rgba(28,28,30,0.55)' }}
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
                    background: '#3D5A80',
                  }} />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden md:inline-block"
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
        <Link
          href="/contact"
          className="md:hidden"
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: '#1C1C1E',
            textDecoration: 'none',
            padding: '9px 18px',
            border: '1px solid rgba(28,28,30,0.18)',
            borderRadius: 100,
            whiteSpace: 'nowrap',
          }}
        >
          Contact
        </Link>
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
          borderBottom: '1px solid #E2E1DC',
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
            color: '#1C1C1E',
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
          <rect x="10" y="10" width="90" height="90" rx="4" stroke="#3D5A80" strokeWidth="1.5" fill="none" transform="rotate(15, 55, 55)" />
          <rect x="90" y="90" width="110" height="110" rx="4" stroke="#3D5A80" strokeWidth="1.5" fill="none" transform="rotate(15, 145, 145)" />
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
                color: 'rgba(28,28,30,0.3)',
                textDecoration: 'none',
                marginBottom: 20,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(28,28,30,0.7)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(28,28,30,0.3)')}
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
              color: '#1C1C1E',
              marginBottom: 32,
            }}
          >
            We build<br />
            <span style={{ fontWeight: 300, fontStyle: 'italic', color: '#8A8A8E' }}>what works.</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 'clamp(14px, 1.4vw, 17px)',
              fontWeight: 400,
              color: '#8A8A8E',
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
          background: '#FFFFFF',
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
            background: '#3D5A80',
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
            color: 'rgba(28,28,30,0.25)',
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
          style={{ height: 1, background: '#E2E1DC', marginBottom: 0 }}
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
                    background: isOpen ? '#F0EFE9' : 'transparent',
                    border: 'none',
                    borderBottom: isOpen ? 'none' : '1px solid #E2E1DC',
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
                    color: isOpen ? '#3D5A80' : 'rgba(28,28,30,0.22)',
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
                      color: '#1C1C1E',
                      lineHeight: 1.2,
                      marginBottom: isOpen ? 0 : 4,
                    }}>
                      {svc.title}
                    </div>
                    {!isOpen && (
                      <div style={{
                        fontSize: 13,
                        color: 'rgba(28,28,30,0.38)',
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
                      color: '#3D5A80',
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
                      border: `1px solid ${isOpen ? '#1C1C1E' : '#E2E1DC'}`,
                      background: isOpen ? '#1C1C1E' : 'transparent',
                      color: isOpen ? '#FFFFFF' : '#1C1C1E',
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
                      style={{ overflow: 'hidden', borderBottom: '1px solid #E2E1DC' }}
                    >
                      <div
                        style={{ background: '#F0EFE9', padding: 'clamp(24px, 3vw, 36px) 20px clamp(32px, 4vw, 44px)' }}
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
                                color: '#1C1C1E',
                                lineHeight: 1.6,
                              }}
                            >
                              <span style={{
                                width: 18,
                                height: 18,
                                borderRadius: '50%',
                                background: 'rgba(61,90,128,0.12)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                marginTop: 2,
                              }}>
                                <Check size={10} strokeWidth={2.5} color="#3D5A80" />
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
                            color: '#3D5A80',
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
                              color: '#FAFAF8',
                              background: '#1C1C1E',
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
          background: '#F0EFE9',
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
              <circle cx="1" cy="1" r="1" fill="#1C1C1E" opacity="0.06" />
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
              color: '#1C1C1E',
              lineHeight: 1.05,
            }}>
              No surprises.<br />
              <span style={{ fontWeight: 300, fontStyle: 'italic', color: '#8A8A8E' }}>Just clear numbers.</span>
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
                  background: tier.highlight ? '#1C1C1E' : '#FFFFFF',
                  border: tier.highlight ? 'none' : '1px solid #E2E1DC',
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
                    background: '#3D5A80',
                  }} />
                )}

                {/* Tier header */}
                <div>
                  <div style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#3D5A80',
                    marginBottom: 10,
                  }}>
                    {tier.name}
                  </div>
                  <div style={{
                    fontSize: 'clamp(36px, 5vw, 54px)',
                    fontWeight: 800,
                    letterSpacing: '-0.04em',
                    color: tier.highlight ? '#FFFFFF' : '#1C1C1E',
                    lineHeight: 1,
                    marginBottom: 4,
                  }}>
                    {tier.price}
                  </div>
                  <div style={{
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    color: tier.highlight ? 'rgba(255,255,255,0.35)' : 'rgba(28,28,30,0.38)',
                    marginBottom: 14,
                  }}>
                    {tier.sub}
                  </div>
                  <p style={{
                    fontSize: 13,
                    lineHeight: 1.65,
                    color: tier.highlight ? 'rgba(255,255,255,0.48)' : 'rgba(28,28,30,0.55)',
                  }}>
                    {tier.desc}
                  </p>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: tier.highlight ? 'rgba(255,255,255,0.08)' : '#E2E1DC' }} />

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
                        color: tier.highlight ? 'rgba(255,255,255,0.72)' : '#1C1C1E',
                        lineHeight: 1.5,
                      }}
                    >
                      <span style={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        background: tier.highlight ? 'rgba(61,90,128,0.45)' : 'rgba(61,90,128,0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: 1,
                      }}>
                        <Check size={9} strokeWidth={2.5} color="#3D5A80" />
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
                    color: tier.highlight ? '#1C1C1E' : '#FAFAF8',
                    background: tier.highlight ? '#FFFFFF' : '#1C1C1E',
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
              color: 'rgba(28,28,30,0.38)',
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
          background: '#FFFFFF',
          padding: 'clamp(72px, 9vw, 112px) clamp(24px, 4vw, 56px)',
          borderTop: '1px solid #E2E1DC',
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
            color: '#1C1C1E',
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
                borderBottom: '1px solid #E2E1DC',
                gap: 20,
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 500, color: '#1C1C1E', lineHeight: 1.4 }}>
                {addon.label}
              </span>
              <span style={{
                fontSize: 13,
                fontWeight: 700,
                color: '#3D5A80',
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
            color: '#3D5A80',
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
          background: '#1C1C1E',
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
                color: 'rgba(255,255,255,0.28)',
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
                color: '#FFFFFF',
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
                color: 'rgba(255,255,255,0.38)',
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
                    // TODO: replace with actual Calendly link
                    (window as any).Calendly.initPopupWidget({ url: 'https://calendly.com/vantagelabs' })
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
          background: '#141416',
          borderTop: '1px solid rgba(255,255,255,0.06)',
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
            <rect x="1" y="1" width="10" height="10" rx="1.5" stroke="#3D5A80" strokeWidth="1.5" />
            <rect x="11" y="11" width="10" height="10" rx="1.5" stroke="#3D5A80" strokeWidth="1.5" />
            <rect x="11" y="1" width="10" height="10" rx="1.5" stroke="#3D5A80" strokeWidth="1.5" opacity="0.3" />
          </svg>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '-0.01em', color: 'rgba(255,255,255,0.6)' }}>
            Vantage Labs
          </span>
        </Link>

        <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
          <Link href="/work" className="footer-link">Work</Link>
          <Link href="/services" className="footer-link" style={{ color: 'rgba(255,255,255,0.55)' }}>Services</Link>
          <Link href="/contact" className="footer-link">Contact</Link>
        </div>

        <span style={{
          fontSize: 11,
          color: 'rgba(255,255,255,0.18)',
          fontWeight: 500,
          letterSpacing: '0.06em',
        }}>
          © 2026 Vantage Labs · BC, Canada
        </span>
      </footer>

    </main>
  )
}
