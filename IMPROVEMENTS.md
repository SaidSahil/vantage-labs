# Vantage Labs — Improvements Checklist

> Second-pass audit · UI/UX Pro Max + Frontend Design · June 2026
> Severity order: Critical → High → Medium → Low → Design → Nice to Have

---

## CRITICAL — Fix Before Any Traffic Hits the Site

- [x] **[C1] Wire the Book a Call button** — `CTA.tsx:133` currently fires `Calendly.initPopupWidget()` which silently does nothing (Calendly script is never loaded). Replace with a direct `<a href="https://calendly.com/nodeaxis" target="_blank" rel="noopener noreferrer">` link.

- [x] **[C2] Fix Services mobile grid** — `Services.tsx:116` has inline `gridTemplateColumns: 'repeat(2, 1fr)'` that overrides Tailwind's `grid-cols-1` on mobile. Remove the inline style entirely and use `className="grid grid-cols-1 sm:grid-cols-2"`.

- [x] **[C3] Add skip-to-content link** — No way for keyboard/screen reader users to skip the navbar. Add `<a href="#main-content">Skip to content</a>` as the first element in `layout.tsx`, styled with `sr-only focus:not-sr-only`.

---

## HIGH — Fix Before Launch

- [x] **[H1] Fix Why section hover layout jump** — `globals.css:193` — `.why-item:hover` shifts `padding` and `margin`, causing a reflow jitter. Move the padding/margin to the base `.why-item` state and animate only `background` on hover.

- [x] **[H2] Fix Navbar active state mapping** — `Navbar.tsx:42–48` — `process`, `why`, and `about` sections all incorrectly activate the "Services" nav link. Remap them to `''` (no active state) or their own anchors.

- [x] **[H3] Fix body text contrast** — `#8A8A8E` on `#FAFAF8` is ~3.2:1, failing WCAG AA (requires 4.5:1). Affects hero subtext, service descriptions, Why descriptions, About pillars — nearly all paragraph text. Change to `#6B6B70` minimum.

- [x] **[H4] Replace iframe hover previews with screenshots** — `Work.tsx:83` — Live iframes fail silently on CSP, auth walls, HTTPS mismatch, and slow networks. Replace with static `<Image>` screenshots. Faster, never broken, and more visually controlled.

- [x] **[H5] Expand the Footer** — `Footer.tsx` has one link (email). Add: Work / Services / Contact nav links + LinkedIn (if active) + back-to-top. Users who scroll to the bottom need somewhere to go.

- [x] **[H6] Verify email address** — `CTA.tsx:143` links to `mailto:info@nodeaxis.ca`. Confirm this mailbox is active. If the domain isn't connected yet, this is a broken CTA for every visitor.

- [x] **[H7] Build the `/contact` page** — Linked from navbar "Start a Project" and Services header. Currently a stub. Add a Formspree form: Name, Email, Project type (dropdown), Budget range. Send to `sahil.sodais@gmail.com`.

- [x] **[H8] Build the `/services` page** — Linked from the Services section header "Full Pricing". Currently a stub. Expand the 4 service cards with fuller detail, FAQs, and a CTA.

---

## MEDIUM — Fix Within First Week Live

- [x] **[M1] Add `aria-label` to project rows** — `Work.tsx:159` — The `<Link>` wrapping each project row has no descriptive label for screen readers. Add `aria-label={`View ${project.name} project`}`.

- [x] **[M2] Slow down hero animation** — `Hero.tsx:39` — Word reveal uses `duration: 0.8` per word. The last word on line 2 finishes at ~1.2s — sluggish on repeat visits. Reduce to `duration: 0.55`.

- [x] **[M3] Fix marquee reduced-motion** — `globals.css` — The `prefers-reduced-motion` block sets `animation-duration: 0.001ms` which makes the ticker flash through instantly. Change to `animation-play-state: paused` for the `.ticker-track` under reduced-motion.

- [x] **[M4] Make Process cards touch-accessible** — `Process.tsx` — Step cards only activate on `onMouseEnter`. Touch users never see the active state. Set the first card active by default on mobile, or add `onClick` toggle.

- [x] **[M5] Remove MagneticButton from text links** — `Hero.tsx:199` — Magnetic pull on "See Our Work" (a plain text link) is disproportionate and unexpected. Reserve magnetic effect for button elements only (navbar CTA pill is fine).

- [x] **[M6] Unify icon stroke width** — Mixed across components: `strokeWidth={2}` (ArrowRight), `strokeWidth={1.5}` (Menu/X), `strokeWidth={1.75}` (Process icons). Set `strokeWidth={1.5}` globally on all Lucide icons.

- [ ] **[M7] Replace About avatar with real photo** — `About.tsx:127` — Gradient circle with "A" initial undermines the personal trust the copy is trying to build ("I started Vantage Labs…"). A real headshot — even casual — converts better than any designed placeholder.

- [x] **[M8] Add testimonials section** — No social proof exists anywhere. Add 2–3 short client quotes (name + business type) between Work and Services, or directly after Work. Even a single real quote with a name moves conversion meaningfully.

- [x] **[M9] Fix hero subtext max-width on mobile** — `Hero.tsx:195` — `maxWidth: 380` on the subtext paragraph leaves ~4px breathing room on a 375px screen. Remove on mobile: use `className="sm:max-w-[380px]"` and let it fill on smaller screens.

