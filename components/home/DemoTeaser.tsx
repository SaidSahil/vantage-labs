import Image from 'next/image'
import Link from 'next/link'
import { business } from '@/lib/offer'
import { DisplayHeading, Panel, PillButton, SectionTag } from '@/components/ui'
import { ArrowUpRight } from './icons'
import { Reveal } from './Reveal'

export default function DemoTeaser() {
  return (
    <Panel variant="white" aria-labelledby="demo-heading">
      <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
        <Reveal>
          <SectionTag index={5}>See it in action</SectionTag>
          <DisplayHeading as="h2" size="md" id="demo-heading" className="mt-5 max-w-[14ch]" muted="Built the way we’d build yours.">
            A sample site for a {business.city} plumber.
          </DisplayHeading>
          <p className="mt-6 max-w-[44ch] text-[16px] leading-relaxed text-na-muted">
            Click-to-call on every screen, reviews up front, service-area pages for {business.city} neighbourhoods and a quote form that lands in one inbox. Have a look on your phone.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            {/* /demo/* is a route handler serving standalone HTML: no prefetch (Next falls back to a full page load). */}
            <Link href="/demo/trades" prefetch={false} className="na-pill na-pill--dark na-pill--lg">
              <span>See the sample site</span>
              <span className="na-pill__icon"><ArrowUpRight /></span>
            </Link>
            <PillButton href="/work" variant="secondary" size="lg">
              More examples
            </PillButton>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Link
            href="/demo/trades"
            prefetch={false}
            className="group relative block aspect-[4/3] overflow-hidden rounded-card bg-na-card-soft"
            aria-label="Open the sample site for a Surrey plumber"
          >
            <Image
              src="/images/hero-plumber.jpg"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            />
            {/* Mock browser bar */}
            <span className="absolute left-4 right-4 top-4 flex items-center gap-2 rounded-full bg-na-card/90 px-4 py-2 text-[13px] text-na-muted shadow-[var(--na-shadow-card)] backdrop-blur md:left-6 md:right-auto md:w-[320px]">
              <span className="flex gap-1" aria-hidden="true">
                <span className="h-2 w-2 rounded-full bg-[var(--na-border-mid)]" />
                <span className="h-2 w-2 rounded-full bg-[var(--na-border-mid)]" />
                <span className="h-2 w-2 rounded-full bg-[var(--na-border-mid)]" />
              </span>
              <span className="truncate">surreyplumbing.example</span>
            </span>
            <span className="absolute bottom-4 left-4 flex items-center gap-3 rounded-card bg-na-card p-3 pr-5 text-na-text shadow-[var(--na-shadow-float)] md:bottom-6 md:left-6">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-na-cta text-[var(--na-on-cta)]">
                <ArrowUpRight />
              </span>
              <span className="text-[14px] leading-tight">
                <span className="block font-medium">Sample plumber site</span>
                <span className="block text-na-muted">Tap to open</span>
              </span>
            </span>
          </Link>
        </Reveal>
      </div>
    </Panel>
  )
}
