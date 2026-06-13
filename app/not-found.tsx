import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page Not Found | NodeAxis',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-6 text-center">
      <p className="text-[10rem] font-bold leading-none text-white/5 select-none tabular-nums">
        404
      </p>

      <div className="-mt-8 space-y-3">
        <h1 className="text-2xl font-semibold text-white tracking-tight">
          This page doesn&apos;t exist.
        </h1>
        <p className="text-white/40 text-sm max-w-xs mx-auto">
          You may have followed a broken link or typed the address incorrectly.
        </p>
      </div>

      <div className="mt-10 flex items-center gap-4">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors"
        >
          Go home
        </Link>
        <Link
          href="/work"
          className="px-5 py-2.5 rounded-full border border-white/20 text-white text-sm font-medium hover:border-white/40 hover:bg-white/5 transition-colors"
        >
          See our work
        </Link>
      </div>
    </main>
  )
}
