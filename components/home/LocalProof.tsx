import Image from 'next/image'
import { business, localStats } from '@/lib/offer'
import { Card, DisplayHeading, Panel, SectionTag } from '@/components/ui'
import { PinIcon } from './icons'
import { Reveal, RevealGroup, RevealItem } from './Reveal'

function StatValue({ value }: { value: string }) {
  return (
    <span className="block font-display text-[64px] font-medium leading-[0.9] tracking-[-0.05em] md:text-[80px]">{value}</span>
  )
}

/** Lumóra bento: dark stat card, light stat card, wide photo card carrying the third stat. */
export default function LocalProof() {
  const [first, second, third] = localStats
  return (
    <Panel variant="canvas" aria-labelledby="proof-heading">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
          <Reveal>
            <SectionTag index={4}>{business.city}, by the numbers</SectionTag>
          </Reveal>
          <Reveal>
            <DisplayHeading
              as="h2"
              size="statement"
              id="proof-heading"
              className="max-w-[26ch]"
              muted="Most local trades barely show up — which makes it easy for you to stand out."
            >
              Homeowners check the stars before they call.
            </DisplayHeading>
          </Reveal>
        </div>

        <RevealGroup as="ul" className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-4">
          {first && (
            <RevealItem as="li">
              <Card variant="dark" padding="none" className="flex h-full min-h-[260px] flex-col justify-between gap-10 p-6 md:p-7">
                <span className="text-[13px] font-medium text-na-inv-muted">Google reviews</span>
                <p>
                  <StatValue value={first.value} />
                  <span className="mt-4 block text-[15px] leading-snug text-na-inv-muted">{first.label}</span>
                </p>
              </Card>
            </RevealItem>
          )}
          {second && (
            <RevealItem as="li">
              <Card variant="white" padding="none" className="flex h-full min-h-[260px] flex-col justify-between gap-10 p-6 md:p-7">
                <span className="text-[13px] font-medium text-na-muted">Google reviews</span>
                <p>
                  <StatValue value={second.value} />
                  <span className="mt-4 block text-[15px] leading-snug text-na-muted">{second.label}</span>
                </p>
              </Card>
            </RevealItem>
          )}
          {third && (
            <RevealItem as="li" className="md:col-span-2">
              <Card variant="dark" padding="none" className="h-full min-h-[300px]">
                <Image
                  src="/images/bc-homes.jpg"
                  alt="Suburban homes in the Lower Mainland with the city skyline and mountains behind"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, color-mix(in srgb, var(--na-inv-bg) 85%, transparent) 0%, color-mix(in srgb, var(--na-inv-bg) 35%, transparent) 50%, transparent 78%)' }}
                />
                <div className="relative flex h-full min-h-[300px] flex-col justify-between gap-10 p-6 md:p-7">
                  <span className="self-start rounded-full bg-[color-mix(in_srgb,var(--na-inv-bg)_55%,transparent)] px-3 py-1 text-[13px] font-medium text-[var(--na-inv-text)] backdrop-blur">
                    Google reviews
                  </span>
                  <p className="max-w-[30ch] text-[var(--na-inv-text)]">
                    <StatValue value={third.value} />
                    <span className="mt-4 block text-[15px] leading-snug">{third.label}</span>
                  </p>
                </div>
              </Card>
            </RevealItem>
          )}
        </RevealGroup>

        <Reveal className="mt-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <p className="max-w-[44ch] text-[14px] leading-relaxed text-na-muted">
            From our own scan of {business.city} businesses on Google Maps, Oct 2026 — top results per trade.
          </p>
          <div>
            <h3 className="mb-3 inline-flex items-center gap-2 text-[13px] font-medium text-na-text">
              <PinIcon /> Where we work
            </h3>
            <ul className="flex flex-wrap gap-2" aria-label="Service area">
              {business.serviceArea.map((area) => (
                <li
                  key={area}
                  className="rounded-full border border-[var(--na-border-mid)] bg-na-card px-4 py-2 text-[14px] text-na-text"
                >
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Panel>
  )
}
