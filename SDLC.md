# NodeAxis — System Development Life Cycle (SDLC) Plan

> **Project:** NodeAxis Agency Website
> **Stack:** Next.js 14, TypeScript, Tailwind CSS, Framer Motion
> **Last updated:** 2026-06-17
> **Status:** Phase 2 — Development (Frontend Complete)

---

## Overview

This document maps the full lifecycle of the NodeAxis platform — from the initial static agency site to a fully operational client-facing SaaS/agency platform. Each phase documents what was done, what is in progress, and what comes next.

---

## Phase 1 — Planning

**Status: Complete**

### Goals
- Define the purpose of the site: attract and convert agency clients
- Establish brand identity (NodeAxis, dark/premium aesthetic)
- Identify initial scope: marketing site only, no backend

### Decisions Made
| Decision | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router) | SSR, SEO, Vercel deployment |
| Language | TypeScript | Type safety, scalability |
| Styling | Tailwind CSS | Utility-first, fast iteration |
| Animation | Framer Motion | Premium motion feel |
| Hosting | Vercel | Native Next.js platform |
| Package manager | npm | Standard, no special requirements |

### Stakeholders
- Owner/Dev: Sahil Said
- End users: Prospective agency clients visiting the site

---

## Phase 2 — Requirements Analysis

**Status: Complete (v1) / Ongoing (v2+)**

### Functional Requirements

#### v1 — Current (Static Marketing Site)
- [x] Homepage with hero, services, work, process, testimonials, FAQ, CTA
- [x] Services page
- [x] Work/portfolio page with project grid
- [x] Individual project detail pages (`/projects/[slug]`)
- [x] Contact page
- [x] Night/day theme toggle
- [ ] Contact form submission (pending)
- [ ] Calendly embed on contact page (pending)
- [ ] Custom domain (pending)

#### v2 — Near Future (Content + Analytics Layer)
- [ ] CMS integration (Sanity) for managing projects/case studies
- [ ] Vercel Analytics or GA4
- [ ] Real project images and media
- [ ] Blog/articles section
- [ ] SEO enhancements (sitemap, schema markup)

#### v3 — Future (Client Platform)
- [ ] Client authentication (login/signup)
- [ ] Client dashboard (project status, deliverables)
- [ ] Proposal generation and e-sign
- [ ] Invoice creation and payment (Stripe)
- [ ] File/asset sharing per client
- [ ] Internal CRM (contacts, pipeline, notes)

### Non-Functional Requirements
| Category | Requirement |
|---|---|
| Performance | Lighthouse score ≥ 90 across all metrics |
| Accessibility | WCAG 2.1 AA compliance |
| SEO | Per-page metadata, OG tags, structured data |
| Security | HTTPS enforced, form input sanitized, env vars never exposed |
| Responsiveness | Mobile-first, tested on iOS Safari + Android Chrome |
| Uptime | 99.9% (Vercel SLA) |

---

## Phase 3 — System Design

**Status: Complete (v1) / Drafted (v2–v3)**

### v1 Architecture — Current (Static + API Routes)

```
Browser
  └── Next.js 14 (Vercel)
        ├── App Router (SSR/SSG pages)
        ├── Tailwind + Framer Motion (UI layer)
        ├── ThemeContext (localStorage persistence)
        └── /api/contact  ← (to be built with Resend)
```

### v2 Architecture — CMS + Analytics

```
Browser
  └── Next.js 14 (Vercel)
        ├── App Router
        ├── Sanity CMS  ←  project/case study content
        ├── Vercel Analytics  ← page views, vitals
        └── /api/contact  (Resend)
```

### v3 Architecture — Full Client Platform

```
Browser
  └── Next.js 14 (Vercel)
        ├── App Router
        ├── Supabase
        │     ├── Postgres DB (clients, projects, invoices, proposals)
        │     ├── Auth (email/password + magic link)
        │     └── Storage (file uploads, assets)
        ├── Stripe  ← payments and invoices
        ├── Resend  ← transactional emails
        ├── Sanity CMS  ← marketing content
        └── Vercel Analytics
```

### Database Schema (v3 — planned)

```
clients        id, name, email, phone, company, status, created_at
projects       id, client_id, title, status, start_date, end_date, value
proposals      id, client_id, content, status, sent_at, signed_at
invoices       id, client_id, project_id, amount, due_date, paid_at
deliverables   id, project_id, title, file_url, status
notes          id, client_id, body, created_at
```

### Key Design Patterns
- **File-based routing** via Next.js App Router
- **Server Components** for data fetching (no client-side waterfall)
- **API Routes** for form handling and webhooks
- **CSS Variables** for theme system (`--na-*` tokens)
- **Slug-based routing** for project detail pages

---

## Phase 4 — Implementation

**Status: v1 Frontend Complete / v1 Backend Pending**

