'use client'
import Image from 'next/image'
import { MotionConfig, motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card, DisplayHeading, Panel, PillButton, SectionTag } from '@/components/ui'
import { business, localStats, promise } from '@/lib/offer'
import { fadeUp, stagger, viewport } from '@/lib/animations'

const beliefs = [
  { title: 'Local and in person', body: `We're based in ${business.city}. We meet you at your shop, office or job site — not on endless video calls.` },
  { title: 'Plain talk, no tech jargon', body: "You don't need to learn software. We set everything up, run it, and explain it in two minutes." },
  { title: 'Results you can see', body: 'Every month you get a short report: calls answered, leads captured, reviews gained. If it stops paying for itself, cancel.' },
  { title: 'Honest about what works', body: "If you don't need a new website, we'll tell you. No fake reviews, no long contracts, no upsell scripts." },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About NodeAxis',
  url: 'https://nodeaxis.ca/about',
  description: `NodeAxis is a ${business.city}, BC company helping local trades get more calls, more reviews and less paperwork.`,
  mainEntity: {
    '@type': 'LocalBusiness',
    name: business.name,
    telephone: '+17782408911',
    email: business.email,
    address: { '@type': 'PostalAddress', addressLocality: business.city, addressRegion: business.region, addressCountry: 'CA' },
    areaServed: business.serviceArea,
    url: 'https://nodeaxis.ca',
  },
}

