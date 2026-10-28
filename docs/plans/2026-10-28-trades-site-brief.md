# Trades site rebuild — team brief (2026-10-28)

Branch: `trades-site`. The old agency site is preserved at tag `v1-agency-site` / branch `legacy/agency-site`. Do NOT commit — the coordinator reviews and commits.

## Positioning
NodeAxis = the local tech partner for **Surrey, BC trades** (plumbing, HVAC, roofing, electrical, landscaping, contractors).
Promise: **"More calls. More 5-star reviews. Less paperwork."** Main CTA everywhere: **"Get your free local audit" → `/audit`**.
Audience: busy owner-operators, often reading on a phone between jobs. Plain language, no jargon ("AI", "systems", "stack", "solutions" are banned in headlines). Local signals everywhere: Surrey, "we meet you in person", phone number.

All copy, tiers, prices, FAQs, stats come from **`lib/offer.ts`** — import from it, never hard-code duplicates. You may ADD fields there if needed (coordinate by keeping additions small and additive).

## Visual direction (from user's references)
Synthesis of three references: warm editorial travel site, Muse.Studio, Lumóra.
- **Canvas:** warm cream page `#F3EEE6`; content sits in **large rounded panels** (radius 28–32px) inset from the viewport edge (~12–16px gutter), like cards on a table. White `#FFFFFF` and soft grey `#ECE8E1` cards inside.
- **Ink:** near-black `#121316` text; secondary text `#6B6A66`; big statement paragraphs use a two-tone effect (first half ink, second half muted grey — Lumóra "About" style).
- **Accent:** one vivid electric blue `#2E3BFF` for pill CTAs, active states, small icons. Used sparingly.
- **Dark panels:** `#121316` for footer, mobile menu, one featured stat/offer card (Lumóra bento + travel dark menu).
- **Soft color blur:** occasional blurred blue/peach gradient blob behind CTA section (Muse) — subtle.
- **Type:** display = **Inter Tight** (Google font) 500–600, tight tracking (-0.04em), huge sizes (hero clamp ~56→140px), tight line-height 0.95. Body = Inter 400/500, 15–17px. Small section tags in uppercase mono-ish style: `[01] THE PROBLEM`.
- **Signature moves:**
  1. Headline with **inline rounded photo chips** between words (Muse) — e.g. "More calls. [photo] More 5-star reviews. [photo] Less paperwork."
  2. **Full-bleed rounded hero photo** with a **floating white info card** (travel ref) — e.g. a mini "New review ★★★★★" or "Missed call → texted back in 8s" card.
  3. **Bento stat grid** mixing dark card, light card, photo card (Lumóra) — fed by `localStats`.
  4. **4-step process** row with numbered cards (Lumóra "Our process").
  5. **Dark footer** with giant "NodeAxis" wordmark, phone, email, service area.
  6. **Full-screen dark menu** with huge stacked links on mobile (travel ref).
- **Pills:** all buttons are pills; primary = accent bg + white text; secondary = white bg + 1px border.
- **Motion:** calm. Fade/slide-up on scroll (existing `lib/animations.ts`), word reveal on hero headline, gentle hover lifts. No custom cursor, no IntroLoader on the new homepage, no magnetic buttons. Respect `prefers-reduced-motion`.
- **Photos:** real photography only (no code/desk illustrations). Sourced into `public/images/` (see Photo agent). Always `next/image` with alt text.
- **Light-first.** Keep the theme toggle working, but default is light. Dark mode = same layout with ink/cream swapped (tokens only).

## Page map
| Route | Purpose |
|---|---|
| `/` | Home: hero → problems → offer tiers → how it works → local proof/stats → demo teaser → FAQ → CTA |
| `/audit` | NEW. Free local audit request form (primary conversion page) |
| `/services` | Offer detail: the 4 tiers in depth + "what's included" + FAQ |
| `/work` | "See it in action": trades demo showcase |
| `/contact` | Simple contact: phone, email, service area + the same short form |
| `/about`, `/blog`, `/privacy`, `/terms`, `/admin/*`, `/api/*` | Keep working; restyle only via shared tokens |

## Form → lead capture
`/audit` and `/contact` use one shared component `components/AuditForm.tsx`. Fields: name, business name, trade (select from `trades`), phone, email (optional if phone given), website (optional), message (optional). POST to existing `/api/contact`. Map into existing `Lead` columns WITHOUT a DB migration: `service` = trade, `budget` = "" , `message` = composed text including business, phone, website and the message. Keep honeypot `company`, rate limit, Formspree forwarding, first-party storage.

## Rules
- Next.js 16 / React 19 / Tailwind 4 — check existing patterns before using APIs; this repo uses inline style objects + CSS vars heavily; new code may use Tailwind classes or inline styles but must use the CSS variables, not raw hex.
- Keep `components/Tracked.tsx` wrappers on homepage sections (section engagement analytics).
- Don't delete old components/files — leave unused ones in place (cleanup later).
- Accessibility: semantic headings, labels on inputs, 4.5:1 contrast, focus-visible states, keyboard nav for menu.
- Must pass `npm run build` and `npm run lint` for your files.

## File ownership (avoid collisions)
| Agent | Owns |
|---|---|
| Foundation | `app/globals.css`, `app/layout.tsx` (fonts, metadata, JSON-LD, theme default), `lib/theme.tsx`, `components/ui/*` (new primitives), `components/Navbar.tsx`, `components/Footer.tsx`, `components/CookieConsent.tsx` (restyle only) |
| Photo | `public/images/*` + `public/images/CREDITS.md` |
| Home | `app/page.tsx`, new `components/home/*` |
| Pages | `app/audit/*` (new), `app/services/*`, `app/contact/*`, `app/work/*`, `components/AuditForm.tsx`, `app/api/contact/route.ts`, `app/sitemap.ts`, per-route `layout.tsx` metadata for those routes |
| Demo | `demos/*`, `lib/trades-demo.template.ts` (new), `app/demo/[slug]/route.ts` |
| QA | read-everything; fixes only for build/lint/a11y breakages, reported back |
