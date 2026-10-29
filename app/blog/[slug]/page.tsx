import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Card, DisplayHeading, Panel, PillButton, SectionTag } from '@/components/ui'
import { business, promise, tiers } from '@/lib/offer'
import { getPost, posts, sortedPosts, type PostBlock } from '@/lib/posts'
import { PostCard, PostMeta } from '../_components/PostCard'
import { Reveal, RevealItem } from '../_components/Reveal'

const BASE_URL = 'https://nodeaxis.ca'
const audit = tiers.find((t) => t.id === 'audit') ?? tiers[0]

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: 'Article not found | NodeAxis' }
  const url = `${BASE_URL}/blog/${post.slug}`
  const images = post.image ? [{ url: `${BASE_URL}${post.image.src}`, alt: post.image.alt }] : undefined
  return {
    title: `${post.title} | NodeAxis Surrey`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      section: post.category,
      locale: 'en_CA',
      url,
      siteName: 'NodeAxis',
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: images?.map((i) => i.url),
    },
  }
}

const mono = { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace' }

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="font-display text-[clamp(26px,3vw,34px)] font-medium leading-[1.15] tracking-[-0.03em] mt-12 mb-4">
          {block.text}
        </h2>
      )
    case 'h3':
      return (
        <h3 className="font-display text-[clamp(20px,2.2vw,23px)] font-medium leading-[1.25] tracking-[-0.02em] mt-8 mb-3">
          {block.text}
        </h3>
      )
    case 'quote':
      return (
        <blockquote
          className="font-display my-10 pl-6 text-[clamp(22px,2.6vw,28px)] leading-[1.3] tracking-[-0.02em]"
          style={{ borderLeft: '3px solid var(--na-accent)' }}
        >
          {block.text}
        </blockquote>
      )
    case 'note':
      return (
        <Card as="aside" variant="soft" padding="sm" className="my-8">
          <p className="text-[12.5px] font-medium uppercase tracking-[0.08em] mb-2" style={{ ...mono, color: 'var(--na-muted)' }}>
            {block.title}
          </p>
          <p className="text-[17px] leading-[1.65]">{block.text}</p>
        </Card>
      )
    case 'ul':
      return (
        <ul className="flex flex-col gap-3 mb-6">
          {block.items.map((item, i) => (
            <li key={i} className="relative pl-6 text-[17.5px] leading-[1.7]">
              <span aria-hidden="true" className="absolute left-0 top-[0.7em] w-[7px] h-[7px] rounded-full" style={{ background: 'var(--na-accent)' }} />
              {item}
            </li>
          ))}
        </ul>
      )
    case 'ol':
      return (
        <ol className="flex flex-col gap-3 mb-6">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-4 text-[17.5px] leading-[1.7]">
              <span aria-hidden="true" className="mt-[3px] inline-flex items-center justify-center w-7 h-7 rounded-full shrink-0 text-[13px] font-medium"
                style={{ background: 'var(--na-cta)', color: 'var(--na-on-cta)' }}>
                {i + 1}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ol>
      )
    default:
      return <p className="text-[17.5px] leading-[1.75] mb-5">{block.text}</p>
  }
}

