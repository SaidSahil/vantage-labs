import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Tracked from '@/components/Tracked'
import { faqs } from '@/lib/offer'
import { MotionRoot } from '@/components/home/Reveal'
import Hero from '@/components/home/Hero'
import Problems from '@/components/home/Problems'
import Offer from '@/components/home/Offer'
import HowItWorks from '@/components/home/HowItWorks'
import LocalProof from '@/components/home/LocalProof'
import DemoTeaser from '@/components/home/DemoTeaser'
import Faq from '@/components/home/Faq'
import ClosingCta from '@/components/home/ClosingCta'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <MotionRoot>
        <main className="flex flex-col gap-[var(--na-gutter)] pb-[var(--na-gutter)]">
          <Tracked id="hero"><Hero /></Tracked>
          <Tracked id="problems"><Problems /></Tracked>
          <Tracked id="offer"><Offer /></Tracked>
          <Tracked id="how-it-works"><HowItWorks /></Tracked>
          <Tracked id="local-proof"><LocalProof /></Tracked>
          <Tracked id="demo"><DemoTeaser /></Tracked>
          <Tracked id="faq"><Faq /></Tracked>
          <Tracked id="cta"><ClosingCta /></Tracked>
        </main>
      </MotionRoot>
      <Footer />
    </>
  )
}
