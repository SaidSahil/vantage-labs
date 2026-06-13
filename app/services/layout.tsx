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

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
