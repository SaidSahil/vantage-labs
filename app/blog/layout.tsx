import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Insights — Web, SEO & Business Advice | NodeAxis',
  description:
    'Practical, no-nonsense advice on websites, SEO, pricing, and conversion for small businesses in British Columbia, from the NodeAxis studio.',
  alternates: {
    canonical: 'https://nodeaxis.ca/blog',
  },
  openGraph: {
    title: 'Insights — Web, SEO & Business Advice | NodeAxis',
    description:
      'Practical, no-nonsense advice on websites, SEO, pricing, and conversion for small businesses in British Columbia.',
    type: 'website',
    locale: 'en_CA',
    url: 'https://nodeaxis.ca/blog',
    siteName: 'NodeAxis',
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
