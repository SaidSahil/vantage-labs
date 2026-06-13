import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Web Design Services for BC Small Businesses — NodeAxis',
  description: 'Hand-coded custom websites for BC small businesses, starting at $399. No templates, no page builders — fast, clean sites built to rank and convert in Canada.',
  alternates: {
    canonical: 'https://nodeaxis.ca/services',
  },
  openGraph: {
    title: 'Web Design Services for BC Small Businesses — NodeAxis',
    description: 'Hand-coded custom websites for BC small businesses, starting at $399. No templates, no page builders — fast, clean sites built to rank and convert in Canada.',
    type: 'website',
    locale: 'en_CA',
    url: 'https://nodeaxis.ca/services',
    siteName: 'NodeAxis',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
