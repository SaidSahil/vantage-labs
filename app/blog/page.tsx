import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { DisplayHeading, ImageChip, Panel, PillButton, SectionTag } from '@/components/ui'
import { business, promise } from '@/lib/offer'
import { sortedPosts } from '@/lib/posts'
import { PostCard } from './_components/PostCard'
import { Reveal, RevealItem } from './_components/Reveal'

const BASE_URL = 'https://nodeaxis.ca'

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${BASE_URL}/blog#blog`,
  name: 'NodeAxis Insights',
  url: `${BASE_URL}/blog`,
  description: `Plain-language advice for ${business.city} trades on getting more calls, more Google reviews and less paperwork.`,
  inLanguage: 'en-CA',
  publisher: { '@id': `${BASE_URL}/#organization` },
  blogPost: sortedPosts.map((p) => ({
    '@type': 'BlogPosting',
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    url: `${BASE_URL}/blog/${p.slug}`,
  })),
}

export default function BlogPage() {
  return (
    <main style={{ background: 'var(--na-bg)', color: 'var(--na-text)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <Navbar />

      <div className="flex flex-col" style={{ gap: 'var(--na-gutter)', paddingTop: 96 }}>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <Panel variant="white" padding="md" aria-labelledby="blog-heading">
          <Reveal onMount className="flex flex-col gap-6 max-w-[56rem]">
            <RevealItem><SectionTag index={1}>Insights</SectionTag></RevealItem>
            <RevealItem>
              <DisplayHeading as="h1" size="lg" id="blog-heading" muted="Straight from the job site.">
                Insights for {business.city}{' '}
                <ImageChip src="/images/roofer.jpg" alt="" aspect={1.5} tilt={-3} priority /> trades.
              </DisplayHeading>
            </RevealItem>
            <RevealItem>
              <p className="text-[17px] leading-[1.65] max-w-[38rem]" style={{ color: 'var(--na-muted)' }}>
                Short, practical reads on getting more calls, more 5-star reviews and less paperwork. Written for busy
                owners — no tech talk, no fluff.
              </p>
            </RevealItem>
          </Reveal>
        </Panel>

        {/* ── Posts ────────────────────────────────────────────── */}
        <Panel variant="canvas" padding="md" aria-labelledby="posts-heading">
          <h2 id="posts-heading" className="sr-only">All articles</h2>
          <Reveal as="ul" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[var(--na-gutter)]">
            {sortedPosts.map((post) => (
              <RevealItem as="li" key={post.slug}>
                <PostCard post={post} />
              </RevealItem>
            ))}
          </Reveal>
        </Panel>

        {/* ── Closing CTA (white: the footer below is dark) ────── */}
        <Panel variant="white" padding="md" aria-labelledby="blog-cta-heading">
          <div className="na-blob" aria-hidden="true" style={{ width: 420, height: 420, right: -120, top: -160, background: 'var(--na-blob-blue)' }} />
          <div className="na-blob" aria-hidden="true" style={{ width: 340, height: 340, left: -120, bottom: -180, background: 'var(--na-blob-peach)' }} />
          <Reveal className="relative flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <RevealItem className="flex flex-col gap-4 max-w-[40rem]">
              <SectionTag index={2}>Rather we just look?</SectionTag>
              <DisplayHeading size="md" id="blog-cta-heading" muted="Free, in person, no obligation.">
                We&apos;ll check your Google profile, reviews and calls for you.
              </DisplayHeading>
            </RevealItem>
            <RevealItem className="flex flex-col sm:flex-row gap-3">
              <PillButton href={promise.ctaHref} variant="primary" size="lg" arrow>{promise.cta}</PillButton>
              <PillButton href={business.phoneHref} variant="secondary" size="lg">Call {business.phoneDisplay}</PillButton>
            </RevealItem>
          </Reveal>
        </Panel>
      </div>

      <Footer />
    </main>
  )
}
