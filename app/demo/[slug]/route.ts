import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { buildSalonDemo } from '@/lib/demo-template';

const HTML_HEADERS = {
  'Content-Type': 'text/html; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow',
};

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const safeSlug = path.basename(slug);
  const sp = req.nextUrl.searchParams;

  // Personalized salon demo — filled from query params the CRM encodes into
  // the link. No database or filesystem needed; works on Vercel serverless.
  // Params: n = business name, c = city, p = phone, e = email
  if (sp.get('n')) {
    const html = buildSalonDemo({
      name:  sp.get('n') ?? '',
      city:  sp.get('c') ?? '',
      phone: sp.get('p') ?? '',
      email: sp.get('e') ?? '',
    });
    return new NextResponse(html, { status: 200, headers: HTML_HEADERS });
  }

  // Fallback — serve a static file from demos/ (existing hand-built demos
  // like construction, lookbook pages, etc.)
  const filePath = path.join(process.cwd(), 'demos', `${safeSlug}.html`);
  if (!fs.existsSync(filePath)) {
    return new NextResponse(null, { status: 404 });
  }
  const html = fs.readFileSync(filePath, 'utf-8');
  return new NextResponse(html, { status: 200, headers: HTML_HEADERS });
}
