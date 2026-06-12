import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Services & Pricing — NodeAxis',
  description: 'Custom websites starting at $399. Landing pages, full sites, booking systems, and dashboards — hand-coded, no templates. Transparent pricing, 2-week delivery.',
  openGraph: {
    title: 'Services & Pricing — NodeAxis',
    description: 'Custom websites starting at $399. Landing pages, full sites, booking systems, and dashboards — hand-coded, no templates. Transparent pricing, 2-week delivery.',
    type: 'website',
  },
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
