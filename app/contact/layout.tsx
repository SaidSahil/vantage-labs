import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact NodeAxis — Start Your Digital Project in BC',
  description: 'Get in touch with NodeAxis — websites, web apps, dashboards & software in BC. Free quote, honest pricing from $399, fast 24-hour response. No commitment required.',
  alternates: {
    canonical: 'https://nodeaxis.ca/contact',
  },
  openGraph: {
    title: 'Contact NodeAxis — Start Your Digital Project in BC',
    description: 'Get in touch with NodeAxis — websites, web apps, dashboards & software in BC. Free quote, honest pricing from $399, fast 24-hour response. No commitment required.',
    type: 'website',
    locale: 'en_CA',
    url: 'https://nodeaxis.ca/contact',
    siteName: 'NodeAxis',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
