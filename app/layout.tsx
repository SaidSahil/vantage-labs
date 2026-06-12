import type { Metadata } from 'next'
import { Inter, Syne } from 'next/font/google'
import { ThemeProvider } from '@/lib/theme'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NodeAxis — Custom Websites Starting at $399',
  description: 'Hand-coded websites and landing pages for small businesses. No templates, no page builders. Built to rank and convert. Starting at $399.',
  openGraph: {
    title: 'NodeAxis — Custom Websites Starting at $399',
    description: 'Hand-coded websites and landing pages for small businesses. No templates, no page builders. Built to rank and convert. Starting at $399.',
    type: 'website',
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
  return (
    <html lang="en-CA" className={`${inter.variable} ${syne.variable} dark`}>
      <head>
        {/* Anti-flash: apply saved theme before React hydrates */}
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){try{var t=localStorage.getItem('nodeaxis-theme');if(t==='light'){document.documentElement.classList.remove('dark')}else{document.documentElement.classList.add('dark')}}catch(e){document.documentElement.classList.add('dark')}})();
        ` }} />
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
