import type { Metadata } from 'next'
import { business } from '@/lib/offer'

const title = 'Contact NodeAxis — Talk to a Real Person in Surrey, BC'
const description = `Call ${business.phoneDisplay} or send a quick note. NodeAxis helps Surrey trades get more calls and more 5-star reviews — and we meet you in person.`

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://nodeaxis.ca/contact' },
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'en_CA',
    url: 'https://nodeaxis.ca/contact',
    siteName: 'NodeAxis',
  },
}

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact NodeAxis',
  url: 'https://nodeaxis.ca/contact',
  description,
  mainEntity: {
    '@type': 'Organization',
    name: business.name,
    telephone: business.phoneHref.replace('tel:', ''),
    email: business.email,
    url: 'https://nodeaxis.ca',
    areaServed: business.serviceArea.map(name => ({ '@type': 'City', name })),
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      {children}
    </>
  )
}
