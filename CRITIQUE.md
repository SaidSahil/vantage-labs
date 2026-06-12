# NodeAxis — Comprehensive UI/UX Critique

**Live site:** `vantage-labs-three.vercel.app` | **Pages reviewed:** Home, Work, Services, Contact, Project Detail pages  
**Date:** 2026-06-11

---

## Perspective 1: Developer + Designer

### Design System — Strong Foundation

The CSS variable system (`--na-*` / `--na-inv-*`) is well-structured and the use of `clamp()` throughout for fluid scaling is exactly right. The easing constants, shared animation variants, and viewport configs centralized in `lib/animations.ts` show mature thinking. The blueprint grid, ghost numbers, and diagonal SVG lines form a recognizable visual language.

**Issues:**

**1. Navbar is copy-pasted three times — a maintenance time bomb.**
The shared `Navbar` component exists at `components/Navbar.tsx`, but `app/services/page.tsx` and `app/contact/page.tsx` each contain their own full inline `<nav>` (~200 lines each). A one-line change to navigation now requires three file edits. This will eventually cause the pages to diverge and introduce bugs.

**2. Project detail pages ignore the theme system entirely.**
`app/projects/[slug]/page.tsx` is hardcoded with `background: '#FAFAF8'`, `color: '#1C1C1E'`, `#8A8A8E`, `#141416`. Switch to light mode and then open a project — it stays dark in the hero and renders a cream-white body regardless of system preference. Every other page respects `--na-*` variables. This one doesn't.

**3. The auto-cycling carousel on the Work page is the worst UX decision on the site.**
`app/work/page.tsx` lines 213–228 — cards cycle every 2.8 seconds automatically. For 8 projects, pagination itself is questionable, but auto-advancing removes the user's sense of control. Someone trying to read a project description or find a specific one will have it snatched away mid-read. The progress bar amplifies this tension instead of reducing it.

**4. "Book a Call" button on the Services page silently does nothing.**
`app/services/page.tsx` lines 1258–1263 calls `window.Calendly.initPopupWidget()`, but the Calendly script is never loaded anywhere. The button appears, is clicked, and nothing happens. There is no error, no fallback, no message. From a conversion standpoint, this is the worst possible failure — it looks broken without explanation.

**5. The `activeHref` scroll detection in the shared Navbar only watches two IDs.**
`components/Navbar.tsx` lines 60–76 — the map only tracks `services` and `cta`. Navigation items Work/Services/Contact in the navbar never get the active dot indicator from scroll position. The inner-page navbars hardcode `active: true` which works, but the shared component's logic is incomplete.

**6. Home Work component uses a fake hover preview; Work page uses real iframes.**
In `components/Work.tsx`, the "floating preview" on hover shows only the project name in a styled box — not an actual preview. On the Work page, projects with a `preview` URL render a real scaled iframe. The inconsistency in approach is jarring and the home preview adds almost no value in its current form.

**7. Contact form endpoint is hardcoded in source.**
`app/contact/page.tsx` line 91 — `https://formspree.io/f/xanyzkov` is committed directly into the source. This exposes the form endpoint publicly. Should be `process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT`.

**8. Project pages are fully client-rendered with no SSR/SSG.**
`'use client'` + `useParams` means `/projects/[slug]` pages are rendered client-side only. Vercel will serve an empty HTML shell to crawlers, and the rich project content (results, tools, descriptions) won't be indexed. For portfolio SEO this is a missed opportunity.

**9. Global `mousemove` listener on every render.**
`components/Work.tsx` lines 29–34 attaches `document.addEventListener('mousemove')` globally, firing on every cursor movement across the entire page, even when the Work section is nowhere near the viewport. Should be scoped to the section element.

### Typography & Visual

- Headline `lineHeight: 0.92` and tight letter-spacing at display sizes is visually strong and intentional
- The ghost numbers (`02`, `03`, `06`) and section labels are a coherent system — keep them
- The word-reveal is used across 4+ pages — it works, but it risks losing distinctiveness with overuse
- Font size `10px` used for metadata labels is close to the WCAG minimum; at muted contrast it may fail for some users

