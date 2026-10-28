import Link from 'next/link'
import { promise, tiers } from '@/lib/offer'
import { Card, DisplayHeading, Panel, PillButton, SectionTag, cx } from '@/components/ui'
import { ArrowUpRight, CheckIcon } from './icons'
import { Reveal, RevealGroup, RevealItem } from './Reveal'

export default function Offer() {
  return (
    <Panel variant="canvas" aria-labelledby="offer-heading">
      <div className="mx-auto max-w-[1280px]">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.7fr)] lg:items-end lg:gap-16">
          <Reveal>
            <SectionTag index={2}>What we do</SectionTag>
            <DisplayHeading as="h2" size="lg" id="offer-heading" className="mt-5 max-w-[12ch]">
              Pick where to start.
            </DisplayHeading>
          </Reveal>
          <Reveal>
            <p className="max-w-[42ch] text-[17px] leading-relaxed text-na-muted">
              Most trades start with the free audit. No pitch — we show you what we found, face to face, and you decide.
            </p>
          </Reveal>
        </div>

        <RevealGroup as="ul" className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 md:gap-5 xl:grid-cols-4">
          {tiers.map((t) => {
            const dark = !!t.featured
            const isAudit = t.id === 'audit'
            return (
              <RevealItem as="li" key={t.id}>
                <Card
                  as="article"
                  variant={dark ? 'dark' : 'white'}
                  padding="none"
                  hover
                  aria-labelledby={`tier-${t.id}`}
                  className="flex h-full flex-col p-6 md:p-7"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 id={`tier-${t.id}`} className="font-display text-[22px] font-medium leading-[1.1] tracking-[-0.03em]">
                      {t.name}
                    </h3>
                    {dark && (
                      <span className="shrink-0 rounded-full bg-[var(--na-inv-text)] px-3 py-1 text-[12px] font-medium text-[var(--na-inv-bg)]">
                        Recommended
                      </span>
                    )}
                  </div>

                  <p className="mt-6 flex items-baseline gap-2">
                    <span className="font-display text-[48px] font-medium leading-none tracking-[-0.045em]">{t.price}</span>
                    <span className={cx('text-[14px]', dark ? 'text-na-inv-muted' : 'text-na-muted')}>{t.cadence}</span>
                  </p>

                  <p className={cx('mt-4 text-[15px] leading-relaxed', dark ? 'text-na-inv-muted' : 'text-na-muted')}>{t.pitch}</p>

                  <ul
                    className={cx('mt-6 flex flex-1 flex-col gap-3 border-t pt-6 text-[15px]', dark ? 'border-[var(--na-inv-border)]' : 'border-[var(--na-border)]')}
                    aria-label={`${t.name} includes`}
                  >
                    {t.includes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className={cx('mt-[3px] shrink-0', dark ? 'text-[var(--na-inv-accent)]' : 'text-na-accent')}>
                          <CheckIcon />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8">
                    {isAudit ? (
                      <PillButton href={promise.ctaHref} block arrow>
                        {promise.cta}
                      </PillButton>
                    ) : (
                      <PillButton href={`/services#${t.id}`} variant={dark ? 'light' : 'secondary'} block arrow>
                        See what’s included
                        <span className="sr-only"> in {t.name}</span>
                      </PillButton>
                    )}
                  </div>
                </Card>
              </RevealItem>
            )
          })}
        </RevealGroup>

        <Reveal className="mt-8 flex justify-center">
          <Link
            href="/services"
            className="inline-flex min-h-[44px] items-center gap-2 text-[15px] font-medium text-na-text underline-offset-4 hover:underline"
          >
            Compare all plans <ArrowUpRight />
          </Link>
        </Reveal>
      </div>
    </Panel>
  )
}
