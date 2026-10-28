'use client'
import { useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { business as biz, trades } from '@/lib/offer'
import { hasAnalyticsConsent, getSessionId } from '@/lib/tracking'
import { PillButton } from '@/components/ui'

type Status = 'idle' | 'loading' | 'success' | 'error'
type FieldName = 'name' | 'business' | 'trade' | 'phone' | 'email' | 'website' | 'message'
type Values = Record<FieldName, string> & { company: string }
type Errors = Partial<Record<FieldName, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(name: FieldName, v: Values): string | undefined {
  const value = v[name].trim()
  switch (name) {
    case 'name':
      return value ? undefined : 'Please tell us your name.'
    case 'business':
      return value ? undefined : 'Please add your business name.'
    case 'trade':
      return value ? undefined : 'Please pick your trade.'
    case 'phone': {
      if (!value) return 'We need a number to call you back.'
      const digits = value.replace(/\D/g, '').length
      return digits >= 10 && digits <= 15 ? undefined : 'Please enter a full phone number, e.g. 604-555-0123.'
    }
    case 'email':
      return !value || EMAIL_RE.test(value) ? undefined : 'That email doesn’t look right — or leave it blank.'
    default:
      return undefined
  }
}

const ORDER: FieldName[] = ['name', 'business', 'trade', 'phone', 'email', 'website', 'message']

export interface AuditFormProps {
  /** Heading shown above the form. Pass null to hide. */
  title?: string | null
  /** Short line under the heading. */
  intro?: string
}

/** Shared "free local audit" request form used on /audit and /contact. Posts to /api/contact. */
export default function AuditForm({
  title = 'Book your free audit',
  intro = 'Takes about a minute. We’ll call you back within one business day.',
}: AuditFormProps) {
  const uid = useId()
  const reduce = useReducedMotion()
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<Status>('idle')
  const [serverError, setServerError] = useState<string | null>(null)
  const [values, setValues] = useState<Values>({
    name: '', business: '', trade: '', phone: '', email: '', website: '', message: '', company: '',
  })
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})

  const id = (f: string) => `${uid}-${f}`

  function update(f: keyof Values, value: string) {
    const next = { ...values, [f]: value }
    setValues(next)
    // Re-validate live once a field has been touched, so errors clear as soon as they're fixed.
    if (f !== 'company' && touched[f as FieldName]) {
      setErrors(e => ({ ...e, [f]: validate(f as FieldName, next) }))
    }
  }

  function blur(f: FieldName) {
    setTouched(t => ({ ...t, [f]: true }))
    setErrors(e => ({ ...e, [f]: validate(f, values) }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const all: Errors = {}
    for (const f of ORDER) {
      const err = validate(f, values)
      if (err) all[f] = err
    }
    setErrors(all)
    setTouched(Object.fromEntries(ORDER.map(f => [f, true])))
    const firstBad = ORDER.find(f => all[f])
    if (firstBad) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(id(firstBad))}`)?.focus()
      return
    }

    setStatus('loading')
    setServerError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.name,
          business: values.business,
          trade: values.trade,
          phone: values.phone,
          email: values.email,
          website: values.website,
          message: values.message,
          company: values.company,
          path: window.location.pathname,
          // Only attach the session id when the visitor has already opted into
          // analytics — a form submission shouldn't itself create a tracking id.
          sessionId: hasAnalyticsConsent() ? getSessionId() : undefined,
        }),
      })
      if (res.ok) {
        setStatus('success')
        return
      }
      const data: unknown = await res.json().catch(() => null)
      const msg = data && typeof data === 'object' && 'error' in data && typeof data.error === 'string' ? data.error : null
      setServerError(res.status === 429 || res.status === 400 ? msg : null)
      setStatus('error')
    } catch {
      setServerError(null)
      setStatus('error')
    }
  }

  const fieldProps = (f: FieldName, required = false) => ({
    id: id(f),
    name: f,
    value: values[f],
    required,
    'aria-required': required || undefined,
    'aria-invalid': errors[f] ? true : undefined,
    'aria-describedby': errors[f] ? id(`${f}-err`) : undefined,
    onBlur: () => blur(f),
    className: 'af-input',
  })

  const errorText = (f: FieldName) =>
    errors[f] ? (
      <p id={id(`${f}-err`)} className="af-error">{errors[f]}</p>
    ) : null

  const anim = reduce
    ? { initial: false as const, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } }

  return (
    <div className="af-root">
      <style href="na-audit-form" precedence="default">{CSS_TEXT}</style>
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <motion.div
            key="success"
            {...anim}
            transition={{ duration: 0.35 }}
            role="status"
            aria-live="polite"
            className="af-success"
          >
            <span className="af-success__icon" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </span>
            <h3 className="af-title">Got it — we’ll call you within one business day to book your audit.</h3>
            <p className="af-intro">
              Can’t wait? Call us on{' '}
              <a href={biz.phoneHref} className="af-link">{biz.phoneDisplay}</a> ({biz.hours}).
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            {...anim}
            transition={{ duration: 0.35 }}
            onSubmit={handleSubmit}
            noValidate
            aria-describedby={title ? id('intro') : undefined}
          >
            {title && (
              <div className="af-head">
                <h3 className="af-title">{title}</h3>
                {intro && <p id={id('intro')} className="af-intro">{intro}</p>}
              </div>
            )}

            {/* Honeypot — hidden from users & assistive tech; bots fill it and get silently dropped server-side. */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={values.company}
              onChange={e => update('company', e.target.value)}
              className="af-honeypot"
            />

            <div className="af-grid">
              <div className="af-field">
                <label htmlFor={id('name')} className="af-label">Your name <span aria-hidden="true">*</span></label>
                <input type="text" autoComplete="name" placeholder="e.g. Dave Singh"
                  {...fieldProps('name', true)} onChange={e => update('name', e.target.value)} />
                {errorText('name')}
              </div>

              <div className="af-field">
                <label htmlFor={id('business')} className="af-label">Business name <span aria-hidden="true">*</span></label>
                <input type="text" autoComplete="organization" placeholder="e.g. Singh Plumbing"
                  {...fieldProps('business', true)} onChange={e => update('business', e.target.value)} />
                {errorText('business')}
              </div>

              <div className="af-field">
                <label htmlFor={id('trade')} className="af-label">Your trade <span aria-hidden="true">*</span></label>
                <div className="af-select-wrap">
                  <select {...fieldProps('trade', true)} onChange={e => update('trade', e.target.value)}>
                    <option value="">Choose one…</option>
                    {trades.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  <svg className="af-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
                {errorText('trade')}
              </div>

              <div className="af-field">
                <label htmlFor={id('phone')} className="af-label">Phone <span aria-hidden="true">*</span></label>
                <input type="tel" inputMode="tel" autoComplete="tel" placeholder="604-555-0123"
                  {...fieldProps('phone', true)} onChange={e => update('phone', e.target.value)} />
                {errorText('phone')}
              </div>

              <div className="af-field">
                <label htmlFor={id('email')} className="af-label">Email <span className="af-optional">(optional)</span></label>
                <input type="email" inputMode="email" autoComplete="email" placeholder="you@yourbusiness.ca"
                  {...fieldProps('email')} onChange={e => update('email', e.target.value)} />
                {errorText('email')}
              </div>

              <div className="af-field">
                <label htmlFor={id('website')} className="af-label">Website <span className="af-optional">(optional)</span></label>
                <input type="text" inputMode="url" autoComplete="url" placeholder="yourbusiness.ca"
                  {...fieldProps('website')} onChange={e => update('website', e.target.value)} />
              </div>

              <div className="af-field af-field--full">
                <label htmlFor={id('message')} className="af-label">Anything we should know? <span className="af-optional">(optional)</span></label>
                <textarea rows={3} placeholder="e.g. Best time to call, areas you cover, what's bugging you most…"
                  {...fieldProps('message')} maxLength={5000} onChange={e => update('message', e.target.value)} />
              </div>
            </div>

            <div aria-live="polite">
              {status === 'error' && (
                <div className="af-alert" role="alert">
                  <strong>{serverError ?? 'Sorry — that didn’t send.'}</strong>{' '}
                  {serverError ? 'Or ' : 'Please try again, or '}call us on{' '}
                  <a href={biz.phoneHref} className="af-link">{biz.phoneDisplay}</a> or email{' '}
                  <a href={`mailto:${biz.email}`} className="af-link">{biz.email}</a>.
                </div>
              )}
            </div>

            <PillButton
              type="submit"
              variant="primary"
              size="lg"
              block
              arrow={status !== 'loading'}
              disabled={status === 'loading'}
              aria-busy={status === 'loading' || undefined}
            >
              {status === 'loading' ? 'Sending…' : 'Get my free audit'}
            </PillButton>

            <p className="af-fine">
              No obligation. We only use your details to contact you about your audit.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

// Scoped styles (tokens only; the error colour is defined here per theme so it keeps 4.5:1).
const CSS_TEXT = `
.af-root { --af-error: #B42318; --af-error-bg: rgba(180,35,24,0.07); color: var(--na-text); }
.dark .af-root { --af-error: #FF9B8F; --af-error-bg: rgba(255,155,143,0.10); }
.af-root form { display: flex; flex-direction: column; gap: 20px; }
.af-head { display: flex; flex-direction: column; gap: 6px; }
.af-title { font-family: var(--na-font-display); font-weight: 500; font-size: clamp(22px, 2.4vw, 28px); line-height: 1.12; letter-spacing: -0.03em; }
.af-intro { font-size: 15px; color: var(--na-muted); line-height: 1.55; }
.af-grid { display: grid; grid-template-columns: 1fr; gap: 16px; }
@media (min-width: 640px) { .af-grid { grid-template-columns: 1fr 1fr; } .af-field--full { grid-column: 1 / -1; } }
.af-field { display: flex; flex-direction: column; gap: 7px; min-width: 0; }
.af-label { font-size: 14px; font-weight: 500; color: var(--na-text); }
.af-label span[aria-hidden] { color: var(--na-accent); }
.af-optional { color: var(--na-muted); font-weight: 400; }
.af-input {
  width: 100%; min-height: 52px; padding: 13px 16px;
  font: inherit; font-size: 16px; line-height: 1.4; color: var(--na-text);
  background: var(--na-bg); border: 1px solid var(--na-border-mid); border-radius: 14px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  -webkit-appearance: none; appearance: none;
}
.af-input::placeholder { color: var(--na-muted); opacity: 0.75; }
.af-input:hover { border-color: var(--na-muted); }
.af-input:focus { outline: none; border-color: var(--na-accent); box-shadow: 0 0 0 3px var(--na-accent-dim); background: var(--na-card); }
.af-input:focus-visible { outline: 2px solid var(--na-accent); outline-offset: 1px; }
.af-input[aria-invalid='true'] { border-color: var(--af-error); }
.af-input[aria-invalid='true']:focus { box-shadow: 0 0 0 3px var(--af-error-bg); }
textarea.af-input { resize: vertical; min-height: 96px; }
.af-select-wrap { position: relative; }
.af-select-wrap select { padding-right: 44px; cursor: pointer; }
.af-chevron { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: var(--na-muted); pointer-events: none; }
.af-error { font-size: 13.5px; color: var(--af-error); font-weight: 500; }
.af-alert { font-size: 14.5px; line-height: 1.55; color: var(--na-text); background: var(--af-error-bg); border: 1px solid var(--af-error); border-radius: 14px; padding: 14px 16px; }
.af-link { color: var(--na-accent); font-weight: 600; text-decoration: underline; text-underline-offset: 3px; }
.af-fine { font-size: 13px; color: var(--na-muted); text-align: center; }
.af-honeypot { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; border: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; }
.af-success { display: flex; flex-direction: column; align-items: flex-start; gap: 14px; padding: 12px 0; }
.af-success__icon { display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; border-radius: 999px; background: var(--na-cta); color: var(--na-on-cta); }
`