---

## Perspective 2: The Client — "Can I Trust These People With My Business?"

This is the perspective of a business owner in BC who found the site via search or referral and is deciding whether to spend $399–$1,300+.

### First 30 Seconds — Home Hero

The opening is strong. "We build digital that works." is direct. "$399" shown immediately reduces the "is this even affordable for me?" anxiety. "No templates, no page builders" is a clear differentiation claim. The animation and visual craft immediately signals this isn't a freelancer using a Wix template.

**But immediately, three things undermine it:**

**"Est. 2026"** — The company was founded this year. It's right there in the hero metadata. A business owner evaluating whether to trust you with their digital presence does the math: this agency has existed for months. For an SMB owner who has been burned by contractors before, this is a silent alarm. The honest instinct to show it is admirable, but it needs to be contextualized with something that offsets the recency.

**"20+ years combined experience"** appears later in differentiators. Combined. That phrase is agency-speak for "we're new but we've worked elsewhere." Without naming who those people are, where they worked, or linking that experience to a face, it reads as vague padding — and placed next to "Est. 2026" it creates cognitive dissonance rather than resolving it.

**The testimonials are anonymous.** Marcus T., Priya R., Daniel K. — no photos, no last names, no business links, no way to verify. A business owner in 2026 does not find this convincing. It looks like made-up social proof, which is worse than having no testimonials at all. The quotes themselves are good (specific, believable, not over-the-top) but without verification signals they're dismissed.

### Portfolio — The Biggest Trust Gap

On the Work page, a client loads the cards hoping to see what the agency actually built.

**Six of eight project cards show a dark placeholder with the NodeAxis logo.** No screenshot. No thumbnail. No design preview. Just a branded empty state. For a web design agency, this is equivalent to a photographer showing up to a portfolio review with blank frames. The client's natural reaction is: "Are these projects real? Can I see them?"

Only **Team4Security** has a live external URL. All other projects have `externalUrl: null`. On the project detail pages, the pages describe impressive outcomes — "bounce rate dropped from 78% to 31%," "40% increase in reservations," "3 enterprise contracts" — but there are no screenshots, no before/after comparisons, no client photos, and no way to verify the site exists. The claims are specific and plausible, but zero visual proof makes them feel like case study templates filled in with made-up metrics.

**One of the 8 portfolio projects is the agency's own website.** "Vantage Labs" (project #03) is listed as a client project with an outcome: "Our live proof of concept." To a developer this is clever; to a client counting your work history, it means you have 7 real client projects, not 8. And the project links to `https://vantagelabs.ca` — the old brand domain. A new client may wonder: what happened to Vantage Labs? Is NodeAxis also going to rebrand in 6 months?

### Services — Pricing Is the Standout

The services page is the strongest conversion tool on the site. The accordion, tiered pricing ($399/$799/$1,299), the add-on menu, and "50% upfront · 50% on delivery · No hidden fees" are exactly what a cautious buyer needs to see. The payment structure sentence alone probably does more work than any design element on the page.

**But:** the "Book a Call" CTA button is broken (Calendly not loaded). This is the primary conversion action at the bottom of a page a client has scrolled all the way through. It silently fails.

The hero headline on the Services page is "We build what works." — nearly identical to the Home hero ("We build digital that works."). A client who navigated Home → Services sees the same headline twice. It signals that each page wasn't crafted independently.

### Contact — The Best Page on the Site

The contact form is clean, well-labeled, and actually functional. The trust signals on the left ("Response within 24 hours — guaranteed," "No commitment required") are well-placed. The focus states on form fields look professional. The success animation is polished.

**One omission:** there is no Calendly embed on this page. The site advertises "Book a free 30-minute call" everywhere, but the contact page only has a form. A client who wants to talk to a human has to fill out a form and wait. The booking flow is not available at the moment of highest intent.

The navigation CTA still says "Start a Project" on the Contact page, which links back to `/contact`. You're already here. Redundant.

### Project Detail Pages — Right Structure, Wrong Content

The layout is strong — dark hero, clean two-column body, results block. The hierarchy is right. But every project page currently has:
- No images
- No mockups
- No before/after comparisons
- No link to the live site (except Team4Security)

