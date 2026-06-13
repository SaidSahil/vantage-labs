'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus, Check } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]
const vp = { once: true, margin: '-72px' }

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
}

const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
}

const stagger = (delay = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
})

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

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Web Design and Development',
  provider: {
    '@type': 'Organization',
    name: 'NodeAxis',
    url: 'https://nodeaxis.ca',
    email: 'info@nodeaxis.ca',
    telephone: '+17782408911',
  },
  areaServed: {
    '@type': 'State',
    name: 'British Columbia',
    containedInPlace: { '@type': 'Country', name: 'Canada' },
  },
  description:
    'Custom hand-coded websites and landing pages for small businesses in BC. No templates. Built to rank and convert. Starting at $399.',
  offers: {
    '@type': 'Offer',
    price: '399',
    priceCurrency: 'CAD',
    priceSpecification: {
      '@type': 'PriceSpecification',
      price: '399',
      priceCurrency: 'CAD',
      description: 'Starting price for a custom website or landing page',
    },
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does a custom website cost?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our custom websites start at $399 CAD for a clean, fast landing page or 1–3 page site. Most small business websites fall in the $399–$999 range depending on the number of pages, features, and level of custom design. More complex builds — booking systems, dashboards, or client portals — are quoted per project with a full breakdown before any work begins. You always know the price upfront with no surprise invoices.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to build a website?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most standard websites and landing pages are completed within 2 weeks from kickoff. More complex multi-page builds typically take 3–4 weeks. The timeline also depends on how quickly you can provide copy, images, and feedback. We give you a realistic estimate at the start and keep you updated throughout the process — no surprise delays.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you use templates or page builders?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Never. Every site we build is hand-coded from scratch — no Wix, Squarespace, WordPress themes, or Webflow templates. This approach means your site loads significantly faster, has cleaner code for search engines to crawl, and is built exactly to your brand rather than constrained by a template layout. You receive the full source files outright on delivery.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you serve businesses outside of Vancouver?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — we work with businesses across all of British Columbia, not just Vancouver. Our clients include businesses in Surrey, Burnaby, Richmond, Kelowna, Victoria, Langley, Abbotsford, Kamloops, Nanaimo, and throughout the rest of BC. Everything is handled remotely, so location within the province is never a barrier to getting started.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is included in the ongoing maintenance plan?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our flat-rate maintenance plan is $75 per month and covers content and copy updates on request, security patches and dependency updates, a monthly performance check, priority email support, and minor layout tweaks. One-off changes outside the plan are also available at a fixed cost — you will always know what you are paying before we touch anything.',
      },
    },
  ],
}

export default function ServicesPage() {
  const [open, setOpen] = useState<string | null>('01')

  return (
    <main style={{ background: 'var(--na-bg)', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Navbar />

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
            <div className="section-label">03 — What We Build</div>
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
            <WordReveal words={['Web', 'Design']} baseDelay={0.15} />
            <WordReveal
              words={['Services,', 'BC.']}
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
            Every project starts from scratch. No templates, no shortcuts.
            Just custom-built digital that your business actually needs.
          </motion.p>
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
          viewport={vp}
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
          viewport={vp}
          transition={{ duration: 0.6, ease }}
          style={{ height: 1, background: 'var(--na-border-mid)', marginBottom: 0 }}
        />

        {/* Rows */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={vp}
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
                    <Plus size={13} strokeWidth={1.5} />
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
                            <ArrowUpRight size={13} strokeWidth={1.5} />
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
            viewport={vp}
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
              <span style={{ fontWeight: 300, fontStyle: 'italic', color: 'var(--na-heading)' }}>Just clear numbers.</span>
            </h2>
          </motion.div>

          {/* Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={stagger(0.1)}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {tiers.map((tier) => (
              <motion.div
                key={tier.name}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
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
                  <ArrowRight size={13} strokeWidth={1.5} />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* Payment note */}
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={vp}
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
          viewport={vp}
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
          viewport={vp}
          variants={stagger(0.055)}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          {addons.map((addon) => (
            <motion.div
              key={addon.label}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
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
          viewport={vp}
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
            viewport={vp}
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
              <a
                href="https://calendly.com/nodeaxis"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ textDecoration: 'none' }}
              >
                Book a Call
                <ArrowRight size={15} strokeWidth={1.5} />
              </a>
              <Link href="/contact" className="btn-ghost">
                Send a Message
              </Link>
              <Link
                href="/work"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 7,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--na-inv-muted)',
                  textDecoration: 'none',
                  padding: '13px 0',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--na-inv-text)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--na-inv-muted)')}
              >
                See our work
                <ArrowUpRight size={13} strokeWidth={1.5} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />

    </main>
  )
}
