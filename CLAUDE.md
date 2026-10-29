# NodeAxis — Project Context

## What this is
Website for "NodeAxis" — since 2026-10-28 (branch `trades-site`) positioned as the local tech partner for Surrey, BC trades ("More calls. More 5-star reviews. Less paperwork."). Brief: `docs/plans/2026-10-28-trades-site-brief.md`; all copy/prices live in `lib/offer.ts`; UI primitives in `components/ui/`. Light (cream) default with theme toggle, calm motion. The old dark agency site is preserved at tag `v1-agency-site` / branch `legacy/agency-site`. Next.js 16 App Router, TypeScript, Tailwind 4, Framer Motion.

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
| `/` | `app/page.tsx` (sections in `components/home/`) |
| `/audit` | `app/audit/page.tsx` — main conversion page |
| `/services` | `app/services/page.tsx` |
| `/work` | `app/work/page.tsx` — embeds `/demo/trades` |
| `/about` | `app/about/page.tsx` |
| `/contact` | `app/contact/page.tsx` |
| `/blog`, `/blog/[slug]` | `app/blog/**`, posts in `lib/posts.ts` |
| `/privacy`, `/terms` | rendered via `components/LegalShell.tsx` |
| `/demo/[slug]` | route handler; `trades` = personalized demo (`lib/trades-demo.template.ts`, see `demos/README.md`) |
| `/projects/[slug]` | permanent redirect to `/work` (old portfolio) |

Each route has its own `layout.tsx` for per-page metadata/SEO.

## Components
- `components/ui/` — design primitives (Panel, Card, SectionTag, PillButton, DisplayHeading, ImageChip). Use these for new pages.
- `components/home/` — homepage sections (Hero animates on mount — see rules below).
- `Navbar.tsx` (full-screen dark mobile menu), `Footer.tsx`, `AuditForm.tsx` (shared by /audit and /contact), `CookieConsent.tsx`, `AnalyticsGate.tsx`, `Tracker.tsx`, `Tracked.tsx` (wrap homepage sections for engagement analytics).

## Key lib files
- `lib/offer.ts` — all copy, prices, tiers, FAQ, business info
- `lib/tracking.ts` — consent helpers incl. `useAnalyticsConsent()` hook
- `lib/theme.tsx` — ThemeContext, ThemeProvider, useTheme hook (light default, persists to localStorage key `nodeaxis-theme`)

## Theme system
- CSS vars: `--na-*` for normal sections, `--na-inv-*` for always-dark panels (Footer, mobile menu, dark cards)
- Default: light (`.dark` class added only when localStorage says dark, by anti-flash script in layout `<head>`)
- Toggle: sun/moon button in Navbar, calls `useTheme().toggle()`
- Anti-flash: inline `<script>` in layout reads localStorage before React hydrates

## Brand assets (`public/`)
- `icon.svg` — favicon/meta (filled, not stroke)

## Critical rules (burned in from past bugs)
1. **Never gate Hero visibility behind a `ready` prop.** Hero must animate on mount unconditionally. Past bug: `ready` wasn't set in time on mobile, causing a blank screen.
2. **Never rely on `onExitComplete`** to signal completion of an entry animation — use a `setTimeout` matched to the duration. It's unreliable on mobile browsers. (The old IntroLoader was removed on 2026-10-28.)
3. **JSX whitespace around `{expressions}` can get dropped** in long text lines (seen on /about: "Surreytrades"). For sentences with interpolated values, prefer a template string.

## Current status (as of 2026-07-09)
**Done:**
- All pages and routes built
- All components built and integrated
- IntroLoader + Hero mobile blank-screen bug fixed
- SEO metadata per page
- Slug-based project detail pages
- Custom cursor, magnetic button, marquee
- Full NodeAxis rebrand (was Vantage Labs)
- Night/day theme toggle with CSS variable system

**Still pending:**
- Calendly embed on contact page
- Custom domain (not connected)
- Real project images/media (placeholders only)
- Real device testing on iOS Safari and Android Chrome

**Analytics & admin dashboard (live):**
- Contact form (`app/api/contact/route.ts`) forwards to Formspree AND persists every submission to the `Lead` table — first-party record survives even if Formspree hiccups.
- Vercel Analytics (consent-gated) + first-party visit/location/section-engagement tracking + lead capture are all live against a provisioned Neon Postgres (`DATABASE_URL`/`ADMIN_PASSWORD`/`SESSION_SECRET` are set, migrations applied). See `docs/plans/2026-07-08-first-party-analytics-design.md` for the original design and `DEVLOG.md` (2026-07-09 entry) for the hardening/expansion pass: dated session cookie with expiry (`lib/session.ts`), rate-limited admin login (`lib/rateLimit.ts`), date-range/page-filterable/paginated dashboard, device/browser breakdown, CSV export (`app/api/admin/export/*`).
- Dashboard: `/admin/analytics` (password-gated via `/admin/login`, protected by `proxy.ts`).

## Dev log
Full session-by-session history is in `DEVLOG.md`. Always update it at the end of every conversation.
