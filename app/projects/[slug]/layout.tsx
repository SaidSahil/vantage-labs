import type { Metadata } from 'next'
import { getProject } from '@/lib/projects'

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) {
    return {
      title: 'Project — Vantage Labs',
    }
  }

  const title = `${project.name} — Vantage Labs`
  const description = project.tagline

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
  }
}

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
