import { business, promise } from '@/lib/offer'
import { DisplayHeading, Panel, PillButton, SectionTag } from '@/components/ui'
import { PhoneIcon } from './icons'
import { Reveal } from './Reveal'

/** Closing panel with soft blue/peach blur blobs (Muse.Studio). */
export default function ClosingCta() {
  return (
    <Panel variant="white" aria-labelledby="cta-heading" className="isolate">
      <div aria-hidden="true">
        <span className="na-blob -left-[10%] -top-[30%] h-[70%] w-[55%]" style={{ background: 'var(--na-blob-peach)' }} />
        <span className="na-blob -bottom-[35%] -right-[8%] h-[80%] w-[55%]" style={{ background: 'var(--na-blob-blue)' }} />
      </div>
      <Reveal className="relative mx-auto flex max-w-[980px] flex-col items-center py-10 text-center md:py-20">
        <SectionTag>Free · No obligation · In person</SectionTag>
        <DisplayHeading as="h2" size="lg" id="cta-heading" className="mt-6 max-w-[14ch]">
          Let’s get your phone ringing.
        </DisplayHeading>
        <p className="mt-6 max-w-[48ch] text-[17px] leading-relaxed text-na-muted">
          We’ll check how you show up on Google, test how your calls get answered, and walk you through it over coffee — anywhere in {business.city} and nearby.
        </p>
        <div className="mt-10 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
          <PillButton href={promise.ctaHref} size="lg" arrow>
            {promise.cta}
          </PillButton>
          <PillButton href={business.phoneHref} variant="secondary" size="lg" icon={<PhoneIcon />}>
            Call {business.phoneDisplay}
          </PillButton>
        </div>
        <p className="mt-6 text-[14px] text-na-muted">{business.hours}</p>
      </Reveal>
    </Panel>
  )
}
