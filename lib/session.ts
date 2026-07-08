import { createHmac, timingSafeEqual } from 'crypto'

const TOKEN = 'nodeaxis:analytics:v1'

function sign(): string {
  const secret = process.env.SESSION_SECRET ?? 'dev-fallback-change-in-production'
  return createHmac('sha256', secret).update(TOKEN).digest('hex')
}

export function makeSession(): string {
  return `${TOKEN}.${sign()}`
}

export function verifySession(value: string | undefined): boolean {
  if (!value) return false
  const expected = makeSession()
  if (value.length !== expected.length) return false
  try {
    return timingSafeEqual(Buffer.from(value), Buffer.from(expected))
  } catch {
    return false
  }
}
