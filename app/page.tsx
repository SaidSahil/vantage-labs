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
import About    from '@/components/About'
import FAQ      from '@/components/FAQ'
import CTA      from '@/components/CTA'
import Footer   from '@/components/Footer'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do I own the website after it\'s built?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — full ownership is transferred on delivery. Your code, your domain, your hosting.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does it take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most projects ship in 2 weeks from kickoff. Complex builds may take 3–4 weeks.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if I need changes later?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer maintenance packages and one-off updates at a flat rate. No surprises.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you use templates or page builders?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Never. Every site is hand-coded from scratch — no WordPress, no Webflow, no Squarespace.',
      },
    },
    {
      '@type': 'Question',
      name: "What's the minimum budget?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Projects start at $399 for a clean, fast landing page. Most small business sites fall in the $399–$999 range.',
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
      <About />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
