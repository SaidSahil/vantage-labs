import { NextRequest } from 'next/server'

// ── Best-effort rate limiting ──────────────────────────────────
// This Map lives in per-serverless-instance memory only. It is
// best-effort and will not coordinate across multiple instances/regions,
// and resets on cold start. For hardened limits use a shared store (e.g. KV).
const hits = new Map<string, number[]>()

// Next's own dev server sets x-forwarded-for to the loopback address for
// every local request (visible as the "proxy.ts" hop in `next dev` timing
// logs), so every local client would otherwise collapse into one bucket.
// Vercel never reports a loopback address for real external traffic, so
// treating it the same as "unknown" only affects local dev.
const LOOPBACK_IPS = new Set(['127.0.0.1', '::1', '::ffff:127.0.0.1'])

// Returns null when the client IP can't be determined or is loopback.
// Callers must skip rate limiting in that case — falling back to a shared
// bucket would let any client's traffic lock out every other client,
// including the legitimate admin.
export function getClientIp(req: NextRequest): string | null {
  const fwd = req.headers.get('x-forwarded-for')
  const raw = (fwd ? fwd.split(',')[0].trim() : req.headers.get('x-real-ip')?.trim()) || null
  if (!raw || LOOPBACK_IPS.has(raw)) return null
  return raw
}

export function isRateLimited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now()
  const recent = (hits.get(key) || []).filter(t => now - t < windowMs)
  if (recent.length >= max) {
    hits.set(key, recent)
    return true
  }
  recent.push(now)
  hits.set(key, recent)
  return false
}
