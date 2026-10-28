import Image from 'next/image'
import { problems } from '@/lib/offer'
import { Card, DisplayHeading, Panel, SectionTag } from '@/components/ui'
import { Reveal, RevealGroup, RevealItem } from './Reveal'

const photos = [
  { src: '/images/hvac-tech.jpg', alt: 'An HVAC technician working on an outdoor unit, away from his phone' },
  { src: '/images/landscaper.jpg', alt: 'Two landscapers mowing and trimming a tidy residential lawn' },
  { src: '/images/paperwork.jpg', alt: 'Close-up of a hand holding a clipboard full of paperwork' },
]

export default function Problems() {
  return (
    <Panel variant="white" aria-labelledby="problems-heading">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10">
          <Reveal>
            <SectionTag index={1}>The problem</SectionTag>
          </Reveal>
          <Reveal>
            <DisplayHeading
              as="h2"
              size="statement"
              id="problems-heading"
              className="max-w-[24ch]"
              muted="But when the phone goes to voicemail and Google shows a handful of reviews, homeowners call someone else."
            >
              You do great work.
            </DisplayHeading>
          </Reveal>
        </div>

        <RevealGroup as="ul" className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-5">
          {problems.map((p, i) => (
            <RevealItem as="li" key={p.title}>
              <Card as="article" variant="soft" padding="none" hover className="flex h-full flex-col">
                <div className="relative m-2 aspect-[4/3] overflow-hidden rounded-[calc(var(--na-radius-card)-6px)]">
                  <Image src={photos[i % photos.length].src} alt={photos[i % photos.length].alt} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6 pt-4 md:p-7 md:pt-5">
                  <span className="font-mono text-[12px] text-na-muted">0{i + 1}</span>
                  <h3 className="font-display text-[24px] font-medium leading-[1.1] tracking-[-0.03em] md:text-[26px]">{p.title}</h3>
                  <p className="text-[15px] leading-relaxed text-na-muted">{p.body}</p>
                </div>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Panel>
  )
}
