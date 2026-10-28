'use client'
import Image from 'next/image'
import { MotionConfig, motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card, DisplayHeading, Panel, PillButton, SectionTag } from '@/components/ui'
import { business, promise } from '@/lib/offer'
import { fadeUp, stagger, viewport } from '@/lib/animations'

const SAMPLE_URL = '/demo/trades'

/** Personalized demo URL (see demos/README.md). No `d` param, so these sample links never expire. */
function demoUrl(p: { n: string; t: string; c: string; p: string }) {
  return `${SAMPLE_URL}?${new URLSearchParams(p).toString()}`
}

// Made-up sample businesses (555 numbers) — shows how the preview adapts to each trade.
const variants = [
  {
    trade: 'Roofing',
    name: 'Northpeak Roofing',
    city: 'Langley',
    phone: '604-555-0199',
    photo: '/images/roofer.jpg',
    alt: 'A roofer standing on a house roof',
  },
  {
    trade: 'HVAC',
    name: 'Cedarline Heating & Air',
    city: 'Cloverdale',
    phone: '604-555-0142',
    photo: '/images/hvac-tech.jpg',
    alt: 'A technician checking an outdoor heat pump unit',
  },
  {
    trade: 'Electrical',
    name: 'Brightwire Electric',
    city: 'White Rock',
    phone: '604-555-0177',
    photo: '/images/electrician.jpg',
    alt: 'An electrician working on an electrical panel',
  },
]

const points = [
  { title: 'Your name, trade and number', body: 'Not a template gallery — a working preview made for your business.' },
  { title: 'Free, before you pay anything', body: 'Look it over on your phone. Show your partner. No strings attached.' },
  { title: 'Built for phones first', body: 'Big call button, your services, your service area — what homeowners look for.' },
]

function ExternalIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  )
}

