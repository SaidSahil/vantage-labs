'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { fadeUp, stagger, viewport } from '@/lib/animations'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

// A paragraph is a plain string. A bullet list is an array of strings.
// A sub-heading is { sub: string }.
export type LegalBlock = string | string[] | { sub: string }

export interface LegalSection {
  heading: string
  body: LegalBlock[]
}

function renderBlock(block: LegalBlock, i: number) {
  if (typeof block === 'string') {
    return (
      <p
        key={i}
        style={{
          fontSize: 'clamp(14px, 1.5vw, 16px)',
          lineHeight: 1.75,
          color: 'var(--na-muted)',
          marginBottom: 16,
        }}
        dangerouslySetInnerHTML={{ __html: block }}
      />
    )
  }
  if (Array.isArray(block)) {
    return (
      <ul
        key={i}
        style={{
          listStyle: 'none',
          margin: '0 0 16px',
          padding: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        {block.map((item, j) => (
          <li
            key={j}
            style={{
              position: 'relative',
              paddingLeft: 22,
              fontSize: 'clamp(14px, 1.5vw, 16px)',
              lineHeight: 1.7,
              color: 'var(--na-muted)',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: 0,
                top: '0.6em',
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--na-accent)',
              }}
            />
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </li>
        ))}
      </ul>
    )
  }
  return (
    <h3
      key={i}
      style={{
        fontSize: 'clamp(15px, 1.7vw, 18px)',
        fontWeight: 700,
        letterSpacing: '-0.01em',
        color: 'var(--na-text)',
        margin: '20px 0 10px',
      }}
    >
      {block.sub}
    </h3>
  )
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
  return (
    <main style={{ background: 'var(--na-bg)', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section
        style={{
          padding: 'clamp(120px, 16vw, 180px) clamp(24px, 4vw, 48px) clamp(40px, 5vw, 56px)',
          borderBottom: '1px solid var(--na-border-mid)',
          maxWidth: 880,
          margin: '0 auto',
          width: '100%',
        }}
      >
        <motion.div initial="hidden" animate="visible" variants={stagger(0.08)}>
          <motion.div
            variants={fadeUp}
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.16em',
              textTransform: 'uppercase' as const,
              color: 'var(--na-accent)',
              marginBottom: 16,
            }}
          >
            Legal
          </motion.div>
          <motion.h1
            variants={fadeUp}
            style={{
              fontSize: 'clamp(36px, 6vw, 68px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.02,
              color: 'var(--na-text)',
              marginBottom: 20,
            }}
          >
            {title}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            style={{
              fontSize: 'clamp(15px, 1.7vw, 18px)',
              lineHeight: 1.7,
              color: 'var(--na-muted)',
              maxWidth: 640,
              marginBottom: 18,
            }}
          >
            {intro}
          </motion.p>
          <motion.div
            variants={fadeUp}
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              color: 'var(--na-muted)',
            }}
          >
            Last updated: {updated}
          </motion.div>
        </motion.div>
      </section>

      {/* Body */}
      <section
        style={{
          padding: 'clamp(48px, 6vw, 72px) clamp(24px, 4vw, 48px) clamp(80px, 10vw, 120px)',
          maxWidth: 880,
          margin: '0 auto',
          width: '100%',
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={stagger(0.06)}
        >
          {sections.map((section, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              style={{
                paddingTop: i === 0 ? 0 : 'clamp(28px, 3.5vw, 40px)',
                marginTop: i === 0 ? 0 : 'clamp(28px, 3.5vw, 40px)',
                borderTop: i === 0 ? 'none' : '1px solid var(--na-border-mid)',
              }}
            >
              <h2
                style={{
                  fontSize: 'clamp(20px, 2.6vw, 28px)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  color: 'var(--na-text)',
                  marginBottom: 16,
                }}
              >
                {section.heading}
              </h2>
              {section.body.map((block, j) => renderBlock(block, j))}
            </motion.div>
          ))}

          {/* Footer note */}
          <motion.div
            variants={fadeUp}
            style={{
              marginTop: 'clamp(40px, 5vw, 56px)',
              paddingTop: 'clamp(28px, 3.5vw, 36px)',
              borderTop: '1px solid var(--na-border-mid)',
              fontSize: 13,
              lineHeight: 1.7,
              color: 'var(--na-muted)',
            }}
          >
            Questions about this page? Email{' '}
            <a
              href="mailto:info@nodeaxis.ca"
              style={{ color: 'var(--na-accent)', textDecoration: 'none', fontWeight: 600 }}
            >
              info@nodeaxis.ca
            </a>{' '}
            or visit our{' '}
            <Link
              href="/contact"
              style={{ color: 'var(--na-accent)', textDecoration: 'none', fontWeight: 600 }}
            >
              contact page
            </Link>
            .
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  )
}
