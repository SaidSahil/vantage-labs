'use client'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { fadeUp, stagger, viewport } from '@/lib/animations'
import { projects as projectData } from '@/lib/projects'
import Link from 'next/link'

const PREVIEW_W = 320
const PREVIEW_H = 200

const projects = projectData.map(p => ({
  num: p.num,
  name: p.name,
  slug: p.slug,
  tags: p.tags,
  label: p.label,
  preview: p.preview,
  externalUrl: p.externalUrl,
  outcome: p.outcome,
}))

export default function Work() {
  const floatRef = useRef<HTMLDivElement>(null)
  const [activeProject, setActiveProject] = useState<typeof projects[0] | null>(null)
  const [floatVisible, setFloatVisible] = useState(false)

  useEffect(() => {
    const float = floatRef.current
    if (!float) return

    const onMove = (e: MouseEvent) => {
      float.style.left = e.clientX + 32 + 'px'
      float.style.top  = e.clientY - (PREVIEW_H / 2) + 'px'
    }
    document.addEventListener('mousemove', onMove, { passive: true })
    return () => document.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      id="work"
      style={{ padding: 'clamp(60px, 8vw, 80px) clamp(24px, 4vw, 48px) 0', background: '#FAFAF8' }}
    >
      {/* Floating preview */}
      <div
        ref={floatRef}
        className="project-img-float"
        style={{
          opacity: floatVisible ? 1 : 0,
          transform: floatVisible ? 'scale(1) translateY(0)' : 'scale(0.94) translateY(6px)',
          width: PREVIEW_W,
          height: PREVIEW_H,
          background: '#F0EFE9',
          overflow: 'hidden',
        }}
        aria-hidden="true"
      >
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          background: 'linear-gradient(135deg, #F0EFE9 0%, #E8E6DF 100%)',
          padding: '0 20px',
        }}>
          <span style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '-0.01em',
            color: '#1C1C1E',
            textAlign: 'center',
            lineHeight: 1.3,
          }}>
            {activeProject?.name ?? ''}
          </span>
          {activeProject?.externalUrl && (
            <span style={{
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.06em',
              color: '#8A8A8E',
              textAlign: 'center',
            }}>
              {activeProject.externalUrl.replace(/^https?:\/\//, '')}
            </span>
          )}
          {activeProject?.externalUrl && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#3D5A80',
              border: '1px solid rgba(61,90,128,0.25)',
              borderRadius: 100,
              padding: '4px 10px',
              marginTop: 2,
            }}>
              Visit <ArrowUpRight size={9} strokeWidth={2.5} />
            </span>
          )}
          {!activeProject?.externalUrl && (
            <span style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#C8C6C0',
            }}>
              {activeProject?.label ?? ''}
            </span>
          )}
        </div>
      </div>

      {/* Header row */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          paddingBottom: 24,
          borderBottom: '1px solid #E2E1DC',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1C1C1E' }}>Selected Work</span>
        </div>
        <span style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#C8C6C0',
        }}>
          {projects.length} Projects
        </span>
      </motion.div>

      {/* Project rows */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger(0.1)}
      >
        {projects.map((project) => (
            <Link
              key={project.num}
              href={`/projects/${project.slug}`}
              style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
            >
            <motion.div
              variants={fadeUp}
              className="project-row"
              data-cursor-hover
              onMouseEnter={() => {
                setActiveProject(project)
                setFloatVisible(true)
              }}
              onMouseLeave={() => setFloatVisible(false)}
            >
              <span style={{
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: '#8A8A8E',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {project.num}
              </span>

              <div>
                <div
                  className="project-name"
                  style={{
                    fontSize: 'clamp(24px, 3.5vw, 52px)',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.05,
                    transition: 'color 0.2s ease',
                  }}
                >
                  {project.name}
                </div>
                {project.outcome && (
                  <div style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: '#3D5A80',
                    fontStyle: 'italic',
                    marginTop: 6,
                    lineHeight: 1.5,
                  }}>
                    {project.outcome}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#8A8A8E',
                        border: '1px solid #E2E1DC',
                        padding: '4px 10px',
                        borderRadius: 20,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="project-arrow"
                style={{
                  width: 48,
                  height: 48,
                  border: '1px solid #E2E1DC',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#8A8A8E',
                  flexShrink: 0,
                  transition: 'background 0.2s ease, color 0.2s ease, transform 0.2s ease, border-color 0.2s ease',
                }}
              >
                <ArrowUpRight size={16} strokeWidth={2} />
              </div>
            </motion.div>
            </Link>
        ))}
      </motion.div>
    </section>
  )
}
