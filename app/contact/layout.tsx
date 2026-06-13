import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact NodeAxis — Start Your BC Web Design Project',
  description: 'Get in touch with NodeAxis, a hand-coded web design agency in British Columbia. Free quote, honest pricing from $399, response within 24 hours. No commitment required.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact NodeAxis — Start Your BC Web Design Project',
    description: 'Get in touch with NodeAxis, a hand-coded web design agency in British Columbia. Free quote, honest pricing from $399, response within 24 hours.',
    type: 'website',
    locale: 'en_CA',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
