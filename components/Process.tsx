'use client'
import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Search, Palette, Code2, MessageSquare, Rocket } from 'lucide-react'

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const steps = [
  {
    num: '01',
    icon: Search,
    title: 'Kickoff Call',
    subtitle: 'We learn your business goals',
    desc: 'One focused call. We dig into your business, your users, your competitors, and what success actually looks like for you.',
    duration: '1–2 days',
    color: '#3D5A80',
  },
  {
    num: '02',
    icon: Palette,
    title: 'Design Review',
    subtitle: 'You see every screen first',
    desc: 'Wireframes and high-fidelity mockups built around your brand. You approve every screen before a single line of code is written.',
    duration: '3–5 days',
    color: '#5A7FAD',
  },
  {
    num: '03',
    icon: Code2,
    title: 'Build',
    subtitle: 'Hand-coded, built to the approved design',
    desc: 'Hand-coded, fast, and built exactly to the approved design. Performance-first, mobile-first. Every component purpose-built for your project.',
    duration: '5–14 days',
    color: '#3D5A80',
  },
  {
    num: '04',
    icon: MessageSquare,
    title: 'Your Feedback',
    subtitle: 'Refine until it\'s right',
    desc: 'We share a live staging link. You test it, break it, and tell us exactly what to change. We refine until it\'s right.',
    duration: '2–3 days',
    color: '#5A7FAD',
  },
  {
    num: '05',
    icon: Rocket,
    title: 'Goes Live',
    subtitle: 'We handle the handoff',
    desc: 'Your site goes live. We handle hosting setup, test across every device, and walk you through everything — credentials, domain, full handoff.',
    duration: '1 day',
    color: '#3D5A80',
  },
]

function StepCard({ step, index, active, onEnter, onLeave, inView }: {
  step: typeof steps[0]
  index: number
  active: boolean
  onEnter: () => void
  onLeave: () => void
  inView: boolean
}) {
  const Icon = step.icon
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ delay: 0.1 + index * 0.12, duration: 0.65, ease }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        flex: 1,
        minWidth: 0,
        position: 'relative',
        cursor: 'default',
      }}
    >
      {/* Card */}
      <div
        style={{
          border: `1px solid ${active ? 'rgba(61,90,128,0.5)' : '#E2E1DC'}`,
          borderRadius: 16,
          padding: '28px 24px',
          background: active ? 'rgba(61,90,128,0.04)' : '#FFFFFF',
          transition: 'border-color 0.25s ease, background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease',
          transform: active ? 'translateY(-4px)' : 'translateY(0)',
          boxShadow: active ? '0 12px 32px rgba(61,90,128,0.10)' : '0 1px 4px rgba(0,0,0,0.04)',
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* Step number + icon row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: active ? step.color : '#C8C6C0',
            transition: 'color 0.25s ease',
          }}>
            {step.num}
          </span>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: active ? `rgba(61,90,128,0.12)` : '#F0EFE9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.25s ease',
          }}>
            <Icon size={16} strokeWidth={1.75} color={active ? step.color : '#8A8A8E'} />
          </div>
        </div>

        {/* Title */}
        <div style={{
          fontSize: 17,
          fontWeight: 800,
          letterSpacing: '-0.02em',
          color: '#1C1C1E',
          marginBottom: 6,
          lineHeight: 1.2,
        }}>
          {step.title}
        </div>

        {/* Subtitle */}
        <div style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: active ? step.color : '#B0AFAB',
          marginBottom: 16,
          transition: 'color 0.25s ease',
        }}>
          {step.subtitle}
        </div>

        {/* Description */}
        <p style={{
          fontSize: 13,
          lineHeight: 1.75,
          color: '#8A8A8E',
          margin: 0,
        }}>
          {step.desc}
        </p>

        {/* Duration pill */}
        <div style={{
          marginTop: 20,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.06em',
          color: active ? step.color : '#B0AFAB',
          background: active ? `rgba(61,90,128,0.08)` : '#F6F5F2',
          padding: '5px 12px',
          borderRadius: 100,
          transition: 'color 0.25s ease, background 0.25s ease',
        }}>
          <span style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: active ? step.color : '#C8C6C0',
            display: 'inline-block',
            flexShrink: 0,
            transition: 'background 0.25s ease',
          }} />
          {step.duration}
        </div>
      </div>
    </motion.div>
  )
}

