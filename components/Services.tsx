'use client'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { fadeUp, stagger, viewport } from '@/lib/animations'

const services = [
  {
    num: '01',
    title: 'Websites &\nLanding Pages',
    desc: 'Mobile-first, custom-coded sites that load fast, rank well, and actually convert visitors into customers.',
    price: 'Starting at $399',
  },
  {
    num: '02',
    title: 'Custom Systems &\nDashboards',
    desc: 'Booking systems, client portals, internal tools — built exactly to how your business operates.',
    price: 'Quoted per project',
  },
  {
    num: '03',
    title: 'Ongoing Support &\nMaintenance',
    desc: 'Updates, edits, and monitoring after launch. We stay on so you don\'t have to think about your site.',
    price: '$75 / month',
  },
  {
    num: '04',
    title: 'Add-ons &\nEnhancements',
    desc: 'Animations, booking embeds, branding, SEO — bolt on exactly what you need, nothing you don\'t.',
    price: 'From $100',
  },
]

export default function Services() {
  return (
    <section
      id="services"
      data-cursor-dark
      style={{
        background: '#141416',
        color: '#FFFFFF',
        padding: 'clamp(80px, 10vw, 100px) clamp(24px, 4vw, 48px)',
        borderTop: '1px solid #2a2a2c',
      }}
    >
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
          borderBottom: '1px solid #2a2a2c',
          paddingBottom: '24px',
          marginBottom: 0,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>What We Build</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link
            href="/services"
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
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
              color: 'rgba(255,255,255,0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              textDecoration: 'none',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.3)')}
          >
            Get a Quote
            <ArrowUpRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </motion.div>

      {/* Services grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        variants={stagger(0.08)}
        className="grid grid-cols-1 md:grid-cols-2"
      >
        {services.map((svc) => (
          <motion.div
            key={svc.num}
            variants={fadeUp}
            className="svc-row"
            style={{
              padding: '40px 0',
              borderBottom: '1px solid #2a2a2c',
              display: 'grid',
              gridTemplateColumns: '64px 1fr',
              gap: 24,
              transition: 'background 0.2s ease',
            }}
          >
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)',
              paddingTop: 4,
            }}>
              {svc.num}
            </span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
                <div style={{
                  fontSize: 'clamp(18px, 2.5vw, 30px)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.15,
                  whiteSpace: 'pre-line',
                }}>
                  {svc.title}
                </div>
                {svc.num === '01' && (
                  <span style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#3D5A80',
                    background: 'rgba(61,90,128,0.12)',
                    border: '1px solid rgba(61,90,128,0.25)',
                    borderRadius: 100,
                    padding: '4px 10px',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}>
                    Most Popular
                  </span>
                )}
              </div>
              <p style={{
                fontSize: 14,
                lineHeight: 1.7,
                color: 'rgba(255,255,255,0.45)',
                maxWidth: 340,
              }}>
                {svc.desc}
              </p>
              <div style={{
                marginTop: 20,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#3D5A80',
              }}>
                {svc.price}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
