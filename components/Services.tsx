'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { fadeUp, stagger, viewport } from '@/lib/animations'

const services = [
  {
    num: '01',
    title: 'Websites & Landing Pages',
    desc: 'Mobile-first, custom-coded sites that load fast, rank well, and actually convert visitors into customers.',
    price: 'Starting at $399',
  },
  {
    num: '02',
    title: 'Custom Systems & Dashboards',
    desc: 'Booking systems, client portals, internal tools — built exactly to how your business operates.',
    price: 'Quoted per project',
  },
  {
    num: '03',
    title: 'Ongoing Support & Maintenance',
    desc: "Updates, edits, and monitoring after launch. We stay on so you don't have to think about your site.",
    price: '$75 / month',
  },
  {
    num: '04',
    title: 'Add-ons & Enhancements',
    desc: "Animations, booking embeds, branding, SEO — bolt on exactly what you need, nothing you don't.",
    price: 'From $100',
  },
]

function ServiceRow({
  num,
  title,
  desc,
  price,
  delay,
}: {
  num: string
  title: string
  desc: string
  price: string
  delay: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={fadeUp}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderTop: '1px solid var(--na-inv-border)',
        padding: 'clamp(28px, 4vw, 44px) 0',
        display: 'grid',
        gridTemplateColumns: 'clamp(44px, 6vw, 72px) 1fr auto',
        alignItems: 'center',
        gap: 'clamp(16px, 3vw, 40px)',
        cursor: 'default',
        background: hovered ? 'rgba(var(--na-inv-accent-rgb), 0.06)' : 'transparent',
        transition: 'background 0.25s ease',
        position: 'relative',
        zIndex: 1,
        borderRadius: 0,
        marginLeft: 'calc(-1 * clamp(24px, 4vw, 48px))',
        marginRight: 'calc(-1 * clamp(24px, 4vw, 48px))',
        paddingLeft: 'clamp(24px, 4vw, 48px)',
        paddingRight: 'clamp(24px, 4vw, 48px)',
      }}
    >
      {/* Number */}
      <span
        style={{
          fontSize: 'clamp(11px, 1.2vw, 13px)',
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: hovered ? 'var(--na-inv-accent)' : 'var(--na-inv-muted)',
          transition: 'color 0.25s ease',
          flexShrink: 0,
          paddingTop: 3,
        }}
      >
        {num}
      </span>

      {/* Title + desc block */}
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: 'clamp(20px, 2.8vw, 38px)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            color: hovered ? 'var(--na-inv-accent)' : 'var(--na-inv-text)',
            transition: 'color 0.25s ease',
            marginBottom: 'clamp(8px, 1.2vw, 14px)',
          }}
        >
          {title}
        </div>
        <p
          style={{
            fontSize: 'clamp(13px, 1.2vw, 15px)',
            lineHeight: 1.7,
            color: 'var(--na-inv-muted)',
            maxWidth: '56ch',
            margin: 0,
          }}
        >
          {desc}
        </p>
      </div>

      {/* Price + arrow */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: 14,
          flexShrink: 0,
        }}
      >
        <span
          style={{
            fontSize: 'clamp(11px, 1.1vw, 13px)',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--na-inv-accent)',
            whiteSpace: 'nowrap',
          }}
        >
          {price}
        </span>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            border: '1px solid var(--na-inv-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: hovered ? 'var(--na-inv-accent)' : 'var(--na-inv-muted)',
            transform: hovered ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s ease, color 0.25s ease, border-color 0.25s ease',
            borderColor: hovered ? 'rgba(var(--na-inv-accent-rgb), 0.4)' : 'var(--na-inv-border)',
          }}
        >
          <ArrowUpRight size={16} strokeWidth={1.8} />
        </div>
      </div>
    </motion.div>
  )
}

