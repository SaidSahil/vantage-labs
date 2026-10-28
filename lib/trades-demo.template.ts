// Personalized trades demo site — rendered by app/demo/[slug]/route.ts for
// /demo/trades?n=...&t=...&c=...&p=...&e=...&d=...
// Produces one standalone HTML document (inline CSS + a few lines of vanilla JS).
// Every user-supplied value goes through esc() before it touches the markup.

import { business } from './offer';

export interface TradesDemoParams {
  name: string;
  trade: string;
  city: string;
  phone: string;
  email: string;
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

type Service = { title: string; body: string };

type TradeProfile = {
  label: string; // display name for the trade ("Plumbing")
  noun: string; // what the crew is called ("plumbers")
  accent: string;
  accentDeep: string;
  icon: string; // key into ICONS
  emergency: string; // hero eyebrow line
  services: Service[];
};

const PROFILES: Record<string, TradeProfile> = {
  plumbing: {
    label: 'Plumbing',
    noun: 'plumbers',
    accent: '#1D5FD1',
    accentDeep: '#174BA6',
    icon: 'wrench',
    emergency: '24/7 emergency plumbing',
    services: [
      { title: 'Leak detection & repair', body: 'Pinpoint hidden leaks fast and fix them before they damage floors and drywall.' },
      { title: 'Hot water tanks', body: 'Same-day repair and replacement of tank and tankless water heaters.' },
      { title: 'Drain cleaning', body: 'Clogged sinks, showers and main lines cleared with camera inspection.' },
      { title: 'Bathroom & kitchen plumbing', body: 'Fixtures, faucets, toilets and full rough-ins for renovations.' },
      { title: 'Sump pumps & backflow', body: 'Installation, testing and certification to keep basements dry.' },
      { title: 'Emergency service', body: 'Burst pipe at 2am? We pick up the phone and show up.' },
    ],
  },
  hvac: {
    label: 'HVAC',
    noun: 'HVAC technicians',
    accent: '#D9480F',
    accentDeep: '#B53A0B',
    icon: 'thermo',
    emergency: 'Heating & cooling, fixed fast',
    services: [
      { title: 'Furnace repair & install', body: 'High-efficiency gas furnaces installed, serviced and repaired.' },
      { title: 'Heat pumps', body: 'Ducted and ductless heat pumps — ask us about current rebates.' },
      { title: 'Air conditioning', body: 'Stay cool through summer heat waves with properly sized AC.' },
      { title: 'Seasonal maintenance', body: 'Tune-ups that cut energy bills and prevent mid-winter breakdowns.' },
      { title: 'Ductwork & ventilation', body: 'Cleaner air and even temperatures in every room.' },
      { title: 'Thermostats & controls', body: 'Smart thermostats set up and explained in plain language.' },
    ],
  },
  roofing: {
    label: 'Roofing',
    noun: 'roofers',
    accent: '#B4372B',
    accentDeep: '#952C22',
    icon: 'roof',
    emergency: 'Roof leaks repaired fast',
    services: [
      { title: 'Roof replacement', body: 'Asphalt shingle, metal and flat roofs — full tear-off and install.' },
      { title: 'Leak repair', body: 'Quick, lasting repairs before a small drip becomes a ceiling problem.' },
      { title: 'Roof inspections', body: 'Honest condition reports with photos — great before buying or selling.' },
      { title: 'Gutters & downspouts', body: 'Seamless gutters installed, cleaned and repaired.' },
      { title: 'Moss removal & treatment', body: 'Protect your roof from the wet Lower Mainland climate.' },
      { title: 'Skylights & flashing', body: 'Properly sealed skylights, chimneys and vents.' },
    ],
  },
  electrical: {
    label: 'Electrical',
    noun: 'electricians',
    accent: '#C77C02',
    accentDeep: '#9E6200',
    icon: 'bolt',
    emergency: 'Licensed electricians on call',
    services: [
      { title: 'Panel upgrades', body: '100A to 200A upgrades for heat pumps, EV chargers and renovations.' },
      { title: 'EV charger installation', body: 'Level 2 home chargers installed safely and to code.' },
      { title: 'Lighting', body: 'Pot lights, exterior lighting and fixture installs that look sharp.' },
      { title: 'Wiring & rewiring', body: 'New circuits, renovations and replacing old knob-and-tube.' },
      { title: 'Troubleshooting & repairs', body: 'Tripping breakers, dead outlets and flickering lights diagnosed fast.' },
      { title: 'Safety inspections', body: 'Peace of mind for older homes, rentals and new purchases.' },
    ],
  },
  landscaping: {
    label: 'Landscaping',
    noun: 'landscapers',
    accent: '#2F7D32',
    accentDeep: '#246327',
    icon: 'leaf',
    emergency: 'Yards you’ll love coming home to',
    services: [
      { title: 'Landscape design', body: 'Plans that fit your yard, your budget and how you live outdoors.' },
      { title: 'Lawn care & maintenance', body: 'Weekly mowing, edging, aeration and seasonal clean-ups.' },
      { title: 'Patios & hardscaping', body: 'Pavers, retaining walls, walkways and outdoor living spaces.' },
      { title: 'Planting & garden beds', body: 'Hedges, trees and low-maintenance planting that thrives here.' },
      { title: 'Irrigation', body: 'Sprinkler systems installed, tuned and winterized.' },
      { title: 'Fencing & decks', body: 'Cedar fences and decks built to last through wet winters.' },
    ],
  },
  general: {
    label: 'General contracting',
    noun: 'contractors',
    accent: '#2E3BFF',
    accentDeep: '#2430CC',
    icon: 'hammer',
    emergency: 'Renovations done right, on schedule',
    services: [
      { title: 'Kitchen renovations', body: 'Layout, cabinets, counters and finishing — one team, one schedule.' },
      { title: 'Bathroom renovations', body: 'Tile, showers, vanities and waterproofing done properly.' },
      { title: 'Basement suites', body: 'Legal suites and finished basements, permits handled.' },
      { title: 'Additions & structural', body: 'More space without moving, built to code.' },
      { title: 'Flooring & finishing', body: 'Hardwood, vinyl plank, trim and paint.' },
      { title: 'Project management', body: 'Permits, trades and timelines coordinated for you.' },
    ],
  },
};

const ALIASES: [RegExp, string][] = [
  [/plumb/i, 'plumbing'],
  [/hvac|heat|furnace|air ?con|cool|mechanical/i, 'hvac'],
  [/roof|gutter/i, 'roofing'],
  [/electric/i, 'electrical'],
  [/landscap|lawn|garden|yard|hardscap/i, 'landscaping'],
  [/contract|construct|renovat|build|reno|carpent/i, 'general'],
];

function genericProfile(trade: string): TradeProfile {
  const label = trade || 'Home services';
  return {
    label,
    noun: 'pros',
    accent: '#2E3BFF',
    accentDeep: '#2430CC',
    icon: 'hammer',
    emergency: 'Local, licensed & insured',
    services: [
      { title: 'Repairs', body: 'Fast, tidy repairs done right the first time.' },
      { title: 'Installations', body: 'New installs with quality materials and clean finishing.' },
      { title: 'Maintenance', body: 'Regular service that prevents bigger problems later.' },
      { title: 'Free estimates', body: 'A clear written quote before any work starts.' },
      { title: 'Emergency calls', body: 'When something can’t wait, we pick up the phone.' },
      { title: 'Residential & commercial', body: 'Homes, rentals, strata and small businesses.' },
    ],
  };
}

function resolveProfile(trade: string): TradeProfile {
  const t = trade.trim();
  if (!t) return PROFILES.plumbing;
  for (const [re, key] of ALIASES) {
    if (re.test(t)) return PROFILES[key];
  }
  return genericProfile(t);
}

const ICONS: Record<string, string> = {
  wrench: '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.1L3.6 17.1a1.5 1.5 0 0 0 2.1 2.1l5.7-5.7a4 4 0 0 0 5.1-5.4l-2.4 2.4-2.1-.6-.6-2.1z"/>',
  thermo: '<path d="M10 4a2 2 0 1 1 4 0v9.3a4 4 0 1 1-4 0z"/><path d="M12 9v6"/>',
  roof: '<path d="M3 11 12 4l9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-5h4v5"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  leaf: '<path d="M5 19c0-8 5-14 15-15-1 10-7 15-15 15z"/><path d="M5 19 13 11"/>',
  hammer: '<path d="M14 6 18 2l4 4-4 4"/><path d="M16 4 4 16a2 2 0 0 0 0 2.8l1.2 1.2a2 2 0 0 0 2.8 0L20 8"/>',
  shield: '<path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/><path d="m9 12 2 2 4-4"/>',
  tag: '<path d="M3 12V4h8l10 10-8 8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  pin: '<path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  check: '<path d="m5 12 4 4 10-10"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
};

function icon(name: string, size = 22): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name] ?? ICONS.check}</svg>`;
}

const STARS = '<span class="stars" aria-hidden="true">★★★★★</span>';

export function buildTradesDemo(p: TradesDemoParams): string {
  const profile = resolveProfile(p.trade);
  const name = p.name.trim().slice(0, 80) || 'Example Plumbing Co.';
  const city = p.city.trim().slice(0, 60) || 'Surrey';
  const tradeLabel = profile.label;
  const tradeLower = tradeLabel === 'HVAC' ? 'HVAC' : tradeLabel.toLowerCase();

  const phone = p.phone.trim().slice(0, 30);
  const phoneDigits = phone.replace(/[^\d+]/g, '');
  const hasPhone = phoneDigits.replace(/\D/g, '').length >= 7;
  const phoneHref = hasPhone ? `tel:${phoneDigits}` : '#quote';
  const phoneDisplay = hasPhone ? phone : 'Call us';

  const email = p.email.trim().slice(0, 120);
  const hasEmail = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/.test(email);

  const area = [city, ...business.serviceArea].filter(
    (v, i, arr) => arr.findIndex(x => x.toLowerCase() === v.toLowerCase()) === i,
  );

  const E = {
    name: esc(name),
    city: esc(city),
    trade: esc(tradeLabel),
    tradeLower: esc(tradeLower),
    noun: esc(profile.noun),
    phone: esc(phoneDisplay),
    phoneHref: esc(phoneHref),
    email: esc(email),
    initial: esc(name.charAt(0).toUpperCase()),
  };

  const servicesHtml = profile.services
    .map(
      (s, i) => `
        <article class="svc">
          <span class="svc-num">${String(i + 1).padStart(2, '0')}</span>
          <div class="svc-ic">${icon(profile.icon)}</div>
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.body)}</p>
        </article>`,
    )
    .join('');

  const why = [
    { ic: 'shield', t: 'Licensed & insured', b: 'Fully licensed, WorkSafeBC covered and insured — your home is protected.' },
    { ic: 'tag', t: 'Upfront pricing', b: 'A clear written quote before we start. No surprises on the invoice.' },
    { ic: 'clock', t: 'On time, every time', b: 'We show up when we say we will, and text you when we’re on the way.' },
    { ic: 'pin', t: `Local to ${city}`, b: `We live and work here. Your neighbours in ${city} already know us.` },
  ]
    .map(
      w => `
        <div class="why-card">
          <div class="why-ic">${icon(w.ic)}</div>
          <h3>${esc(w.t)}</h3>
          <p>${esc(w.b)}</p>
        </div>`,
    )
    .join('');

  const reviews = [
    { n: 'Sarah M.', where: area[1] ?? city, t: `Called in the morning and they were here by lunch. Friendly, tidy and the price matched the quote exactly. Our new go-to for ${tradeLower}.` },
    { n: 'Dave K.', where: area[2] ?? city, t: 'Explained everything in plain English and didn’t try to upsell us. Work was done right the first time. Highly recommend.' },
    { n: 'Priya S.', where: city, t: 'Great communication from start to finish — texted when they were on the way and cleaned up after. Five stars.' },
  ]
    .map(
      r => `
        <figure class="review">
          ${STARS}
          <blockquote>“${esc(r.t)}”</blockquote>
          <figcaption><span class="avatar" aria-hidden="true">${esc(r.n.charAt(0))}</span><span><strong>${esc(r.n)}</strong><small>${esc(r.where)} · Google review</small></span></figcaption>
        </figure>`,
    )
    .join('');

  const areaHtml = area
    .map((a, i) => `<li${i === 0 ? ' class="primary"' : ''}>${icon('pin', 16)}${esc(a)}</li>`)
    .join('');

  const serviceOptions = profile.services.map(s => `<option>${esc(s.title)}</option>`).join('');

  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="noindex, nofollow" />
<title>${E.name} — ${E.trade} in ${E.city}</title>
<meta name="description" content="${E.name}: fast, reliable ${E.tradeLower} in ${E.city}. Licensed, insured, upfront pricing. Call for a free quote." />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@600;700;800&display=swap" rel="stylesheet" />
<style>
:root{
  --bg:#F6F4EF; --surface:#FFFFFF; --soft:#EEEBE4; --ink:#14161A; --muted:#5D5F66;
  --line:rgba(20,22,26,.1); --accent:${profile.accent}; --accent-deep:${profile.accentDeep};
  --dark:#14161A; --r:22px; --maxw:1180px; --pad:clamp(18px,5vw,48px);
  --shadow:0 1px 2px rgba(20,22,26,.05),0 12px 32px -12px rgba(20,22,26,.18);
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;-webkit-text-size-adjust:100%}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}*{transition:none!important;animation:none!important}}
body{font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:var(--bg);color:var(--ink);line-height:1.6;font-size:16px;-webkit-font-smoothing:antialiased}
h1,h2,h3{font-family:'Inter Tight',Inter,system-ui,sans-serif;letter-spacing:-.03em;line-height:1.05}
a{color:inherit}
:focus-visible{outline:3px solid var(--accent);outline-offset:3px;border-radius:6px}
.wrap{max-width:var(--maxw);margin:0 auto;padding:0 var(--pad)}
.skip{position:absolute;left:-9999px}.skip:focus{left:12px;top:12px;z-index:100;background:#fff;padding:8px 14px;border-radius:8px}
.btn{display:inline-flex;align-items:center;justify-content:center;gap:.55em;min-height:48px;padding:0 1.4em;border-radius:999px;font-weight:600;font-size:.98rem;text-decoration:none;border:1px solid transparent;cursor:pointer;transition:transform .2s,background .2s,box-shadow .2s;font-family:inherit}
.btn:hover{transform:translateY(-1px)}
.btn-primary{background:var(--accent);color:#fff;box-shadow:0 8px 20px -8px var(--accent)}
.btn-primary:hover{background:var(--accent-deep)}
.btn-ghost{background:var(--surface);color:var(--ink);border-color:var(--line)}
.btn-dark{background:var(--ink);color:#fff}
.tag{display:inline-flex;align-items:center;gap:.5em;font-size:.75rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.tag::before{content:"";width:8px;height:8px;border-radius:50%;background:var(--accent)}
.stars{color:#F5A524;letter-spacing:.08em}
section{padding:clamp(56px,9vw,104px) 0}
.sec-head{max-width:640px;margin-bottom:clamp(28px,4vw,48px)}
.sec-head h2{font-size:clamp(2rem,5vw,3.2rem);margin:.5rem 0 .75rem}
.sec-head p{color:var(--muted);font-size:1.05rem}

/* header */
header.top{position:sticky;top:0;z-index:50;background:rgba(246,244,239,.86);backdrop-filter:saturate(1.4) blur(12px);-webkit-backdrop-filter:saturate(1.4) blur(12px);border-bottom:1px solid var(--line)}
.top .wrap{display:flex;align-items:center;justify-content:space-between;gap:16px;height:68px}
.brand{display:flex;align-items:center;gap:10px;text-decoration:none;font-weight:700;font-family:'Inter Tight',Inter,sans-serif;font-size:1.08rem;letter-spacing:-.02em;min-width:0}
.brand-mark{flex:none;width:38px;height:38px;border-radius:11px;background:var(--accent);color:#fff;display:grid;place-items:center}
.brand span.nm{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.top nav{display:none;gap:28px;font-size:.94rem;font-weight:500}
.top nav a{text-decoration:none;color:var(--muted)}.top nav a:hover{color:var(--ink)}
.top .btn{min-height:42px;padding:0 1.1em;font-size:.9rem;flex:none}
.top .btn .lbl{display:none}
@media(min-width:560px){.top .btn .lbl{display:inline}}
@media(min-width:900px){.top nav{display:flex}}

/* hero */
.hero{padding:clamp(28px,5vw,56px) 0 clamp(48px,7vw,80px)}
.hero-grid{display:grid;gap:clamp(28px,4vw,56px);align-items:center}
@media(min-width:960px){.hero-grid{grid-template-columns:1.1fr .9fr}}
.rating{display:inline-flex;align-items:center;gap:10px;background:var(--surface);border:1px solid var(--line);border-radius:999px;padding:6px 14px 6px 6px;font-size:.88rem;font-weight:500;box-shadow:var(--shadow)}
.rating .g{width:28px;height:28px;border-radius:50%;background:var(--soft);display:grid;place-items:center;font-weight:700;font-size:.85rem;color:var(--accent)}
.hero h1{font-size:clamp(2.6rem,7.5vw,5rem);margin:20px 0 18px;font-weight:700}
.hero h1 em{font-style:normal;color:var(--accent)}
.hero p.lead{font-size:clamp(1.05rem,2vw,1.2rem);color:var(--muted);max-width:34em}
.hero .ctas{display:flex;flex-wrap:wrap;gap:12px;margin-top:28px}
.hero .ctas .btn{min-height:54px;font-size:1.02rem}
.ticks{display:flex;flex-wrap:wrap;gap:10px 22px;margin-top:26px;list-style:none;font-size:.92rem;font-weight:500}
.ticks li{display:flex;align-items:center;gap:7px}.ticks svg{color:var(--accent)}
.visual{position:relative;aspect-ratio:4/4.2;border-radius:30px;overflow:hidden;background:
  radial-gradient(120% 80% at 85% 10%,color-mix(in srgb,var(--accent) 55%,#fff) 0%,transparent 55%),
  radial-gradient(90% 70% at 10% 100%,#F6C9A6 0%,transparent 60%),
  linear-gradient(160deg,var(--accent-deep),#14161A 90%);box-shadow:var(--shadow)}
.visual::before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.07) 1px,transparent 1px);background-size:36px 36px;mask-image:linear-gradient(180deg,#000 30%,transparent)}
.visual .big-ic{position:absolute;right:-6%;top:8%;color:rgba(255,255,255,.16)}
.visual .big-ic svg{width:min(70%,340px);height:auto}
.float{position:absolute;background:var(--surface);border-radius:18px;padding:14px 16px;box-shadow:0 20px 40px -16px rgba(0,0,0,.4);font-size:.86rem;display:flex;gap:12px;align-items:center;max-width:78%}
.float strong{display:block;font-size:.95rem}
.float small{color:var(--muted)}
.float .fi{flex:none;width:40px;height:40px;border-radius:12px;background:var(--soft);display:grid;place-items:center;color:var(--accent)}
.float.a{left:6%;bottom:22%}
.float.b{right:6%;bottom:6%}
.float .dot{width:8px;height:8px;border-radius:50%;background:#22A55B;box-shadow:0 0 0 4px rgba(34,165,91,.18)}
.visual .vtitle{position:absolute;left:7%;top:8%;color:#fff;font-family:'Inter Tight',sans-serif;font-weight:700;font-size:clamp(1.3rem,3vw,1.8rem);letter-spacing:-.03em;line-height:1.1;max-width:60%}
.visual .vtitle small{display:block;font-family:Inter,sans-serif;font-weight:500;font-size:.8rem;letter-spacing:.1em;text-transform:uppercase;opacity:.75;margin-bottom:8px}

/* strip */
.strip{background:var(--dark);color:#fff;padding:22px 0}
.strip .wrap{display:grid;grid-template-columns:repeat(2,1fr);gap:18px}
@media(min-width:760px){.strip .wrap{grid-template-columns:repeat(4,1fr)}}
.strip b{display:block;font-family:'Inter Tight',sans-serif;font-size:1.6rem;letter-spacing:-.03em}
.strip span{font-size:.85rem;color:#B7B9BF}

/* services */
.svc-grid{display:grid;gap:14px}
@media(min-width:640px){.svc-grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1000px){.svc-grid{grid-template-columns:repeat(3,1fr)}}
.svc{position:relative;background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:26px;transition:transform .25s,box-shadow .25s}
.svc:hover{transform:translateY(-3px);box-shadow:var(--shadow)}
.svc-num{position:absolute;top:22px;right:24px;font-size:.78rem;font-weight:600;color:var(--muted)}
.svc-ic{width:48px;height:48px;border-radius:14px;background:color-mix(in srgb,var(--accent) 12%,#fff);color:var(--accent);display:grid;place-items:center;margin-bottom:18px}
.svc h3{font-size:1.25rem;margin-bottom:8px}
.svc p{color:var(--muted);font-size:.95rem}

/* why */
.why{background:var(--surface);border-radius:32px;margin:0 clamp(10px,1.5vw,16px)}
.why-grid{display:grid;gap:14px}
@media(min-width:700px){.why-grid{grid-template-columns:repeat(2,1fr)}}
@media(min-width:1040px){.why-grid{grid-template-columns:repeat(4,1fr)}}
.why-card{background:var(--soft);border-radius:var(--r);padding:26px}
.why-ic{width:46px;height:46px;border-radius:50%;background:var(--ink);color:#fff;display:grid;place-items:center;margin-bottom:18px}
.why-card h3{font-size:1.15rem;margin-bottom:6px}
.why-card p{color:var(--muted);font-size:.94rem}

/* reviews */
.rev-top{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:end;gap:20px}
.score{display:flex;align-items:center;gap:14px;background:var(--surface);border:1px solid var(--line);border-radius:18px;padding:14px 20px}
.score b{font-family:'Inter Tight',sans-serif;font-size:2.2rem;letter-spacing:-.04em}
.score small{display:block;color:var(--muted);font-size:.82rem}
.rev-grid{display:grid;gap:14px}
@media(min-width:900px){.rev-grid{grid-template-columns:repeat(3,1fr)}}
.review{background:var(--surface);border:1px solid var(--line);border-radius:var(--r);padding:26px;display:flex;flex-direction:column;gap:16px}
.review blockquote{font-size:1.02rem;flex:1}
.review figcaption{display:flex;align-items:center;gap:12px;font-size:.92rem}
.review figcaption small{display:block;color:var(--muted);font-size:.8rem}
.avatar{width:40px;height:40px;border-radius:50%;background:var(--accent);color:#fff;display:grid;place-items:center;font-weight:700}
.note{margin-top:14px;font-size:.8rem;color:var(--muted)}

/* area */
.area-card{background:var(--dark);color:#fff;border-radius:32px;padding:clamp(28px,5vw,56px);display:grid;gap:28px;margin:0 clamp(10px,1.5vw,16px)}
@media(min-width:900px){.area-card{grid-template-columns:.9fr 1.1fr;align-items:center}}
.area-card .tag{color:#B7B9BF}
.area-card h2{font-size:clamp(2rem,5vw,3rem);margin:.5rem 0 .75rem}
.area-card p{color:#B7B9BF}
.area-list{list-style:none;display:flex;flex-wrap:wrap;gap:10px}
.area-list li{display:inline-flex;align-items:center;gap:6px;border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:10px 16px;font-weight:500;font-size:.95rem}
.area-list li.primary{background:var(--accent);border-color:var(--accent)}

/* quote */
.quote-grid{display:grid;gap:clamp(24px,4vw,48px)}
@media(min-width:960px){.quote-grid{grid-template-columns:.85fr 1.15fr;align-items:start}}
.contact-list{list-style:none;display:grid;gap:12px;margin-top:24px}
.contact-list a{display:flex;align-items:center;gap:12px;text-decoration:none;font-weight:600;font-size:1.05rem;background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:14px 18px}
.contact-list .ci{width:38px;height:38px;border-radius:10px;background:var(--soft);display:grid;place-items:center;color:var(--accent)}
form.quote{background:var(--surface);border:1px solid var(--line);border-radius:28px;padding:clamp(22px,4vw,36px);display:grid;gap:16px;box-shadow:var(--shadow)}
.row{display:grid;gap:16px}
@media(min-width:620px){.row{grid-template-columns:1fr 1fr}}
label{display:grid;gap:6px;font-size:.88rem;font-weight:600}
input,select,textarea{font:inherit;font-weight:400;font-size:1rem;width:100%;padding:13px 14px;border-radius:12px;border:1px solid rgba(20,22,26,.2);background:#FCFBF9;color:var(--ink)}
input:focus,select:focus,textarea:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px color-mix(in srgb,var(--accent) 25%,transparent)}
textarea{min-height:110px;resize:vertical}
form.quote .btn{width:100%;min-height:54px}
.demo-msg{border-radius:16px;padding:18px;background:color-mix(in srgb,var(--accent) 10%,#fff);border:1px solid color-mix(in srgb,var(--accent) 30%,#fff);font-size:.95rem}
.demo-msg strong{display:block;margin-bottom:4px}

/* footer */
footer{background:var(--dark);color:#C9CBD0;padding:56px 0 110px;margin-top:clamp(56px,9vw,104px)}
footer .fgrid{display:grid;gap:28px}
@media(min-width:800px){footer .fgrid{grid-template-columns:1.4fr 1fr 1fr}}
footer h2{color:#fff;font-size:1.6rem;margin-bottom:8px}
footer h3{color:#fff;font-size:.8rem;letter-spacing:.12em;text-transform:uppercase;font-family:Inter,sans-serif;margin-bottom:12px}
footer ul{list-style:none;display:grid;gap:6px;font-size:.94rem}
footer a{text-decoration:none}footer a:hover{color:#fff}
footer .legal{border-top:1px solid rgba(255,255,255,.12);margin-top:36px;padding-top:20px;font-size:.82rem;color:#8E9097}

/* mobile call bar + demo badge */
.callbar{position:fixed;left:12px;right:12px;bottom:12px;z-index:60;display:flex;gap:8px}
.callbar .btn{flex:1;min-height:52px;box-shadow:0 12px 30px -10px rgba(0,0,0,.45)}
@media(min-width:760px){.callbar{display:none}}
.demo-badge{position:fixed;z-index:70;right:12px;bottom:76px;background:#14161A;color:#fff;text-decoration:none;font-size:.76rem;font-weight:500;padding:9px 14px;border-radius:999px;box-shadow:0 10px 24px -8px rgba(0,0,0,.5);display:flex;align-items:center;gap:8px;max-width:calc(100vw - 24px)}
.demo-badge:hover{background:#000}
.demo-badge i{width:7px;height:7px;border-radius:50%;background:#7C86FF;flex:none}
@media(min-width:760px){.demo-badge{bottom:18px;right:18px}}
</style>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>

<header class="top">
  <div class="wrap">
    <a class="brand" href="#top" aria-label="${E.name} home">
      <span class="brand-mark">${icon(profile.icon, 20)}</span><span class="nm">${E.name}</span>
    </a>
    <nav aria-label="Main">
      <a href="#services">Services</a><a href="#why">Why us</a><a href="#reviews">Reviews</a><a href="#area">Service area</a><a href="#quote">Free quote</a>
    </nav>
    <a class="btn btn-primary" href="${E.phoneHref}" aria-label="Call ${E.name}${hasPhone ? ` at ${E.phone}` : ''}">${icon('phone', 18)}<span class="lbl">${E.phone}</span></a>
  </div>
</header>

<main id="main">
<section class="hero" id="top">
  <div class="wrap hero-grid">
    <div>
      <span class="rating"><span class="g">G</span>${STARS}<span>4.9 rating · 120+ reviews</span></span>
      <h1>Fast, reliable ${E.tradeLower} in <em>${E.city}</em></h1>
      <p class="lead">${E.name} is your local team of licensed ${E.noun}. Honest quotes, tidy work and a crew that shows up when we say we will.</p>
      <div class="ctas">
        <a class="btn btn-primary" href="${E.phoneHref}">${icon('phone', 18)} Call now</a>
        <a class="btn btn-ghost" href="#quote">Get a free quote</a>
      </div>
      <ul class="ticks">
        <li>${icon('check', 18)} Licensed &amp; insured</li>
        <li>${icon('check', 18)} Upfront pricing</li>
        <li>${icon('check', 18)} Serving ${E.city} &amp; area</li>
      </ul>
    </div>
    <div class="visual" role="img" aria-label="${E.trade} service illustration">
      <div class="vtitle"><small>${esc(profile.emergency)}</small>${E.name}</div>
      <div class="big-ic">${icon(profile.icon, 340)}</div>
      <div class="float a"><span class="fi">${icon('check', 20)}</span><span><strong>Job completed</strong><small>${esc(profile.services[0].title)} · ${E.city}</small></span></div>
      <div class="float b"><span class="dot"></span><span><strong>Booking this week</strong><small>Same-day slots available</small></span></div>
    </div>
  </div>
</section>

<div class="strip" aria-label="At a glance">
  <div class="wrap">
    <div><b>4.9★</b><span>Average Google rating</span></div>
    <div><b>15+ yrs</b><span>Serving the Lower Mainland</span></div>
    <div><b>Same day</b><span>Service when you need it</span></div>
    <div><b>100%</b><span>Workmanship guarantee</span></div>
  </div>
</div>

<section id="services">
  <div class="wrap">
    <div class="sec-head">
      <span class="tag">Our services</span>
      <h2>${E.trade} services for ${E.city} homes &amp; businesses</h2>
      <p>From quick repairs to full installs — one call and we take care of it.</p>
    </div>
    <div class="svc-grid">${servicesHtml}
    </div>
  </div>
</section>

<section class="why" id="why">
  <div class="wrap">
    <div class="sec-head">
      <span class="tag">Why us</span>
      <h2>Why homeowners choose ${E.name}</h2>
      <p>No runaround, no surprise bills. Just good work from people who care about their reputation in ${E.city}.</p>
    </div>
    <div class="why-grid">${why}
    </div>
  </div>
</section>

<section id="reviews">
  <div class="wrap">
    <div class="rev-top sec-head" style="max-width:none">
      <div style="max-width:560px">
        <span class="tag">Reviews</span>
        <h2>What our customers say</h2>
      </div>
      <div class="score"><b>4.9</b><span>${STARS}<small>Based on 120+ Google reviews</small></span></div>
    </div>
    <div class="rev-grid">${reviews}
    </div>
    <p class="note">Sample reviews shown for this preview — your real Google reviews would appear here.</p>
  </div>
</section>

<section id="area" style="padding-top:0">
  <div class="area-card">
    <div>
      <span class="tag">Service area</span>
      <h2>Proudly serving ${E.city} &amp; nearby</h2>
      <p>Based locally, so we get to you fast. Not sure if we cover your street? Just call.</p>
    </div>
    <ul class="area-list">${areaHtml}</ul>
  </div>
</section>

<section id="quote">
  <div class="wrap quote-grid">
    <div>
      <span class="tag">Free quote</span>
      <div class="sec-head" style="margin-bottom:0">
        <h2>Get a free, no-pressure quote</h2>
        <p>Tell us what’s going on and we’ll get back to you the same business day.</p>
      </div>
      <ul class="contact-list">
        <li><a href="${E.phoneHref}"><span class="ci">${icon('phone', 18)}</span>${E.phone}</a></li>${
          hasEmail ? `\n        <li><a href="mailto:${E.email}"><span class="ci">${icon('mail', 18)}</span>${E.email}</a></li>` : ''
        }
      </ul>
    </div>
    <form class="quote" id="quote-form" novalidate>
      <div class="row">
        <label>Your name<input name="name" autocomplete="name" required /></label>
        <label>Phone<input name="phone" type="tel" autocomplete="tel" required /></label>
      </div>
      <div class="row">
        <label>Email<input name="email" type="email" autocomplete="email" /></label>
        <label>Service needed<select name="service">${serviceOptions}<option>Something else</option></select></label>
      </div>
      <label>Neighbourhood<input name="area" placeholder="e.g. ${E.city}" /></label>
      <label>Tell us about the job<textarea name="message" placeholder="What’s happening, and when works for you?"></textarea></label>
      <button class="btn btn-primary" type="submit">Request my free quote</button>
      <div class="demo-msg" id="demo-msg" role="status" aria-live="polite" hidden>
        <strong>Thanks! This is a demo.</strong>
        On your live site, this request would go straight to your phone and inbox — and the customer would get an instant text confirmation.
      </div>
    </form>
  </div>
</section>
</main>

<footer>
  <div class="wrap">
    <div class="fgrid">
      <div>
        <h2>${E.name}</h2>
        <p>Licensed &amp; insured ${E.tradeLower} serving ${E.city} and the Lower Mainland.</p>
      </div>
      <div>
        <h3>Contact</h3>
        <ul>
          <li><a href="${E.phoneHref}">${E.phone}</a></li>${hasEmail ? `\n          <li><a href="mailto:${E.email}">${E.email}</a></li>` : ''}
          <li>Mon – Sat, 7am – 7pm</li>
        </ul>
      </div>
      <div>
        <h3>Service area</h3>
        <ul>${area.slice(0, 5).map(a => `<li>${esc(a)}</li>`).join('')}</ul>
      </div>
    </div>
    <div class="legal">© ${year} ${E.name}. All rights reserved.</div>
  </div>
</footer>

<div class="callbar">
  <a class="btn btn-primary" href="${E.phoneHref}">${icon('phone', 18)} Call now</a>
  <a class="btn btn-dark" href="#quote">Free quote</a>
</div>

<a class="demo-badge" href="https://nodeaxis.ca/audit" target="_blank" rel="noopener"><i aria-hidden="true"></i>Demo by NodeAxis — preview expires in 30 days</a>

<script>
(function(){
  var f=document.getElementById('quote-form'),m=document.getElementById('demo-msg');
  if(!f||!m)return;
  f.addEventListener('submit',function(e){e.preventDefault();m.hidden=false;m.scrollIntoView({block:'nearest',behavior:'smooth'});});
})();
</script>
</body>
</html>`;
}