export default function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section
      id="process"
      ref={ref}
      style={{
        background: '#FAFAF8',
        padding: 'clamp(80px, 10vw, 100px) clamp(24px, 4vw, 48px)',
        borderTop: '1px solid #E2E1DC',
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease }}
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          borderBottom: '1px solid #E2E1DC',
          paddingBottom: 24,
          marginBottom: 56,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1C1C1E' }}>How We Build</span>
        </div>
        <div style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#8A8A8E',
        }}>
          Avg. 2–4 weeks start to launch
        </div>
      </motion.div>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.05, duration: 0.6, ease }}
        style={{ marginBottom: 52 }}
      >
        <h2 style={{
          fontSize: 'clamp(28px, 4vw, 52px)',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1.05,
          color: '#1C1C1E',
          maxWidth: 560,
        }}>
          Your project, step<br />
          <em style={{ fontWeight: 300, color: '#3D5A80' }}>by step.</em>
        </h2>
        <p style={{
          fontSize: 15,
          color: '#8A8A8E',
          lineHeight: 1.7,
          maxWidth: 440,
          marginTop: 16,
        }}>
          No surprises. No black boxes. Every stage is transparent — you know exactly where your project is and what comes next.
        </p>
      </motion.div>

      {/* Progress connector bar (desktop) */}
      <div
        className="hidden lg:block"
        style={{ position: 'relative', marginBottom: 24 }}
      >
        {/* Background track */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '10%',
          right: '10%',
          height: 1,
          background: '#E2E1DC',
          transform: 'translateY(-50%)',
        }} />
        {/* Animated fill */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ delay: 0.4, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '10%',
            right: '10%',
            height: 1,
            background: 'linear-gradient(90deg, #3D5A80 0%, #5A7FAD 100%)',
            transform: 'translateY(-50%)',
            transformOrigin: 'left',
          }}
        />
        {/* Step dots */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10%', position: 'relative' }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease }}
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: activeIndex === i ? step.color : '#3D5A80',
                border: `2px solid ${activeIndex === i ? step.color : '#FAFAF8'}`,
                boxShadow: activeIndex === i ? `0 0 0 3px rgba(61,90,128,0.2)` : 'none',
                transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
              }}
            />
          ))}
        </div>
      </div>

      {/* Cards */}
      <div style={{
        display: 'flex',
        gap: 16,
        alignItems: 'stretch',
      }}
        className="flex-col lg:flex-row"
      >
        {steps.map((step, i) => (
          <StepCard
            key={step.num}
            step={step}
            index={i}
            active={activeIndex === i}
            onEnter={() => setActiveIndex(i)}
            onLeave={() => setActiveIndex(null)}
            inView={inView}
          />
        ))}
      </div>

      {/* Bottom note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.8, duration: 0.6, ease }}
        style={{
          marginTop: 40,
          paddingTop: 32,
          borderTop: '1px solid #E2E1DC',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <p style={{ fontSize: 13, color: '#B0AFAB', lineHeight: 1.6, maxWidth: 420 }}>
          Timelines vary by project complexity. Rush delivery available — ask us.
        </p>
        <div style={{ display: 'flex', gap: 32 }}>
          {[
            { label: 'Avg. turnaround', value: '2–4 weeks' },
            { label: 'Revision rounds', value: 'Unlimited' },
            { label: 'Communication', value: 'Daily updates' },
          ].map(item => (
            <div key={item.label} style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#B0AFAB', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1C1C1E' }}>{item.value}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
