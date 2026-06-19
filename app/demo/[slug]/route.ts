import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  // Strip anything that could traverse directories
  const safeSlug = path.basename(slug);
  const filePath = path.join(process.cwd(), 'demos', `${safeSlug}.html`);

  if (!fs.existsSync(filePath)) {
    return new NextResponse(null, { status: 404 });
  }

  const html = fs.readFileSync(filePath, 'utf-8');

  return new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}
