import type { Metadata } from 'next'

const title = 'Insights for Surrey Trades — Calls, Reviews & Google | NodeAxis'
const description =
  'Plain-language advice for Surrey, BC plumbers, HVAC, roofing, electrical and landscaping businesses: get more calls, more Google reviews and less paperwork.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: 'https://nodeaxis.ca/blog',
  },
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'en_CA',
    url: 'https://nodeaxis.ca/blog',
    siteName: 'NodeAxis',
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
