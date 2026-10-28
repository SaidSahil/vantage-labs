import type { Metadata } from 'next'

const title = 'Free Local Audit for Surrey Trades | NodeAxis'
const description =
  'Free, no-obligation audit for Surrey plumbers, HVAC, roofers, electricians and landscapers. We check your Google profile, reviews, website and missed calls — then walk you through it in person.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://nodeaxis.ca/audit' },
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'en_CA',
    url: 'https://nodeaxis.ca/audit',
    siteName: 'NodeAxis',
  },
}

export default function AuditLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
