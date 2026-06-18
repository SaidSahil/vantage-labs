'use client'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { fadeUp, stagger, viewport } from '@/lib/animations'
import { getProject } from '@/lib/projects'

// Featured case studies — a deeper, metric-led cut of three real projects.
// Narrative (brief/result) comes straight from lib/projects.ts; only the
// pulled-out headline metric is curated here for presentation.
const featured = [
  { slug: 'team4security', metric: '3', metricLabel: 'new enterprise contracts in 60 days' },
  { slug: 'saffron-kitchen', metric: '+40%', metricLabel: 'online reservations in month one' },
  { slug: 'meridian-property', metric: '−60%', metricLabel: 'drop in late rent payments' },
] as const

const cases = featured
  .map((f) => {
    const p = getProject(f.slug)
    if (!p) return null
    return {
      ...f,
      name: p.name,
      tags: p.tags,
      brief: p.description,
      result: p.results ?? p.outcome,
      tools: p.tools,
    }
  })
  .filter((c): c is NonNullable<typeof c> => c !== null)

function CaseCard({ data, index }: { data: typeof cases[0]; index: number }) {
  const reversed = index % 2 === 1
  return (
    <motion.article
      variants={fadeUp}
      style={{
        display: 'grid',
        gap: 'clamp(28px, 4vw, 64px)',
        alignItems: 'center',
        padding: 'clamp(40px, 5vw, 72px) 0',
        borderTop: '1px solid var(--na-border-mid)',
      }}
      className="grid-cols-1 md:grid-cols-2"
    >
      {/* Metric panel */}
      <div
        style={{
          order: reversed ? 2 : 1,
          background: 'var(--na-surface)',
          border: '1px solid var(--na-border-mid)',
          borderRadius: 16,
          padding: 'clamp(32px, 4vw, 56px)',
          position: 'relative',
          overflow: 'hidden',
        }}
        className={reversed ? 'md:order-2' : 'md:order-1'}
      >
        {/* Faint blueprint grid */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(var(--na-border-mid) 1px, transparent 1px), linear-gradient(90deg, var(--na-border-mid) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
            opacity: 0.4,
            pointerEvents: 'none',
            maskImage: 'radial-gradient(circle at 30% 30%, black, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle at 30% 30%, black, transparent 75%)',
          }}
        />
        <div style={{ position: 'relative' }}>
          <div
            style={{
              fontSize: 'clamp(56px, 9vw, 104px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              color: 'var(--na-accent)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {data.metric}
          </div>
          <div
            style={{
              fontSize: 'clamp(14px, 1.6vw, 17px)',
              fontWeight: 500,
              lineHeight: 1.5,
              color: 'var(--na-text)',
              marginTop: 16,
              maxWidth: 280,
            }}
          >
            {data.metricLabel}
          </div>
          {/* Tools */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 'clamp(24px, 3vw, 36px)' }}>
            {data.tools.slice(0, 5).map((tool) => (
              <span
                key={tool}
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: 'var(--na-muted)',
                  border: '1px solid var(--na-border-mid)',
                  borderRadius: 20,
                  padding: '4px 10px',
                }}
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Narrative */}
      <div
        style={{ order: reversed ? 1 : 2 }}
        className={reversed ? 'md:order-1' : 'md:order-2'}
      >
        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
          {data.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                color: 'var(--na-muted)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <h3
          style={{
            fontSize: 'clamp(28px, 3.6vw, 44px)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            color: 'var(--na-text)',
            marginBottom: 'clamp(18px, 2.4vw, 28px)',
          }}
        >
          {data.name}
        </h3>

        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase' as const,
              color: 'var(--na-accent)',
              marginBottom: 8,
            }}
          >
            The Brief
          </div>
          <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', lineHeight: 1.7, color: 'var(--na-muted)' }}>
            {data.brief}
          </p>
        </div>

        <div style={{ marginBottom: 'clamp(24px, 3vw, 32px)' }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase' as const,
              color: 'var(--na-accent)',
              marginBottom: 8,
            }}
          >
            The Outcome
          </div>
          <p style={{ fontSize: 'clamp(14px, 1.5vw, 16px)', lineHeight: 1.7, color: 'var(--na-text)' }}>
            {data.result}
          </p>
        </div>

        <Link
          href={`/projects/${data.slug}`}
          data-cursor-hover
          aria-label={`View the ${data.name} case study`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
            color: 'var(--na-accent)',
            textDecoration: 'none',
            transition: 'gap 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.gap = '12px')}
          onMouseLeave={(e) => (e.currentTarget.style.gap = '8px')}
        >
          Read the case study <ArrowUpRight size={16} strokeWidth={2} />
        </Link>
      </div>
    </motion.article>
  )
}

export default function CaseStudies() {
  if (cases.length === 0) return null
  return (
    <section
      id="case-studies"
      style={{
        padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 48px)',
        background: 'var(--na-bg)',
        borderTop: '1px solid var(--na-border-mid)',
      }}
    >
      {/* Section header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          paddingBottom: 20,
          borderBottom: '1px solid var(--na-border-mid)',
          marginBottom: 'clamp(8px, 1vw, 16px)',
        }}
      >
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            color: 'var(--na-text)',
          }}
        >
          Case Studies
        </span>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase' as const,
            color: 'var(--na-muted)',
          }}
        >
          Measured Results
        </span>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger(0.12)}
      >
        {cases.map((c, i) => (
          <CaseCard key={c.slug} data={c} index={i} />
        ))}
      </motion.div>
    </section>
  )
}
