import { createHmac, randomBytes, timingSafeEqual } from 'crypto'

const TOKEN = 'nodeaxis:analytics:v1'
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 7 // 7 days — keep in sync with the cookie maxAge

function getSecret(): string {
  const secret = process.env.SESSION_SECRET
  if (secret) return secret
  if (process.env.NODE_ENV === 'production') {
    // Fail closed: a missing secret in production must not silently fall
    // back to a value anyone can read out of this source file.
    throw new Error('SESSION_SECRET must be set in production')
  }
  return 'dev-fallback-change-in-production'
}

function sign(payload: string): string {
  return createHmac('sha256', getSecret()).update(payload).digest('hex')
}

export function makeSession(): string {
  const expiresAt = Date.now() + SESSION_TTL_MS
  const nonce = randomBytes(16).toString('hex')
  const payload = `${TOKEN}.${expiresAt}.${nonce}`
  return `${payload}.${sign(payload)}`
}

export function verifySession(value: string | undefined): boolean {
  if (!value) return false
  const parts = value.split('.')
  if (parts.length !== 4) return false
  const [token, expiresAtRaw, nonce, signature] = parts
  if (token !== TOKEN) return false

  const expiresAt = Number(expiresAtRaw)
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false

  let expected: string
  try {
    expected = sign(`${token}.${expiresAtRaw}.${nonce}`)
  } catch {
    return false
  }
  if (signature.length !== expected.length) return false
  try {
    return timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
  } catch {
    return false
  }
}
