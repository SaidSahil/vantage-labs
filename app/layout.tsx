import type { Metadata } from 'next'
import { Inter, Inter_Tight } from 'next/font/google'
import Script from 'next/script'
import { ThemeProvider } from '@/lib/theme'
import CookieConsent from '@/components/CookieConsent'
import AnalyticsGate from '@/components/AnalyticsGate'
import Tracker from '@/components/Tracker'
import { business, promise } from '@/lib/offer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
})

// Display face for headlines (used via --na-font-display / `font-display`).
const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
  weight: ['400', '500', '600'],
  display: 'swap',
})

const SITE_URL = 'https://nodeaxis.ca'
const TITLE = `NodeAxis — More Calls & Reviews for ${business.city} Trades | ${business.city}, ${business.region}`
const DESCRIPTION = promise.sub
const TELEPHONE = business.phoneHref.replace(/^tel:/, '')

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    locale: 'en_CA',
    url: SITE_URL,
    siteName: business.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const areaServed = business.serviceArea.map(name => ({
    '@type': 'City',
    name,
    containedInPlace: { '@type': 'State', name: 'British Columbia' },
  }))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: business.name,
        url: SITE_URL,
        telephone: TELEPHONE,
        email: business.email,
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/icon.svg`,
        },
        sameAs: ['https://www.linkedin.com/company/nodeaxis'],
        areaServed,
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE_URL}/#localbusiness`,
        name: business.name,
        url: SITE_URL,
        telephone: TELEPHONE,
        email: business.email,
        description: `${promise.headline} ${promise.sub}`,
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          addressLocality: business.city,
          addressRegion: business.region,
          addressCountry: 'CA',
        },
        areaServed,
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '08:00',
          closes: '18:00',
        },
        serviceType: 'Google Business Profile optimization, review generation, missed-call text-back and admin tools for trades',
        parentOrganization: { '@id': `${SITE_URL}/#organization` },
      },
    ],
  }

  return (
    <html lang="en-CA" className={`${inter.variable} ${interTight.variable}`} suppressHydrationWarning>
      <head>
        {/* Organization + LocalBusiness structured data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {/* Anti-flash: runs before React hydrates. Light is the default; only add `dark` when the visitor chose it. */}
        <Script id="theme-init" strategy="beforeInteractive">{`(function(){try{if(localStorage.getItem('nodeaxis-theme')==='dark'){document.documentElement.classList.add('dark')}else{document.documentElement.classList.remove('dark')}}catch(e){}})();`}</Script>
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <ThemeProvider>
          <div id="main-content">
            {children}
          </div>
          <CookieConsent />
        </ThemeProvider>
        <AnalyticsGate />
        <Tracker />
      </body>
    </html>
  )
}
