import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui'
import type { Post } from '@/lib/posts'

export function formatDate(iso: string) {
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/** Post meta line: category · date · read time. */
export function PostMeta({ post, className }: { post: Post; className?: string }) {
  return (
    <p className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] ${className ?? ''}`} style={{ color: 'var(--na-muted)' }}>
      <span className="font-medium" style={{ color: 'var(--na-accent)' }}>{post.category}</span>
      <span aria-hidden="true">·</span>
      <time dateTime={post.date}>{formatDate(post.date)}</time>
      <span aria-hidden="true">·</span>
      <span>{post.readingMinutes} min read</span>
    </p>
  )
}

/** Clickable post card: optional photo, meta, title, excerpt. Whole card is one link. */
export function PostCard({ post, headingLevel = 'h2' }: { post: Post; headingLevel?: 'h2' | 'h3' }) {
  const H = headingLevel
  return (
    <Card as="article" variant="white" padding="none" hover className="relative h-full flex flex-col overflow-hidden has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-[var(--na-accent)]">
      {post.image && (
        <div className="relative aspect-[16/10] w-full">
          <Image src={post.image.src} alt={post.image.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover" />
        </div>
      )}
      <div className="flex flex-col gap-3 flex-1 p-[clamp(20px,2.4vw,28px)]">
        <PostMeta post={post} />
        <H className="font-display text-[clamp(21px,2vw,26px)] font-medium leading-[1.15] tracking-[-0.02em]">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {post.title}
          </Link>
        </H>
        <p className="text-[15.5px] leading-[1.6]" style={{ color: 'var(--na-muted)' }}>{post.excerpt}</p>
        <span className="mt-auto pt-2 inline-flex items-center gap-2 text-[14px] font-medium" style={{ color: 'var(--na-accent)' }} aria-hidden="true">
          Read article →
        </span>
      </div>
    </Card>
  )
}
