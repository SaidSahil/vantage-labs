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
  title: 'NodeAxis — Web Design, Apps & Systems in BC, Canada | From $399',
  description: 'NodeAxis builds hand-coded websites, web apps, dashboards, and software for businesses in British Columbia, Canada. No templates, no shortcuts — built to perform. From $399.',
  alternates: {
    canonical: 'https://nodeaxis.ca',
  },
  openGraph: {
    title: 'NodeAxis — Web Design, Apps & Systems in BC, Canada | From $399',
    description: 'NodeAxis builds hand-coded websites, web apps, dashboards, and software for businesses in British Columbia, Canada. No templates, no shortcuts — built to perform. From $399.',
    type: 'website',
    locale: 'en_CA',
    url: 'https://nodeaxis.ca',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NodeAxis — Web Design, Apps & Systems in BC, Canada | From $399',
    description: 'NodeAxis builds hand-coded websites, web apps, dashboards, and software for businesses in British Columbia, Canada. No templates, no shortcuts — built to perform. From $399.',
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
        description: 'Custom web design, web applications, dashboards, and software development for businesses in British Columbia, Canada.',
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
        serviceType: 'Web Design, Web Applications, Dashboards, and Software Development',
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
