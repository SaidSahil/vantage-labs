import { permanentRedirect } from 'next/navigation'

// The old agency portfolio pages (/projects/<slug>) were retired in the trades
// rebuild. Any old link or search result now goes to the trades showcase.
// The original page is preserved at tag `v1-agency-site`.
export default function ProjectPage(): never {
  permanentRedirect('/work')
}
