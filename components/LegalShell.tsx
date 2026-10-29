import type { ReactNode } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { DisplayHeading, Panel, PillButton, SectionTag } from '@/components/ui'
import { business } from '@/lib/offer'

// Shared layout for /privacy and /terms: hero panel, sticky table of contents
// (desktop), readable ~70ch body, closing contact panel.
//
// A block is:
//   - a string → paragraph (may contain trusted inline HTML: <strong>, <a>, <em>)
//   - a string[] → bullet list
//   - { sub } → h3 sub-heading
//   - { node } → arbitrary React content (e.g. interactive controls)
export type LegalBlock = string | string[] | { sub: string } | { node: ReactNode }

export interface LegalSection {
  /** Anchor id for the table of contents. Derived from the heading if omitted. */
  id?: string
  heading: string
  body: LegalBlock[]
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/^\d+\.\s*/, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const bodyText = 'text-[16px] leading-[1.75]'

function renderBlock(block: LegalBlock, i: number) {
  if (typeof block === 'string') {
    return (
      <p key={i} className={`${bodyText} legal-prose mb-4`} style={{ color: 'var(--na-muted)' }}
        dangerouslySetInnerHTML={{ __html: block }} />
    )
  }
  if (Array.isArray(block)) {
    return (
      <ul key={i} className="flex flex-col gap-2.5 mb-5">
        {block.map((item, j) => (
          <li key={j} className={`${bodyText} legal-prose relative pl-5`} style={{ color: 'var(--na-muted)' }}>
            <span aria-hidden="true" className="absolute left-0 top-[0.7em] w-1.5 h-1.5 rounded-full" style={{ background: 'var(--na-accent)' }} />
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </li>
        ))}
      </ul>
    )
  }
  if ('sub' in block) {
    return (
      <h3 key={i} className="font-display text-[19px] font-medium tracking-[-0.02em] mt-7 mb-3" style={{ color: 'var(--na-text)' }}>
        {block.sub}
      </h3>
    )
  }
  return <div key={i} className="mb-5">{block.node}</div>
}

export default function LegalShell({
  title,
  intro,
  updated,
  sections,
}: {
  title: string
  intro: string
  updated: string
  sections: LegalSection[]
}) {
  const withIds = sections.map(s => ({ ...s, id: s.id ?? slugify(s.heading) }))

  const tocList = (
    <ol className="flex flex-col gap-1">
      {withIds.map(s => (
        <li key={s.id}>
          <a href={`#${s.id}`} className="legal-toc-link block rounded-lg px-3 py-1.5 text-[14px] leading-[1.4]">
            {s.heading}
          </a>
        </li>
      ))}
    </ol>
  )

  return (
    <main style={{ background: 'var(--na-bg)', color: 'var(--na-text)', minHeight: '100vh' }}>
      <Navbar />

      <div className="flex flex-col" style={{ gap: 'var(--na-gutter)', paddingTop: 96 }}>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <Panel variant="white" padding="md" aria-labelledby="legal-heading">
          <div className="flex flex-col gap-5 max-w-[48rem]">
            <SectionTag>Legal</SectionTag>
            <DisplayHeading as="h1" size="lg" id="legal-heading">{title}</DisplayHeading>
            <p className="text-[17px] leading-[1.65] max-w-[38rem]" style={{ color: 'var(--na-muted)' }}>{intro}</p>
            <p className="text-[14px] font-medium" style={{ color: 'var(--na-text)' }}>
              Last updated: <time>{updated}</time>
            </p>
          </div>
        </Panel>

        {/* ── Body ─────────────────────────────────────────────── */}
        <Panel variant="white" padding="md">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(200px,260px)_1fr] gap-x-[clamp(32px,5vw,80px)] gap-y-8 items-start">
            {/* Mobile / tablet: collapsible contents */}
            <details className="lg:hidden rounded-[var(--na-radius-card)] p-4" style={{ background: 'var(--na-card-soft)' }}>
              <summary className="cursor-pointer text-[15px] font-medium px-3 py-1 min-h-[44px] flex items-center">On this page</summary>
              <nav aria-label="On this page" className="mt-2">{tocList}</nav>
            </details>

            {/* Desktop: sticky contents */}
            <nav aria-label="Table of contents" className="hidden lg:block sticky top-[112px] max-h-[calc(100vh-136px)] overflow-y-auto">
              <p className="na-tag mb-3 px-3">On this page</p>
              {tocList}
            </nav>

            <article className="max-w-[70ch] min-w-0">
              {withIds.map((section, i) => (
                <section
                  key={section.id}
                  aria-labelledby={section.id}
                  className={i === 0 ? '' : 'mt-10 pt-10'}
                  style={i === 0 ? undefined : { borderTop: '1px solid var(--na-border)' }}
                >
                  <h2 id={section.id} className="font-display text-[clamp(22px,2.4vw,28px)] font-medium tracking-[-0.03em] leading-[1.15] mb-4 scroll-mt-[112px]">
                    {section.heading}
                  </h2>
                  {section.body.map((block, j) => renderBlock(block, j))}
                </section>
              ))}
            </article>
          </div>
        </Panel>

        {/* ── Closing contact panel (white — Footer below is dark) ─ */}
        <Panel variant="white" padding="md" aria-labelledby="legal-questions">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="flex flex-col gap-3 max-w-[40rem]">
              <SectionTag>Questions</SectionTag>
              <DisplayHeading size="sm" id="legal-questions" muted="Ask a real person.">Something unclear?</DisplayHeading>
              <p className="text-[16px] leading-[1.65]" style={{ color: 'var(--na-muted)' }}>
                Email <a href={`mailto:${business.email}`} className="legal-inline-link">{business.email}</a> or call{' '}
                <a href={business.phoneHref} className="legal-inline-link">{business.phoneDisplay}</a> ({business.hours}).
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <PillButton href={`mailto:${business.email}`} variant="secondary">Email us</PillButton>
              <PillButton href={business.phoneHref} variant="primary">Call {business.phoneDisplay}</PillButton>
            </div>
          </div>
        </Panel>
      </div>

      <Footer />

      <style>{`
        .legal-prose strong { color: var(--na-text); font-weight: 600; }
        .legal-prose a, .legal-inline-link {
          color: var(--na-accent); text-decoration: underline; text-underline-offset: 3px; font-weight: 500;
        }
        .legal-prose a:focus-visible, .legal-inline-link:focus-visible, .legal-toc-link:focus-visible {
          outline: 2px solid var(--na-accent); outline-offset: 2px; border-radius: 6px;
        }
        .legal-toc-link { color: var(--na-muted); transition: background-color .2s ease, color .2s ease; }
        .legal-toc-link:hover { color: var(--na-text); background: var(--na-card-soft); }
      `}</style>
    </main>
  )
}
