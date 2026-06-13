'use client'
import { useState, useEffect } from 'react'
import IntroLoader from '@/components/IntroLoader'
import Cursor   from '@/components/Cursor'
import Navbar   from '@/components/Navbar'
import Hero     from '@/components/Hero'
import Marquee  from '@/components/Marquee'
import Work         from '@/components/Work'
import Testimonials from '@/components/Testimonials'
import Services from '@/components/Services'
import Process  from '@/components/Process'
import Why      from '@/components/Why'
import FAQ      from '@/components/FAQ'
import CTA      from '@/components/CTA'
import Footer   from '@/components/Footer'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do you work with small businesses across BC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — we work with small businesses all across British Columbia, including the Lower Mainland, Fraser Valley, Vancouver Island, and the Interior. Everything is handled remotely, so location is never a barrier.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a website cost for a small business in BC?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our projects start at $399 for a clean, fast landing page. Most small business sites in BC fall in the $399–$999 range. We provide a firm quote upfront — no hourly billing, no surprise invoices.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I own the website after it\'s built?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — full ownership is transferred on delivery. You get the source code, you control your own domain and hosting, and you\'re never locked into a platform or monthly fee with us.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take to build my website?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most projects ship within 2 weeks from kickoff. More complex builds — multi-page sites, booking systems, or custom dashboards — may take 3–4 weeks.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you use templates or page builders like WordPress or Squarespace?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Never. Every site is hand-coded from scratch — no WordPress, no Webflow, no Squarespace. This means your site loads faster, ranks better in search, and is built exactly to your business.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if I need updates or changes after launch?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer a flat-rate maintenance package at $75/month that covers updates, edits, and monitoring. One-off changes are also available at a fixed cost — you\'ll always know the price before work begins.',
      },
    },
  ],
}

export default function Home() {
  // Both server and client start with the same state — no hydration mismatch
  const [loaderDone, setLoaderDone] = useState(false)

  useEffect(() => {
    const isMobile = window.innerWidth < 768
    if (isMobile || sessionStorage.getItem('intro-seen') === '1') {
      setLoaderDone(true)
    }
  }, [])

  function handleIntroComplete() {
    sessionStorage.setItem('intro-seen', '1')
    setLoaderDone(true)
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Cursor />
      {!loaderDone && <IntroLoader onComplete={handleIntroComplete} />}
      <Navbar />
      <Hero />
      <Marquee />
      <Work />
      <Testimonials />
      <Services />
      <Process />
      <Why />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
