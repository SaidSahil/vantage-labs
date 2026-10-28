// Single source of truth for the trades offer — copy, tiers and prices.
// Change prices/wording here; every page reads from this file.

export const business = {
  name: 'NodeAxis',
  city: 'Surrey',
  region: 'BC',
  serviceArea: ['Surrey', 'South Surrey', 'White Rock', 'Delta', 'Langley', 'Cloverdale', 'Fleetwood', 'Newton'],
  phoneDisplay: '778-240-8911',
  phoneHref: 'tel:+17782408911',
  email: 'info@nodeaxis.ca',
  hours: 'Mon – Sat, 8am – 6pm',
}

export const promise = {
  headline: 'More calls. More 5-star reviews. Less paperwork.',
  sub: 'NodeAxis helps Surrey trades get found on Google, answer every lead, and spend less time on admin. Local, in person, no tech talk.',
  cta: 'Get your free local audit',
  ctaHref: '/audit',
}

export const trades = ['Plumbing', 'HVAC', 'Roofing', 'Electrical', 'Landscaping', 'General contracting', 'Other trade']

export const problems = [
  {
    title: 'Missed calls go to the next guy',
    body: "You're on a job, the phone rings, it goes to voicemail. Most people don't leave one — they call the next company on Google.",
  },
  {
    title: 'Great work, almost no reviews',
    body: 'Most Surrey trades we checked have fewer than 20 Google reviews. Homeowners pick the company with more stars, not the better tradesperson.',
  },
  {
    title: 'Admin eats your evenings',
    body: 'Quotes, invoices, follow-ups and job notes scattered across texts, paper and Excel. Hours every week that nobody pays you for.',
  },
]

export type Tier = {
  id: string
  name: string
  price: string
  cadence: string
  pitch: string
  includes: string[]
  featured?: boolean
}

export const tiers: Tier[] = [
  {
    id: 'audit',
    name: 'Free Local Audit',
    price: '$0',
    cadence: 'no obligation',
    pitch: 'We check how you show up on Google and test how your calls get answered — then walk you through it in person.',
    includes: [
      'Google Business Profile check',
      'Review count & rating vs. local competitors',
      'Website speed & mobile check',
      'Missed-call test',
      'One-page report, explained face to face',
    ],
  },
  {
    id: 'starter',
    name: 'Get Found',
    price: '$590',
    cadence: 'one-time',
    pitch: 'Fix the basics so homeowners find you and trust you.',
    includes: [
      'Google Business Profile overhaul',
      'Review-request system (text + QR card)',
      'Simple, fast website if you need one',
      'Service-area pages for Surrey neighbourhoods',
    ],
  },
  {
    id: 'growth',
    name: 'Never Miss a Lead',
    price: '$249',
    cadence: 'per month',
    pitch: 'Every call, text and form answered — and a monthly report showing what it brought in.',
    includes: [
      'Missed-call text-back',
      'Automatic review requests after every job',
      'All leads in one inbox',
      'Monthly report: calls, leads, reviews gained',
      'Local support — we come to you',
    ],
    featured: true,
  },
  {
    id: 'systems',
    name: 'Custom Systems',
    price: 'Quoted',
    cadence: 'per project',
    pitch: 'Tools built around how your crew actually works.',
    includes: [
      'Quote & job tracker',
      'Online booking',
      'Invoice and paperwork automation',
      'Hiring pages for crew',
    ],
  },
]

export const steps = [
  { title: 'Free audit', body: 'We look at your Google presence, reviews and call handling, then meet you to go through it.' },
  { title: 'Quick fixes', body: 'We fix your profile, set up review requests and plug the missed-call gap — usually within a week.' },
  { title: 'Always answered', body: 'Missed-call text-back and review requests run on autopilot after every job.' },
  { title: 'Monthly results', body: 'Every month you get a simple report: calls answered, leads captured, reviews gained.' },
]

// Real findings from our Oct 2026 Google Maps scan of Surrey businesses (top results per trade).
export const localStats = [
  { value: '83%', label: 'of Surrey plumbers we checked have fewer than 20 Google reviews' },
  { value: '1', label: 'median Google review count for Surrey plumbers' },
  { value: '58%', label: 'of Surrey HVAC companies have fewer than 20 reviews' },
]

export const faqs = [
  {
    q: 'Do you actually meet in person?',
    a: "Yes. We're based in Surrey and meet clients at their shop, office or job site anywhere in Surrey, Delta, Langley and White Rock.",
  },
  {
    q: 'Do I need a new website?',
    a: "Not always. For most trades, Google Business Profile and reviews bring in more calls than the website. We'll tell you honestly in the audit.",
  },
  {
    q: 'Is there a contract?',
    a: 'No long-term contract. The monthly plan is month-to-month — if it stops paying for itself, cancel any time.',
  },
  {
    q: 'I’m not good with tech. Will I have to learn software?',
    a: "No. We set everything up and run it. You keep doing the work — you'll just get more calls and a short report each month.",
  },
  {
    q: 'How fast will I see results?',
    a: 'Missed-call text-back works from day one. Reviews usually start climbing in the first few weeks once requests go out after every job.',
  },
]
