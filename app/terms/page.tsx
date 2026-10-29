/*
 * ⚠️  LEGAL REVIEW REQUIRED BEFORE LAUNCH
 * These terms were drafted for the trades offer in lib/offer.ts (as of 2026-10-28)
 * but have NOT been reviewed by a lawyer. Have them reviewed by a BC lawyer before
 * the site goes live. In particular confirm:
 *  - payment defaults (50% deposit / balance on delivery / 14-day invoices / late fees)
 *    — these are PLACEHOLDER DEFAULTS chosen by the dev team, not agreed business terms;
 *  - limitation-of-liability cap and wording;
 *  - website/content ownership and what happens to tools (text-back, review requests)
 *    when the monthly plan is cancelled;
 *  - taxes (GST/PST) wording, and CASL/consent obligations for SMS review requests.
 * Prices and tier names are read from lib/offer.ts so they stay in sync.
 */
import LegalShell, { type LegalSection } from '@/components/LegalShell'
import { business, tiers } from '@/lib/offer'

const tier = (id: string) => tiers.find(t => t.id === id) ?? tiers[0]
const audit = tier('audit')
const starter = tier('starter')
const growth = tier('growth')
const systems = tier('systems')

const email = `<a href="mailto:${business.email}">${business.email}</a>`
const phone = `<a href="${business.phoneHref}">${business.phoneDisplay}</a>`

