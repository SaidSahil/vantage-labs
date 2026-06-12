'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, ArrowRight, ArrowLeft, Check } from 'lucide-react'
import { projects } from '@/lib/projects'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const CARDS_PER_PAGE = 4
const CYCLE_MS = 2800

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]
const vp = { once: true, margin: '-72px' }

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
}

const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
}

const stagger = (delay = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
})

// ─── Project Card ──────────────────────────────────────
function ProjectCard({ project }: { project: typeof projects[0] }) {
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const SCALE = 440 / 1280

  return (
    <Link href={`/projects/${project.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
      <motion.div
        variants={fadeUp}
        whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(0,0,0,0.09)' }}
        initial={{ boxShadow: '0 2px 16px rgba(0,0,0,0.05)' }}
        style={{
          borderRadius: 12,
          border: '1px solid var(--na-border-mid)',
          background: 'var(--na-bg)',
          overflow: 'hidden',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        data-cursor-hover
      >
        {/* Preview area — uses padding-top trick so iframe never bleeds into layout */}
        <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: 'var(--na-surface)', flexShrink: 0, overflow: 'hidden', borderRadius: '11px 11px 0 0' }}>
          {project.preview ? (
            <>
              {!iframeLoaded && (
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'linear-gradient(135deg, var(--na-surface), var(--na-surface-2))',
                  zIndex: 1,
                }}>
                  <div style={{
                    width: 18, height: 18,
                    border: '2px solid var(--na-border-mid)', borderTopColor: 'var(--na-accent)',
                    borderRadius: '50%', animation: 'spin 0.7s linear infinite',
                  }} />
                </div>
              )}
              {/* Absolutely-positioned wrapper so iframe width never escapes the card */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}
              >
                <iframe
                  src={project.preview}
                  title={project.name}
                  style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: `${100 / SCALE}%`,
                    height: `${100 / SCALE}%`,
                    transform: `scale(${SCALE})`,
                    transformOrigin: 'top left',
                    border: 'none', pointerEvents: 'none',
                    opacity: iframeLoaded ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                  }}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                  onLoad={() => setIframeLoaded(true)}
                />
              </motion.div>
            </>
          ) : (
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 12,
              background: 'linear-gradient(135deg, var(--na-surface) 0%, var(--na-surface-2) 100%)',
            }}>
              <svg width="24" height="24" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="3" stroke="var(--na-inv-accent)" strokeWidth="1.5"/>
                <line x1="11" y1="1" x2="11" y2="7" stroke="var(--na-inv-accent)" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="11" y1="15" x2="11" y2="21" stroke="var(--na-inv-accent)" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="1" y1="11" x2="7" y2="11" stroke="var(--na-inv-accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
                <line x1="15" y1="11" x2="21" y2="11" stroke="var(--na-inv-accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
              </svg>
              <span style={{
                fontSize: 10, fontWeight: 700, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: 'var(--na-muted)',
              }}>
                {project.label}
              </span>
            </div>
          )}
        </div>

        {/* Card body */}
        <div style={{ padding: '20px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Number + tags */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--na-muted)' }}>
              {project.num}
            </span>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              {project.tags.slice(0, 2).map(tag => (
                <span key={tag} style={{
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'var(--na-accent)', background: 'var(--na-accent-dim)',
                  padding: '3px 9px', borderRadius: 20,
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Name + arrow */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flex: 1 }}>
            <div>
              <div style={{
                fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2,
                color: 'var(--na-text)', marginBottom: 8, transition: 'color 0.2s ease',
              }}>
                {project.name}
              </div>
              <div style={{ fontSize: 13, color: 'var(--na-muted)', lineHeight: 1.55 }}>
                {project.tagline}
              </div>
            </div>
            <div style={{
              width: 36, height: 36, border: '1px solid var(--na-border-mid)', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--na-muted)', flexShrink: 0, marginTop: 2,
              transition: 'background 0.2s ease, border-color 0.2s ease, color 0.2s ease',
            }}>
              <ArrowUpRight size={14} strokeWidth={2} />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

// ─── Card exit/enter variants ──────────────────────────
const cardExit = {
  opacity: 0,
  y: -12,
  scale: 0.97,
  transition: { duration: 0.22, ease: 'easeIn' as const },
}
const cardEnter = (i: number) => ({
  opacity: 1,
  y: 0,
  scale: 1,
  transition: { duration: 0.45, delay: i * 0.07, ease: ease as [number,number,number,number] },
})
const cardInitial = { opacity: 0, y: 20, scale: 0.97 }

// ─── Auto-cycling project grid ─────────────────────────
function ProjectGrid() {
  const totalPages = Math.ceil(projects.length / CARDS_PER_PAGE)
  const [page, setPage] = useState(0)
  const [progress, setProgress] = useState(0)
  const pausedRef = useRef(false)
  const startRef = useRef(Date.now())
  const rafRef = useRef<number | null>(null)

  const goTo = useCallback((next: number) => {
    setPage(next)
    setProgress(0)
    startRef.current = Date.now()
  }, [])

  const advance = useCallback(() => {
    goTo((page + 1) % totalPages)
  }, [page, totalPages, goTo])

  const retreat = useCallback(() => {
    goTo((page - 1 + totalPages) % totalPages)
  }, [page, totalPages, goTo])

  // Progress tick + auto-advance
  useEffect(() => {
    const tick = () => {
      if (!pausedRef.current) {
        const elapsed = Date.now() - startRef.current
        const pct = Math.min(elapsed / CYCLE_MS, 1)
        setProgress(pct)
        if (pct >= 1) {
          setPage(p => (p + 1) % totalPages)
          setProgress(0)
          startRef.current = Date.now()
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [totalPages])

  const visible = projects.slice(page * CARDS_PER_PAGE, (page + 1) * CARDS_PER_PAGE)

  return (
    <section style={{ padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 56px)' }}>

      {/* Header */}
      <motion.div
        initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp}
        style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, marginBottom: 48, flexWrap: 'wrap' }}
      >
        <div>
          <span className="section-label" style={{ display: 'block', marginBottom: 14 }}>All Projects</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--na-heading)', lineHeight: 1.1, margin: 0 }}>
            Eight clients.{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--na-muted)' }}>Eight problems solved.</em>
          </h2>
        </div>
        <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--na-muted)' }}>
          {projects.length} Total
        </span>
      </motion.div>

      {/* Cycling grid */}
      <div
        onMouseEnter={() => { pausedRef.current = true }}
        onMouseLeave={() => { pausedRef.current = false; startRef.current = Date.now() - progress * CYCLE_MS }}
      >
        <AnimatePresence mode="popLayout">
          <motion.div
            key={page}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07 } },
              exit:   { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
            }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 20,
            }}
            className="project-grid-2col"
          >
            {visible.map((project, i) => (
              <motion.div
                key={project.slug}
                custom={i}
                variants={{
                  hidden:  cardInitial,
                  visible: cardEnter(i),
                  exit:    { ...cardExit },
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div style={{ marginTop: 32, display: 'flex', alignItems: 'center', gap: 20 }}>

          {/* Prev */}
          <button
            onClick={retreat}
            aria-label="Previous projects"
            style={{
              width: 36, height: 36, borderRadius: '50%',
              border: '1px solid var(--na-border-mid)', background: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--na-muted)',
              transition: 'border-color 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--na-text)'; e.currentTarget.style.color = 'var(--na-text)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--na-border-mid)'; e.currentTarget.style.color = 'var(--na-muted)' }}
          >
            <ArrowLeft size={13} strokeWidth={2} />
          </button>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flex: 1 }}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to page ${i + 1}`}
                style={{
                  height: 3, flex: i === page ? 2 : 1,
                  background: 'transparent', border: 'none',
                  padding: 0, cursor: 'pointer', position: 'relative',
                  borderRadius: 2, overflow: 'hidden',
                  transition: 'flex 0.35s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                {/* Track */}
                <div style={{ position: 'absolute', inset: 0, background: 'var(--na-border-mid)', borderRadius: 2 }} />
                {/* Fill */}
                {i === page && (
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: 2,
                    background: 'var(--na-accent)',
                    transform: `scaleX(${progress})`,
                    transformOrigin: 'left',
                  }} />
                )}
              </button>
            ))}
          </div>

          {/* Next */}
          <button
            onClick={advance}
            aria-label="Next projects"
            style={{
              width: 36, height: 36, borderRadius: '50%',
              border: '1px solid var(--na-border-mid)', background: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--na-muted)',
              transition: 'border-color 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--na-text)'; e.currentTarget.style.color = 'var(--na-text)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--na-border-mid)'; e.currentTarget.style.color = 'var(--na-muted)' }}
          >
            <ArrowRight size={13} strokeWidth={2} />
          </button>

          {/* Page count */}
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--na-muted)', flexShrink: 0 }}>
            {page + 1} / {totalPages}
          </span>
        </div>
      </div>
    </section>
  )
}

