# Vantage Labs — Dev Log

A running record of every session: what was built, what broke, what was fixed, and what's still open. Update this at the end of every conversation.

---

## Format

```
### [YYYY-MM-DD] — Session summary title
**Changes:** bullet list of what was built or modified
**Bugs encountered:** describe the problem and which file/component
**Fixes applied:** what solved it
**Still open / TODO:** anything unresolved carried forward
```

---

## Sessions

---

### [2026-06-08] — Initial Build: Full Site Structure

**Changes:**
- Created full Next.js project at `projects/Agency/vantage-labs/`
- Built all main components: `Navbar`, `Hero`, `About`, `Work`, `Services`, `Process`, `Why`, `CTA`, `Marquee`, `Footer`, `Cursor`, `FAQ`, `Testimonials`
- Built `IntroLoader` with animated text reveal on entry
- Built `MagneticButton` for interactive CTA hover effect
- Built custom cursor (`Cursor.tsx`) that follows mouse with lag
- Set up page routes: `/` (home), `/services`, `/work`, `/contact`, `/projects/[slug]`
- Added per-page `layout.tsx` files for metadata SEO
- Built `lib/projects.ts` with 3 project entries (slug-based routing)
- Built `app/projects/[slug]/page.tsx` for individual project detail pages
- Created brand SVGs: `vantage-labs-mark.svg`, `vantage-labs-logo.svg`, `icon.svg`
- Created `PROJECT_STATUS.md`, `SEO_CHECKLIST.md`, `IMPROVEMENTS.md`
- Set up sound utility (`lib/sound.ts`) — ambient/interaction audio hooks

**Bugs encountered:**
- `Work.tsx` had repeated edit cycles — likely layout/grid alignment issues during build
- `IntroLoader` exit timing was misaligned; Hero content appeared too early or too late
- Navbar active state and route highlighting needed multiple passes

**Fixes applied:**
- `IntroLoader` fixed to use `setTimeout` instead of `onExitComplete` for reliable Hero handoff
- Hero animated on mount directly (no `ready` prop gate) to avoid blank screen on mobile

**Still open / TODO:**
- Contact form backend — no submission handler yet (Resend / EmailJS / Formspree)
- Calendly embed on contact page
- Custom domain — not yet connected
- Real project images/media not added (placeholders only)
- No analytics (Vercel Analytics / GA4)

---

### [2026-06-09] — Mobile Fix: Hero Blank Screen

**Changes:**
- Reworked `Hero.tsx` — removed `ready` prop gate that blocked visibility on mobile
- Reworked `IntroLoader.tsx` — replaced `onExitComplete` callback with `setTimeout` to trigger Hero reveal
- Updated `app/page.tsx` to pass state correctly between IntroLoader → Hero
- Applied dark mode / global CSS polish across multiple components

**Bugs encountered:**
- **Critical (mobile):** Hero section was completely blank on mobile after IntroLoader finished
  - Root cause: Hero was gated behind a `ready` boolean prop that wasn't being set in time due to `onExitComplete` not firing reliably on mobile browsers
  - Affected file: `Hero.tsx`, `IntroLoader.tsx`, `app/page.tsx`

**Fixes applied:**
- Hero now animates on mount unconditionally — no `ready` prop
- IntroLoader uses `setTimeout` (matched to animation duration) to signal completion
- Result: Hero visible immediately after loader exits on both desktop and mobile

**Still open / TODO:**
- Contact form (backend) — still pending
- Calendly embed — still pending
- Domain — still pending
- Test on real iOS Safari and Android Chrome (not just desktop emulation)

---

### [2026-06-09] — Dev Log Created (this session)

**Changes:**
- Created `DEVLOG.md` (this file) to track all future changes, bugs, and fixes
- Saved feedback memory to enforce updating this log every conversation

**Bugs encountered:** none

**Fixes applied:** n/a

**Still open / TODO:**
- All items carried from previous sessions (see above)

---

---

### [2026-06-09] — Mobile Responsiveness Audit & Fixes

**Changes:**
- `Testimonials.tsx` — removed `gridTemplateColumns: 'repeat(3, 1fr)'` from inline style (was overriding `grid-cols-1 md:grid-cols-3`); added `.testimonial-card` class
- `About.tsx` — removed 3 inline `gridTemplateColumns` overrides (top row, pillars, stats); added `.pillar-card` and `.stat-cell` classes; stats grid now uses `grid-cols-1 sm:grid-cols-3`
- `Why.tsx` — removed `gridTemplateColumns: '1fr 2fr'` and `gap: 80` from inline style; gap now handled via Tailwind `gap-8 md:gap-20`
- `CTA.tsx` — removed `gridTemplateColumns: '1fr auto'`, `gap: 80`, `textAlign: 'right'`, `marginLeft: 'auto'`, and `justifyContent: 'flex-end'` from inline styles; Tailwind responsive classes (`text-left md:text-right`, `justify-start md:justify-end`, `mr-0 md:ml-auto`) now work correctly
- `Footer.tsx` — removed `gridTemplateColumns: '1fr auto'` from inline style; Tailwind `grid-cols-1 md:grid-cols-[1fr_auto]` now takes effect
- `globals.css` — added `@media (max-width: 767px)` section with overrides for `.testimonial-card`, `.pillar-card`, `.stat-cell` (uniform padding, no side borders), `.svc-row:nth-child(odd/even)` (no extra border/padding in 1-col), `.project-row` (tighter gap)
- `app/services/page.tsx` — replaced the 3-column `1fr 1px 1fr` add-ons grid (non-responsive) with a single flat `flex-col` list that works on all screen sizes

**Bugs encountered:**
- Root cause was pattern: `style={{ gridTemplateColumns: 'Xfr Yfr' }}` combined with `className="grid-cols-1 md:grid-cols-N"`. Inline styles always win over CSS classes regardless of media query, so every grid was always its desktop layout on mobile.
- CTA right column had `textAlign: 'right'`, `marginLeft: 'auto'`, and `justifyContent: 'flex-end'` in inline styles, overriding the Tailwind `text-left`, `justify-start`, `mr-0` mobile classes.
- Services add-ons used a permanent `1fr 1px 1fr` 2-column grid with no responsive fallback.

**Fixes applied:** All inline `gridTemplateColumns` overrides removed; responsive layout now fully delegated to Tailwind classes + mobile CSS overrides in `globals.css`.

**Still open / TODO:**
- Test on real iOS Safari and Android Chrome
- Contact form backend (Resend / EmailJS / Formspree)
- Calendly embed on /contact
- Domain connection
- Real project images/media

---

## Open Issues Tracker

| # | Issue | Severity | Status | Notes |
|---|-------|----------|--------|-------|
| 1 | Contact form has no backend | High | Open | Needs Resend / EmailJS / Formspree |
| 2 | Calendly not embedded | Medium | Open | Goes on /contact page |
| 3 | Domain not connected | High | Open | Deployment pending |
| 4 | No real project images | Medium | Open | Placeholders used in lib/projects.ts |
| 5 | No analytics | Low | Open | Vercel Analytics or GA4 |
| 6 | Mobile Safari / Android Chrome untested | Medium | Open | Test on real devices after responsiveness fix |
