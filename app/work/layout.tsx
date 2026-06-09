import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Work — Vantage Labs',
  description: 'Real projects built for real businesses across Canada. Custom websites, booking systems, and dashboards — every one hand-coded and built to perform.',
  openGraph: {
    title: 'Our Work — Vantage Labs',
    description: 'Real projects built for real businesses across Canada. Custom websites, booking systems, and dashboards — every one hand-coded and built to perform.',
    type: 'website',
  },
}

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
