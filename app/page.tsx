'use client'
import { useState, useEffect } from 'react'
import IntroLoader from '@/components/IntroLoader'
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
