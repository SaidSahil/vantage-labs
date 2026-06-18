import LegalShell, { type LegalSection } from '@/components/LegalShell'

const sections: LegalSection[] = [
  {
    heading: '1. Agreement to these terms',
    body: [
      'These Terms of Service ("Terms") govern your access to and use of the NodeAxis website at <strong>nodeaxis.ca</strong> (the "Site") and any services we provide. By using the Site or engaging us, you agree to these Terms. If you do not agree, please do not use the Site.',
      'NodeAxis ("NodeAxis", "we", "us", or "our") is a web design and software development studio based in British Columbia, Canada.',
    ],
  },
  {
    heading: '2. Our services',
    body: [
      'We design and build custom websites, web applications, dashboards, and software for businesses. The specific scope, deliverables, timeline, and price for any engagement are agreed separately in a written quote or proposal (an "Engagement"). In the event of a conflict between a signed Engagement and these Terms, the Engagement governs.',
      'Information on the Site — including pricing such as "from $399" — is provided as a general guide and does not constitute a binding offer. A firm price is confirmed in your individual quote.',
    ],
  },
  {
    heading: '3. Quotes, fees, and payment',
    body: [
      'We provide fixed, upfront quotes for project work — no hourly billing and no surprise invoices. Payment terms (including any deposit, milestones, or final balance) are set out in your Engagement.',
      'Unless otherwise stated, quotes are valid for 30 days. Optional ongoing maintenance or support is billed separately as described in your Engagement.',
    ],
  },
  {
    heading: '4. Client responsibilities',
    body: [
      'To deliver your project, we rely on you to provide, in a timely manner:',
      [
        'Content, assets, and information needed for the work (text, images, branding, access credentials, etc.);',
        'Timely feedback and approvals at agreed checkpoints;',
        'Confirmation that any materials you supply do not infringe the rights of others.',
      ],
      'Delays in providing these may affect agreed timelines.',
    ],
  },
  {
    heading: '5. Ownership and intellectual property',
    body: [
      'On full payment for an Engagement, ownership of the final, delivered work product is transferred to you, including the source code for your project. You control your own domain and hosting and are never locked into a proprietary platform with us.',
      'We retain ownership of our pre-existing tools, libraries, techniques, and general know-how, and of any third-party or open-source components, which remain subject to their own licences. Unless you ask us not to, we may reference completed work in our portfolio and marketing.',
      'The Site itself — including its design, code, text, and branding — is owned by NodeAxis and may not be copied or reused without permission.',
    ],
  },
  {
    heading: '6. Third-party services',
    body: [
      'Projects may incorporate third-party platforms and services (for example, hosting, payment processing, scheduling, or email providers). Your use of those services is subject to their own terms and pricing, and we are not responsible for their availability, performance, or policies.',
    ],
  },
  {
    heading: '7. Warranties and disclaimers',
    body: [
      'We perform our services with reasonable skill and care. Except as expressly stated in your Engagement, the Site and our services are provided "as is" and "as available", without warranties of any kind, whether express or implied, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Site will be uninterrupted, error-free, or completely secure.',
    ],
  },
  {
    heading: '8. Limitation of liability',
    body: [
      'To the fullest extent permitted by law, NodeAxis will not be liable for any indirect, incidental, special, consequential, or punitive damages, or for any loss of profits, revenue, data, or goodwill, arising out of or relating to your use of the Site or our services. Our total aggregate liability for any claim relating to an Engagement will not exceed the fees you paid to us for that Engagement.',
      'Nothing in these Terms limits liability that cannot be limited or excluded under applicable law.',
    ],
  },
  {
    heading: '9. Indemnity',
    body: [
      'You agree to indemnify and hold NodeAxis harmless from any claims, damages, or expenses arising from materials you provide to us or from your use of deliverables in a way that breaches these Terms or the rights of a third party.',
    ],
  },
  {
    heading: '10. Termination',
    body: [
      'Either party may end an Engagement as described in that Engagement. Fees for work performed up to the date of termination remain payable. We may suspend or restrict access to the Site at any time if we reasonably believe these Terms have been breached.',
    ],
  },
  {
    heading: '11. Governing law',
    body: [
      'These Terms are governed by the laws of the Province of British Columbia and the federal laws of Canada applicable there, without regard to conflict-of-laws principles. The courts located in British Columbia will have jurisdiction over any dispute arising from these Terms.',
    ],
  },
  {
    heading: '12. Changes to these terms',
    body: [
      'We may update these Terms from time to time. The "Last updated" date above reflects the most recent revision. Continued use of the Site after changes take effect constitutes acceptance of the updated Terms.',
    ],
  },
  {
    heading: '13. Contact us',
    body: [
      'Questions about these Terms? Contact us at <strong>info@nodeaxis.ca</strong> or 778-240-8911.',
    ],
  },
]

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms of Service"
      intro="These terms set out the ground rules for using our website and working with us — written to be clear, fair, and free of surprises."
      updated="June 18, 2026"
      sections={sections}
    />
  )
}
