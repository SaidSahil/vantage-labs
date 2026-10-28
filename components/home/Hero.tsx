'use client'
import Image from 'next/image'
import { Fragment, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ease } from '@/lib/animations'
import { business, promise } from '@/lib/offer'
import { DisplayHeading, ImageChip, PillButton } from '@/components/ui'
import { PhoneIcon, PinIcon, Stars } from './icons'

// Inline photo chips that follow each phrase of the promise (Muse.Studio move).
const chips: Record<number, ReactNode> = {
  0: <ImageChip src="/images/phone-call.jpg" alt="" aspect={1.35} tilt={-4} priority />,
  1: <ImageChip src="/images/homeowner-door.jpg" alt="" aspect={1.45} tilt={3} priority />,
}

// "More calls. More 5-star reviews. Less paperwork." → three phrases.
const phrases = promise.headline.split(/(?<=\.)\s+/)

const word = {
  hidden: { opacity: 0, y: '0.35em' },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease, delay: 0.08 + i * 0.06 } }),
}

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease, delay },
})

/**
 * Homepage hero. Animates on mount, unconditionally — never gate this behind a
 * ready/loaded flag (past mobile blank-screen bug).
 */
export default function Hero() {
  let n = 0
  return (
    <section aria-labelledby="hero-heading" className="pt-[104px] md:pt-[128px]">
      <div className="mx-auto max-w-[1360px] px-[calc(var(--na-gutter)+clamp(8px,2.4vw,40px))]">
        <DisplayHeading as="h1" size="xl" id="hero-heading" className="max-w-[13ch] lg:max-w-[14ch]">
          {phrases.map((phrase, p) => (
            <Fragment key={p}>
              {phrase.split(' ').map((w) => {
                const i = n++
                return (
                  <Fragment key={i}>
                    <motion.span className="inline-block" variants={word} custom={i} initial="hidden" animate="visible">
                      {w}
                    </motion.span>{' '}
                  </Fragment>
                )
              })}
              {chips[p] && (
                <>
                  <motion.span
                    className="inline-block"
                    initial={{ opacity: 0, scale: 0.6, rotate: p ? 8 : -8 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ duration: 0.7, ease, delay: 0.25 + n * 0.06 }}
                  >
                    {chips[p]}
                  </motion.span>{' '}
                </>
              )}
            </Fragment>
          ))}
        </DisplayHeading>

        <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <motion.p {...rise(0.45)} className="max-w-[46ch] text-[17px] leading-relaxed text-na-muted md:text-[18px]">
            {promise.sub}
          </motion.p>
          <motion.div {...rise(0.55)} className="flex flex-col gap-4 md:items-end">
            <div className="flex flex-col gap-3 sm:flex-row">
              <PillButton href={promise.ctaHref} size="lg" arrow>
                {promise.cta}
              </PillButton>
              <PillButton href={business.phoneHref} variant="secondary" size="lg" icon={<PhoneIcon />}>
                Call {business.phoneDisplay}
              </PillButton>
            </div>
            <p className="inline-flex items-center gap-2 text-[14px] text-na-muted">
              <PinIcon />
              Based in {business.city} · We meet you in person
            </p>
          </motion.div>
        </div>
      </div>

      {/* Full-bleed rounded photo panel with floating info cards (travel reference). */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, ease, delay: 0.35 }}
        className="relative mx-[var(--na-gutter)] mt-10 aspect-[4/5] overflow-hidden rounded-panel bg-na-card-soft sm:aspect-[4/3] md:mt-16 md:aspect-[16/9] lg:aspect-[21/9]"
      >
        <Image
          src="/images/roofer.jpg"
          alt="A roofer in a red shirt inspecting shingles on a brick house on a sunny day"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_30%]"
        />

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.9 }}
          className="absolute left-4 top-4 flex items-center gap-3 rounded-full bg-na-card py-2 pl-2 pr-4 text-na-text shadow-[var(--na-shadow-float)] md:left-8 md:top-8"
        >
          <span className="grid h-9 w-9 place-items-center rounded-full bg-na-cta text-[var(--na-on-cta)]">
            <PhoneIcon size={15} />
          </span>
          <span className="text-[13px] leading-tight md:text-[14px]">
            <span className="block font-medium">Missed call → texted back</span>
            <span className="block text-na-muted">in 8 seconds</span>
          </span>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 1.05 }}
          className="absolute bottom-4 left-4 right-4 rounded-card bg-na-card p-4 text-na-text shadow-[var(--na-shadow-float)] sm:left-auto sm:w-[340px] md:bottom-8 md:right-8 md:p-5"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-[12px] font-medium uppercase tracking-[0.08em] text-na-muted">New Google review</span>
            <Stars />
          </div>
          <blockquote className="mt-3 font-display text-[19px] leading-snug tracking-[-0.02em] md:text-[21px]">
            “Showed up on time, fixed the leak, left the place spotless.”
          </blockquote>
          <figcaption className="mt-3 text-[13px] text-na-muted">Example alert · Homeowner in Fleetwood</figcaption>
        </motion.figure>
      </motion.div>
    </section>
  )
}
