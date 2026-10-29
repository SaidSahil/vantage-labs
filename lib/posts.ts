// Blog / Insights content for Surrey trades owners. Each post's body is a list
// of typed blocks so the renderer stays simple and the content stays free of
// raw HTML soup.
//
// Content rules: no invented statistics. The only local numbers used come from
// `localStats` in lib/offer.ts (our own Oct 2026 Google Maps scan). Any money
// examples are clearly labelled illustrative math, not industry figures.
import { localStats } from '@/lib/offer'

export type PostBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'h3'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'note'; title: string; text: string }

export interface Post {
  slug: string
  title: string
  description: string
  category: string
  date: string // ISO yyyy-mm-dd
  readingMinutes: number
  excerpt: string
  /** Optional cover photo from public/images (see public/images/CREDITS.md). */
  image?: { src: string; alt: string }
  body: PostBlock[]
}

const [plumbersUnder20, plumberMedian, hvacUnder20] = localStats

export const posts: Post[] = [
  {
    slug: 'more-google-reviews-surrey-trades',
    title: 'Why Surrey homeowners call the trade with more Google reviews (and how to get yours)',
    description:
      'Homeowners pick the plumber, roofer or electrician with more Google reviews. Here is why reviews matter so much for Surrey trades, and a simple, honest way to get more of them.',
    category: 'Reviews',
    date: '2026-10-28',
    readingMinutes: 4,
    excerpt:
      'Homeowners pick the trade with more stars, not the better tradesperson. Here is a simple, honest way to close that gap.',
    image: { src: '/images/homeowner-door.jpg', alt: 'A tradesperson at a homeowner’s front door' },
    body: [
      { type: 'p', text: 'Picture a homeowner in Fleetwood with water pooling under the kitchen sink. They pick up their phone, search "plumber near me", and get a map with three companies on it. One has 140 reviews and a 4.8. One has 6 reviews. One has none. They do not know which plumber does the neatest work. They call the one with 140 reviews.' },
      { type: 'p', text: 'That is how most local jobs start now. And it means the best tradesperson does not always win the call — the one with the most visible proof does.' },
      { type: 'h2', text: 'Most Surrey trades have very few reviews' },
      { type: 'p', text: `In October 2026 we ran our own scan of Google Maps, looking at the top results for each trade in Surrey. ${plumbersUnder20.value} of the Surrey plumbers we checked had fewer than 20 Google reviews, and the median review count for Surrey plumbers was just ${plumberMedian.value}. For HVAC it was a bit better, but ${hvacUnder20.value} of the companies we checked were still under 20 reviews.` },
      { type: 'p', text: 'These are small numbers from our own check, not a national survey. But the takeaway is simple: in most Surrey trades, the bar is low. You do not need hundreds of reviews to stand out. A steady trickle of honest reviews puts you ahead of most of the companies showing up next to you.' },
      { type: 'h2', text: 'Why reviews matter so much' },
      { type: 'p', text: 'Reviews do two jobs at once.' },
      { type: 'ul', items: [
        'They help you show up. Google says openly that the number of reviews and your rating are part of how it decides which local businesses to show. More reviews is one of the few things you can actually do something about.',
        'They help you get picked. Once a homeowner sees your name, reviews are how they decide whether to trust a stranger in their house. Recent reviews that mention the actual job ("fixed our furnace the same day") carry the most weight.',
      ] },
      { type: 'quote', text: 'Your best work is already happening. Reviews are just how the next customer finds out about it.' },
      { type: 'h2', text: 'Why good trades still have few reviews' },
      { type: 'p', text: 'It is almost never because customers are unhappy. It is because nobody asked at the right moment. The job ends, you pack up, you drive to the next one. By the time you remember, the customer has moved on too. Asking feels awkward, and there is no system — so it just does not happen.' },
      { type: 'h2', text: 'How to get more reviews, the honest way' },
      { type: 'h3', text: '1. Ask on the day, while the customer is happy' },
      { type: 'p', text: 'The best moment is right after the job is done and the customer has seen the result — the heat is back on, the leak has stopped. A simple line works: "If you were happy with today, a Google review really helps a small business like ours."' },
      { type: 'h3', text: '2. Make it one tap' },
      { type: 'p', text: 'Nobody is going to search for your business and hunt for the review button. Get your direct review link from your Google Business Profile (look for "Ask for reviews" or "Share review form"). Then put it where customers can use it in seconds:' },
      { type: 'ul', items: [
        'A short text message sent the same day, with the link in it',
        'A small card with a QR code you leave on the counter or with the invoice',
        'A line at the bottom of every invoice and email',
      ] },
      { type: 'h3', text: '3. Send one friendly reminder' },
      { type: 'p', text: 'Many people mean to leave a review and forget. One polite follow-up a few days later is fine. More than that starts to feel pushy, so stop there.' },
      { type: 'h3', text: '4. Reply to every review' },
      { type: 'p', text: 'Thank people by name and mention the job. For the odd negative review, stay calm, keep it short and offer to sort it out offline. Future customers read your replies as closely as the reviews themselves.' },
      { type: 'h2', text: 'What not to do' },
      { type: 'p', text: 'Google has clear rules here, and breaking them can get reviews removed or your profile flagged. Do not buy reviews. Do not offer discounts or gifts in exchange for reviews. Do not have friends and family post reviews for work you did not do. And do not only send the review link to customers you think will be happy — Google calls that "review gating" and does not allow it. Ask everyone. Honest reviews from real jobs are the only kind worth having.' },
      { type: 'note', title: 'The short version', text: 'Ask every customer, on the day, with a one-tap link. Follow up once. Reply to everything. Do that after every job and your review count takes care of itself.' },
      { type: 'h2', text: 'Want to see where you stand?' },
      { type: 'p', text: 'Our free local audit compares your review count and rating with the trades showing up next to you in Surrey, and we walk you through it in person. If you want, we can also set up automatic review requests so a text goes out after every job without you thinking about it.' },
    ],
  },
  {
    slug: 'cost-of-a-missed-call-plumbing-hvac',
    title: 'What a missed call really costs a plumbing or HVAC business',
    description:
      'When you are on a job and the phone goes to voicemail, the caller usually just calls the next company. Here is simple math to work out what missed calls cost your business, and how to stop losing them.',
    category: 'Calls',
    date: '2026-10-27',
    readingMinutes: 4,
    excerpt:
      'You are under a sink, the phone rings, it goes to voicemail. Here is simple math for what that call was worth.',
    image: { src: '/images/phone-call.jpg', alt: 'A tradesperson holding a clipboard while on the phone' },
    body: [
      { type: 'p', text: 'You are halfway through a furnace install. Your hands are full, the phone buzzes in your pocket, and it goes to voicemail. You tell yourself you will call back at lunch. By lunch, that homeowner has already booked someone else.' },
      { type: 'p', text: 'Every trades owner knows this happens. Few have ever sat down and worked out what it costs. So let us do that, with your own numbers.' },
      { type: 'h2', text: 'Why missed calls hurt trades more than most' },
      { type: 'p', text: 'People calling a plumber or HVAC company usually have a problem right now — no heat, no hot water, a leak. They are not shopping around for next month. They are going down the list on Google until somebody picks up. Most of them will not leave a voicemail. They will just call the next name.' },
      { type: 'p', text: 'That means a missed call from a new customer is not a "call back later". Often it is a job that has already gone to someone else.' },
      { type: 'h2', text: 'Do the math for your business' },
      { type: 'p', text: 'These numbers are made up to show how the math works. They are not industry statistics. Swap in your own.' },
      { type: 'note', title: 'Illustrative example', text: 'Say your average job is $400. Say you miss 3 calls a week from new customers while you are on jobs, and say half of those people would have booked with you. That is 1.5 jobs a week × $400 = $600 a week. Over 50 working weeks, that is $30,000 a year in work that went to someone else.' },
      { type: 'p', text: 'Now try it with your own numbers:' },
      { type: 'ol', items: [
        'Your average job value (look at your last 20 invoices)',
        'Missed calls from new numbers in a normal week (check your phone’s call log)',
        'How many of those you think would have booked (be honest — half is a fair guess for urgent work)',
        'Multiply the three together, then by the weeks you work in a year',
      ] },
      { type: 'p', text: 'Even if your numbers come out much smaller than the example, the answer is rarely zero. And that is before you count what those customers would have been worth over time.' },
      { type: 'h2', text: 'The part the math leaves out' },
      { type: 'p', text: 'A first call is often the start of a relationship. The homeowner who calls about a dripping tap is the same one who will need a new water heater in a few years, and who will tell their neighbour who to call. A furnace repair can turn into a yearly maintenance visit. When a call goes to voicemail, you do not just lose one job — you lose the chance at all the jobs that would have followed.' },
      { type: 'quote', text: 'A missed call is rarely one lost job. It is the first job of a customer you never got.' },
      { type: 'h2', text: 'How to stop losing missed calls' },
      { type: 'p', text: 'You cannot answer the phone with your hands inside a boiler. You do not need to. You just need the caller to hear back from you fast enough that they stop dialling.' },
      { type: 'h3', text: 'Missed-call text-back' },
      { type: 'p', text: 'This is the simplest fix. When you miss a call, the caller automatically gets a text within seconds: "Sorry we missed you — we are on a job. What do you need help with? We will call you back shortly." Most people will reply to that text instead of calling the next company, because they now know a real business has their message.' },
      { type: 'h3', text: 'A voicemail that gives people a next step' },
      { type: 'p', text: 'If your greeting is the phone company default, change it. Say your business name, say you are probably on a job, and tell them they will get a text in a moment. It sounds small, but it tells the caller they have reached the right place.' },
      { type: 'h3', text: 'A short call-back routine' },
      { type: 'p', text: 'Pick two or three moments in the day — before the first job, at lunch, at the end of the day — when you or someone on the crew goes through every missed call and text. The faster you get back to people, the more of them are still waiting for you.' },
      { type: 'h3', text: 'One place for every lead' },
      { type: 'p', text: 'Calls, texts, website forms and Facebook messages scattered across different apps are easy to lose. Having them land in one inbox means nothing slips through the cracks on a busy week.' },
      { type: 'h2', text: 'Find out how many calls you are missing' },
      { type: 'p', text: 'As part of our free local audit, we test how your calls get answered — including what happens when nobody picks up. Then we sit down with you in Surrey and go through what we found. If missed calls are costing you work, we can set up text-back so it runs from day one.' },
    ],
  },
  {
    slug: 'google-business-profile-checklist-trades',
    title: 'The 15-minute Google Business Profile checklist for trades',
    description:
      'Your Google Business Profile often brings in more calls than your website. Here is a plain-language, 15-minute checklist to fix the basics for a plumbing, HVAC, roofing, electrical or landscaping business.',
    category: 'Google',
    date: '2026-10-26',
    readingMinutes: 4,
    excerpt:
      'For most trades, your Google profile brings in more calls than your website. Fix the basics in about 15 minutes.',
    image: { src: '/images/electrician.jpg', alt: 'An electrician working on an electrical panel' },
    body: [
      { type: 'p', text: 'When a homeowner in Surrey searches for a roofer or an electrician, the first thing they usually see is not your website. It is the map, and your Google Business Profile: your name, your stars, your hours, your phone number and a "Call" button. For a lot of trades, that little box brings in more calls than the website ever will.' },
      { type: 'p', text: 'The good news is you can fix most of it yourself in about 15 minutes. Open your profile (search your business name on Google while signed in, or go to business.google.com) and work through this list.' },
      { type: 'h2', text: 'Minutes 1–3: The basics' },
      { type: 'ul', items: [
        'Business name: use your real business name, exactly as it appears on your truck and invoices. Do not add extra words like "Best Plumber Surrey" — Google’s rules do not allow it, and it can get your profile suspended.',
        'Phone number: make sure it is the number that actually gets answered (or at least gets a text-back). Not an old line, not the office landline nobody checks.',
        'Website: link to your site if you have one. If you do not, leave it empty rather than linking to a dead page.',
        'Hours: set your real hours. If you do emergency call-outs, say so, and update holiday hours so people do not drive past a "closed" sign.',
      ] },
      { type: 'h2', text: 'Minutes 4–6: Category and service area' },
      { type: 'p', text: 'Your primary category is one of the most important settings on the whole profile. It tells Google what you actually do.' },
      { type: 'ul', items: [
        'Pick the most specific primary category that fits: "Plumber", "HVAC contractor", "Roofing contractor", "Electrician", "Landscaper".',
        'Add a few secondary categories only if they are real parts of your business (for example, "Water heater installation service" for a plumber who does a lot of them).',
        'If you go to customers rather than having them come to you, set yourself up as a service-area business and hide your home address.',
        'List the areas you really serve — for example Surrey, South Surrey, White Rock, Delta, Langley. Stick to places you will actually drive to.',
      ] },
      { type: 'h2', text: 'Minutes 7–9: Services and description' },
      { type: 'p', text: 'Most trades skip the services list. Fill it in. Add the jobs people actually search for — "furnace repair", "hot water tank replacement", "panel upgrade", "roof leak repair" — and a one-line description for each.' },
      { type: 'p', text: 'Then write a short business description in plain language: what you do, where you work, how long you have been doing it, and what makes you easy to deal with. Write it for a homeowner, not for Google. No keyword lists.' },
      { type: 'h2', text: 'Minutes 10–12: Photos' },
      { type: 'p', text: 'Photos show homeowners you are a real, local business. Real photos beat stock photos every time.' },
      { type: 'ul', items: [
        'Your logo and a clear cover photo',
        'Your truck or van with your name on it',
        'You and your crew on a job (with the customer’s permission)',
        'Before-and-after shots of real work',
      ] },
      { type: 'p', text: 'Then make a habit of adding a couple of new job photos every month. It keeps the profile looking active.' },
      { type: 'h2', text: 'Minutes 13–15: Reviews' },
      { type: 'p', text: 'Reviews are the part of your profile homeowners look at hardest, and the part most Surrey trades are missing.' },
      { type: 'note', title: 'From our own Surrey scan', text: `In our Oct 2026 check of Google Maps, ${plumbersUnder20.value} of the Surrey plumbers we looked at had fewer than 20 reviews, and ${hvacUnder20.value} of Surrey HVAC companies did too. The bar is low — a steady flow of honest reviews puts you ahead of most of the names around you.` },
      { type: 'ol', items: [
        'Find your review link ("Ask for reviews" or "Share review form") and save it on your phone.',
        'Text it to your last five happy customers today, with a short thank-you.',
        'Reply to every review you already have — good and bad — calmly and by name.',
      ] },
      { type: 'h2', text: 'After the 15 minutes' },
      { type: 'p', text: 'The checklist gets the basics right. What keeps you showing up is doing a few small things every month: asking every customer for a review, replying to reviews, adding fresh photos, and keeping hours and services up to date. None of it is hard. It just has to actually happen, which is the tricky part when you are busy on the tools.' },
      { type: 'quote', text: 'A complete, active profile with honest reviews does more for most trades than a fancy new website.' },
      { type: 'h2', text: 'Want a second pair of eyes?' },
      { type: 'p', text: 'Our free local audit checks your Google Business Profile line by line, compares your reviews with the trades near you, and tests how your calls get answered. We go through it with you in person in Surrey, and you keep the one-page report either way.' },
    ],
  },
]

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug)
}

// Newest first
export const sortedPosts = [...posts].sort((a, b) => (a.date < b.date ? 1 : -1))