function DesignerSVG() {
  return (
    <svg
      viewBox="0 0 280 320"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{
        width: 'clamp(180px, 20vw, 280px)',
        height: 'auto',
        color: 'var(--na-inv-text)',
      }}
    >
      {/* Head */}
      <circle cx="140" cy="54" r="28" strokeWidth="1.4" />

      {/* Hair */}
      <path d="M114 46 C116 22 136 14 156 20 C168 26 170 38 168 48" strokeWidth="1.6" fill="none" />
      <path d="M114 46 C112 38 114 30 118 26" strokeWidth="1.3" fill="none" />

      {/* Eyes */}
      <circle cx="131" cy="56" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="149" cy="56" r="2.2" fill="currentColor" stroke="none" />

      {/* Neck */}
      <path d="M134 82 L134 96" strokeWidth="1.3" />
      <path d="M146 82 L146 96" strokeWidth="1.3" />

      {/* Body — standing upright */}
      <path d="M110 96 C104 100 98 116 97 140 L97 210" strokeWidth="1.4" />
      <path d="M170 96 C176 100 182 116 183 140 L183 210" strokeWidth="1.4" />
      <path d="M110 96 L170 96" strokeWidth="1.4" />
      {/* Waist */}
      <path d="M100 165 L180 165" strokeWidth="1.1" opacity="0.5" />

      {/* Legs */}
      <path d="M97 210 L90 285" strokeWidth="1.4" />
      <path d="M183 210 L190 285" strokeWidth="1.4" />
      {/* Feet */}
      <path d="M83 285 L102 285" strokeWidth="1.3" />
      <path d="M180 285 L202 285" strokeWidth="1.3" />

      {/* Left arm — holding large tablet at an angle */}
      <path d="M110 110 C98 122 88 144 84 168 L84 200" strokeWidth="1.4" />
      {/* Left hand cupping tablet bottom */}
      <path d="M78 200 C80 200 88 200 90 200" strokeWidth="1.3" />

      {/* Right arm — extended, holding stylus pointing at tablet */}
      <path d="M170 110 C178 120 182 136 180 158" strokeWidth="1.4" />
      {/* Right hand with stylus */}
      <path d="M180 158 L198 142" strokeWidth="1.3" />
      {/* Stylus tip */}
      <path d="M198 142 L204 136" strokeWidth="1.8" />
      <circle cx="204" cy="136" r="2" fill="currentColor" stroke="none" />

      {/* Tablet / iPad (large, angled) */}
      <rect x="50" y="100" width="80" height="112" rx="6" strokeWidth="1.5"
        transform="rotate(-8 90 156)" />
      {/* Tablet screen inner */}
      <rect x="56" y="106" width="68" height="98" rx="4" strokeWidth="1" opacity="0.5"
        transform="rotate(-8 90 156)" />
      {/* Tablet home button bottom */}
      <circle cx="90" cy="207" r="4" strokeWidth="1.1" opacity="0.5" />

      {/* UI frame outline on tablet screen */}
      <rect x="60" y="112" width="56" height="36" rx="2" strokeWidth="0.9" opacity="0.4"
        transform="rotate(-8 88 130)" />
      {/* UI lines in frame */}
      <path d="M63 120 L108 118" strokeWidth="0.8" opacity="0.35" transform="rotate(-8 85 119)" />
      <path d="M63 126 L100 124" strokeWidth="0.8" opacity="0.35" transform="rotate(-8 81 125)" />
      <path d="M63 132 L105 130" strokeWidth="0.8" opacity="0.35" transform="rotate(-8 84 131)" />

      {/* Floating color swatches — top right area */}
      <rect x="198" y="60" width="14" height="14" rx="2" strokeWidth="1.1" opacity="0.5" />
      <rect x="216" y="60" width="14" height="14" rx="2" strokeWidth="1.1" opacity="0.5" />
      <rect x="234" y="60" width="14" height="14" rx="2" strokeWidth="1.1" opacity="0.5" />
      <rect x="216" y="78" width="14" height="14" rx="2" strokeWidth="1.1" opacity="0.4" />
      <rect x="234" y="78" width="14" height="14" rx="2" strokeWidth="1.1" opacity="0.4" />

      {/* Bezier curve handle points */}
      <path d="M200 120 C212 108 228 128 240 116" strokeWidth="1" opacity="0.4" />
      <circle cx="200" cy="120" r="3" strokeWidth="1" opacity="0.5" />
      <circle cx="240" cy="116" r="3" strokeWidth="1" opacity="0.5" />
      {/* Control handles */}
      <path d="M200 120 L208 110" strokeWidth="0.9" opacity="0.35" />
      <circle cx="208" cy="110" r="2" strokeWidth="0.9" opacity="0.4" />
      <path d="M240 116 L232 126" strokeWidth="0.9" opacity="0.35" />
      <circle cx="232" cy="126" r="2" strokeWidth="0.9" opacity="0.4" />

      {/* Floating sparkle / cursor near stylus */}
      <path d="M212 150 L214 142 L216 150 L224 152 L216 154 L214 162 L212 154 L204 152 Z"
        strokeWidth="0.9" opacity="0.35" />
    </svg>
  )
}

export default function Services() {
  return (
    <section
      id="services"
      data-cursor-dark
      style={{
        background: 'var(--na-inv-bg)',
        color: '#FFFFFF',
        padding: 'clamp(80px, 10vw, 100px) clamp(24px, 4vw, 48px)',
        borderTop: '1px solid var(--na-inv-border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Designer SVG — background right side, subtle */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: 'clamp(24px, 4vw, 48px)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 0,
          opacity: 0.15,
          pointerEvents: 'none',
          color: 'var(--na-inv-text)',
        }}
      >
        <DesignerSVG />
      </div>

      {/* Header */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={fadeUp}
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--na-inv-border)',
          paddingBottom: '24px',
          marginBottom: 0,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <h2 style={{
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--na-inv-text)',
            margin: 0,
          }}>
            What We Build
          </h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link
            href="/services"
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--na-inv-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--na-inv-text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--na-inv-muted)')}
          >
            Full Pricing
            <ArrowUpRight size={14} strokeWidth={2} />
          </Link>
          <Link
            href="/contact"
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--na-inv-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--na-inv-text)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--na-inv-muted)')}
          >
            Get a Quote
            <ArrowUpRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </motion.div>

      {/* Editorial numbered rows */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger(0.08)}
        style={{ position: 'relative', zIndex: 1 }}
      >
        {services.map((svc, i) => (
          <ServiceRow
            key={svc.num}
            num={svc.num}
            title={svc.title}
            desc={svc.desc}
            price={svc.price}
            delay={i * 0.08}
          />
        ))}
        {/* Closing border */}
        <div style={{ borderTop: '1px solid var(--na-inv-border)' }} />
      </motion.div>
    </section>
  )
}
