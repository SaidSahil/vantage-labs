# Demos

Served by `app/demo/[slug]/route.ts`. Static hand-built demos live here as `<slug>.html` (expiry dates in `registry.json`).

## Personalized trades demo — `/demo/trades`

Rendered on the fly by `lib/trades-demo.template.ts` (no files, no DB). All values are HTML-escaped.

| Param | Meaning | Default |
|---|---|---|
| `n` | Business name | `Example Plumbing Co.` (sample mode when omitted) |
| `t` | Trade — Plumbing, HVAC, Roofing, Electrical, Landscaping, General contracting (fuzzy: "plumber", "roofer", "renovations"…); anything else gets generic services | Plumbing |
| `c` | City (shown first in service area) | Surrey |
| `p` | Phone (click-to-call) | "Call us" → links to quote form |
| `e` | Email (shown only if valid) | hidden |
| `d` | Unix seconds when the link was created; after 30 days the page returns 410 "expired" | no expiry |

Without `n`, `/demo/trades` shows the sample (Example Plumbing Co., Surrey, 604-555-0100) — use that on `/work`.

Examples:

- Plumbing: `/demo/trades?n=Smith%20Plumbing&t=Plumbing&c=Surrey&p=604-555-0100&d=1793145600`
- Roofing: `/demo/trades?n=Northpeak%20Roofing&t=Roofing&c=Langley&p=604-555-0199&e=info%40example.com&d=1793145600`

Generate `d` with `Math.floor(Date.now() / 1000)` when sending the link.
