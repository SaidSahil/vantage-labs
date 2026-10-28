import type { CSSProperties } from 'react'
import { steps } from '@/lib/offer'
import { Card, DisplayHeading, Panel, SectionTag } from '@/components/ui'
import { Reveal, RevealGroup, RevealItem } from './Reveal'

const track: CSSProperties = {
  backgroundImage: 'repeating-linear-gradient(135deg, var(--na-card-soft) 0 1px, transparent 1px 9px)',
}

/** Lumóra-style "Our process" row: a staircase of dark labels above numbered cards. */
export default function HowItWorks() {
  return (
    <Panel variant="white" id="how-it-works" aria-labelledby="how-heading" className="scroll-mt-24">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)_minmax(0,0.6fr)] lg:items-start lg:gap-10">
          <Reveal>
            <SectionTag index={3}>How it works</SectionTag>
          </Reveal>
          <Reveal>
            <DisplayHeading as="h2" size="md" id="how-heading" className="max-w-[14ch]">
              Four steps. You keep working.
            </DisplayHeading>
          </Reveal>
          <Reveal>
            <p className="max-w-[38ch] text-[16px] leading-relaxed text-na-muted">
              We do the setup and run it for you. No software to learn, no long contract — just more calls answered and a short report every month.
            </p>
          </Reveal>
        </div>

        <RevealGroup as="ol" className="mt-12 grid gap-3 sm:grid-cols-2 md:mt-16 lg:grid-cols-4 lg:gap-4">
          {steps.map((s, i) => (
            <RevealItem as="li" key={s.title} className="flex flex-col gap-3">
              {/* Staircase track (decorative) */}
              <div
                aria-hidden="true"
                className="relative hidden h-[148px] overflow-hidden rounded-card border border-[var(--na-border)] lg:block"
                style={track}
              >
                <div
                  className="absolute inset-x-0 flex h-9 items-center bg-[var(--na-inv-bg)] px-4 text-[13px] font-medium text-[var(--na-inv-text)]"
                  style={{ top: `${i * 24}px` }}
                >
                  {s.title}
                </div>
                <span className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[12px] text-na-muted">0{i + 1}</span>
              </div>

              <Card variant="soft" padding="none" className="flex flex-1 flex-col gap-3 p-6">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-na-card font-mono text-[13px] font-medium text-na-text lg:hidden">
                  0{i + 1}
                </span>
                <h3 className="font-display text-[22px] font-medium leading-[1.1] tracking-[-0.03em]">
                  <span className="sr-only">Step {i + 1}: </span>
                  {s.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-na-muted">{s.body}</p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Panel>
  )
}