A client clicking through to a project page expecting to see what was built gets only paragraphs of text. The words are well-written but they are not a substitute for visuals. A portfolio page with no visual is not a portfolio page — it's a case study brief.

The hardcoded colors also mean light mode users see a jarring light-body / dark-hero split that doesn't match any other page's color behavior.

---

## Conclusion: What to Fix, Keep, or Add

### Fix First — Critical

| # | What | Why |
|---|------|-----|
| 1 | **Add project visuals to all 8 cards and detail pages** | This is the #1 trust gap. Browser screenshots, mockups, even device frames — anything beats the NodeAxis logo placeholder. |
| 2 | **Fix the broken Calendly button** | Load the Calendly widget script. The "Book a Call" CTA on Services and other pages silently does nothing. |
| 3 | **Replace duplicate inline navbars** | `app/services/page.tsx` and `app/contact/page.tsx` should import the shared `Navbar` component. ~400 lines of duplicated code removed. |
| 4 | **Fix project detail page colors** | Replace hardcoded hex values with `--na-*` CSS variables so light mode works correctly. |
| 5 | **Remove the auto-cycling carousel** | Show all 8 projects in a static 2×4 grid. 8 items do not need a timer. The auto-advance creates stress, not delight. |
| 6 | **Add Calendly embed to the Contact page** | The moment of highest intent is when someone is on the contact page. Give them a calendar to book directly, not just a form to wait on. |

### Fix for Trust / Credibility

| # | What | Why |
|---|------|-----|
| 7 | **Upgrade testimonials with full names + photos** | Anonymous initials read as fabricated. Even one LinkedIn link to a real client breaks the skepticism entirely. |
| 8 | **Contextualize "Est. 2026"** | Don't hide it — explain it. "Built in 2026 by developers with 10+ years at [real companies]" is far more convincing than "20+ years combined" with no names attached. |
| 9 | **Add an About page or expand the founder section** | A face, a brief bio, a real photo, and a specific origin story turns a faceless agency into a person you can trust. |
| 10 | **Reframe or remove "Vantage Labs" from the portfolio** | It's your own site. Don't count it as client #3 when showing "Eight clients. Eight problems solved." |
| 11 | **For projects with no live URL: say why** | "NDA — details available on request" or "Private internal tool" explains absence. Silence implies the project doesn't exist. |

### Keep — These Are Working

- CSS variable architecture and `--na-*` / `--na-inv-*` system — scalable and clean
- Word-reveal headline animations — distinctive, consistent
- Services page pricing structure — transparent and client-facing
- Contact form UX — properly built, focus states, working Formspree backend, polished success state
- Intro loader (session-gated, plays once) — polished detail
- Services accordion — right pattern for the content density
- **"50% upfront · 50% on delivery · No hidden fees"** — this sentence alone builds trust; keep it prominent everywhere
- Copy voice throughout — honest, specific, not arrogant
- Process / timeline section on home — SMB clients find this very reassuring
- Theme toggle — signals craft and attention to detail
- Dark/light section contrast system (`--na-inv-*`) — visually punchy and well-executed

### Add

- **Real project screenshots or device mockups** — even 1–2 pages per project transforms credibility overnight
- **Calendly calendar embed** on the Contact page as a primary booking path alongside the form
- **A phone number** — BC SMB clients often want to call before committing; email-only feels distant
- **Case study depth on 2–3 projects** — pick Team4Security, Clearview Dental, and Iron Form Fitness; add a proper before/after section with the client's voice
- **Footer email on all inner pages** — currently only the home footer shows `hello@nodeaxis.ca`; Services and Contact footers omit it
- **Move Formspree endpoint to an env var** — `NEXT_PUBLIC_FORMSPREE_ENDPOINT` in `.env.local`

---

## One-Line Summary

> The craft, copy, and code quality are genuinely above average for an agency this new — but the site asks clients to trust a brand-new agency with no verifiable portfolio visuals, anonymous testimonials, and a broken primary conversion action. Fix those three things and the credibility gap closes significantly.
