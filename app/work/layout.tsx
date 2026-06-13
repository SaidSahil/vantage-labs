import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio: Web Design, Apps & Systems — NodeAxis',
  description: 'Browse NodeAxis portfolio — websites, web apps, dashboards, and systems built for real BC businesses. Hand-coded, no templates, built to perform.',
  alternates: {
    canonical: 'https://nodeaxis.ca/work',
  },
  openGraph: {
    title: 'Portfolio: Web Design, Apps & Systems — NodeAxis',
    description: 'Browse NodeAxis portfolio — websites, web apps, dashboards, and systems built for real BC businesses. Hand-coded, no templates, built to perform.',
    type: 'website',
    locale: 'en_CA',
    url: 'https://nodeaxis.ca/work',
    siteName: 'NodeAxis',
  },
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
