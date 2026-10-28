import type { Metadata } from 'next'

const title = 'See It in Action: Free Website Preview for Trades | NodeAxis'
const description =
  'See a sample NodeAxis site for a Surrey trade. We build a free preview of your new site — with your name, trade and phone — before you pay anything.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://nodeaxis.ca/work' },
  openGraph: {
    title,
    description,
    type: 'website',
    locale: 'en_CA',
    url: 'https://nodeaxis.ca/work',
    siteName: 'NodeAxis',
  },
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
