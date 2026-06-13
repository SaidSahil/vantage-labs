import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact NodeAxis — Start Your BC Web Design Project',
  description: 'Get in touch with NodeAxis — hand-coded web design in British Columbia. Free quote, honest pricing from $399, fast 24-hour response. No commitment required.',
  alternates: {
    canonical: 'https://nodeaxis.ca/contact',
  },
  openGraph: {
    title: 'Contact NodeAxis — Start Your BC Web Design Project',
    description: 'Get in touch with NodeAxis — hand-coded web design in British Columbia. Free quote, honest pricing from $399, fast 24-hour response. No commitment required.',
    type: 'website',
    locale: 'en_CA',
    url: 'https://nodeaxis.ca/contact',
    siteName: 'NodeAxis',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
