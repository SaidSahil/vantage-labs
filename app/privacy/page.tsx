import LegalShell, { type LegalSection } from '@/components/LegalShell'

const sections: LegalSection[] = [
  {
    heading: '1. Who we are',
    body: [
      'NodeAxis ("NodeAxis", "we", "us", or "our") is a web design and software development studio based in British Columbia, Canada. This Privacy Policy explains how we collect, use, disclose, and protect personal information when you visit <strong>nodeaxis.ca</strong> (the "Site") or engage us for services.',
      'We handle personal information in accordance with Canada\'s Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable British Columbia privacy legislation.',
    ],
  },
  {
    heading: '2. Information we collect',
    body: [
      { sub: 'Information you give us' },
      'When you submit our contact form, we collect the information you choose to provide — typically your name, email address, the type of service you\'re interested in, your budget range, and the contents of your message. If you contact us by email or phone, we collect whatever information you include in that communication.',
      { sub: 'Information collected automatically' },
      'Like most websites, our hosting provider automatically logs basic technical data when you visit — such as your IP address, browser type, device information, referring pages, and timestamps. This is used for security, troubleshooting, and keeping the Site running.',
      'We also store a small preference in your browser\'s local storage to remember your light/dark theme choice. This stays on your device and is not transmitted to us.',
    ],
  },
  {
    heading: '3. How we use your information',
    body: [
      'We use the information we collect to:',
      [
        'Respond to your inquiries and provide quotes;',
        'Deliver, manage, and support the services you engage us for;',
        'Communicate with you about your project;',
        'Operate, secure, maintain, and improve the Site;',
        'Comply with our legal and regulatory obligations.',
      ],
      'We do not sell your personal information, and we do not use it for advertising.',
    ],
  },
  {
    heading: '4. Service providers we rely on',
    body: [
      'We use a small number of trusted third-party providers to operate the Site and our business. These providers only receive the information needed to perform their function, and are bound by their own privacy and security obligations:',
      [
        '<strong>Vercel</strong> — website hosting and infrastructure;',
        '<strong>Formspree</strong> — processing and delivering contact-form submissions;',
        '<strong>Our database provider</strong> — storing anonymous visit and engagement analytics described in Section 5;',
        '<strong>Email and telephone providers</strong> — for direct communication with you.',
      ],
      'Some of these providers may store or process data outside of Canada. Where that happens, your information may be subject to the laws of those jurisdictions.',
    ],
  },
  {
    heading: '5. Cookies and similar technologies',
    body: [
      'The Site uses minimal storage. Strictly necessary functionality (such as remembering your theme preference) is stored locally in your browser.',
      'If you accept analytics through our cookie banner, we record which pages you visit, the approximate time of your visit, your approximate location (country/region/city, derived from your IP address — we do not store the IP address itself), the referring site, and how you engage with sections of a page (time spent viewing a section and clicks within it). This helps us understand which pages and content are useful. You can withdraw consent at any time, and no analytics are recorded if you decline.',
    ],
  },
  {
    heading: '6. How long we keep it',
    body: [
      'We retain personal information only for as long as needed to fulfil the purposes described in this policy — for example, to respond to your inquiry, deliver a project, and meet our legal, accounting, and recordkeeping obligations. When it is no longer required, we securely delete or anonymize it.',
    ],
  },
  {
    heading: '7. How we protect your information',
    body: [
      'We take reasonable administrative, technical, and physical measures to protect personal information against loss, theft, and unauthorized access, use, or disclosure. No method of transmission or storage is completely secure, but we work to safeguard your information appropriately to its sensitivity.',
    ],
  },
  {
    heading: '8. Your rights',
    body: [
      'Under PIPEDA, you have the right to:',
      [
        'Access the personal information we hold about you;',
        'Request correction of inaccurate or incomplete information;',
        'Withdraw consent to our use of your information, subject to legal or contractual limits;',
        'Ask questions or make a complaint about how we handle your information.',
      ],
      'To exercise any of these rights, contact us at <strong>info@nodeaxis.ca</strong>. We will respond within a reasonable timeframe. If you are not satisfied with our response, you may contact the Office of the Privacy Commissioner of Canada.',
    ],
  },
  {
    heading: '9. Third-party links',
    body: [
      'The Site may link to external websites we do not control. We are not responsible for the privacy practices of those sites and encourage you to review their policies.',
    ],
  },
  {
    heading: '10. Children\'s privacy',
    body: [
      'The Site and our services are intended for businesses and adults. We do not knowingly collect personal information from children.',
    ],
  },
  {
    heading: '11. Changes to this policy',
    body: [
      'We may update this Privacy Policy from time to time. The "Last updated" date above reflects the most recent revision. Material changes will be posted on this page.',
    ],
  },
  {
    heading: '12. Contact us',
    body: [
      'If you have questions about this Privacy Policy or how we handle your information, contact us at <strong>info@nodeaxis.ca</strong> or 778-240-8911.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      intro="Your privacy matters. This page explains what information we collect, why we collect it, and the choices you have — in plain language."
      updated="June 18, 2026"
      sections={sections}
    />
  )
}