// ─── Page ──────────────────────────────────────────────
export default function WorkPage() {
  const steps = [
    {
      num: '01',
      title: 'Discover',
      body: 'We start by understanding your business — not your brief. Who are your customers, what do they need to feel, and what makes them act. Before we touch a line of code, we know exactly what success looks like.',
    },
    {
      num: '02',
      title: 'Design',
      body: 'Every visual decision is intentional. Layout, hierarchy, colour, motion — each one earns its place by doing a job. We design in the open so you can see it take shape before anything is built.',
    },
    {
      num: '03',
      title: 'Build',
      body: 'Custom code only — no page builders, no bloated templates. We write clean, fast, accessible markup that loads in under 2 seconds and holds up on every device.',
    },
    {
      num: '04',
      title: 'Launch',
      body: 'We handle deployment, domain connection, form testing, and final checks. You get full access to everything we built. Nothing is locked behind a platform you do not control.',
    },
  ]

  const values = [
    {
      label: 'Precision over speed',
      body: 'We take on fewer projects so we can give each one everything. You will never be a ticket in a queue.',
    },
    {
      label: 'Honest by default',
      body: 'Clear pricing upfront. Realistic timelines. If something is going to take longer, we tell you before it does.',
    },
    {
      label: 'You own it, always',
      body: 'Full source code, full DNS control, full ownership. We build things you understand and can walk away with.',
    },
  ]

  return (
    <main style={{ background: 'var(--na-bg)', minHeight: '100vh' }}>
      <Navbar />

      {/* ── Hero ─────────────────────────────────────── */}
      <section
        data-cursor-dark
        style={{
          background: 'var(--na-inv-bg)',
          padding: 'clamp(120px, 14vw, 180px) clamp(24px, 4vw, 56px) clamp(72px, 9vw, 100px)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Diagonal decorative lines */}
        <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <line x1="0" y1="100%" x2="100%" y2="0" stroke="white" strokeOpacity="0.04" strokeWidth="1" />
          <line x1="30%" y1="100%" x2="100%" y2="20%" stroke="white" strokeOpacity="0.025" strokeWidth="1" />
        </svg>

        {/* Ghost number */}
        <div aria-hidden="true" className="hidden md:block" style={{
          position: 'absolute', top: '50%', right: 'clamp(24px, 4vw, 56px)',
          transform: 'translateY(-50%)',
          fontSize: 200, fontWeight: 800, color: 'var(--na-inv-text)', opacity: 0.025,
          lineHeight: 1, letterSpacing: '-0.05em', userSelect: 'none', pointerEvents: 'none',
        }}>
          02
        </div>

        {/* Label */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease }}>
          <span className="section-label-dark">02 — Selected Work</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease }}
          style={{
            fontSize: 'clamp(44px, 7vw, 96px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            lineHeight: 1.0,
            color: 'var(--na-inv-text)',
            marginTop: 24,
            marginBottom: 24,
            maxWidth: 800,
          }}
        >
          Work that earns{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--na-inv-muted)' }}>
            its keep.
          </em>
        </motion.h1>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22, ease }}
          style={{ fontSize: 16, color: 'var(--na-inv-muted)', maxWidth: 520, lineHeight: 1.7, marginBottom: 60 }}
        >
          Every project on this page started with a real business problem and ended with something that actively helps solve it. No filler. No portfolio pieces built for awards. Work built for results.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger(0.12)}
          style={{ display: 'flex', gap: 'clamp(32px, 6vw, 64px)', flexWrap: 'wrap' }}
        >
          {[
            { num: '8', label: 'Projects Delivered' },
            { num: '4', label: 'Industries Served' },
            { num: '100%', label: 'Custom Built' },
            { num: '$0', label: 'Spent on Templates' },
          ].map(stat => (
            <motion.div key={stat.label} variants={fadeUp}>
              <div style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--na-inv-text)', lineHeight: 1 }}>
                {stat.num}
              </div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--na-inv-muted)', marginTop: 8 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── How We Work ──────────────────────────────── */}
      <section style={{ padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 56px)', background: 'var(--na-bg)' }}>
        <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp} style={{ marginBottom: 56 }}>
          <span className="section-label" style={{ display: 'block', marginBottom: 16 }}>How We Work</span>
          <h2 style={{
            fontSize: 'clamp(32px, 4.5vw, 56px)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'var(--na-heading)',
            lineHeight: 1.1,
            maxWidth: 560,
          }}>
            A process built for{' '}
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--na-muted)' }}>clarity.</em>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          variants={stagger(0.1)}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 0,
          }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              variants={fadeUp}
              style={{
                padding: 'clamp(28px, 3vw, 40px)',
                borderLeft: i === 0 ? 'none' : '1px solid var(--na-border-mid)',
                borderTop: '1px solid var(--na-border-mid)',
                position: 'relative',
              }}
            >
              {/* Step number */}
              <div style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: 'var(--na-accent)', marginBottom: 20,
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{
                  width: 28, height: 28, borderRadius: '50%',
                  border: '1px solid var(--na-accent-dim)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 700,
                }}>
                  {step.num}
                </span>
                {step.title}
              </div>
              <p style={{ fontSize: 14, color: 'var(--na-muted)', lineHeight: 1.7, margin: 0 }}>
                {step.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Values ───────────────────────────────────── */}
      <section style={{
        padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 56px)',
        background: 'var(--na-inv-bg)',
        position: 'relative',
        overflow: 'hidden',
      }}
        data-cursor-dark
      >
        {/* Dot grid */}
        <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.04 }}>
          <defs>
            <pattern id="dots-dark" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots-dark)" />
        </svg>

        <div style={{ position: 'relative' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp} style={{ marginBottom: 64 }}>
            <span className="section-label-dark" style={{ display: 'block', marginBottom: 16 }}>What We Stand For</span>
            <h2 style={{
              fontSize: 'clamp(32px, 4.5vw, 56px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--na-inv-text)',
              lineHeight: 1.1,
              maxWidth: 520,
            }}>
              The standard we{' '}
              <em style={{ fontStyle: 'italic', fontWeight: 300, color: 'var(--na-inv-muted)' }}>
                hold ourselves to.
              </em>
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            variants={stagger(0.12)}
            style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
          >
            {values.map((v, i) => (
              <motion.div
                key={v.label}
                variants={fadeLeft}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  gap: 16,
                  padding: 'clamp(32px, 4vw, 48px) 0',
                  borderTop: i === 0 ? '1px solid var(--na-inv-border)' : '1px solid var(--na-inv-border)',
                  borderBottom: i === values.length - 1 ? '1px solid var(--na-inv-border)' : 'none',
                }}
                className="values-row"
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(24px, 5vw, 80px)', flexWrap: 'wrap' }}>
                  <div style={{ minWidth: 260, flex: '0 0 auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 0 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: 6,
                        background: 'rgba(var(--na-inv-accent-rgb), 0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <Check size={14} strokeWidth={2.5} style={{ color: 'var(--na-inv-accent)' }} />
                      </div>
                      <h3 style={{
                        fontSize: 'clamp(20px, 2.5vw, 28px)',
                        fontWeight: 700,
                        letterSpacing: '-0.02em',
                        color: 'var(--na-inv-text)',
                        margin: 0,
                      }}>
                        {v.label}
                      </h3>
                    </div>
                  </div>
                  <p style={{
                    fontSize: 15,
                    color: 'var(--na-inv-muted)',
                    lineHeight: 1.7,
                    margin: 0,
                    maxWidth: 440,
                    flex: 1,
                    paddingTop: 4,
                  }}>
                    {v.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Project Grid ─────────────────────────────── */}
      <ProjectGrid />

      {/* ── CTA ──────────────────────────────────────── */}
      <section
        data-cursor-dark
        style={{
          background: 'var(--na-inv-bg)',
          padding: 'clamp(80px, 10vw, 120px) clamp(24px, 4vw, 56px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          textAlign: 'center', gap: 32, position: 'relative', overflow: 'hidden',
        }}
      >
        <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          <line x1="0" y1="100%" x2="100%" y2="0" stroke="white" strokeOpacity="0.05" strokeWidth="1" />
        </svg>

        <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={fadeUp} style={{ position: 'relative' }}>
          <span className="section-label-dark" style={{ display: 'block', marginBottom: 20 }}>Start a project</span>
          <h2 style={{
            fontSize: 'clamp(36px, 5.5vw, 72px)',
            fontWeight: 700,
            letterSpacing: '-0.04em',
            color: 'var(--na-inv-text)',
            marginBottom: 16,
            lineHeight: 1.05,
          }}>
            Ready to build?
          </h2>
          <p style={{ fontSize: 16, color: 'var(--na-inv-muted)', maxWidth: 400, margin: '0 auto', lineHeight: 1.65 }}>
            Book a free 30-minute call. We will figure out exactly what you need and whether we are the right fit.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={vp}
          transition={{ duration: 0.4, delay: 0.2, ease }}
          style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center', position: 'relative' }}
        >
          <Link href="/contact">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary"
              style={{ cursor: 'pointer' }}
              data-cursor-hover
            >
              Book a Call
              <ArrowRight size={15} strokeWidth={2.5} />
            </motion.button>
          </Link>
          <Link href="/contact">
            <motion.button
              whileHover={{ borderColor: 'var(--na-inv-border)', color: 'var(--na-inv-text)' }}
              className="btn-ghost"
              style={{ cursor: 'pointer' }}
              data-cursor-hover
            >
              Send a Message
            </motion.button>
          </Link>
        </motion.div>
      </section>

      <Footer />

      <style>{`
        @media (max-width: 640px) {
          .project-grid-2col {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  )
}
