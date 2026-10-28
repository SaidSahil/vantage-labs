'use client'
import Image from 'next/image'
import { MotionConfig, motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card, DisplayHeading, Panel, PillButton, SectionTag, cx } from '@/components/ui'
import { business, faqs, promise, tiers } from '@/lib/offer'
import { fadeUp, stagger, viewport } from '@/lib/animations'

// Page-specific detail per tier (keyed by tier.id; prices/includes stay in lib/offer.ts).
const tierDetail: Record<string, { whoFor: string; photo: string; alt: string; cta: string }> = {
  audit: {
    whoFor: 'Any Surrey trade that wants an honest look at why the phone isn’t ringing more — before spending a dollar.',
    photo: '/images/paperwork.jpg',
    alt: 'A person holding a clipboard with a checklist',
    cta: promise.cta,
  },
  starter: {
    whoFor: 'Owners who are hard to find on Google, have only a handful of reviews, or have an old website (or none).',
    photo: '/images/homeowner-door.jpg',
    alt: 'A tradesperson greeting a homeowner at the front door',
    cta: 'Start with a free audit',
  },
  growth: {
    whoFor: 'Busy crews who miss calls while on the tools and want reviews coming in without having to remember to ask.',
    photo: '/images/phone-call.jpg',
    alt: 'A tradesperson with a clipboard answering a phone call',
    cta: 'Start with a free audit',
  },
  systems: {
    whoFor: 'Growing companies juggling quotes, jobs and invoices across texts, paper and spreadsheets.',
    photo: '/images/team-crew.jpg',
    alt: 'A construction crew building a wooden deck',
    cta: 'Talk it through in your audit',
  },
}

const honestNotes = [
  { title: 'No long contracts', body: 'The monthly plan is month-to-month. If it stops paying for itself, cancel any time.' },
  { title: 'No fake reviews', body: 'We never buy or write reviews. We make it easy for your real customers to leave one.' },
  { title: 'No ranking promises', body: 'Nobody can guarantee #1 on Google. We fix what’s in your control and show you the results each month.' },
  { title: 'Paid ads aren’t included', body: 'Most trades should fix their Google profile and reviews first. If ads make sense for you, we’ll say so.' },
  { title: 'A website only if you need one', body: 'For many trades, Google and reviews bring in more calls. We’ll tell you honestly in the audit.' },
  { title: 'Quotes before work', body: 'Custom work is quoted in writing after we see how your crew works — nothing starts until you say yes.' },
]

