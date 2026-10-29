import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // /admin: private dashboard; /api: endpoints; /demo: personalized, expiring
      // prospect demos (also sent with X-Robots-Tag: noindex). /_next/ is left
      // crawlable so Google can fetch the CSS/JS it needs to render pages.
      disallow: ['/admin', '/api/', '/demo'],
    },
    sitemap: 'https://nodeaxis.ca/sitemap.xml',
  }
}