- [x] **[M10] Add outcome lines to project rows** — Each project in `Work.tsx` shows a name and tags but no result. Add one sentence per project: e.g. *"Helped secure 3 new enterprise contracts after launch."* Even approximate outcomes build more trust than tags alone.

---

## LOW — Polish Pass

- [x] **[L1] Guard `scroll-behavior: smooth` with reduced-motion** — `globals.css:32` — Wrap in `@media (prefers-reduced-motion: no-preference)` so vestibular disorder users aren't affected.

- [x] **[L2] Verify `<html lang="en-CA">`** — Confirm `layout.tsx` sets the correct lang attribute for Canadian English. Required for screen readers.

- [x] **[L3] Define a z-index token scale** — Current values are ad hoc: `50`, `100`, `200`, `9998`, `9999`. Define a named scale in `globals.css` to prevent silent breakage when adding new layers.

- [x] **[L4] Populate Marquee with specific content** — If the ticker shows generic "Web Design · Development" it adds no value. Use specific differentiators: *"Starting at $399 · 2-week delivery · 100% Custom Code · No Templates · BC-based"*

- [ ] **[L5] Add outcome stats to About** — Current stats: `~2 weeks / $399 / 100%`. Strong. Consider adding a 4th: *"Avg. client ROI"* or *"Repeat clients"* when you have real data to back it.

---

## DESIGN UPGRADES — Visual Quality Lift

- [x] **[D1] Add Syne as the display font** — Inter at 140px weight 800 reads as generic. Add `Syne` (free, Google Fonts, weight 700/800) for all `h1`/`h2` headings only. Keep Inter for everything else. This is the single highest-impact change for perceived agency quality.

- [x] **[D2] Rewrite hero headline copy** — *"We build digital that works."* — "digital" as a standalone noun is 2018 agency jargon. Replace with: *"We build websites that work."* — direct, unpretentious, exactly what SMB clients search for.

- [x] **[D3] Strengthen the CTA accent color** — `#3D5A80` is too muted for a primary CTA button. Options: (A) add warm amber `#C8873A` as CTA-only background color, or (B) use `#2A4870` (deeper slate) for the button and `#3D5A80` as hover. The current white-on-charcoal button style is fine but needs a stronger visual signal.

- [x] **[D4] Fix IntroLoader animation timing** — `IntroLoader.tsx` — Char-by-char "VANTAGE LABS" reveal finishes at ~0.745s, after the 600ms exit has started. Characters are still animating in while the screen slides out. Replace with a single fade-in for the wordmark: `initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.3 }}`.

- [x] **[D5] Remove the hero top-right decorative SVG** — `Hero.tsx:70–86` — The overlapping rectangles at `opacity: 0.07, rotate(15deg)` are arbitrary shapes disconnected from the brand. Remove this. Keep the bottom-left circle (it earns its place). If you want a hero decorative element, use a ghost-scale version of the VMark.

- [x] **[D6] Remove section counter labels** — "01 — Selected Work", "02 — What We Build" etc. are an editorial/studio convention that SMB clients don't scan by. Drop the `01 —` prefix. Keep the label text in the same style: "Selected Work", "What We Build". Cleaner, clearer.

- [x] **[D7] Redesign the custom cursor** — The 10px dot → 40px outline ring is the most common custom cursor pattern on developer sites. Two alternatives: (A) use the VMark shape as the cursor — 12×12 default, scales to 32×32 filled in `#3D5A80` on hover; (B) a simple crosshair `+` in 1px strokes, fills to a dot on hover — signals precision to match "Precision Built" in the Why section.

- [x] **[D8] Lighten the bottom-page dark rhythm** — Services (dark) → Process (light) → Why (light) → About (light) → CTA (dark) → Footer (dark). Three dark sections at the bottom creates end-of-page heaviness. Either: make the CTA light with a dark headline, or separate Footer from CTA visually by making Footer a minimal 1-row strip on `#FAFAF8`.

---

## NICE TO HAVE — After Core Items

- [x] Add a **FAQ section** targeting SMB objections: *"Do I own the site?", "How long does it take?", "What if I need changes later?", "Do you do ecommerce?"*
- [ ] Add a **Results / Case Study** block to at least one project detail page — a before/after metric, even approximate
- [x] Add **LinkedIn link** to Footer for credibility signal
- [x] Add **"Most Popular" badge** to the Websites & Landing Pages service card
- [ ] **SEO pass** — meta titles, descriptions, Open Graph per page. Do last, once content is stable.
- [ ] **Domain connection** — nodeaxis.ca → Vercel. Confirm the `info@nodeaxis.ca` mailbox is active.

---

## What's Already Good — Don't Touch

- Word-split hero animation — distinctive, well-executed
- Dark/light section alternation rhythm (Services section placement is correct)
- Process section — 5 cards, connector bar, outcome-focused subtitles — genuinely strong
- Mobile menu full-screen overlay — correct UX, good touch targets
- `prefers-reduced-motion` CSS block already in `globals.css` (just needs marquee fix)
- `focus-visible` styles set correctly
- `cursor: none` disabled on mobile — correct
- Noise texture overlay — subtle, premium feel, right opacity
- Stats row in About (`~2 weeks / $399 / 100% custom`) — strong differentiators, well-placed
- VMark logo — distinctive brand mark, used consistently
