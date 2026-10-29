import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { DisplayHeading, Panel, PillButton, SectionTag } from '@/components/ui'
import { business, promise } from '@/lib/offer'

export const metadata: Metadata = {
  title: 'Page not found — NodeAxis',
  description: `This page doesn't exist. NodeAxis helps ${business.city}, BC trades get more calls, more 5-star reviews and less paperwork.`,
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main style={{ background: 'var(--na-bg)', color: 'var(--na-text)', minHeight: '100vh' }}>
      <Navbar />

      <div className="flex flex-col" style={{ gap: 'var(--na-gutter)', paddingTop: 96 }}>
        <Panel variant="white" padding="md" aria-labelledby="nf-heading">
          <div className="na-blob" aria-hidden="true" style={{ width: 420, height: 420, right: -140, top: -160, background: 'var(--na-blob-blue)' }} />
          <div className="na-blob" aria-hidden="true" style={{ width: 320, height: 320, left: -120, bottom: -180, background: 'var(--na-blob-peach)' }} />
          <div className="relative flex flex-col gap-6 py-[clamp(24px,6vw,80px)] max-w-[52rem]">
            <SectionTag index="404">Page not found</SectionTag>
            <DisplayHeading as="h1" size="xl" id="nf-heading" muted="Let's get you back on track.">
              Wrong turn.
            </DisplayHeading>
            <p className="text-[17px] leading-[1.65] max-w-[34rem]" style={{ color: 'var(--na-muted)' }}>
              This page has moved or never existed. Head home, book your free local audit, or just give us a call —
              a real person in {business.city} picks up.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <PillButton href="/" variant="secondary" size="lg">Back to home</PillButton>
              <PillButton href={promise.ctaHref} variant="primary" size="lg" arrow>{promise.cta}</PillButton>
              <PillButton href={business.phoneHref} variant="ghost" size="lg">Call {business.phoneDisplay}</PillButton>
            </div>
          </div>
        </Panel>
      </div>

      <Footer />
    </main>
  )
}
