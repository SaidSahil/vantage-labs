import type { Metadata } from 'next'
import { getProject } from '@/lib/projects'

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) {
    return {
      title: 'Project | NodeAxis',
    }
  }

  const title = `${project.name} | NodeAxis`
  // Use full description (150-160 chars) for meta; fall back to tagline if description is somehow absent
  const description = project.description.length > 160
    ? project.description.slice(0, 157) + '...'
    : project.description

  return {
    title,
    description,
    alternates: {
      canonical: `https://nodeaxis.ca/projects/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'en_CA',
      url: `https://nodeaxis.ca/projects/${slug}`,
      siteName: 'NodeAxis',
    },
  }
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
