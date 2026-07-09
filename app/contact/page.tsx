'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Mail, MapPin, Clock, Phone, ChevronDown } from 'lucide-react'
import { fadeUp, stagger, ease, viewport as vp } from '@/lib/animations'
import { hasAnalyticsConsent, getSessionId } from '@/lib/tracking'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const trustPoints = [
  'Response within 24 hours — guaranteed.',
  'No commitment required to get a quote.',
  'Transparent pricing from the very first call.',
]

const contactDetails = [
  { Icon: Phone,  label: 'Phone',        value: '778-240-8911',              href: 'tel:+17782408911' },
  { Icon: Mail,   label: 'Email',        value: 'info@nodeaxis.ca',          href: 'mailto:info@nodeaxis.ca' },
  { Icon: MapPin, label: 'Location',     value: 'BC, Canada',                href: null },
  { Icon: Clock,  label: 'Availability', value: 'Mon — Fri, 9am — 6pm PST', href: null },
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

function WordReveal({ words, baseDelay = 0, style }: { words: string[]; baseDelay?: number; style?: React.CSSProperties }) {
  return (
    <span style={{ display: 'block', ...style }}>
      {words.map((word, i) => (
        <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
          <motion.span
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ delay: baseDelay + i * 0.07, duration: 0.8, ease }}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && <span style={{ display: 'inline-block', width: '0.28em' }} />}
        </span>
      ))}
    </span>
  )
}

