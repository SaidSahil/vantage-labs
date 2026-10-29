import type { Metadata } from 'next'

// /projects/<slug> permanently redirects to /work (see page.tsx); keep it out of search.
export const metadata: Metadata = {
  robots: { index: false, follow: true },
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
