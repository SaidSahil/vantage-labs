import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact — NodeAxis',
  description: 'Start a project with NodeAxis. Get a free quote, book a 30-minute call, or send a message. We respond within 24 hours — no commitment required.',
  openGraph: {
    title: 'Contact — NodeAxis',
    description: 'Start a project with Vantage Labs. Get a free quote, book a 30-minute call, or send a message. We respond within 24 hours — no commitment required.',
    type: 'website',
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
