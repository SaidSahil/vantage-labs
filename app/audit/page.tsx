'use client'
import Image from 'next/image'
import { MotionConfig, motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuditForm from '@/components/AuditForm'
import { Card, DisplayHeading, Panel, PillButton, SectionTag } from '@/components/ui'
import { business, tiers } from '@/lib/offer'
import { fadeUp, stagger, viewport } from '@/lib/animations'

const audit = tiers.find(t => t.id === 'audit') ?? tiers[0]

const howItWorks = [
  { title: 'Send the form', body: 'Takes about a minute. Just the basics — who you are and how to reach you.' },
  { title: 'We call you back', body: 'Within one business day, to book a time that suits you — at your shop, office or a job site.' },
  { title: 'We go through it together', body: 'We sit down with you and walk through a one-page report: what’s working, what’s costing you calls, and what to fix first.' },
]

const trustPoints = [
  { label: `Based in ${business.city}`, icon: 'pin' },
  { label: 'We meet you in person', icon: 'handshake' },
  { label: 'Free, no obligation', icon: 'check' },
] as const

function Icon({ name }: { name: 'pin' | 'handshake' | 'check' | 'phone' }) {
  const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }
  if (name === 'pin') return <svg {...common}><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
  if (name === 'handshake') return <svg {...common}><path d="M17 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M21 20v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
  if (name === 'phone') return <svg {...common}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
  return <svg {...common}><path d="M20 6 9 17l-5-5" /></svg>
}

export default function AuditPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main style={{ background: 'var(--na-bg)', color: 'var(--na-text)', minHeight: '100vh' }}>
        <Navbar />

        <div className="flex flex-col" style={{ gap: 'var(--na-gutter)', paddingTop: 96 }}>
          {/* ── Hero: copy left, form over photo right ───────────── */}
          <Panel variant="white" padding="md" aria-labelledby="audit-heading">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[clamp(32px,5vw,80px)] gap-y-10 items-start">
              <motion.div initial="hidden" animate="visible" variants={stagger(0.08)} className="flex flex-col gap-6">
                <motion.div variants={fadeUp}><SectionTag index={1}>Free local audit</SectionTag></motion.div>
                <motion.div variants={fadeUp}>
                  <DisplayHeading as="h1" size="lg" id="audit-heading">Get your free local audit</DisplayHeading>
                </motion.div>
                <motion.p variants={fadeUp} className="text-[17px] leading-[1.6] max-w-[34rem]" style={{ color: 'var(--na-muted)' }}>
                  {audit.pitch} It costs nothing and there’s no sales pitch — you keep the report either way.
                </motion.p>
                <motion.ul variants={fadeUp} className="flex flex-wrap gap-2" aria-label="Why trades owners book with us">
                  {trustPoints.map(p => (
                    <li key={p.label} className="inline-flex items-center gap-2 rounded-full px-4 min-h-[40px] text-[14px] font-medium"
                      style={{ background: 'var(--na-card-soft)' }}>
                      <span style={{ color: 'var(--na-accent)' }}><Icon name={p.icon} /></span>
                      {p.label}
                    </li>
                  ))}
                  <li>
                    <a href={business.phoneHref}
                      className="inline-flex items-center gap-2 rounded-full px-4 min-h-[40px] text-[14px] font-medium"
                      style={{ border: '1px solid var(--na-border-mid)' }}>
                      <span style={{ color: 'var(--na-accent)' }}><Icon name="phone" /></span>
                      {business.phoneDisplay}
                    </a>
                  </li>
                </motion.ul>
              </motion.div>

              {/* Form card floating on a photo (travel-reference look) */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative lg:col-start-2 lg:row-start-1 lg:row-span-2 overflow-hidden"
                style={{ borderRadius: 'var(--na-radius-card)' }}
              >
                <Image
                  src="/images/hero-plumber.jpg"
                  alt="A plumber fixing pipes under a bathroom sink"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="relative pt-[150px] px-3 pb-3 sm:pt-[200px] sm:px-6 sm:pb-6 lg:p-[clamp(20px,3vw,40px)]">
                  <Card variant="white" padding="md" style={{ boxShadow: 'var(--na-shadow-float)' }}>
                    <AuditForm />
                  </Card>
                </div>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                className="lg:col-start-1 lg:row-start-2"
              >
                <Card variant="soft" padding="md">
                  <h2 className="text-[13px] font-medium uppercase tracking-[0.08em] mb-4" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', color: 'var(--na-muted)' }}>
                    What we check
                  </h2>
                  <ul className="flex flex-col gap-3">
                    {audit.includes.map(item => (
                      <li key={item} className="flex items-start gap-3 text-[16px] leading-[1.45]">
                        <span className="mt-[2px] inline-flex items-center justify-center w-6 h-6 rounded-full shrink-0"
                          style={{ background: 'var(--na-cta)', color: 'var(--na-on-cta)' }}>
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            </div>
          </Panel>

          {/* ── How it works ─────────────────────────────────────── */}
          <Panel variant="canvas" padding="md" aria-labelledby="how-heading">
            <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger(0.1)}>
              <motion.div variants={fadeUp} className="flex flex-col gap-4 mb-10 max-w-[40rem]">
                <SectionTag index={2}>How it works</SectionTag>
                <DisplayHeading size="md" id="how-heading" muted="Nothing to prepare on your end.">Three easy steps.</DisplayHeading>
              </motion.div>
              <ol className="grid grid-cols-1 md:grid-cols-3 gap-[var(--na-gutter)]">
                {howItWorks.map((s, i) => (
                  <motion.li key={s.title} variants={fadeUp}>
                    <Card variant={i === 2 ? 'dark' : 'white'} padding="md" className="h-full flex flex-col gap-3">
                      <span className="font-display text-[44px] leading-none tracking-[-0.04em]" aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-[22px] font-medium tracking-[-0.02em] mt-4">
                        <span className="sr-only">Step {i + 1}: </span>{s.title}
                      </h3>
                      <p className="text-[15.5px] leading-[1.6]" style={{ color: i === 2 ? 'var(--na-inv-muted)' : 'var(--na-muted)' }}>{s.body}</p>
                    </Card>
                  </motion.li>
                ))}
              </ol>
            </motion.div>
          </Panel>

          {/* ── Prefer to call ───────────────────────────────────── */}
          <Panel variant="white" padding="md" aria-labelledby="call-heading">
            <div className="na-blob" aria-hidden="true" style={{ width: 420, height: 420, right: -120, top: -160, background: 'var(--na-blob-blue)' }} />
            <div className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
              <div className="flex flex-col gap-4 max-w-[38rem]">
                <SectionTag index={3}>Rather just talk?</SectionTag>
                <DisplayHeading size="md" id="call-heading" muted={`${business.hours}.`}>
                  Call a real person in {business.city}.
                </DisplayHeading>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <PillButton href={business.phoneHref} variant="primary" size="lg" icon={<Icon name="phone" />}>
                  {business.phoneDisplay}
                </PillButton>
                <PillButton href={`mailto:${business.email}`} variant="secondary" size="lg">
                  {business.email}
                </PillButton>
              </div>
            </div>
          </Panel>
        </div>

        <Footer />
      </main>
    </MotionConfig>
  )
}
