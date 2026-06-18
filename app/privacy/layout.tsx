import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — NodeAxis',
  description: 'How NodeAxis collects, uses, and protects your personal information, in line with Canada\'s PIPEDA.',
  alternates: {
    canonical: 'https://nodeaxis.ca/privacy',
  },
  openGraph: {
    title: 'Privacy Policy — NodeAxis',
    description: 'How NodeAxis collects, uses, and protects your personal information, in line with Canada\'s PIPEDA.',
    type: 'website',
    locale: 'en_CA',
    url: 'https://nodeaxis.ca/privacy',
    siteName: 'NodeAxis',
  },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
