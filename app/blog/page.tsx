import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { sortedPosts } from '@/lib/posts'

const BASE_URL = 'https://nodeaxis.ca'

function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${BASE_URL}/blog#blog`,
  name: 'NodeAxis Insights',
  url: `${BASE_URL}/blog`,
  description:
    'Practical advice on websites, SEO, pricing, and conversion for small businesses in British Columbia.',
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
    <main style={{ background: 'var(--na-bg)', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <Navbar />

      {/* Hero */}
      <section
        style={{
          padding: 'clamp(120px, 16vw, 180px) clamp(24px, 4vw, 48px) clamp(40px, 5vw, 56px)',
          borderBottom: '1px solid var(--na-border-mid)',
          maxWidth: 1080,
          margin: '0 auto',
          width: '100%',
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--na-accent)',
            marginBottom: 16,
          }}
        >
          Insights
        </div>
        <h1
          style={{
            fontSize: 'clamp(40px, 7vw, 84px)',
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 0.98,
            color: 'var(--na-text)',
            marginBottom: 20,
          }}
        >
          Notes from the studio.
        </h1>
        <p
          style={{
            fontSize: 'clamp(15px, 1.8vw, 19px)',
            lineHeight: 1.65,
            color: 'var(--na-muted)',
            maxWidth: 560,
          }}
        >
          Straight, practical advice on websites, SEO, pricing, and turning
          visitors into customers — written for business owners, not developers.
        </p>
      </section>

      {/* Post list */}
      <section
        style={{
          padding: 'clamp(24px, 4vw, 48px) clamp(24px, 4vw, 48px) clamp(80px, 10vw, 120px)',
          maxWidth: 1080,
          margin: '0 auto',
          width: '100%',
        }}
      >
        {sortedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            data-cursor-hover
            aria-label={`Read: ${post.title}`}
            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
          >
            <article
              className="blog-row"
              style={{
                display: 'grid',
                gap: 'clamp(8px, 2vw, 32px)',
                alignItems: 'baseline',
                padding: 'clamp(28px, 4vw, 44px) clamp(4px, 1vw, 12px)',
                borderTop: '1px solid var(--na-border-mid)',
              }}
            >
              {/* Meta */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 4,
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

              <h2
                style={{
                  fontSize: 'clamp(24px, 3.6vw, 44px)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1.08,
                  color: 'var(--na-text)',
                  margin: '0 0 12px',
                  maxWidth: 820,
                }}
              >
                {post.title}
              </h2>

              <p
                style={{
                  fontSize: 'clamp(14px, 1.6vw, 17px)',
                  lineHeight: 1.65,
                  color: 'var(--na-muted)',
                  maxWidth: 680,
                  margin: 0,
                }}
              >
                {post.excerpt}
              </p>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  marginTop: 16,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--na-accent)',
                }}
              >
                Read article →
              </span>
            </article>
          </Link>
        ))}
        <div style={{ borderTop: '1px solid var(--na-border-mid)' }} />
      </section>

      <Footer />
    </main>
  )
}
