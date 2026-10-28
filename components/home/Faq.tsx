import Link from 'next/link'
import { business } from '@/lib/offer'
import { DisplayHeading, Panel, SectionTag } from '@/components/ui'
import FaqAccordion from './FaqAccordion'
import { Reveal } from './Reveal'

export default function Faq() {
  return (
    <Panel variant="canvas" aria-labelledby="faq-heading">
      <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <Reveal>
          <SectionTag index={6}>Questions</SectionTag>
          <DisplayHeading as="h2" size="md" id="faq-heading" className="mt-5 max-w-[12ch]">
            Straight answers.
          </DisplayHeading>
          <p className="mt-6 max-w-[36ch] text-[16px] leading-relaxed text-na-muted">
            Something else on your mind? Call{' '}
            <a href={business.phoneHref} className="font-medium text-na-text underline underline-offset-4">
              {business.phoneDisplay}
            </a>{' '}
            or{' '}
            <Link href="/contact" className="font-medium text-na-text underline underline-offset-4">
              send us a note
            </Link>
            .
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <FaqAccordion />
        </Reveal>
      </div>
    </Panel>
  )
}
