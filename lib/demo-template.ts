import { SALON_DEMO_TEMPLATE } from './salon-demo.template';

export interface DemoParams {
  name: string;
  city: string;
  phone: string;
  email: string;
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function buildSalonDemo(p: DemoParams): string {
  let html = SALON_DEMO_TEMPLATE;

  const businessName = p.name.trim() || 'Your Salon';
  const city = p.city.trim() || 'your city';
  const parts = city.split(',').map(x => x.trim()).filter(Boolean);
  const address = parts[0] || city;
  const addressCity = parts.slice(1).join(', ');

  const phone = p.phone.trim();
  const phoneDigits = phone.replace(/[^\d+]/g, '');
  const phoneHref = phone ? `tel:${phoneDigits}` : '#visit';
  const phoneDisplay = phone || 'Book a Chair';

  const email = p.email.trim();
  const emailHref = email ? `mailto:${email}` : '#visit';
  const emailDisplay = email || 'Book online';

  const until = new Date();
  until.setDate(until.getDate() + 10);
  const untilStr = until.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  if (!addressCity) {
    html = html
      .replace('{{ADDRESS}}, {{ADDRESS_CITY}}', '{{ADDRESS}}')
      .replace('{{ADDRESS}}<br>{{ADDRESS_CITY}}', '{{ADDRESS}}')
      .replace(/\s*<p>\{\{ADDRESS_CITY\}\}<\/p>/, '');
  }

  const map: Record<string, string> = {
    '{{BUSINESS_NAME}}': esc(businessName),
    '{{CITY}}': esc(city),
    '{{ADDRESS}}': esc(address),
    '{{ADDRESS_CITY}}': esc(addressCity),
    '{{PHONE}}': esc(phoneDisplay),
    '{{PHONE_HREF}}': phoneHref,
    '{{EMAIL}}': esc(emailDisplay),
    '{{EMAIL_HREF}}': emailHref,
    '{{INSTAGRAM_URL}}': '#',
    '{{FACEBOOK_URL}}': '#',
    '{{URGENCY_NOTE}}': esc(`${businessName} · preview reserved until ${untilStr}`),
  };

  for (const [token, value] of Object.entries(map)) {
    html = html.split(token).join(value);
  }
  return html;
}
