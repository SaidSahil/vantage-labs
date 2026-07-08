# First-party analytics (visits, location, section engagement)

## Why
Vercel Analytics (already wired up via `AnalyticsGate.tsx`) is privacy-friendly but deliberately
withholds IP/location and interaction detail. This adds a first-party layer, owned in our own
database, to answer: when do people visit, roughly where from, and which page sections get the
most attention.

## Decisions
- **Storage:** hosted Postgres (Neon or Vercel Postgres), via Prisma 7 + `@prisma/adapter-pg`,
  mirroring the `agency-database` project's Prisma setup/conventions.
- **Location, not raw IP:** derive `country`/`region`/`city` from Vercel's `x-vercel-ip-*` request
  headers (available on any Vercel serverless function, no Edge runtime or external geo-IP service
  needed) and store only that — never the raw address.
- **Interaction data = section-level engagement**, not pixel heatmaps: each major page section is
  wrapped in a `<Tracked id="...">` component that accumulates time-in-view (via
  `IntersectionObserver`) and click count, batched to the backend.
- **Consent-gated:** both capture paths only run after the same cookie-consent accept used by
  `AnalyticsGate`, via the existing `nodeaxis-consent-change` event / `nodeaxis-cookie-consent`
  localStorage key.
- **Dashboard auth:** login form + signed HMAC session cookie, single shared `ADMIN_PASSWORD` env
  var — mirrors `agency-database/lib/session.ts` exactly, no user table needed.
- **Privacy policy:** update section 5 to disclose approximate location and on-page engagement
  tracking.

## Schema
```prisma
model Visit {
  id        String   @id @default(cuid())
  path      String
  referrer  String?
  country   String?
  region    String?
  city      String?
  userAgent String?
  sessionId String
  createdAt DateTime @default(now())

  @@index([createdAt])
  @@index([path])
  @@index([sessionId])
}

model SectionEngagement {
  id        String   @id @default(cuid())
  path      String
  section   String
  viewMs    Int      @default(0)
  clicks    Int      @default(0)
  sessionId String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([sessionId, path, section])
  @@index([path, section])
  @@index([createdAt])
}
```
`sessionId` is a random UUID generated client-side into `sessionStorage` (not a durable
cross-visit cookie) — just enough to dedupe engagement rows per visit.

## Capture flow
1. `components/Tracker.tsx` — mounted in `layout.tsx` next to `AnalyticsGate`. On mount and on
   every pathname change (consent permitting), beacons `{ path, referrer, sessionId }` to
   `POST /api/track/visit`.
2. `app/api/track/visit/route.ts` (Node runtime) reads `x-vercel-ip-country` /
   `-country-region` / `-city` headers off the request, creates one `Visit` row.
3. `components/Tracked.tsx` wraps each named section in `app/page.tsx` (Hero, Services, Work,
   Testimonials, CTA, ...). Starts a timer when >=50% visible, stops when not, counts clicks
   inside the wrapper. Flushes accumulated `{ path, section, viewMs, clicks, sessionId }` every
   ~10s while active, on `visibilitychange`→hidden, and on unmount, via `sendBeacon`.
4. `app/api/track/engagement/route.ts` upserts on `(sessionId, path, section)`, incrementing
   `viewMs`/`clicks`.

## Dashboard
- `app/admin/login/page.tsx` + `app/api/admin/login/route.ts` — password form, sets
  `na_admin_session` httpOnly cookie (HMAC-signed, `lib/session.ts`).
- `middleware.ts` protects `/admin/*` except `/admin/login`, redirects unauthenticated visits.
- `app/admin/analytics/page.tsx` — server component, queries Prisma directly:
  - visits per day (last 30 days)
  - top pages, top referrers, top countries
  - section engagement (total view time + clicks) per section, page-selectable

## Out of scope (YAGNI for now)
- Raw IP storage, pixel-coordinate heatmaps, a `Session` rollup table, multi-admin-user accounts,
  data retention/deletion automation — none of these were asked for; can layer in later if needed.
