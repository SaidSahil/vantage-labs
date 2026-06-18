import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — NodeAxis',
  description: 'The terms that govern your use of the NodeAxis website and our web design and development services.',
  alternates: {
    canonical: 'https://nodeaxis.ca/terms',
  },
  openGraph: {
    title: 'Terms of Service — NodeAxis',
    description: 'The terms that govern your use of the NodeAxis website and our web design and development services.',
    type: 'website',
    locale: 'en_CA',
    url: 'https://nodeaxis.ca/terms',
    siteName: 'NodeAxis',
  },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
