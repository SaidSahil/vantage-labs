'use client'
import { notFound, useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react'
import { getProject } from '@/lib/projects'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = getProject(slug)

  if (!project) notFound()

  return (
    <main style={{ background: '#FAFAF8', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nodeaxis.ca' },
              { '@type': 'ListItem', position: 2, name: 'Work', item: 'https://nodeaxis.ca/work' },
              { '@type': 'ListItem', position: 3, name: project.name, item: `https://nodeaxis.ca/projects/${project.slug}` },
            ],
          }),
        }}
      />
      <Navbar />

      {/* ── Hero ── */}
      <section
        data-cursor-dark
        style={{
          background: '#141416',
          padding: 'clamp(100px, 14vw, 160px) clamp(24px, 4vw, 56px) clamp(60px, 8vw, 80px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease }}
          style={{ marginBottom: 48 }}
        >
          <Link
            href="/work"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.35)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
          >
            <ArrowLeft size={13} strokeWidth={2} />
            Back to Work
          </Link>
        </motion.div>

        {/* Number */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease }}
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#3D5A80',
            marginBottom: 20,
          }}
        >
          {project.num} — Project
        </motion.div>

        {/* Name */}
        <div style={{ overflow: 'hidden', marginBottom: 24 }}>
          <motion.h1
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease }}
            style={{
              fontSize: 'clamp(44px, 8vw, 120px)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: '#FFFFFF',
            }}
          >
            {project.name}
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6, ease }}
          style={{
            fontSize: 'clamp(15px, 1.5vw, 19px)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: 'rgba(255,255,255,0.45)',
            maxWidth: 560,
            lineHeight: 1.6,
            marginBottom: 40,
          }}
        >
          {project.tagline}
        </motion.p>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5, ease }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}
        >
          {project.tags.map(tag => (
            <span
              key={tag}
              style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
                border: '1px solid rgba(255,255,255,0.12)',
                padding: '6px 14px',
                borderRadius: 100,
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Decorative grid lines */}
        <svg
          aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.04, pointerEvents: 'none' }}
          preserveAspectRatio="none"
        >
          {[...Array(6)].map((_, i) => (
            <line key={i} x1={`${(i + 1) * 16.66}%`} y1="0" x2={`${(i + 1) * 16.66}%`} y2="100%" stroke="#FFFFFF" strokeWidth="1" />
          ))}
        </svg>
      </section>

      {/* ── Body ── */}
      <section style={{ padding: 'clamp(60px, 8vw, 100px) clamp(24px, 4vw, 56px)' }}>
        <div
          style={{
            display: 'grid',
            gap: 'clamp(40px, 6vw, 80px)',
            alignItems: 'start',
          }}
          className="grid-cols-1 lg:grid-cols-2"
        >
          {/* Left: Description + Tools */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease }}
            >
              <div style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#3D5A80',
                marginBottom: 20,
              }}>
                Overview
              </div>
              <p style={{
                fontSize: 'clamp(15px, 1.4vw, 17px)',
                lineHeight: 1.8,
                color: '#8A8A8E',
                marginBottom: 48,
              }}>
                {project.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: 0.1, duration: 0.6, ease }}
            >
              <div style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#3D5A80',
                marginBottom: 20,
              }}>
                Tools & Stack
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {project.tools.map(tool => (
                  <span
                    key={tool}
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      color: '#1C1C1E',
                      background: '#F0EFE9',
                      border: '1px solid #E2E1DC',
                      padding: '7px 16px',
                      borderRadius: 100,
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.15, duration: 0.6, ease }}
          >
            <div style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#3D5A80',
              marginBottom: 20,
            }}>
              Features
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 0 }}>
              {project.features.map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: i * 0.06, duration: 0.45, ease }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 14,
                    padding: '18px 0',
                    borderBottom: '1px solid #E2E1DC',
                    fontSize: 15,
                    color: '#1C1C1E',
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: 'rgba(61,90,128,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: 1,
                  }}>
                    <Check size={11} strokeWidth={2.5} color="#3D5A80" />
                  </span>
                  {feature}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Results block */}
        {project.results && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease }}
            style={{
              marginTop: 'clamp(48px, 6vw, 72px)',
              background: '#141416',
              borderRadius: 12,
              padding: 'clamp(32px, 4vw, 48px)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Subtle accent line */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 2,
              background: '#3D5A80',
            }} />

            <div style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#3D5A80',
              marginBottom: 20,
            }}>
              Results
            </div>
            <p style={{
              fontSize: 'clamp(15px, 1.4vw, 17px)',
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.55)',
              margin: 0,
              maxWidth: 680,
            }}>
              {project.results}
            </p>
          </motion.div>
        )}

        {/* CTA — Visit Website */}
        {project.externalUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease }}
            style={{
              marginTop: 'clamp(48px, 6vw, 80px)',
              paddingTop: 'clamp(40px, 5vw, 60px)',
              borderTop: '1px solid #E2E1DC',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 24,
            }}
          >
            <div>
              <div style={{
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#8A8A8E',
                marginBottom: 8,
              }}>
                Live Site
              </div>
              <div style={{ fontSize: 'clamp(20px, 3vw, 32px)', fontWeight: 700, letterSpacing: '-0.02em', color: '#1C1C1E' }}>
                {project.label}
              </div>
            </div>

            <a
              href={project.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                background: '#1C1C1E',
                color: '#FAFAF8',
                padding: '18px 36px',
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.18)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Visit Website
              <ArrowUpRight size={16} strokeWidth={2} />
            </a>
          </motion.div>
        )}
      </section>
      <Footer />
    </main>
  )
}
