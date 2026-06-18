// Blog / Insights content. Each post's body is a list of typed blocks so the
// renderer stays simple and the content stays free of raw HTML soup.
export type PostBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'quote'; text: string }

export interface Post {
  slug: string
  title: string
  description: string
  category: string
  date: string // ISO yyyy-mm-dd
  readingMinutes: number
  excerpt: string
  body: PostBlock[]
}

export const posts: Post[] = [
  {
    slug: 'hand-coded-vs-wordpress',
    title: 'Why hand-coded beats WordPress for a small business website',
    description:
      'Page builders feel cheaper up front. Here is what they actually cost a small business in speed, security, and search rankings — and why a hand-coded site wins over time.',
    category: 'Web Design',
    date: '2026-06-16',
    readingMinutes: 6,
    excerpt:
      'Page builders feel cheaper up front. Here is what they actually cost you in speed, security, and search rankings over time.',
    body: [
      { type: 'p', text: 'WordPress powers a huge share of the web, and for good reason — it is flexible and familiar. But "popular" and "right for your business" are not the same thing. For most small businesses that need a fast, professional marketing site, a hand-coded build is the better long-term decision. Here is why.' },
      { type: 'h2', text: 'Speed is a feature, not a luxury' },
      { type: 'p', text: 'A typical WordPress site loads a theme, a page builder, and a stack of plugins on every visit. Each one adds scripts, stylesheets, and database queries. The result is a page that can take several seconds to become usable — and visitors leave long before that. A hand-coded site ships only the code your pages actually need, so it loads in a fraction of the time.' },
      { type: 'p', text: 'That speed is not just about feel. Google uses page experience and Core Web Vitals as ranking signals. A faster site ranks better and converts more of the traffic it already has.' },
      { type: 'h2', text: 'Fewer moving parts means fewer things to break' },
      { type: 'p', text: 'Every plugin is third-party code you now depend on. Plugins conflict, fall out of date, and are the most common way WordPress sites get hacked. A hand-coded site has no plugin surface to exploit and nothing to silently break after an auto-update.' },
      { type: 'ul', items: [
        'No monthly plugin licences quietly stacking up',
        'No "the site went down after an update" surprises',
        'A dramatically smaller security target',
      ] },
      { type: 'h2', text: 'You own it — completely' },
      { type: 'p', text: 'When we hand off a project, you get the source code and full control of your domain and hosting. You are never locked into a proprietary platform, a monthly builder subscription, or a developer who holds your site hostage.' },
      { type: 'quote', text: 'The cheapest-looking option up front is often the most expensive over three years.' },
      { type: 'h2', text: 'When WordPress does make sense' },
      { type: 'p', text: 'To be fair: if you publish long-form content daily and need non-technical staff editing it constantly, a CMS earns its keep. But for a marketing site, landing page, or booking flow that should be fast, secure, and rank well, hand-coded wins on the metrics that matter.' },
      { type: 'p', text: 'If you are weighing the two for your own business, we are happy to give you a straight answer for your specific situation — no sales pressure.' },
    ],
  },
  {
    slug: 'small-business-website-cost-bc',
    title: 'How much should a small business website cost in BC?',
    description:
      'A clear, no-nonsense breakdown of what a small business website actually costs in British Columbia in 2026 — and what drives the price up or down.',
    category: 'Pricing',
    date: '2026-06-12',
    readingMinutes: 5,
    excerpt:
      'A clear breakdown of what a small business website actually costs in BC in 2026 — and what drives the price up or down.',
    body: [
      { type: 'p', text: 'It is the most common question we get, and most answers online are useless ("it depends!"). So here is a straight one. For a small business in British Columbia, a professional website typically falls into a few clear bands.' },
      { type: 'h2', text: 'The honest ranges' },
      { type: 'ul', items: [
        'Landing page (one focused page, one goal): from $399',
        'Multi-page marketing site (services, about, contact): roughly $600 to $1,000',
        'Site with a booking system, custom forms, or a small dashboard: $1,000 to $2,500',
        'Custom web app or internal system: $2,500 and up, scoped to the work',
      ] },
      { type: 'p', text: 'These are real starting points, not bait. The reason "it depends" is technically true is that a few specific things move the number — so let us name them.' },
      { type: 'h2', text: 'What actually drives the price' },
      { type: 'ul', items: [
        'Number of pages and unique layouts',
        'Whether you need bookings, payments, logins, or other interactive features',
        'How much content and imagery is ready versus needs creating',
        'Integrations (scheduling tools, CRMs, payment processors)',
      ] },
      { type: 'h2', text: 'Watch for the hidden costs' },
      { type: 'p', text: 'A low headline price often hides recurring fees: template licences, page-builder subscriptions, premium plugins, and "maintenance" that is really just keeping the plugins from breaking. Ask any provider for the all-in cost over three years, not just the build price.' },
      { type: 'quote', text: 'A firm quote upfront beats an hourly rate that grows in the dark.' },
      { type: 'h2', text: 'How we price it' },
      { type: 'p', text: 'We quote a fixed price before any work starts — no hourly billing and no surprise invoices. You own the result on delivery, including the source code. If you want a number for your specific project, tell us what you are after and we will give you one.' },
    ],
  },
  {
    slug: 'signs-your-website-is-costing-you-customers',
    title: '5 signs your website is quietly costing you customers',
    description:
      'Your website might be losing business without you knowing. Here are five warning signs to check today — and what each one is really telling you.',
    category: 'Conversion',
    date: '2026-06-08',
    readingMinutes: 5,
    excerpt:
      'Your website might be losing business without you knowing it. Here are five warning signs to check today.',
    body: [
      { type: 'p', text: 'A website that looks "fine" can still be leaking customers every single day. The damage is invisible because the people who bounce never call to tell you why. Here are five signs worth checking now.' },
      { type: 'h2', text: '1. It takes more than three seconds to load' },
      { type: 'p', text: 'Open your site on mobile data, not office wifi. If you are staring at a blank screen or a spinner for more than a few seconds, a large share of visitors are already gone. Speed is the single biggest silent killer of conversions.' },
      { type: 'h2', text: '2. The phone number or "book" button is hard to find' },
      { type: 'p', text: 'Every page should make the next step obvious. If a visitor has to hunt for how to contact you or book, many simply will not bother. Your primary action should be visible without scrolling.' },
      { type: 'h2', text: '3. It looks broken on a phone' },
      { type: 'p', text: 'Most local traffic is mobile. Tiny text, overlapping buttons, or sideways scrolling tell a visitor you are not detail-oriented — and they apply that judgement to your actual service.' },
      { type: 'ul', items: [
        'Text you have to pinch-zoom to read',
        'Buttons too small or too close to tap accurately',
        'Images that spill off the edge of the screen',
      ] },
      { type: 'h2', text: '4. It has not been touched in years' },
      { type: 'p', text: 'A copyright date from three years ago, outdated prices, or services you no longer offer all signal neglect. Visitors quietly wonder whether you are even still in business.' },
      { type: 'h2', text: '5. You have no idea where your leads come from' },
      { type: 'p', text: 'If you cannot see how many people visit, what they click, or where they drop off, you are flying blind. Even simple, privacy-friendly analytics turns guesswork into decisions.' },
      { type: 'quote', text: 'You cannot fix what you cannot see — and most lost customers never say a word.' },
      { type: 'p', text: 'If two or more of these sound familiar, your site is probably costing you more than a rebuild would. A quick audit will tell you exactly where the leaks are.' },
    ],
  },
]

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

// Newest first
export const sortedPosts = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))
