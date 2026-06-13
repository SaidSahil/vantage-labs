import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
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
  title: 'NodeAxis — Custom Web Design in BC, Canada | From $399',
  description: 'NodeAxis builds hand-coded websites for small businesses in British Columbia, Canada. No templates, no page builders — built to rank and convert. From $399.',
  alternates: {
    canonical: 'https://nodeaxis.ca',
  },
  openGraph: {
    title: 'NodeAxis — Custom Web Design in BC, Canada | From $399',
    description: 'NodeAxis builds hand-coded websites for small businesses in British Columbia, Canada. No templates, no page builders — built to rank and convert. From $399.',
    type: 'website',
    locale: 'en_CA',
    url: 'https://nodeaxis.ca',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NodeAxis — Custom Web Design in BC, Canada | From $399',
    description: 'NodeAxis builds hand-coded websites for small businesses in British Columbia, Canada. No templates, no page builders — built to rank and convert. From $399.',
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
        email: 'info@nodeaxis.ca',
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
        email: 'info@nodeaxis.ca',
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
    <html lang="en-CA" className={`${inter.variable} dark`} suppressHydrationWarning>
      <head>
        {/* Organization + LocalBusiness structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      {/* Anti-flash: runs before React hydrates, prevents theme flicker */}
      <Script id="theme-init" strategy="beforeInteractive">{`(function(){try{var t=localStorage.getItem('nodeaxis-theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})();`}</Script>
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
