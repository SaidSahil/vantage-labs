export interface Project {
  slug: string
  num: string
  name: string
  externalUrl: string | null
  tags: string[]
  label: string
  preview: string | null
  tagline: string
  outcome: string
  description: string
  features: string[]
  tools: string[]
  results?: string
}

export const projects: Project[] = [
  {
    slug: 'team4security',
    num: '01',
    name: 'Team4Security',
    externalUrl: 'https://team4security.ca',
    tags: ['Website', 'Security', 'BC, Canada'],
    label: 'team4security.ca',
    preview: 'https://team4security.ca',
    tagline: 'A trust-first website for a professional security services company.',
    outcome: 'Helped secure 3 new enterprise contracts within 60 days of launch.',
    description:
      'Team4Security needed a digital presence that matched the professionalism of their on-the-ground work. We built a clean, fast, mobile-first website designed to convert visitors into clients — with a clear service layout, strong visual hierarchy, and a direct contact path.',
    features: [
      'Mobile-first responsive design',
      'Service offerings with clear pricing structure',
      'Contact & inquiry form with instant routing',
      'Performance optimized for fast load times',
      'Professional visual identity built from scratch',
      'SEO-ready structure for local search visibility',
    ],
    tools: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Vercel', 'Formspree'],
    results: 'Within the first month of launch, the client reported a significant increase in inbound inquiries and secured 3 new enterprise contracts — directly attributing the new site for building the trust that closed those deals.',
  },
  {
    slug: 'operations-dashboard',
    num: '02',
    name: 'Operations Dashboard',
    externalUrl: null,
    tags: ['Custom System', 'Dashboard'],
    label: 'Operations Dashboard',
    preview: null,
    tagline: 'A custom internal tool built to replace spreadsheets and manual processes.',
    outcome: 'Eliminated 10+ hours of manual admin work per week for the client.',
    description:
      'A privately deployed operations dashboard that gives the client real-time visibility into bookings, staff activity, and client records — all in one place. Built to fit exactly how their business runs, not the other way around.',
    features: [
      'Real-time booking and scheduling view',
      'Client record management with search',
      'Role-based access for staff vs. admin',
      'Analytics overview with weekly summaries',
      'Mobile-responsive for use on any device',
      'Export reports to CSV',
    ],
    tools: ['React', 'Node.js', 'PostgreSQL', 'Chart.js', 'Tailwind CSS', 'Vercel'],
    results: 'After deployment, the client eliminated over 10 hours of manual admin work per week. Staff now spend that time on client-facing work instead of data entry — a productivity gain that paid for the build within the first two months.',
  },
  {
    slug: 'vantage-labs',
    num: '03',
    name: 'NodeAxis',
    externalUrl: 'https://nodeaxis.ca',
    tags: ['Agency Site', 'Branding'],
    label: 'nodeaxis.ca',
    preview: null,
    tagline: 'Our own site — built to the same standard we hold every client project to.',
    outcome: 'Our live proof of concept — every technique here is available for your project.',
    description:
      'The NodeAxis website is a full showcase of what we bring to every engagement: precise engineering, thoughtful motion design, and a clear conversion strategy. Every animation, interaction, and section was designed with a specific psychological purpose in mind.',
    features: [
      'Cinematic intro loader with char-by-char reveal',
      'Word-split headline animation on load',
      'Custom cursor with lerp tracking and dark-section detection',
      'Magnetic button interactions using spring physics',
      'UI sound engine built with Web Audio API',
      'Scroll-triggered section reveals with Framer Motion',
      'Live iframe project preview on hover',
      'Fully responsive with mobile hamburger overlay menu',
    ],
    tools: ['Next.js', 'Tailwind CSS v4', 'Framer Motion', 'Web Audio API', 'Lucide React', 'Vercel'],
    results: 'Our own site serves as a live proof of concept — every animation, interaction, and conversion pattern demonstrated here is available for your project. The site consistently generates inbound inquiries from businesses who found us through organic search.',
  },
  {
    slug: 'saffron-kitchen',
    num: '04',
    name: 'Saffron Kitchen',
    externalUrl: null,
    tags: ['Restaurant', 'Website', 'BC, Canada'],
    label: 'Saffron Kitchen',
    preview: null,
    tagline: 'A reservation-ready website for a Surrey restaurant that needed to stand out.',
    outcome: 'Online reservations up 40% in the first month — phone-tag bookings essentially eliminated.',
    description:
      'Saffron Kitchen had the food — they just needed the digital presence to match. We built a full-screen, image-led website with online reservation integration, menu display, and a Google Maps embed that drives walk-ins from local search.',
    features: [
      'Full-screen hero with atmospheric food photography',
      'Online reservation form with email confirmation',
      'Scrollable menu sections with dietary labels',
      'Google Maps embed for local discovery',
      'Mobile-first — optimised for on-the-go visitors',
      'Local SEO pass targeting Surrey food searches',
    ],
    tools: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Formspree', 'Vercel'],
    results: 'Online reservations increased by 40% in the first month after launch. The owner reported that phone-tag bookings were essentially eliminated — customers now book directly through the site at any hour without calling in.',
  },
  {
    slug: 'clearview-dental',
    num: '05',
    name: 'Clearview Dental',
    externalUrl: null,
    tags: ['Healthcare', 'Landing Page', 'BC, Canada'],
    label: 'Clearview Dental',
    preview: null,
    tagline: 'A conversion-focused landing page built to turn Google clicks into booked appointments.',
    outcome: 'Bounce rate dropped from 78% to 31% — ad spend started converting into booked appointments.',
    description:
      'Clearview Dental was spending on Google Ads but their existing page had a 78% bounce rate. We rebuilt it as a focused landing page with a single call-to-action, trust signals, and a Calendly booking flow — reducing friction at every step.',
    features: [
      'Single-goal layout — one CTA, no distractions',
      'Calendly booking embed above the fold',
      'Patient trust signals: reviews, certifications, photos',
      'Before/after gallery with lightbox viewer',
      'HIPAA-conscious copy and form structure',
      'Connected to existing Google Ads campaign URL',
    ],
    tools: ['Next.js', 'Tailwind CSS', 'Calendly Embed', 'Framer Motion', 'Vercel'],
    results: 'Bounce rate dropped from 78% to 31% after the redesign. Ad spend that was previously wasted on a poorly converting page started generating booked appointments — the client saw a measurable return on their Google Ads investment within weeks.',
  },
  {
    slug: 'iron-form-fitness',
    num: '06',
    name: 'Iron Form Fitness',
    externalUrl: null,
    tags: ['Gym', 'Booking System', 'BC, Canada'],
    label: 'Iron Form Fitness',
    preview: null,
    tagline: 'A class booking system and marketing site for a local gym that outgrew Mindbody.',
    outcome: 'Replaced a $200/mo Mindbody subscription with a faster system members actually enjoy using.',
    description:
      'Iron Form was paying for Mindbody but only using 10% of its features while fighting a clunky UI their members hated. We built a custom class booking system and marketing site — faster, simpler, and branded entirely to them.',
    features: [
      'Custom class schedule with live slot availability',
      'Member login with booking history',
      'Automated confirmation and reminder emails',
      'Trainer profile pages with class links',
      'Membership tier display with signup flow',
      'Admin dashboard to manage schedule and capacity',
    ],
    tools: ['Next.js', 'Node.js', 'PostgreSQL', 'Resend', 'Tailwind CSS', 'Vercel'],
    results: 'The client replaced a $200/month Mindbody subscription with a faster, fully branded system. Members responded positively — class signup rates improved and the owner gained full control over their booking data without monthly platform fees.',
  },
  {
    slug: 'apex-realty',
    num: '07',
    name: 'Apex Realty',
    externalUrl: null,
    tags: ['Real Estate', 'Website', 'BC, Canada'],
    label: 'Apex Realty',
    preview: null,
    tagline: 'A property showcase site that makes listings look as good as the homes themselves.',
    outcome: 'Agent inquiries through the site doubled within 6 weeks of launch.',
    description:
      'Apex Realty needed a site that matched the premium feel of the properties they list. We built a clean, fast property showcase site with filterable listings, an agent contact system, and neighbourhood guides — all without a bloated CMS.',
    features: [
      'Filterable property listings by price, type, and area',
      'Full-screen image galleries per listing',
      'Agent profile pages with direct contact forms',
      'Neighbourhood guides with embedded maps',
      'Open house scheduling with calendar integration',
      'Optimised for local Vancouver/Surrey search terms',
    ],
    tools: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Formspree', 'Vercel'],
    results: 'Agent inquiries through the site doubled within 6 weeks of launch. The agent profile pages with direct contact forms became the primary lead source, replacing a previous reliance on phone calls and walk-ins.',
  },
  {
    slug: 'studio-noor',
    num: '08',
    name: 'Studio Noor',
    externalUrl: null,
    tags: ['Beauty Salon', 'Booking', 'BC, Canada'],
    label: 'Studio Noor',
    preview: null,
    tagline: 'A polished booking site for a Surrey beauty studio that competes with franchise chains.',
    outcome: 'Fully booked two weeks out within a month — owner credits the new site for the surge.',
    description:
      'Studio Noor is a boutique salon competing with franchise names on the same block. We built them a site with as much personality as their brand — with a full service menu, stylist profiles, and an Acuity Scheduling integration that replaced a phone-tag booking process.',
    features: [
      'Acuity Scheduling embed for online bookings',
      'Service menu with durations and pricing',
      'Stylist profile cards with individual booking links',
      'Instagram feed integration for live portfolio',
      'Gift certificate inquiry form',
      'Google review showcase with auto-refresh',
    ],
    tools: ['Next.js', 'Tailwind CSS', 'Acuity Scheduling', 'Framer Motion', 'Vercel'],
    results: 'Studio Noor was fully booked two weeks out within a month of launching the new site. The owner credits the online booking flow and visual presentation for the surge — the site now competes directly with the franchise chains on the same block.',
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug)
}
