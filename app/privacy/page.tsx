/*
 * ⚠️  LEGAL REVIEW REQUIRED BEFORE LAUNCH
 * This privacy policy was drafted to match what the code actually does (as of
 * 2026-10-28) but it has NOT been reviewed by a lawyer. Have it reviewed by a
 * BC/Canadian privacy lawyer before the site goes live, and re-check it whenever
 * data handling changes (new form fields, new vendors, SMS/missed-call tools,
 * analytics changes, retention jobs).
 *
 * Facts this text relies on (keep in sync with the code):
 *  - Form: components/AuditForm.tsx → app/api/contact/route.ts → Lead table (Neon
 *    Postgres via Prisma) + Formspree email. Lead also stores page path, HTTP
 *    referrer, country (x-vercel-ip-country) and, only with analytics consent, session id.
 *  - Rate limit: client IP held in serverless memory for ~10 min (lib/rateLimit.ts).
 *  - Analytics only after consent ('nodeaxis-cookie-consent' === 'accepted'):
 *    Vercel Analytics (components/AnalyticsGate.tsx), Visit + SectionEngagement
 *    tables (components/Tracker.tsx, components/Tracked.tsx, app/api/track/*).
 *  - Browser storage: localStorage 'nodeaxis-theme', 'nodeaxis-cookie-consent';
 *    sessionStorage 'na-session-id' (consent only); admin-only cookie 'na_admin_session'.
 *  - Demo links: app/demo/[slug]/route.ts (n,t,c,p,e,d params; 30-day expiry; noindex);
 *    demo HTML loads Google Fonts (lib/trades-demo.template.ts).
 *  - Retention periods below are POLICY — there is no automated deletion job yet.
 */
import LegalShell, { type LegalSection } from '@/components/LegalShell'
import { business } from '@/lib/offer'
import ConsentControls from './ConsentControls'

const email = `<a href="mailto:${business.email}">${business.email}</a>`
const phone = `<a href="${business.phoneHref}">${business.phoneDisplay}</a>`

