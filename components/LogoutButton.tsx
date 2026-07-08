'use client'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export default function LogoutButton() {
  const router = useRouter()

  async function handleClick() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center gap-2 rounded-full border border-[var(--na-inv-border)] px-4 py-2 text-xs font-semibold text-[var(--na-inv-muted)] transition-colors hover:border-[var(--na-inv-accent)] hover:text-[var(--na-inv-text)] cursor-pointer"
    >
      <LogOut size={14} />
      Sign out
    </button>
  )
}