const sections: LegalSection[] = [
  {
    id: 'agreement',
    heading: '1. About these terms',
    body: [
      `These Terms of Service ("Terms") apply when you use <strong>nodeaxis.ca</strong> (the "Site") or buy services from NodeAxis ("NodeAxis", "we", "us"), a business based in ${business.city}, British Columbia, Canada. "You" means the person or business using the Site or our services.`,
      'By using the Site, requesting an audit or paying for a service, you agree to these Terms. If we give you a written quote or proposal, it forms part of our agreement; if it conflicts with these Terms, the quote or proposal wins for that work.',
    ],
  },
  {
    id: 'services',
    heading: '2. Our services',
    body: [
      'We offer the following services. What\'s included in each is described on our <a href="/services">Services page</a>; anything extra is confirmed in writing before we start.',
      [
        `<strong>${audit.name}</strong> (${audit.price}, ${audit.cadence}) — a review of your Google presence, reviews, website and call handling, explained in person.`,
        `<strong>${starter.name}</strong> (${starter.price}, ${starter.cadence}) — a one-time project to fix the basics, such as your Google Business Profile, a review-request setup and, if you need one, a simple website.`,
        `<strong>${growth.name}</strong> (${growth.price} ${growth.cadence}) — an ongoing monthly plan including missed-call text-back, automatic review requests, a shared lead inbox, a monthly report and local support.`,
        `<strong>${systems.name}</strong> (${systems.price.toLowerCase()} ${systems.cadence}) — custom tools such as quote and job trackers, booking or invoice automation, priced in a written quote.`,
      ],
      'Prices on the Site are in Canadian dollars and do not include applicable taxes (GST/PST), which are added to your invoice. We may change our prices for new orders at any time; we\'ll give monthly-plan clients at least 30 days\' notice of a price change.',
    ],
  },
  {
    id: 'free-audit',
    heading: '3. The free audit',
    body: [
      'The free audit costs nothing and you are under <strong>no obligation</strong> to buy anything afterwards. You keep the report. As part of the audit we may look at your public Google listing, reviews and website, and make a test call or text to your business line to check how missed calls are handled.',
      'The audit reflects what we can see at the time and is our honest opinion — not a guarantee of results.',
    ],
  },
  {
    id: 'one-time-payments',
    heading: '4. One-time projects: payment',
    body: [
      'Unless your written quote says otherwise, these default terms apply to one-time work (including Get Found and Custom Systems):',
      [
        '<strong>50% deposit</strong> to book the work, due before we start;',
        '<strong>remaining 50% on delivery</strong>, when the agreed work is completed and handed over;',
        'invoices are due within <strong>14 days</strong>;',
        'if an invoice is overdue, we may pause work until it is paid.',
      ],
      'The deposit covers time we reserve and work we begin, so it is non-refundable once work has started. If you cancel before we start, we\'ll refund the deposit in full. Changes you ask for that go beyond the agreed scope are quoted separately before we do them.',
    ],
  },
  {
    id: 'monthly-plan',
    heading: '5. Monthly plan: billing and cancelling',
    body: [
      `The ${growth.name} plan is billed <strong>monthly in advance</strong>, starting on the day the plan goes live. It is <strong>month-to-month</strong> — there is no long-term contract.`,
      [
        'You can cancel at any time by email, phone or in person. Cancellation takes effect at the <strong>end of your current billing period</strong>; you won\'t be billed again after that.',
        'We don\'t give partial refunds for the rest of a month you\'ve already paid for, but the service keeps running until that month ends.',
        'If a payment fails and isn\'t fixed within 14 days of us telling you, we may pause the plan.',
        `We may end the plan with 30 days' notice, or straight away if these Terms are seriously breached (for example, a request to post fake reviews).`,
      ],
      'When the plan ends, we switch off the tools we run for you (such as missed-call text-back and automatic review requests) and help you take over anything that stays with you, such as your Google Business Profile access and your list of leads.',
    ],
  },
  {
    id: 'your-responsibilities',
    heading: '6. Your responsibilities',
    body: [
      'To do good work for you, we rely on you to:',
      [
        'give us accurate, up-to-date information about your business — name, services, service area, hours, licences and contact details;',
        'give us the access we need, such as manager access to your <strong>Google Business Profile</strong>, your website or domain, and any phone or texting setup, and keep your own passwords secure;',
        'make sure you have the right to use any photos, logos and text you give us;',
        'only ask us to send review requests or text messages to your own customers, who have dealt with your business and have not asked you to stop contacting them;',
        'reply to your leads and customers — we make sure they reach you, but the job is yours to win;',
        'respond to our questions and approvals within a reasonable time. Delays on your side may push back delivery dates.',
      ],
    ],
  },
  {
    id: 'reviews',
    heading: '7. Reviews: we play by the rules',
    body: [
      'Our review service only <strong>asks real customers</strong> for honest feedback after a job. To keep your business safe on Google and within the law, we follow Google\'s review policies. That means we will not:',
      [
        'write, buy or post fake reviews, or reviews from people who weren\'t customers;',
        'offer customers discounts, gifts or other incentives in exchange for reviews;',
        'ask only happy customers for reviews while filtering out others ("review gating");',
        'pressure customers or post reviews on their behalf.',
      ],
      'You agree not to ask us, or anyone else, to do any of these things for your business.',
    ],
  },
  {
    id: 'no-guarantees',
    heading: '8. Results: no guarantees',
    body: [
      'We work hard to get you more calls and more reviews, and our monthly report shows you exactly what happened. But we don\'t control Google, your customers or your market, so we <strong>cannot guarantee</strong> any particular search ranking, map position, number or rating of reviews, call or lead volume, or revenue.',
      'Any examples, statistics or estimates on the Site or in an audit are for illustration and are not a promise of your results.',
    ],
  },
  {
    id: 'third-party-platforms',
    heading: '9. Third-party platforms',
    body: [
      'Our services depend on platforms we don\'t own, including Google (Search, Maps and Business Profile), phone and SMS providers, website hosts and domain registrars. Those platforms have their own terms and can change their rules, features, prices or availability, suspend listings, filter or remove reviews, or delay or block messages at any time.',
      'We are not responsible for what those platforms do, but we\'ll tell you when a change affects you and help you deal with it. Some platform fees (for example a domain name) may be billed to you directly or passed through at cost — we\'ll tell you upfront.',
    ],
  },
  {
    id: 'ownership',
    heading: '10. Who owns what',
    body: [
      [
        '<strong>Your content stays yours.</strong> Your business name, logo, photos, text, customer list and leads belong to you. You give us permission to use them only to provide our services.',
        '<strong>Your Google Business Profile is yours.</strong> You remain the owner; we only work as a manager on it, and you can remove our access at any time.',
        '<strong>Websites we deliver.</strong> Once a one-time project is paid in full, you own the finished website design and content we made for you, and we\'ll hand over the files and access on request. Until it\'s paid in full, we keep ownership.',
        '<strong>Our tools and know-how.</strong> We keep ownership of our own templates, code libraries, processes and the software we use to run monthly services (such as text-back and review-request systems). You can use them while your plan is active; they don\'t transfer to you.',
      ],
      'Unless you tell us not to, we may mention that you are a client and show the work we did for you (without private information) in our portfolio.',
    ],
  },
  {
    id: 'site-use',
    heading: '11. Using the Site',
    body: [
      'Please don\'t misuse the Site — for example by trying to break into it, overloading it, scraping it, or submitting spam or false information through our forms. Content on the Site is owned by NodeAxis or used with permission and can\'t be copied for commercial use without our OK.',
      'Demo websites we share with businesses are samples only. They expire after 30 days and are not offers to sell the business\'s name or brand to anyone.',
      'How we handle personal information is explained in our <a href="/privacy">Privacy Policy</a>.',
    ],
  },
  {
    id: 'liability',
    heading: '12. Limits of our liability',
    body: [
      'The Site is provided "as is". To the extent the law allows:',
      [
        'we aren\'t liable for indirect or consequential losses, such as lost profits, lost jobs, lost data or loss of reputation;',
        'we aren\'t liable for problems caused by third-party platforms (section 9), by information or access you gave us, or by events outside our reasonable control (such as outages or natural disasters);',
        'our total liability for any claim connected to our services is limited to the amount you paid us for the service in question in the <strong>12 months</strong> before the claim.',
      ],
      'Nothing in these Terms limits liability that can\'t be limited by law. You agree to be responsible for claims that arise from content you gave us or instructions you asked us to follow, such as using photos you didn\'t have the rights to.',
    ],
  },
  {
    id: 'law',
    heading: '13. Governing law and disputes',
    body: [
      'These Terms are governed by the laws of <strong>British Columbia</strong> and the federal laws of Canada that apply there. If we have a disagreement, let\'s talk first — most things can be sorted out over a coffee. If we can\'t resolve it, the courts of British Columbia will have exclusive jurisdiction.',
    ],
  },
  {
    id: 'changes',
    heading: '14. Changes and general terms',
    body: [
      'We may update these Terms from time to time; the "Last updated" date shows the current version. Changes apply to new orders and, for monthly plans, from your next billing period after we let you know. If any part of these Terms can\'t be enforced, the rest still applies. Not enforcing a term right away doesn\'t mean we\'ve given it up.',
    ],
  },
  {
    id: 'contact',
    heading: '15. Contact',
    body: [
      `Questions about these Terms? Email ${email} or call ${phone} (${business.hours}). We're based in ${business.city}, BC, and happy to go through anything in person.`,
    ],
  },
]

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms of Service"
      intro="The rules for using our site and working with us — free audit, one-time projects and the monthly plan. Short, plain and fair."
      updated="October 28, 2026"
      sections={sections}
    />
  )
}
