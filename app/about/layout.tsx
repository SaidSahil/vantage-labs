import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About NodeAxis — Custom Web Design Agency in BC, Canada',
  description: 'NodeAxis is a web design and development agency based in British Columbia, Canada. We build custom, hand-coded websites for small businesses starting at $399.',
  alternates: {
    canonical: 'https://nodeaxis.ca/about',
  },
  openGraph: {
    title: 'About NodeAxis — Custom Web Design Agency in BC, Canada',
    description: 'NodeAxis is a web design and development agency based in British Columbia, Canada. We build custom, hand-coded websites for small businesses starting at $399.',
    type: 'website',
    locale: 'en_CA',
    url: 'https://nodeaxis.ca/about',
    siteName: 'NodeAxis',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