export default function AboutPage() {
  return (
    <MotionConfig reducedMotion="user">
      <main style={{ background: 'var(--na-bg)', color: 'var(--na-text)', minHeight: '100vh' }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Navbar />

        <div className="flex flex-col" style={{ gap: 'var(--na-gutter)', paddingTop: 96 }}>
          {/* ── Hero: story left, local photo right ──────────────── */}
          <Panel variant="white" padding="md" aria-labelledby="about-heading">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-[clamp(32px,5vw,80px)] gap-y-10 items-center">
              <motion.div initial="hidden" animate="visible" variants={stagger(0.08)} className="flex flex-col gap-6">
                <motion.div variants={fadeUp}><SectionTag index={1}>About NodeAxis</SectionTag></motion.div>
                <motion.div variants={fadeUp}>
                  <DisplayHeading as="h1" size="lg" id="about-heading" muted={`Built in ${business.city}.`}>
                    Your local tech partner.
                  </DisplayHeading>
                </motion.div>
                <motion.p variants={fadeUp} className="text-[17px] leading-[1.65] max-w-[34rem]" style={{ color: 'var(--na-muted)' }}>
                  {`NodeAxis helps ${business.city} trades get found on Google, answer every lead and spend less time on admin. We're a small local team — you deal directly with the person who sets everything up.`}
                </motion.p>
                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
                  <PillButton href={promise.ctaHref} variant="primary" size="lg" arrow>{promise.cta}</PillButton>
                  <PillButton href={business.phoneHref} variant="secondary" size="lg">Call {business.phoneDisplay}</PillButton>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="relative overflow-hidden aspect-[4/3]"
                style={{ borderRadius: 'var(--na-radius-card)' }}
              >
                <Image
                  src="/images/bc-homes.jpg"
                  alt="Lower Mainland homes with the North Shore mountains behind"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute left-3 bottom-3 sm:left-5 sm:bottom-5">
                  <Card variant="white" padding="sm" style={{ boxShadow: 'var(--na-shadow-float)' }}>
                    <p className="text-[13px]" style={{ color: 'var(--na-muted)' }}>Serving</p>
                    <p className="font-display text-[18px] font-medium tracking-[-0.02em]">{business.serviceArea.slice(0, 4).join(' · ')}</p>
                  </Card>
                </div>
              </motion.div>
            </div>
          </Panel>

          {/* ── Why trades ───────────────────────────────────────── */}
          <Panel variant="canvas" padding="md" aria-labelledby="why-heading">
            <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger(0.1)}
              className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-x-[clamp(32px,5vw,80px)] gap-y-6">
              <motion.div variants={fadeUp}><SectionTag index={2}>Why trades</SectionTag></motion.div>
              <motion.div variants={fadeUp}>
                <DisplayHeading size="statement" id="why-heading" muted="So we built everything around making the phone ring for them.">
                  {`We checked hundreds of ${business.city} businesses on Google. The best tradespeople often had the fewest reviews and the most missed calls.`}
                </DisplayHeading>
              </motion.div>
            </motion.div>
            <motion.ul initial="hidden" whileInView="visible" viewport={viewport} variants={stagger(0.08)}
              className="grid grid-cols-1 md:grid-cols-3 gap-[var(--na-gutter)] mt-10">
              {localStats.map((s, i) => (
                <motion.li key={s.label} variants={fadeUp}>
                  <Card variant={i === 0 ? 'dark' : 'white'} padding="md" className="h-full flex flex-col gap-4">
                    <span className="font-display text-[56px] leading-none tracking-[-0.04em]">{s.value}</span>
                    <p className="text-[15px] leading-[1.5]" style={{ color: i === 0 ? 'var(--na-inv-muted)' : 'var(--na-muted)' }}>{s.label}</p>
                  </Card>
                </motion.li>
              ))}
            </motion.ul>
          </Panel>

          {/* ── How we work ──────────────────────────────────────── */}
          <Panel variant="white" padding="md" aria-labelledby="beliefs-heading">
            <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger(0.08)}>
              <motion.div variants={fadeUp} className="flex flex-col gap-4 mb-10 max-w-[40rem]">
                <SectionTag index={3}>How we work</SectionTag>
                <DisplayHeading size="md" id="beliefs-heading" muted="No exceptions.">Four promises.</DisplayHeading>
              </motion.div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-[var(--na-gutter)]">
                {beliefs.map((b, i) => (
                  <motion.li key={b.title} variants={fadeUp}>
                    <Card variant="soft" padding="md" className="h-full flex flex-col gap-3">
                      <span className="text-[13px]" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', color: 'var(--na-muted)' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-display text-[24px] font-medium tracking-[-0.02em]">{b.title}</h3>
                      <p className="text-[15.5px] leading-[1.6]" style={{ color: 'var(--na-muted)' }}>{b.body}</p>
                    </Card>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </Panel>

          {/* ── Founder ──────────────────────────────────────────── */}
          <Panel variant="canvas" padding="md" aria-labelledby="founder-heading">
            <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger(0.1)}
              className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-x-[clamp(32px,5vw,80px)] gap-y-8 items-start">
              <motion.div variants={fadeUp} className="flex flex-col gap-4">
                <SectionTag index={4}>Who you&apos;ll deal with</SectionTag>
                <Card variant="white" padding="md" className="flex items-center gap-4">
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-full font-display text-[22px] shrink-0"
                    style={{ background: 'var(--na-cta)', color: 'var(--na-on-cta)' }} aria-hidden="true">A</span>
                  <div>
                    <h2 id="founder-heading" className="font-display text-[20px] font-medium tracking-[-0.02em]">Adam Sahil</h2>
                    <p className="text-[14px]" style={{ color: 'var(--na-muted)' }}>Founder · {business.city}, BC</p>
                  </div>
                </Card>
              </motion.div>
              <motion.blockquote variants={fadeUp} className="flex flex-col gap-6">
                <p className="font-display text-[clamp(24px,3vw,38px)] leading-[1.2] tracking-[-0.03em]">
                  “Trades owners are great at their work and too busy to chase leads.{' '}
                  <span style={{ color: 'var(--na-muted)' }}>My job is to make sure the work they already do brings in the next job.”</span>
                </p>
                <p className="text-[16px] leading-[1.65] max-w-[38rem]" style={{ color: 'var(--na-muted)' }}>
                  No account managers and no juniors. When you call, you get the person who set up your profile,
                  your review requests and your monthly report.
                </p>
              </motion.blockquote>
            </motion.div>
          </Panel>

          {/* ── Service area + CTA ───────────────────────────────── */}
          <Panel variant="white" padding="md" aria-labelledby="area-heading">
            <div className="na-blob" aria-hidden="true" style={{ width: 420, height: 420, right: -120, top: -160, background: 'var(--na-blob-blue)' }} />
            <div className="na-blob" aria-hidden="true" style={{ width: 340, height: 340, left: -120, bottom: -180, background: 'var(--na-blob-peach)' }} />
            <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger(0.08)}
              className="relative flex flex-col gap-8">
              <motion.div variants={fadeUp} className="flex flex-col gap-4 max-w-[44rem]">
                <SectionTag index={5}>Where we work</SectionTag>
                <DisplayHeading size="md" id="area-heading" muted="If you're nearby, we'll come to you.">
                  {`${business.city} and the neighbourhoods around it.`}
                </DisplayHeading>
              </motion.div>
              <motion.ul variants={fadeUp} className="flex flex-wrap gap-2" aria-label="Service area">
                {business.serviceArea.map(area => (
                  <li key={area} className="inline-flex items-center rounded-full px-4 min-h-[40px] text-[14px] font-medium"
                    style={{ border: '1px solid var(--na-border-mid)', background: 'var(--na-card)' }}>
                    {area}
                  </li>
                ))}
              </motion.ul>
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
                <PillButton href={promise.ctaHref} variant="primary" size="lg" arrow>{promise.cta}</PillButton>
                <PillButton href="/services" variant="secondary" size="lg">See what we offer</PillButton>
              </motion.div>
            </motion.div>
          </Panel>
        </div>

        <Footer />
      </main>
    </MotionConfig>
  )
}