function Check({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

export default function ServicesPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main style={{ background: 'var(--na-bg)', color: 'var(--na-text)', minHeight: '100vh' }}>
        <Navbar />

        <div className="flex flex-col" style={{ gap: 'var(--na-gutter)', paddingTop: 96 }}>
          {/* ── Hero + plan overview ─────────────────────────────── */}
          <Panel variant="white" padding="md" aria-labelledby="services-heading">
            <motion.div initial="hidden" animate="visible" variants={stagger(0.08)} className="flex flex-col gap-6">
              <motion.div variants={fadeUp}><SectionTag index={1}>Services &amp; prices</SectionTag></motion.div>
              <motion.div variants={fadeUp}>
                <DisplayHeading as="h1" size="lg" id="services-heading" muted="Straight prices. No long contracts.">
                  Simple plans.
                </DisplayHeading>
              </motion.div>
              <motion.p variants={fadeUp} className="text-[17px] leading-[1.6] max-w-[38rem]" style={{ color: 'var(--na-muted)' }}>
                Everything starts with a free audit. Then you pick only what you need — we set it up and run it, so you can stay on the tools.
              </motion.p>

              <motion.nav variants={fadeUp} aria-label="Jump to a plan" className="mt-4">
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {tiers.map(t => (
                    <li key={t.id}>
                      <a href={`#${t.id}`} className="block h-full">
                        <Card variant={t.featured ? 'dark' : 'soft'} padding="sm" hover className="h-full flex flex-col gap-2">
                          <span className="text-[15px] font-medium">{t.name}</span>
                          <span className="flex items-baseline gap-2">
                            <span className="font-display text-[34px] leading-none tracking-[-0.04em]">{t.price}</span>
                            <span className="text-[14px]" style={{ color: t.featured ? 'var(--na-inv-muted)' : 'var(--na-muted)' }}>{t.cadence}</span>
                          </span>
                        </Card>
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.nav>
            </motion.div>
          </Panel>

          {/* ── Tiers in depth ──────────────────────────────────── */}
          {tiers.map((t, i) => {
            const d = tierDetail[t.id]
            const dark = !!t.featured
            const muted = dark ? 'var(--na-inv-muted)' : 'var(--na-muted)'
            return (
              <Panel
                key={t.id}
                id={t.id}
                variant={dark ? 'dark' : 'white'}
                padding="md"
                aria-labelledby={`${t.id}-heading`}
                style={{ scrollMarginTop: 100 }}
              >
                {dark && (
                  <div className="na-blob" aria-hidden="true" style={{ width: 460, height: 460, left: -160, bottom: -220, background: 'var(--na-blob-blue)' }} />
                )}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  variants={stagger(0.08)}
                  className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-x-[clamp(32px,5vw,80px)] gap-y-8"
                >
                  <div className="flex flex-col gap-5">
                    <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
                      <SectionTag index={i + 2}>{t.id === 'audit' ? 'Step one' : 'Plan'}</SectionTag>
                      {t.featured && (
                        <span className="inline-flex items-center rounded-full px-3 min-h-[28px] text-[13px] font-medium"
                          style={{ background: 'var(--na-cta)', color: 'var(--na-on-cta)' }}>
                          Recommended
                        </span>
                      )}
                    </motion.div>
                    <motion.div variants={fadeUp}>
                      <DisplayHeading size="md" id={`${t.id}-heading`}>{t.name}</DisplayHeading>
                    </motion.div>
                    <motion.p variants={fadeUp} className="flex items-baseline gap-3">
                      <span className="font-display text-[clamp(48px,6vw,80px)] leading-none tracking-[-0.05em]">{t.price}</span>
                      <span className="text-[16px]" style={{ color: muted }}>{t.cadence}</span>
                    </motion.p>
                    <motion.p variants={fadeUp} className="font-display text-[clamp(20px,2vw,26px)] leading-[1.25] tracking-[-0.02em] max-w-[34rem]">
                      {t.pitch}
                    </motion.p>
                    {d && (
                      <motion.div variants={fadeUp} className="flex flex-col gap-1 max-w-[34rem]">
                        <h3 className="text-[13px] font-medium uppercase tracking-[0.08em]" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', color: muted }}>
                          Who it’s for
                        </h3>
                        <p className="text-[16px] leading-[1.6]">{d.whoFor}</p>
                      </motion.div>
                    )}
                    <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mt-2">
                      <PillButton href="/audit" variant="primary" size="lg" arrow>{d?.cta ?? promise.cta}</PillButton>
                      <PillButton href={business.phoneHref} variant={dark ? 'ghost' : 'secondary'} size="lg" icon={<PhoneIcon />}>
                        {business.phoneDisplay}
                      </PillButton>
                    </motion.div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <motion.div variants={fadeUp}>
                      <div
                        className={cx('na-card na-pad-md')}
                        style={{ background: dark ? 'var(--na-inv-surface)' : 'var(--na-card-soft)' }}
                      >
                        <h3 className="text-[13px] font-medium uppercase tracking-[0.08em] mb-4" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', color: muted }}>
                          What’s included
                        </h3>
                        <ul className="flex flex-col gap-3">
                          {t.includes.map(item => (
                            <li key={item} className="flex items-start gap-3 text-[16px] leading-[1.45]">
                              <span className="mt-[2px] inline-flex items-center justify-center w-6 h-6 rounded-full shrink-0"
                                style={{ background: 'var(--na-cta)', color: 'var(--na-on-cta)' }}>
                                <Check />
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                    {d && (
                      <motion.div variants={fadeUp} className="relative overflow-hidden aspect-[16/9]" style={{ borderRadius: 'var(--na-radius-card)', background: 'var(--na-card-soft)' }}>
                        <Image src={d.photo} alt={d.alt} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </Panel>
            )
          })}

          {/* ── Honest notes ────────────────────────────────────── */}
          <Panel variant="soft" padding="md" aria-labelledby="notes-heading">
            <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger(0.06)}>
              <motion.div variants={fadeUp} className="flex flex-col gap-4 mb-8 max-w-[40rem]">
                <SectionTag index={tiers.length + 2}>Honest notes</SectionTag>
                <DisplayHeading size="sm" id="notes-heading" muted="So there are no surprises.">What we don’t do.</DisplayHeading>
              </motion.div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {honestNotes.map(n => (
                  <motion.li key={n.title} variants={fadeUp}>
                    <Card variant="white" padding="sm" className="h-full flex flex-col gap-2">
                      <h3 className="text-[17px] font-semibold tracking-[-0.01em]">{n.title}</h3>
                      <p className="text-[15px] leading-[1.6]" style={{ color: 'var(--na-muted)' }}>{n.body}</p>
                    </Card>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </Panel>

          {/* ── FAQ ─────────────────────────────────────────────── */}
          <Panel variant="white" padding="md" aria-labelledby="faq-heading">
            <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-x-[clamp(32px,5vw,80px)] gap-y-8">
              <div className="flex flex-col gap-4">
                <SectionTag index={tiers.length + 3}>Questions</SectionTag>
                <DisplayHeading size="sm" id="faq-heading" muted="Straight answers.">Common questions.</DisplayHeading>
                <p className="text-[15.5px] leading-[1.6]" style={{ color: 'var(--na-muted)' }}>
                  Something else on your mind? Call{' '}
                  <a href={business.phoneHref} className="font-semibold underline underline-offset-4" style={{ color: 'var(--na-text)' }}>{business.phoneDisplay}</a>.
                </p>
              </div>
              <div className="flex flex-col">
                {faqs.map(f => (
                  <details key={f.q} className="group border-b" style={{ borderColor: 'var(--na-border-mid)' }}>
                    <summary className="flex items-center justify-between gap-4 min-h-[60px] py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden text-[17px] font-medium">
                      {f.q}
                      <span aria-hidden="true" className="inline-flex items-center justify-center w-9 h-9 rounded-full shrink-0 transition-transform duration-300 group-open:rotate-45"
                        style={{ background: 'var(--na-card-soft)' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                      </span>
                    </summary>
                    <p className="pb-5 pr-12 text-[16px] leading-[1.65]" style={{ color: 'var(--na-muted)' }}>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </Panel>

          {/* ── Closing CTA ─────────────────────────────────────── */}
          <Panel variant="white" padding="lg" aria-labelledby="cta-heading">
            <div className="na-blob" aria-hidden="true" style={{ width: 480, height: 480, right: -140, top: -200, background: 'var(--na-blob-blue)' }} />
            <div className="na-blob" aria-hidden="true" style={{ width: 380, height: 380, left: -120, bottom: -200, background: 'var(--na-blob-peach)' }} />
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              variants={stagger(0.08)}
              className="relative flex flex-col items-start gap-6 max-w-[48rem]"
            >
              <motion.div variants={fadeUp}>
                <DisplayHeading size="md" id="cta-heading" muted="Start with the free audit — we’ll tell you honestly.">
                  Not sure which one you need?
                </DisplayHeading>
              </motion.div>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
                <PillButton href="/audit" variant="primary" size="lg" arrow>{promise.cta}</PillButton>
                <PillButton href={business.phoneHref} variant="secondary" size="lg" icon={<PhoneIcon />}>{business.phoneDisplay}</PillButton>
              </motion.div>
            </motion.div>
          </Panel>
        </div>

        <Footer />
      </main>
    </MotionConfig>
  )
}
