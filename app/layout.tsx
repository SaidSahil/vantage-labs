import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/lib/theme'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
})


export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://nodeaxis.ca'),
  title: 'NodeAxis — Custom Websites Starting at $399',
  description: 'Hand-coded websites and landing pages for small businesses. No templates, no page builders. Built to rank and convert. Starting at $399.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'NodeAxis — Custom Websites Starting at $399',
    description: 'Hand-coded websites and landing pages for small businesses. No templates, no page builders. Built to rank and convert. Starting at $399.',
    type: 'website',
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NodeAxis — Custom Websites Starting at $399',
    description: 'Hand-coded websites and landing pages for small businesses. No templates, no page builders. Built to rank and convert. Starting at $399.',
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-icon.svg', type: 'image/svg+xml' }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://nodeaxis.ca/#organization',
        name: 'NodeAxis',
        url: 'https://nodeaxis.ca',
        telephone: '+17782408911',
        email: 'sahil.sodais@gmail.com',
        logo: {
          '@type': 'ImageObject',
          url: 'https://nodeaxis.ca/icon.svg',
        },
        sameAs: ['https://www.linkedin.com/company/nodeaxis'],
        areaServed: {
          '@type': 'State',
          name: 'British Columbia',
          containedInPlace: {
            '@type': 'Country',
            name: 'Canada',
          },
        },
      },
      {
        '@type': 'LocalBusiness',
        '@id': 'https://nodeaxis.ca/#localbusiness',
        name: 'NodeAxis',
        url: 'https://nodeaxis.ca',
        telephone: '+17782408911',
        email: 'sahil.sodais@gmail.com',
        description: 'Custom web design and development for small businesses in British Columbia, Canada.',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'British Columbia',
          addressRegion: 'BC',
          addressCountry: 'CA',
        },
        areaServed: {
          '@type': 'State',
          name: 'British Columbia',
        },
        serviceType: 'Web Design and Development',
      },
    ],
  }

  return (
    <html lang="en-CA" className={`${inter.variable} dark`}>
      <head>
        {/* Anti-flash: apply saved theme before React hydrates */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){try{var t=localStorage.getItem('nodeaxis-theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})();
        ` }} />
        {/* Organization + LocalBusiness structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <ThemeProvider>
          <div id="main-content">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