export default function WorkPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main style={{ background: 'var(--na-bg)', color: 'var(--na-text)', minHeight: '100vh' }}>
        <Navbar />

        <div className="flex flex-col" style={{ gap: 'var(--na-gutter)', paddingTop: 96 }}>
          {/* ── Hero ─────────────────────────────────────────────── */}
          <Panel variant="white" padding="md" aria-labelledby="work-heading">
            <motion.div initial="hidden" animate="visible" variants={stagger(0.08)} className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-x-[clamp(32px,5vw,80px)] gap-y-8 items-end">
              <div className="flex flex-col gap-6">
                <motion.div variants={fadeUp}><SectionTag index={1}>See it in action</SectionTag></motion.div>
                <motion.div variants={fadeUp}>
                  <DisplayHeading as="h1" size="lg" id="work-heading" muted="before you pay anything.">
                    See your new site
                  </DisplayHeading>
                </motion.div>
                <motion.p variants={fadeUp} className="text-[17px] leading-[1.6] max-w-[36rem]" style={{ color: 'var(--na-muted)' }}>
                  We build a free preview of your new site before you pay anything. Below is a sample for a made-up Surrey plumber — yours would have your name, your trade and your phone number.
                </motion.p>
              </div>
              <motion.ul variants={stagger(0.06)} className="flex flex-col gap-3">
                {points.map(p => (
                  <motion.li key={p.title} variants={fadeUp}>
                    <Card variant="soft" padding="sm" className="flex flex-col gap-1">
                      <h2 className="text-[16px] font-semibold">{p.title}</h2>
                      <p className="text-[15px] leading-[1.55]" style={{ color: 'var(--na-muted)' }}>{p.body}</p>
                    </Card>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </Panel>

          {/* ── Live sample in a browser frame ──────────────────── */}
          <Panel variant="soft" padding="md" aria-labelledby="sample-heading">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
              <div className="flex flex-col gap-3">
                <SectionTag index={2}>The sample site</SectionTag>
                <DisplayHeading size="sm" id="sample-heading" muted="A real, working site.">Example Plumbing Co.</DisplayHeading>
              </div>
              <a href={SAMPLE_URL} target="_blank" rel="noopener" className="na-pill na-pill--secondary hidden md:inline-flex">
                <span>Open in a new tab</span>
                <span className="na-pill__icon"><ExternalIcon /></span>
              </a>
            </div>

            {/* Desktop: embedded preview */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={fadeUp}
              className="hidden md:block overflow-hidden"
              style={{ borderRadius: 'var(--na-radius-card)', background: 'var(--na-card)', boxShadow: 'var(--na-shadow-float)', border: '1px solid var(--na-border-mid)' }}
            >
              <div className="flex items-center gap-3 px-4 h-12" style={{ borderBottom: '1px solid var(--na-border-mid)', background: 'var(--na-card-soft)' }} aria-hidden="true">
                <span className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full" style={{ background: 'var(--na-border-mid)' }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: 'var(--na-border-mid)' }} />
                  <span className="w-3 h-3 rounded-full" style={{ background: 'var(--na-border-mid)' }} />
                </span>
                <span className="flex-1 max-w-[420px] mx-auto text-center text-[13px] rounded-full px-4 py-1.5 truncate"
                  style={{ background: 'var(--na-card)', color: 'var(--na-muted)' }}>
                  nodeaxis.ca/demo/trades
                </span>
                <span className="w-[54px]" />
              </div>
              <iframe
                src={SAMPLE_URL}
                title="Sample trades website preview for Example Plumbing Co."
                loading="lazy"
                className="block w-full border-0"
                style={{ height: 720, background: 'var(--na-card)' }}
              />
            </motion.div>

            {/* Mobile: big button instead of a cramped iframe */}
            <div className="md:hidden flex flex-col gap-4">
              <div className="relative overflow-hidden aspect-[4/3]" style={{ borderRadius: 'var(--na-radius-card)' }}>
                <Image src="/images/hero-plumber.jpg" alt="A plumber fixing pipes under a bathroom sink" fill sizes="100vw" className="object-cover" />
              </div>
              <a href={SAMPLE_URL} target="_blank" rel="noopener" className="na-pill na-pill--primary na-pill--lg na-pill--block">
                <span>Open the sample site</span>
                <span className="na-pill__icon"><ExternalIcon /></span>
              </a>
              <p className="text-[14px] text-center" style={{ color: 'var(--na-muted)' }}>Opens in a new tab.</p>
            </div>
          </Panel>

          {/* ── Trade variants ──────────────────────────────────── */}
          <Panel variant="white" padding="md" aria-labelledby="variants-heading">
            <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger(0.08)}>
              <motion.div variants={fadeUp} className="flex flex-col gap-4 mb-8 max-w-[40rem]">
                <SectionTag index={3}>Made for your trade</SectionTag>
                <DisplayHeading size="sm" id="variants-heading" muted="Same idea, set up for each trade.">
                  Roofer, HVAC or electrician?
                </DisplayHeading>
                <p className="text-[15.5px] leading-[1.6]" style={{ color: 'var(--na-muted)' }}>
                  Tap one to see how the preview changes. These businesses are made up — the names and numbers are just examples.
                </p>
              </motion.div>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-[var(--na-gutter)]">
                {variants.map(v => (
                  <motion.li key={v.trade} variants={fadeUp}>
                    <a
                      href={demoUrl({ n: v.name, t: v.trade, c: v.city, p: v.phone })}
                      target="_blank"
                      rel="noopener"
                      className="group block h-full"
                      aria-label={`Open the sample ${v.trade.toLowerCase()} site for ${v.name} (opens in a new tab)`}
                    >
                      <Card variant="soft" padding="none" hover className="h-full flex flex-col">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image src={v.photo} alt={v.alt} fill sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                          <span className="absolute left-3 top-3 rounded-full px-3 min-h-[30px] inline-flex items-center text-[13px] font-medium"
                            style={{ background: 'var(--na-card)', color: 'var(--na-text)' }}>
                            {v.trade}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-4 p-5">
                          <div className="flex flex-col">
                            <span className="text-[17px] font-semibold">{v.name}</span>
                            <span className="text-[14px]" style={{ color: 'var(--na-muted)' }}>{v.city}, BC</span>
                          </div>
                          <span className="inline-flex items-center justify-center w-11 h-11 rounded-full shrink-0 transition-transform duration-300 group-hover:-rotate-45"
                            style={{ background: 'var(--na-cta)', color: 'var(--na-on-cta)' }} aria-hidden="true">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </span>
                        </div>
                      </Card>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </Panel>

          {/* ── Results coming soon + CTA ───────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-[var(--na-gutter)] mx-[var(--na-gutter)]">
            <Card variant="outline" padding="md" className="flex flex-col gap-3 justify-center" style={{ borderRadius: 'var(--na-radius-panel)' }}>
              <SectionTag index={4}>Client results</SectionTag>
              <h2 className="font-display text-[clamp(24px,2.6vw,32px)] leading-[1.1] tracking-[-0.03em]">Real results from local trades are coming soon.</h2>
              <p className="text-[15.5px] leading-[1.6]" style={{ color: 'var(--na-muted)' }}>
                We’re just getting started in {business.city}. As our first clients’ calls and reviews add up, we’ll share the numbers here — with their permission.
              </p>
            </Card>
            <Panel variant="dark" padding="md" inset={false} aria-labelledby="work-cta-heading">
              <div className="na-blob" aria-hidden="true" style={{ width: 420, height: 420, right: -140, top: -180, background: 'var(--na-blob-blue)' }} />
              <div className="relative flex flex-col items-start gap-6">
                <DisplayHeading size="md" id="work-cta-heading" muted="Ask for it in your free audit.">Want one for your business?</DisplayHeading>
                <div className="flex flex-col sm:flex-row gap-3">
                  <PillButton href="/audit" variant="primary" size="lg" arrow>{promise.cta}</PillButton>
                  <PillButton href={business.phoneHref} variant="light" size="lg">Call {business.phoneDisplay}</PillButton>
                </div>
              </div>
            </Panel>
          </div>
        </div>

        <Footer />
      </main>
    </MotionConfig>
  )
}
