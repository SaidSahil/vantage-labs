'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      router.push('/admin/analytics')
      router.refresh()
    } else {
      setStatus('error')
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--na-inv-bg)',
        padding: 24,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          maxWidth: 360,
          border: '1px solid var(--na-inv-border)',
          borderRadius: 16,
          padding: 32,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--na-inv-accent)',
            marginBottom: 8,
          }}
        >
          NodeAxis
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: 'var(--na-inv-text)', margin: '0 0 24px' }}>
          Analytics access
        </h1>
        <label
          style={{
            display: 'block',
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--na-inv-text)',
            opacity: 0.6,
            marginBottom: 8,
          }}
        >
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={e => {
            setPassword(e.target.value)
            setStatus('idle')
          }}
          required
          autoFocus
          style={{
            width: '100%',
            padding: '12px 14px',
            borderRadius: 10,
            border: '1px solid var(--na-inv-border)',
            background: 'rgba(255,255,255,0.03)',
            color: 'var(--na-inv-text)',
            fontSize: 14,
            marginBottom: 16,
            outline: 'none',
          }}
        />
        {status === 'error' && (
          <p style={{ fontSize: 12, color: '#f77', marginBottom: 16 }}>Incorrect password. Try again.</p>
        )}
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            width: '100%',
            padding: '12px 20px',
            borderRadius: 10,
            border: 'none',
            background: 'var(--na-inv-accent)',
            color: '#fff',
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.04em',
            cursor: status === 'loading' ? 'default' : 'pointer',
            opacity: status === 'loading' ? 0.6 : 1,
          }}
        >
          {status === 'loading' ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
