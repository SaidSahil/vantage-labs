import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Web Design, Apps & Software Services in BC — NodeAxis',
  description: 'Hand-coded websites, web apps, dashboards, and custom software for BC businesses, starting at $399. No templates, no shortcuts — built to perform.',
  alternates: {
    canonical: 'https://nodeaxis.ca/services',
  },
  openGraph: {
    title: 'Web Design, Apps & Software Services in BC — NodeAxis',
    description: 'Hand-coded websites, web apps, dashboards, and custom software for BC businesses, starting at $399. No templates, no shortcuts — built to perform.',
    type: 'website',
    locale: 'en_CA',
    url: 'https://nodeaxis.ca/services',
    siteName: 'NodeAxis',
  },
}

const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://nodeaxis.ca/services#service',
  serviceType: 'Web Design, Web Applications, Dashboards & Software Development',
  provider: { '@id': 'https://nodeaxis.ca/#organization' },
  areaServed: { '@type': 'State', name: 'British Columbia' },
  url: 'https://nodeaxis.ca/services',
  description:
    'Hand-coded websites, web apps, dashboards, and custom software for businesses in British Columbia, Canada. Fixed pricing from $399.',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'CAD',
    price: '399',
    priceSpecification: {
      '@type': 'PriceSpecification',
      priceCurrency: 'CAD',
      minPrice: '399',
    },
    availability: 'https://schema.org/InStock',
  },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  )
}
