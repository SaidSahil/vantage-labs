import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About NodeAxis — Web Design Agency in BC, Canada',
  description: 'NodeAxis is a web design and development agency based in British Columbia, Canada. We build custom, hand-coded websites for small businesses starting at $399.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About NodeAxis — Web Design Agency in BC, Canada',
    description: 'Custom websites for small businesses in British Columbia. No templates. No page builders. Built to rank and convert.',
    type: 'website',
    locale: 'en_CA',
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