function AuditCard() {
  return (
    <Card as="aside" variant="dark" padding="md" className="my-12 flex flex-col gap-4" aria-labelledby="inline-audit-heading">
      <p className="text-[12.5px] font-medium uppercase tracking-[0.08em]" style={{ ...mono, color: 'var(--na-inv-muted)' }}>
        Free · No obligation · In person
      </p>
      <h2 id="inline-audit-heading" className="font-display text-[clamp(24px,2.6vw,30px)] font-medium leading-[1.15] tracking-[-0.03em]">
        Want us to check this for your business?
      </h2>
      <p className="text-[16px] leading-[1.6]" style={{ color: 'var(--na-inv-muted)' }}>{audit.pitch}</p>
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <PillButton href={promise.ctaHref} variant="primary" arrow>{promise.cta}</PillButton>
        <PillButton href={business.phoneHref} variant="light">Call {business.phoneDisplay}</PillButton>
      </div>
    </Card>
  )
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const url = `${BASE_URL}/blog/${post.slug}`
  const more = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  // Insert the audit card roughly halfway through, just before an h2.
  const h2Indexes = post.body.flatMap((b, i) => (b.type === 'h2' ? [i] : []))
  const ctaAt = h2Indexes[Math.floor(h2Indexes.length / 2)] ?? -1

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    inLanguage: 'en-CA',
    ...(post.image ? { image: `${BASE_URL}${post.image.src}` } : {}),
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Organization', name: business.name, url: BASE_URL },
    publisher: { '@id': `${BASE_URL}/#organization` },
    about: { '@type': 'Thing', name: `Marketing for ${business.city}, ${business.region} trades businesses` },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Insights', item: `${BASE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  }

  return (
    <main style={{ background: 'var(--na-bg)', color: 'var(--na-text)', minHeight: '100vh' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />

      <div className="flex flex-col" style={{ gap: 'var(--na-gutter)', paddingTop: 96 }}>
        {/* ── Article ──────────────────────────────────────────── */}
        <Panel as="article" variant="white" padding="md" aria-labelledby="post-heading">
          <div className="mx-auto max-w-[68ch]">
            <Reveal onMount className="flex flex-col gap-5">
              <RevealItem>
                <nav aria-label="Breadcrumb">
                  <ol className="flex flex-wrap items-center gap-2 text-[14px]" style={{ color: 'var(--na-muted)' }}>
                    <li><Link href="/" className="hover:underline underline-offset-4">Home</Link></li>
                    <li aria-hidden="true">/</li>
                    <li><Link href="/blog" className="hover:underline underline-offset-4">Insights</Link></li>
                    <li aria-hidden="true">/</li>
                    <li aria-current="page" className="truncate max-w-[28ch]" style={{ color: 'var(--na-text)' }}>{post.title}</li>
                  </ol>
                </nav>
              </RevealItem>
              <RevealItem><PostMeta post={post} /></RevealItem>
              <RevealItem>
                <DisplayHeading as="h1" size="sm" id="post-heading">{post.title}</DisplayHeading>
              </RevealItem>
              <RevealItem>
                <p className="text-[clamp(18px,2vw,20px)] leading-[1.6]" style={{ color: 'var(--na-muted)' }}>{post.description}</p>
              </RevealItem>
              <RevealItem>
                <p className="flex items-center gap-3 text-[14px]" style={{ color: 'var(--na-muted)' }}>
                  <span className="inline-flex items-center justify-center w-9 h-9 rounded-full font-display text-[15px]"
                    style={{ background: 'var(--na-cta)', color: 'var(--na-on-cta)' }} aria-hidden="true">N</span>
                  <span>
                    By the <span style={{ color: 'var(--na-text)' }}>{business.name}</span> team, {business.city} · {post.readingMinutes} min read
                  </span>
                </p>
              </RevealItem>
            </Reveal>
          </div>

          {post.image && (
            <div className="relative mx-auto mt-10 max-w-[80rem] aspect-[16/9] sm:aspect-[21/9] overflow-hidden" style={{ borderRadius: 'var(--na-radius-card)' }}>
              <Image src={post.image.src} alt={post.image.alt} fill priority sizes="(max-width: 1280px) 100vw, 1280px" className="object-cover" />
            </div>
          )}

          <div className="mx-auto max-w-[68ch] mt-10">
            {post.body.map((block, i) => (
              <Fragment key={i}>
                {i === ctaAt && <AuditCard />}
                <Block block={block} />
              </Fragment>
            ))}
            <div className="mt-10 pt-8 flex flex-col sm:flex-row gap-3" style={{ borderTop: '1px solid var(--na-border-mid)' }}>
              <PillButton href={promise.ctaHref} variant="primary" size="lg" arrow>{promise.cta}</PillButton>
              <PillButton href="/blog" variant="secondary" size="lg">All insights</PillButton>
            </div>
          </div>
        </Panel>

        {/* ── More posts (closing panel stays light: footer is dark) ── */}
        {more.length > 0 && (
          <Panel variant="canvas" padding="md" aria-labelledby="more-heading">
            <Reveal className="flex flex-col gap-4 mb-10 max-w-[40rem]">
              <RevealItem><SectionTag>Keep reading</SectionTag></RevealItem>
              <RevealItem><DisplayHeading size="md" id="more-heading" muted="Five minutes each.">More for {business.city} trades.</DisplayHeading></RevealItem>
            </Reveal>
            <Reveal as="ul" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[var(--na-gutter)]">
              {more.map((p) => (
                <RevealItem as="li" key={p.slug}>
                  <PostCard post={p} headingLevel="h3" />
                </RevealItem>
              ))}
            </Reveal>
          </Panel>
        )}
      </div>

      <Footer />
    </main>
  )
}
