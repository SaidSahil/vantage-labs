import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service — NodeAxis',
  description: 'The terms for using the NodeAxis website and our free audit, Get Found and monthly services for Surrey trades.',
  alternates: {
    canonical: 'https://nodeaxis.ca/terms',
  },
  openGraph: {
    title: 'Terms of Service — NodeAxis',
    description: 'The terms for using the NodeAxis website and our free audit, Get Found and monthly services for Surrey trades.',
    type: 'website',
    locale: 'en_CA',
    url: 'https://nodeaxis.ca/terms',
    siteName: 'NodeAxis',
  },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