const sections: LegalSection[] = [
  {
    id: 'who-we-are',
    heading: '1. Who we are',
    body: [
      `NodeAxis ("NodeAxis", "we", "us") is a small business based in ${business.city}, British Columbia, Canada. We help local trades businesses get found on Google, collect reviews, answer leads and reduce paperwork.`,
      'This policy explains what personal information we collect through <strong>nodeaxis.ca</strong> (the "Site") and in the course of our services, why we collect it, who we share it with, and the choices you have.',
      'We handle personal information in line with Canada\'s <strong>Personal Information Protection and Electronic Documents Act (PIPEDA)</strong> and British Columbia\'s <strong>Personal Information Protection Act (BC PIPA)</strong>, whichever applies.',
    ],
  },
  {
    id: 'what-we-collect',
    heading: '2. What we collect',
    body: [
      { sub: 'When you request a free audit or contact us' },
      'Our audit / contact form asks for:',
      [
        'your name and your business name;',
        'your trade (for example plumbing or HVAC);',
        'a phone number and/or an email address (at least one is required);',
        'your website address (optional);',
        'anything you choose to write in the message box (optional).',
      ],
      'With your submission we also record the page you sent it from, the page that referred you to the Site (if your browser shares it), the date and time, and your approximate country (worked out by our host from your IP address). If you have allowed analytics, we also attach your anonymous session ID so we can see which pages led to the enquiry.',
      'If you phone, text or email us, we keep what you send us and our replies.',
      { sub: 'When you become a client' },
      'To deliver our services we may handle business contact details, billing information, and the access you give us to accounts such as your Google Business Profile, website or phone/text tools. If our services send review requests or missed-call text replies on your behalf, we process your customers\' names and phone numbers only to send those messages for you.',
      { sub: 'Analytics — only if you say yes' },
      'If, and only if, you click <strong>Accept analytics</strong> on the banner shown on your first visit, we measure how the Site is used. See section 5 for exactly what that includes. If you click Decline or ignore the banner, none of this analytics runs.',
      { sub: 'Technical data needed to run the Site' },
      'Like any website, our hosting provider receives your IP address, browser details and the pages requested so it can deliver the Site, keep it secure and troubleshoot errors. To stop spam, our form briefly holds your IP address in server memory (about 10 minutes) to limit repeated submissions; it is not saved to our database.',
    ],
  },
  {
    id: 'how-we-use-it',
    heading: '3. Why we use it',
    body: [
      'We use personal information to:',
      [
        'reply to your enquiry, book and carry out your free audit, and prepare your report;',
        'provide, support and bill for services you sign up for;',
        'send review requests or missed-call replies on a client\'s behalf, when the client has asked us to;',
        'understand which pages and sections of the Site are useful (only with analytics consent);',
        'keep the Site and our records secure and prevent spam or abuse;',
        'meet our legal, tax and accounting obligations.',
      ],
      'We only use your information for these purposes or for purposes you agree to later. <strong>We do not sell or rent personal information</strong>, and we do not use it for third-party advertising.',
    ],
  },
  {
    id: 'consent',
    heading: '4. Your consent',
    body: [
      'When you submit our form, you agree to us using what you send to contact you about your enquiry. You can ask us to stop contacting you at any time.',
      'Analytics is opt-in: it is off until you click Accept analytics. You can change your choice whenever you like using the control below, and it takes effect straight away on this browser.',
      { node: <ConsentControls /> },
      'Withdrawing consent does not affect anything we did before you withdrew it. If you withdraw consent we need to provide a service you have bought, we\'ll explain what that means for the service.',
    ],
  },
  {
    id: 'cookies-storage',
    heading: '5. Cookies, browser storage and analytics',
    body: [
      'The Site does not set advertising or tracking cookies. It uses a few small entries in your browser\'s storage:',
      [
        '<strong>nodeaxis-theme</strong> (local storage) — remembers whether you picked light or dark mode. Stays on your device.',
        '<strong>nodeaxis-cookie-consent</strong> (local storage) — remembers whether you accepted or declined analytics, so we don\'t ask again.',
        '<strong>na-session-id</strong> (session storage, only if you accept analytics) — a random ID that groups page views from one visit. It is cleared when you close the tab.',
      ],
      'Staff who sign in to our private admin area also receive a sign-in cookie (<strong>na_admin_session</strong>); regular visitors never get this cookie.',
      { sub: 'What analytics records (only after you accept)' },
      [
        '<strong>Vercel Web Analytics</strong> — page views, referring site, and general device, browser, operating system and country information, reported to us in aggregate. It does not use cookies.',
        '<strong>Our own visit log</strong> — the page you viewed, the referring page, your approximate location (country, region and city, worked out by our host from your IP address — we do not store the IP address itself), your browser\'s user-agent string, the time, and your session ID.',
        '<strong>Section engagement</strong> — on some pages, roughly how long each section was on screen and how many clicks it received, linked to your session ID.',
      ],
      'We use this to improve the Site. We don\'t use it to identify you, and we don\'t combine it with other sources to build a profile of you.',
    ],
  },
  {
    id: 'demo-links',
    heading: '6. Personalized demo links',
    body: [
      'Sometimes we create a sample website for a local business to show what we could build. These demo links carry the business\'s <strong>public</strong> details — such as business name, trade, city, phone number and email — inside the web address, so the page can show them.',
      'We only use contact details that the business already publishes (for example on its Google listing or website). Demo pages are hidden from search engines, are not saved in our database, and stop working <strong>30 days</strong> after the link is created. Demo pages load fonts from Google Fonts, so Google receives the viewer\'s IP address when one is opened.',
      `If a demo was made for your business and you'd like us not to contact you or not to create one, email ${email} and we'll stop.`,
    ],
  },
  {
    id: 'service-providers',
    heading: '7. Who we share it with',
    body: [
      'We share personal information only with service providers that help us run the Site and our business, and only what they need to do their job:',
      [
        '<strong>Vercel</strong> — hosts the Site and provides Vercel Web Analytics (analytics only with your consent).',
        '<strong>Neon</strong> — hosts our database, which stores form submissions and consented analytics.',
        '<strong>Formspree</strong> — delivers form submissions to our email inbox.',
        '<strong>Google</strong> — Google Fonts on demo pages; and, for clients, Google Business Profile when we manage it on your behalf.',
        '<strong>Our email, phone and text-messaging providers</strong> — to talk with you and, for clients, to send review requests and missed-call replies.',
        '<strong>Accounting and payment providers</strong> — for client billing.',
      ],
      'We may also disclose information if the law requires it, or to protect our rights or someone\'s safety. If NodeAxis is ever sold or merged, records may transfer to the new owner, who must keep protecting them under this policy.',
    ],
  },
  {
    id: 'outside-canada',
    heading: '8. Storage outside Canada',
    body: [
      'Some of our service providers, including Vercel, Neon and Formspree, may store or process information in the <strong>United States</strong> or other countries. While it is there, it is protected by our agreements with those providers but may be accessible to courts, law enforcement and national security authorities of that country under its laws.',
      'By using the Site and our form, you understand your information may be handled outside Canada. You can ask us for more detail about where your information is kept.',
    ],
  },
  {
    id: 'retention',
    heading: '9. How long we keep it',
    body: [
      'We keep personal information only as long as we need it:',
      [
        '<strong>Audit requests and enquiries</strong> — up to <strong>24 months</strong> from our last contact with you, unless you become a client or ask us to delete them sooner.',
        '<strong>Client records</strong> — for as long as you are a client, then billing and tax records for at least <strong>six years</strong>, as Canadian tax law requires. Other client working files are deleted or returned within 24 months of the end of our work together.',
        '<strong>Analytics</strong> (visit log and section engagement) — up to <strong>24 months</strong>, after which it is deleted or reduced to totals that can\'t be linked to a session.',
        '<strong>Rate-limiting IP addresses</strong> — about 10 minutes, in memory only.',
        '<strong>Demo links</strong> — not stored by us; links expire after 30 days.',
      ],
      'Our hosting and service providers keep their own technical logs for limited periods under their own policies.',
    ],
  },
  {
    id: 'security',
    heading: '10. How we protect it',
    body: [
      'We use reasonable safeguards for the sensitivity of the information: encrypted connections (HTTPS), password-protected and rate-limited admin access, access limited to the people who need it, and reputable providers with their own security programs. No system is perfectly secure, but if a breach creates a real risk of significant harm to you, we will notify you and the appropriate privacy regulator as the law requires.',
    ],
  },
  {
    id: 'your-rights',
    heading: '11. Your rights: access, correction and deletion',
    body: [
      'You can ask us to:',
      [
        'tell you what personal information we hold about you and how we\'ve used and shared it;',
        'correct information that is wrong or incomplete;',
        'delete your information, where we don\'t need to keep it for legal reasons;',
        'stop contacting you, or withdraw consent to analytics (see section 4).',
      ],
      `Send your request to ${email}. We may need to confirm your identity. We will respond within <strong>30 days</strong>, and tell you if we need more time or can't fully meet a request and why.`,
    ],
  },
  {
    id: 'complaints',
    heading: '12. Questions and complaints',
    body: [
      `Our privacy contact is the NodeAxis founder, reachable at ${email} or ${phone}. Please contact us first so we can try to fix the problem.`,
      'If you\'re not satisfied, you can contact the <strong>Office of the Information and Privacy Commissioner for British Columbia</strong> (oipc.bc.ca) or the <strong>Office of the Privacy Commissioner of Canada</strong> (priv.gc.ca).',
    ],
  },
  {
    id: 'children',
    heading: '13. Children',
    body: [
      'The Site and our services are for businesses and adults. We don\'t knowingly collect personal information from children under 16.',
    ],
  },
  {
    id: 'changes',
    heading: '14. Changes to this policy',
    body: [
      'We will update this policy when our practices change. The "Last updated" date at the top shows the latest version. If we make a significant change to how we use information you already gave us, we\'ll ask for your consent where required.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      intro="What we collect, why, who sees it and how to get it changed or deleted — in plain language."
      updated="October 28, 2026"
      sections={sections}
    />
  )
}