### Completed
| Feature | File(s) |
|---|---|
| All 5 page routes | `app/*/page.tsx` |
| All 13 components | `components/*.tsx` |
| Theme system | `lib/theme.tsx` |
| Project data + slug routing | `lib/projects.ts`, `app/projects/[slug]/page.tsx` |
| IntroLoader + Hero mobile fix | `components/IntroLoader.tsx`, `components/Hero.tsx` |
| Custom cursor | `components/Cursor.tsx` |
| Magnetic button | `components/MagneticButton.tsx` |
| SEO metadata per page | each route's `layout.tsx` |

### In Progress / Immediate Next Steps

#### 1. Contact Form Backend (Priority: High)
- Create `app/api/contact/route.ts`
- Install and configure **Resend** (`npm install resend`)
- Wire `ContactForm` component to POST `/api/contact`
- Validate inputs server-side (name, email, message required)
- Send confirmation email to client + notification to Sahil

#### 2. Calendly Embed (Priority: Medium)
- Add Calendly inline widget to `/contact` page
- Use `@calendly/react-calendly` or iframe embed
- Style to match dark theme

#### 3. Analytics (Priority: Medium)
- Add `@vercel/analytics` package
- Insert `<Analytics />` in root `layout.tsx`

#### 4. Custom Domain (Priority: Medium)
- Connect domain in Vercel dashboard
- Set up DNS records (A + CNAME)
- Verify SSL auto-provisioning

#### 5. Real Media (Priority: Low)
- Replace placeholder images in `lib/projects.ts`
- Optimize images with Next.js `<Image />` component

---

## Phase 5 — Testing

**Status: Partial (manual only)**

### Testing Strategy

#### Unit / Component Tests (v2)
- Tool: **Vitest** + **React Testing Library**
- Coverage targets: form validation, theme toggle, slug routing

#### End-to-End Tests (v2)
- Tool: **Playwright**
- Critical paths: homepage load, contact form submit, project detail navigation

#### Performance Testing (ongoing)
- Tool: **Lighthouse CI** (run before every deploy)
- Target: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 100

#### Manual Testing Checklist (per release)
- [ ] iOS Safari — hero animation, loader, scroll
- [ ] Android Chrome — same as above
- [ ] Firefox — theme toggle, CSS vars
- [ ] Desktop — cursor, magnetic buttons, all routes
- [ ] Reduced motion — Framer Motion `useReducedMotion` respected
- [ ] Dark + light mode — all sections readable

---

## Phase 6 — Deployment

**Status: Active on Vercel**

### Current Pipeline
```
Local dev (npm run dev)
  → git push origin main
    → Vercel auto-deploy (preview URL per PR, prod on main)
```

### Environment Variables
| Variable | Where set | Purpose |
|---|---|---|
| `RESEND_API_KEY` | Vercel dashboard | Contact form emails |
| `NEXT_PUBLIC_CALENDLY_URL` | Vercel dashboard | Calendly link |
| `SANITY_PROJECT_ID` | Vercel dashboard (v2) | CMS reads |
| `SUPABASE_URL` + `SUPABASE_ANON_KEY` | Vercel dashboard (v3) | DB + auth |

### Deployment Checklist (pre-launch)
- [ ] All env vars set in Vercel production environment
- [ ] Custom domain connected and SSL active
- [ ] OG images verified with Twitter Card Validator
- [ ] robots.txt and sitemap.xml present
- [ ] No console errors in production build
- [ ] `npm run build` passes locally before push

---

## Phase 7 — Maintenance & Evolution

**Status: Ongoing**

### Regular Tasks
| Cadence | Task |
|---|---|
| Per session | Update `DEVLOG.md`, commit, push |
| Weekly | Check Vercel Analytics for drop-offs |
| Monthly | Audit Lighthouse scores, dependency updates |
| Per project | Add new case study to CMS (v2) / `lib/projects.ts` (v1) |

### Versioning Roadmap

| Version | Description | Target |
|---|---|---|
| **v1.0** | Static marketing site, contact form live, domain connected | Now |
| **v1.1** | Calendly, analytics, real project media | Soon |
| **v2.0** | Sanity CMS, blog, SEO improvements | When content updates become frequent |
| **v3.0** | Client portal, Supabase, auth, proposals | When first client needs it |
| **v3.x** | Stripe invoicing, file delivery, full CRM | Scale |

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Contact form emails go to spam | Medium | High | Use Resend with custom domain + SPF/DKIM records |
| Mobile Safari animation bugs | Medium | High | Test on real device before each deploy |
| Vercel cold start latency | Low | Medium | Keep API routes lightweight, no heavy DB calls on marketing pages |
| Scope creep into v3 too early | Medium | Medium | Ship v1 → v1.1 fully before touching any backend infra |
| Content getting stale | High | Medium | Add CMS (v2) before content update frequency increases |

---

## Glossary

| Term | Meaning |
|---|---|
| App Router | Next.js 14 routing system using the `app/` directory |
| SSR | Server-Side Rendering — pages rendered per request |
| SSG | Static Site Generation — pages pre-built at deploy time |
| CMS | Content Management System — edit content without touching code |
| Supabase | Open-source Firebase alternative: Postgres + Auth + Storage |
| Resend | Email API service for transactional emails |
| Sanity | Headless CMS with a real-time content lake |
