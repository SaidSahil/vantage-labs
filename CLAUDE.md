# Vantage Labs — Project Context

## What this is
A Next.js 14 agency website for "Vantage Labs." Dark, high-motion, premium feel. App Router. TypeScript. Tailwind CSS. Framer Motion for all animations.

## Project root
`c:\Users\Said Sahil\Desktop\Project_1\P\projects\Agency\vantage-labs\`

## Stack
- **Framework:** Next.js 14 (App Router) — `app/` directory
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Package manager:** npm

## Page routes
| Route | File |
|---|---|
| `/` | `app/page.tsx` |
| `/services` | `app/services/page.tsx` |
| `/work` | `app/work/page.tsx` |
| `/contact` | `app/contact/page.tsx` |
| `/projects/[slug]` | `app/projects/[slug]/page.tsx` |

Each route has its own `layout.tsx` for per-page metadata/SEO.

## Components (all in `components/`)
- `Navbar.tsx` — top nav, route-aware active state
- `Hero.tsx` — landing hero, animates on mount (no ready prop — see rules below)
- `IntroLoader.tsx` — entry animation; uses setTimeout to signal completion
- `About.tsx`
- `Work.tsx` — project grid
- `Services.tsx`
- `Process.tsx`
- `Why.tsx`
- `CTA.tsx`
- `Marquee.tsx` — scrolling text ticker
- `Footer.tsx`
- `Cursor.tsx` — custom cursor with mouse-lag follow
- `FAQ.tsx`
- `Testimonials.tsx`
- `MagneticButton.tsx` — hover magnetic pull effect on CTA buttons

## Key lib files
- `lib/projects.ts` — array of 3 project entries with slug-based routing
- `lib/sound.ts` — ambient/interaction audio utilities (not active yet)

## Brand assets (`public/`)
- `vantage-labs-mark.svg` — icon mark
- `vantage-labs-logo.svg` — full wordmark
- `icon.svg` — favicon/meta

## Critical rules (burned in from past bugs)
1. **Never gate Hero visibility behind a `ready` prop.** Hero must animate on mount unconditionally. Past bug: `ready` wasn't set in time on mobile, causing a blank screen.
2. **IntroLoader must use `setTimeout`** (matched to animation duration) to signal completion — not `onExitComplete`. `onExitComplete` is unreliable on mobile browsers.
3. **`app/page.tsx`** wires IntroLoader → Hero state. Keep that handoff clean.

## Current status (as of 2026-06-09)
**Done:**
- All pages and routes built
- All components built and integrated
- IntroLoader + Hero mobile blank-screen bug fixed
- SEO metadata per page
- Slug-based project detail pages
- Custom cursor, magnetic button, marquee

**Still pending:**
- Contact form backend (no submission handler — Resend / EmailJS / Formspree not yet wired)
- Calendly embed on contact page
- Custom domain (not connected)
- Real project images/media (placeholders only)
- Analytics (Vercel Analytics / GA4 not set up)
- Real device testing on iOS Safari and Android Chrome

## Dev log
Full session-by-session history is in `DEVLOG.md`. Always update it at the end of every conversation.
