'use client'
import Image from 'next/image'
import { MotionConfig, motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AuditForm from '@/components/AuditForm'
import { Card, DisplayHeading, Panel, SectionTag } from '@/components/ui'
import { business } from '@/lib/offer'
import { fadeUp, stagger, viewport } from '@/lib/animations'

// Only embed a real Calendly scheduling link; anything else renders nothing.
const rawCalendly = process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() ?? ''
const calendlyUrl = /^https:\/\/calendly\.com\/[\w\-/]+$/.test(rawCalendly) ? rawCalendly : null

function Row({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex flex-col gap-1 py-4 ${className}`} style={{ borderTop: '1px solid var(--na-border-mid)' }}>
      <dt className="text-[12px] font-medium uppercase tracking-[0.08em]" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', color: 'var(--na-muted)' }}>
        {label}
      </dt>
      <dd className="text-[17px] leading-[1.5]">{children}</dd>
    </div>
  )
}

export default function ContactPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main style={{ background: 'var(--na-bg)', color: 'var(--na-text)', minHeight: '100vh' }}>
        <Navbar />

        <div className="flex flex-col" style={{ gap: 'var(--na-gutter)', paddingTop: 96 }}>
          {/* ── Hero: how to reach us ────────────────────────────── */}
          <Panel variant="white" padding="md" aria-labelledby="contact-heading">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-x-[clamp(32px,5vw,80px)] gap-y-8 items-stretch">
              <motion.div initial="hidden" animate="visible" variants={stagger(0.08)} className="flex flex-col gap-6">
                <motion.div variants={fadeUp}><SectionTag index={1}>Contact</SectionTag></motion.div>
                <motion.div variants={fadeUp}>
                  <DisplayHeading as="h1" size="lg" id="contact-heading">Talk to a real person in {business.city}</DisplayHeading>
                </motion.div>
                <motion.p variants={fadeUp} className="text-[17px] leading-[1.6] max-w-[34rem]" style={{ color: 'var(--na-muted)' }}>
                  No call centre, no ticket system. Call us, or send the form below and we’ll call you back.
                </motion.p>
                <motion.div variants={fadeUp}>
                  <a href={business.phoneHref} className="group inline-flex flex-col">
                    <span className="text-[14px]" style={{ color: 'var(--na-muted)' }}>Call us</span>
                    <span className="font-display text-[clamp(40px,6.4vw,84px)] leading-none tracking-[-0.045em] transition-colors group-hover:text-[var(--na-accent)]">
                      {business.phoneDisplay}
                    </span>
                  </a>
                </motion.div>
                <motion.dl variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 mt-2">
                  <Row label="Email">
                    <a href={`mailto:${business.email}`} className="underline underline-offset-4 decoration-[var(--na-border-mid)] hover:decoration-current">{business.email}</a>
                  </Row>
                  <Row label="Hours">{business.hours}</Row>
                  <Row label="Where we work" className="sm:col-span-2">
                      <ul className="flex flex-wrap gap-2 mt-1" aria-label="Service area">
                        {business.serviceArea.map(a => (
                          <li key={a} className="rounded-full px-3 min-h-[34px] inline-flex items-center text-[14px]" style={{ background: 'var(--na-card-soft)' }}>{a}</li>
                        ))}
                      </ul>
                  </Row>
                </motion.dl>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden min-h-[280px] lg:min-h-0"
                style={{ borderRadius: 'var(--na-radius-card)', background: 'var(--na-card-soft)' }}
              >
                <Image src="/images/bc-homes.jpg" alt="Homes in the Lower Mainland with mountains behind" fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
                <Card variant="white" padding="sm" className="absolute left-3 right-3 bottom-3 sm:left-auto sm:max-w-[300px]" style={{ boxShadow: 'var(--na-shadow-float)' }}>
                  <p className="text-[15px] font-semibold">We come to you</p>
                  <p className="text-[14px] leading-[1.5] mt-1" style={{ color: 'var(--na-muted)' }}>
                    Your shop, office or job site — anywhere in {business.city}, Delta, Langley and White Rock.
                  </p>
                </Card>
              </motion.div>
            </div>
          </Panel>

          {/* ── Form ─────────────────────────────────────────────── */}
          <Panel variant="soft" padding="md" aria-labelledby="form-heading">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger(0.08)}
              className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-x-[clamp(32px,5vw,80px)] gap-y-8 items-start"
            >
              <motion.div variants={fadeUp} className="flex flex-col gap-4">
                <SectionTag index={2}>Prefer to write?</SectionTag>
                <DisplayHeading size="sm" id="form-heading" muted="We’ll call you back within one business day.">Send us a quick note.</DisplayHeading>
                <p className="text-[15.5px] leading-[1.6]" style={{ color: 'var(--na-muted)' }}>
                  Most people use this to book their free local audit — but ask us anything.
                </p>
              </motion.div>
              <motion.div variants={fadeUp}>
                <Card variant="white" padding="md">
                  <AuditForm title={null} />
                </Card>
              </motion.div>
            </motion.div>
          </Panel>

          {/* ── Calendly (only when configured) ──────────────────── */}
          {calendlyUrl && (
            <Panel variant="white" padding="md" aria-labelledby="book-heading">
              <div className="flex flex-col gap-4 mb-6 max-w-[40rem]">
                <SectionTag index={3}>Book a call</SectionTag>
                <DisplayHeading size="sm" id="book-heading" muted="Pick a time that suits you.">Book a 15-min call.</DisplayHeading>
              </div>
              <div className="overflow-hidden" style={{ borderRadius: 'var(--na-radius-card)', border: '1px solid var(--na-border-mid)' }}>
                <iframe
                  src={calendlyUrl}
                  title="Book a 15-minute call with NodeAxis"
                  loading="lazy"
                  className="block w-full border-0"
                  style={{ height: 720, background: 'var(--na-card)' }}
                />
              </div>
              <p className="text-[14px] mt-3" style={{ color: 'var(--na-muted)' }}>
                Calendar not loading? <a href={calendlyUrl} target="_blank" rel="noopener" className="underline underline-offset-4">Open it in a new tab</a>.
              </p>
            </Panel>
          )}
        </div>

        <Footer />
      </main>
    </MotionConfig>
  )
}
