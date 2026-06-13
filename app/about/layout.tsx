import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About NodeAxis — Web Design, Apps & Systems Agency in BC',
  description: 'NodeAxis is a digital studio in British Columbia, Canada. We build custom websites, web apps, dashboards, and software for businesses — starting at $399.',
  alternates: {
    canonical: 'https://nodeaxis.ca/about',
  },
  openGraph: {
    title: 'About NodeAxis — Web Design, Apps & Systems Agency in BC',
    description: 'NodeAxis is a digital studio in British Columbia, Canada. We build custom websites, web apps, dashboards, and software for businesses — starting at $399.',
    type: 'website',
    locale: 'en_CA',
    url: 'https://nodeaxis.ca/about',
    siteName: 'NodeAxis',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