export default function ContactPage() {
  const [focused, setFocused] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  // `company` is a honeypot — kept empty by real users, only bots fill it.
  const [form, setForm] = useState({ name: '', email: '', service: '', budget: '', message: '', company: '' })

  function update(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          path: window.location.pathname,
          // Only attach the session id when the visitor has already opted into
          // analytics — a form submission shouldn't itself create a tracking id.
          sessionId: hasAnalyticsConsent() ? getSessionId() : undefined,
        }),
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ContactPage',
            name: 'Contact NodeAxis',
            url: 'https://nodeaxis.ca/contact',
            description: 'Get in touch with NodeAxis to start your custom website project.',
            mainEntity: {
              '@type': 'Organization',
              name: 'NodeAxis',
              telephone: '+17782408911',
              email: 'info@nodeaxis.ca',
              url: 'https://nodeaxis.ca',
            },
          }),
        }}
      />

      <Navbar />

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
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5, ease }}
            style={{ marginBottom: 28 }}
          >
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

          {/* Headline — word reveal matching home hero */}
          <h1
            style={{
              fontSize: 'clamp(48px, 9vw, 124px)',
              fontWeight: 700,
              letterSpacing: '-0.04em',
              lineHeight: 0.92,
              color: 'var(--na-text)',
              marginBottom: 32,
            }}
          >
            <WordReveal words={['Get', 'Your']} baseDelay={0.15} />
            <WordReveal
              words={['Website', 'Built.']}
              baseDelay={0.35}
              style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--na-heading)' }}
            />
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.6, ease: 'easeOut' }}
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

          {/* Person at desk character illustration */}
          <motion.div
            aria-hidden="true"
            className="hidden lg:block"
            style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 0, pointerEvents: 'none' }}
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          >
            <svg
              width="280" height="320"
              viewBox="0 0 280 320"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: 'var(--na-text)', opacity: 0.22 }}
            >
              {/* Desk surface */}
              <rect x="40" y="210" width="220" height="14" rx="3" strokeWidth="1.6" />
              {/* Desk leg left */}
              <line x1="60" y1="224" x2="56" y2="290" strokeWidth="1.5" />
              {/* Desk leg right */}
              <line x1="240" y1="224" x2="244" y2="290" strokeWidth="1.5" />

              {/* Monitor on desk */}
              <rect x="48" y="160" width="64" height="48" rx="4" strokeWidth="1.5" />
              {/* Monitor stand */}
              <line x1="80" y1="208" x2="80" y2="214" strokeWidth="1.5" />
              <line x1="70" y1="212" x2="90" y2="212" strokeWidth="1.5" />
              {/* Screen content lines */}
              <line x1="56" y1="172" x2="104" y2="172" strokeWidth="1.2" />
              <line x1="56" y1="180" x2="96" y2="180" strokeWidth="1.2" />
              <line x1="56" y1="188" x2="100" y2="188" strokeWidth="1.2" />
              <line x1="56" y1="196" x2="88" y2="196" strokeWidth="1.2" />

              {/* Coffee cup on desk */}
              <path d="M210,196 Q206,196 206,202 L206,212 Q206,214 210,214 L222,214 Q226,214 226,212 L226,202 Q226,196 222,196 Z" strokeWidth="1.4" />
              {/* Cup handle */}
              <path d="M226,202 Q234,202 234,207 Q234,212 226,212" strokeWidth="1.3" fill="none" />
              {/* Steam */}
              <path d="M212,194 Q214,188 212,182" strokeWidth="1.2" fill="none" />
              <path d="M218,194 Q220,187 218,180" strokeWidth="1.2" fill="none" />

              {/* Person sitting — head */}
              <circle cx="160" cy="98" r="22" strokeWidth="1.6" />
              {/* Hair */}
              <path d="M140,91 Q160,75 180,91" strokeWidth="1.5" fill="none" />
              {/* Eyes — relaxed/engaged */}
              <circle cx="154" cy="98" r="2" strokeWidth="1.3" />
              <circle cx="166" cy="98" r="2" strokeWidth="1.3" />
              {/* Smile */}
              <path d="M154,108 Q160,114 166,108" strokeWidth="1.4" fill="none" />
              {/* Neck */}
              <line x1="160" y1="120" x2="160" y2="132" strokeWidth="1.5" />
              {/* Torso — seated, slightly leaning back */}
              <path d="M138,132 Q160,128 182,132 L180,200 Q160,205 140,200 Z" strokeWidth="1.5" />
              {/* Left arm — raised, holding phone to ear */}
              <path d="M138,144 Q122,136 116,120" strokeWidth="1.5" fill="none" />
              {/* Phone rect near ear */}
              <rect x="108" y="104" width="14" height="24" rx="3" strokeWidth="1.5" />
              {/* Right arm — resting on desk */}
              <path d="M182,150 Q200,160 210,170" strokeWidth="1.5" fill="none" />
              <circle cx="212" cy="173" r="5" strokeWidth="1.3" />
              {/* Seated legs suggestion */}
              <path d="M140,200 Q130,210 128,220" strokeWidth="1.4" fill="none" />
              <path d="M180,200 Q190,210 192,220" strokeWidth="1.4" fill="none" />

              {/* Speech bubble with "..." */}
              <rect x="58" y="64" width="64" height="36" rx="8" strokeWidth="1.5" />
              {/* Bubble tail */}
              <path d="M100,100 L108,110 L88,100" strokeWidth="1.3" fill="none" />
              {/* Dots inside bubble */}
              <circle cx="76" cy="82" r="3.5" strokeWidth="1.3" />
              <circle cx="90" cy="82" r="3.5" strokeWidth="1.3" />
              <circle cx="104" cy="82" r="3.5" strokeWidth="1.3" />

              {/* Envelope shape floating */}
              <rect x="196" y="52" width="52" height="38" rx="3" strokeWidth="1.5" />
              {/* Envelope flap */}
              <path d="M196,52 L222,74 L248,52" strokeWidth="1.3" fill="none" />
              {/* Envelope bottom fold lines */}
              <line x1="196" y1="90" x2="212" y2="72" strokeWidth="1.1" />
              <line x1="248" y1="90" x2="232" y2="72" strokeWidth="1.1" />

              {/* Location pin (BC) */}
              <path d="M230,280 Q230,265 242,265 Q254,265 254,277 Q254,290 242,298 Q230,290 230,280 Z" strokeWidth="1.5" />
              <circle cx="242" cy="277" r="5" strokeWidth="1.3" />

              {/* Send arrow */}
              <path d="M44,120 L68,132 L44,144 L50,132 Z" strokeWidth="1.4" />
              <line x1="50" y1="132" x2="68" y2="132" strokeWidth="1.2" />

              {/* Message lines floating */}
              <line x1="196" y1="114" x2="248" y2="114" strokeWidth="1.3" />
              <line x1="196" y1="122" x2="240" y2="122" strokeWidth="1.3" />
              <line x1="196" y1="130" x2="244" y2="130" strokeWidth="1.3" />
            </svg>
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
            viewport={vp}
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
              variants={stagger(0.08)}
              style={{ borderTop: '1px solid var(--na-border-mid)', paddingTop: 40, display: 'flex', flexDirection: 'column', gap: 24 }}
            >
              {contactDetails.map(({ Icon, label, value, href }, i) => (
                <motion.div key={i} variants={fadeUp} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
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
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ─ Right: form ─ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={stagger(0.1)}
          >
            <motion.div
              variants={fadeUp}
              style={{
                background: 'var(--na-surface)',
                border: '1px solid var(--na-border-mid)',
                borderRadius: 16,
                padding: 'clamp(32px, 4vw, 48px)',
              }}
            >
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
                      <Check size={22} color="var(--na-accent)" strokeWidth={1.5} />
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
                    {/* Honeypot — hidden from users & assistive tech; bots fill it and get silently dropped server-side. */}
                    <input
                      type="text"
                      name="company"
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      value={form.company}
                      onChange={e => update('company', e.target.value)}
                      style={{
                        position: 'absolute',
                        width: 1,
                        height: 1,
                        padding: 0,
                        margin: -1,
                        border: 0,
                        clip: 'rect(0 0 0 0)',
                        clipPath: 'inset(50%)',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                      }}
                    />

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
                        <ChevronDown size={14} color="var(--na-muted)" strokeWidth={1.5} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
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
                        <ChevronDown size={14} color="var(--na-muted)" strokeWidth={1.5} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
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
                    <AnimatePresence>
                      {status === 'error' && (
                        <motion.p
                          key="error-msg"
                          variants={fadeUp}
                          initial="hidden"
                          animate="visible"
                          exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
                          style={{ fontSize: 13, color: '#c0392b', fontWeight: 500 }}
                        >
                          Something went wrong. Email us at{' '}
                          <a href="mailto:info@nodeaxis.ca" style={{ color: '#c0392b' }}>
                            info@nodeaxis.ca
                          </a>
                        </motion.p>
                      )}
                    </AnimatePresence>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={status === 'loading'}
                      whileHover={status === 'loading' ? {} : { y: -2 }}
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
                          <ArrowRight size={14} strokeWidth={1.5} />
                        </>
                      )}
                    </motion.button>

                    <p style={{ fontSize: 12, color: 'var(--na-muted)', textAlign: 'center' }}>
                      Or email us directly at{' '}
                      <a href="mailto:info@nodeaxis.ca" style={{ color: 'var(--na-muted)', textDecoration: 'none', transition: 'color 0.2s ease' }}
                        onMouseEnter={e => (e.currentTarget.style.color = 'var(--na-accent)')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'var(--na-muted)')}
                      >
                        info@nodeaxis.ca
                      </a>
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

        </div>
      </section>

      <Footer />

    </main>
  )
}
