import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vantage Labs — Custom Websites Starting at $399',
  description: 'Hand-coded websites and landing pages for small businesses. No templates, no page builders. Built to rank and convert. Starting at $399.',
  openGraph: {
    title: 'Vantage Labs — Custom Websites Starting at $399',
    description: 'Hand-coded websites and landing pages for small businesses. No templates, no page builders. Built to rank and convert. Starting at $399.',
    type: 'website',
  },
  icons: {
    icon: '/media/vantage-labs-mark.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="stylesheet" href="https://assets.calendly.com/assets/external/widget.css" />
      </head>
      <body>
        {children}
        <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}
