'use client'
import { useId, useState } from 'react'
import { faqs } from '@/lib/offer'

/** Accessible accordion: each question is a <button aria-expanded> controlling a labelled region. */
export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0)
  const base = useId()

  return (
    <ul className="border-t border-[var(--na-border-mid)]">
      {faqs.map((f, i) => {
        const isOpen = open === i
        const btnId = `${base}-q${i}`
        const panelId = `${base}-a${i}`
        return (
          <li key={f.q} className="border-b border-[var(--na-border-mid)]">
            <h3>
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex min-h-[64px] w-full cursor-pointer items-center justify-between gap-6 py-5 text-left font-display text-[20px] font-medium leading-snug tracking-[-0.02em] text-na-text md:text-[24px]"
              >
                <span>{f.q}</span>
                <span
                  aria-hidden="true"
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[var(--na-border-mid)] transition-[transform,background-color,color] duration-300 ${
                    isOpen ? 'rotate-45 bg-na-text text-na-bg' : 'bg-na-card'
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <p className="max-w-[60ch] pb-6 pr-12 text-[16px] leading-relaxed text-na-muted">{f.a}</p>
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
