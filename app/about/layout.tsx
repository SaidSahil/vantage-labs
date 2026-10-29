import type { Metadata } from 'next'

const title = 'About NodeAxis — Local Tech Partner for Surrey Trades'
const description = 'NodeAxis is a Surrey, BC team helping plumbers, HVAC, roofers, electricians and landscapers get more calls, more 5-star reviews and less paperwork. We meet you in person.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: 'https://nodeaxis.ca/about',
  },
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'en_CA',
    url: 'https://nodeaxis.ca/about',
    siteName: 'NodeAxis',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
