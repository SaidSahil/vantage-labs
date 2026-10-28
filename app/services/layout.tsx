import type { Metadata } from 'next'
import { business, faqs, tiers } from '@/lib/offer'

const title = 'Services & Prices for Surrey Trades | NodeAxis'
const description =
  'Plain prices for Surrey trades: a free local audit, a one-time Get Found setup, a monthly Never Miss a Lead plan, and custom tools. Month-to-month, no long contracts.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://nodeaxis.ca/services' },
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'en_CA',
    url: 'https://nodeaxis.ca/services',
    siteName: 'NodeAxis',
  },
}

const numericPrice = (p: string) => {
  const n = p.replace(/[^0-9.]/g, '')
  return n ? n : undefined
}

const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://nodeaxis.ca/services#service',
  serviceType: 'Google Business Profile, review requests, missed-call text-back and websites for trades',
  provider: { '@id': 'https://nodeaxis.ca/#organization' },
  areaServed: business.serviceArea.map(name => ({ '@type': 'City', name })),
  url: 'https://nodeaxis.ca/services',
  description,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'NodeAxis plans',
    itemListElement: tiers.map(t => ({
      '@type': 'Offer',
      name: t.name,
      description: t.pitch,
      url: `https://nodeaxis.ca/services#${t.id}`,
      priceCurrency: 'CAD',
      ...(numericPrice(t.price) ? { price: numericPrice(t.price) } : {}),
    })),
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://nodeaxis.ca' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://nodeaxis.ca/services' },
  ],
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  )
}
