import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { getPost, posts, sortedPosts, type PostBlock } from '@/lib/posts'

const BASE_URL = 'https://nodeaxis.ca'

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return { title: 'Article not found — NodeAxis' }
  const url = `${BASE_URL}/blog/${post.slug}`
  return {
    title: `${post.title} — NodeAxis`,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      locale: 'en_CA',
      url,
      siteName: 'NodeAxis',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function Block({ block }: { block: PostBlock }) {
  switch (block.type) {
    case 'h2':
      return (
        <h2
          style={{
            fontSize: 'clamp(22px, 3vw, 32px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            color: 'var(--na-text)',
            margin: 'clamp(36px, 4.5vw, 52px) 0 16px',
          }}
        >
          {block.text}
        </h2>
      )
    case 'quote':
      return (
        <blockquote
          style={{
            margin: 'clamp(28px, 3.5vw, 40px) 0',
            paddingLeft: 'clamp(20px, 3vw, 28px)',
            borderLeft: '3px solid var(--na-accent)',
            fontSize: 'clamp(19px, 2.4vw, 26px)',
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 1.45,
            color: 'var(--na-text)',
          }}
        >
          {block.text}
        </blockquote>
      )
    case 'ul':
      return (
        <ul
          style={{
            listStyle: 'none',
            margin: '0 0 20px',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          {block.items.map((item, i) => (
            <li
              key={i}
              style={{
                position: 'relative',
                paddingLeft: 24,
                fontSize: 'clamp(15px, 1.7vw, 18px)',
                lineHeight: 1.7,
                color: 'var(--na-muted)',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '0.62em',
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: 'var(--na-accent)',
                }}
              />
              {item}
            </li>
          ))}
        </ul>
      )
    default:
      return (
        <p
          style={{
            fontSize: 'clamp(15px, 1.7vw, 18px)',
            lineHeight: 1.8,
            color: 'var(--na-muted)',
            margin: '0 0 20px',
          }}
        >
          {block.text}
        </p>
      )
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  const url = `${BASE_URL}/blog/${post.slug}`
  const more = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 2)

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
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    author: { '@type': 'Organization', name: 'NodeAxis', url: BASE_URL },
    publisher: { '@id': `${BASE_URL}/#organization` },
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
    <main style={{ background: 'var(--na-bg)', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Navbar />

      {/* Header */}
      <article
        style={{
          padding: 'clamp(120px, 15vw, 170px) clamp(24px, 4vw, 48px) 0',
          maxWidth: 760,
          margin: '0 auto',
          width: '100%',
        }}
      >
        <nav aria-label="Breadcrumb" style={{ marginBottom: 24 }}>
          <Link
            href="/blog"
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--na-muted)',
              textDecoration: 'none',
            }}
          >
            ← All insights
          </Link>
        </nav>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 12,
            marginBottom: 20,
          }}
        >
          <span
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--na-accent)',
            }}
          >
            {post.category}
          </span>
          <span style={{ width: 1, height: 12, background: 'var(--na-border-mid)' }} />
          <span style={{ fontSize: 12, color: 'var(--na-muted)' }}>{formatDate(post.date)}</span>
          <span style={{ width: 1, height: 12, background: 'var(--na-border-mid)' }} />
          <span style={{ fontSize: 12, color: 'var(--na-muted)' }}>{post.readingMinutes} min read</span>
        </div>

        <h1
          style={{
            fontSize: 'clamp(32px, 5.2vw, 56px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.04,
            color: 'var(--na-text)',
            marginBottom: 20,
          }}
        >
          {post.title}
        </h1>

        <p
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            lineHeight: 1.6,
            color: 'var(--na-muted)',
            paddingBottom: 'clamp(28px, 4vw, 40px)',
            borderBottom: '1px solid var(--na-border-mid)',
            marginBottom: 'clamp(28px, 4vw, 40px)',
          }}
        >
          {post.description}
        </p>

        {/* Body */}
        <div>
          {post.body.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: 'clamp(48px, 6vw, 72px)',
            padding: 'clamp(28px, 4vw, 44px)',
            background: 'var(--na-inv-bg)',
            borderRadius: 16,
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(20px, 2.6vw, 28px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--na-inv-text)',
              marginBottom: 10,
            }}
          >
            Want a straight answer for your business?
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.6, color: 'var(--na-inv-muted)', marginBottom: 22, maxWidth: 440, marginInline: 'auto' }}>
            No sales pressure — just an honest take on what would actually move the needle for you.
          </p>
          <Link
            href="/contact"
            style={{
              display: 'inline-block',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--na-inv-bg)',
              background: 'var(--na-inv-accent)',
              textDecoration: 'none',
              padding: '13px 28px',
              borderRadius: 100,
            }}
          >
            Get a free quote
          </Link>
        </div>
      </article>

      {/* More posts */}
      {more.length > 0 && (
        <section
          style={{
            padding: 'clamp(64px, 8vw, 96px) clamp(24px, 4vw, 48px)',
            maxWidth: 1080,
            margin: '0 auto',
            width: '100%',
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--na-muted)',
              paddingBottom: 20,
              borderBottom: '1px solid var(--na-border-mid)',
              marginBottom: 8,
            }}
          >
            Keep reading
          </div>
          {more.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
              <div
                style={{
                  padding: 'clamp(20px, 3vw, 28px) 0',
                  borderTop: '1px solid var(--na-border-mid)',
                }}
              >
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--na-accent)' }}>
                  {p.category}
                </span>
                <h3
                  style={{
                    fontSize: 'clamp(18px, 2.4vw, 26px)',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    color: 'var(--na-text)',
                    margin: '8px 0 0',
                  }}
                >
                  {p.title}
                </h3>
              </div>
            </Link>
          ))}
          <div style={{ borderTop: '1px solid var(--na-border-mid)' }} />
        </section>
      )}

      <Footer />
    </main>
  )
}
