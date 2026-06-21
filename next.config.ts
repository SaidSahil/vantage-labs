import type { NextConfig } from "next";

// Shared CSP directives for the main app. `frame-src 'self'` lets our own
// pages embed the same-origin demo previews under /demos/*.html.
const APP_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "connect-src 'self'",
  "frame-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

// CSP for the standalone demo HTML. Identical to APP_CSP except it allows our
// own pages to frame it (`frame-ancestors 'self'`) — the project detail page
// and /work grid embed these in an <iframe>.
const DEMO_CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "connect-src 'self'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ')

const nextConfig: NextConfig = {
  images: {
    domains: [],
  },
  async headers() {
    return [
      {
        // Everything EXCEPT the demo files. `X-Frame-Options: DENY` +
        // `frame-ancestors 'none'` here block clickjacking on the real app.
        // The negative lookahead keeps these from hitting /demos/*, which must
        // be framable by our own pages.
        source: '/((?!demos/).*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Content-Security-Policy', value: APP_CSP },
        ],
      },
      {
        // Standalone demo HTML (public/demos/*.html). Must be embeddable by our
        // own /projects/[slug] and /work pages, so framing is allowed for the
        // same origin only — not third parties (still clickjacking-safe).
        source: '/demos/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Content-Security-Policy', value: DEMO_CSP },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.nodeaxis.ca' }],
        destination: 'https://nodeaxis.ca/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
