import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio: BC Web Design & Dev Projects — NodeAxis',
  description: 'Browse NodeAxis portfolio — custom hand-coded websites for real BC businesses. Landing pages, booking systems, and dashboards built to rank and convert.',
  alternates: {
    canonical: 'https://nodeaxis.ca/work',
  },
  openGraph: {
    title: 'Portfolio: BC Web Design & Dev Projects — NodeAxis',
    description: 'Browse NodeAxis portfolio — custom hand-coded websites for real BC businesses. Landing pages, booking systems, and dashboards built to rank and convert.',
    type: 'website',
    locale: 'en_CA',
    url: 'https://nodeaxis.ca/work',
    siteName: 'NodeAxis',
  },
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
