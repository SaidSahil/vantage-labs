import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { buildSalonDemo } from '@/lib/demo-template';

const HTML_HEADERS = {
  'Content-Type': 'text/html; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow',
};

const DEMO_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function expiredPage(displayName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Demo Expired</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a0a;color:#e0e0e0;display:grid;place-items:center;min-height:100vh}
  .box{text-align:center;max-width:480px;padding:2.5rem 2rem}
  .badge{display:inline-block;background:#1a1a1a;border:1px solid #2a2a2a;border-radius:100px;font-size:.72rem;font-weight:600;padding:.4em 1.1em;margin-bottom:1.8rem;color:#666;letter-spacing:.12em;text-transform:uppercase}
  h1{font-size:1.55rem;font-weight:500;color:#fff;line-height:1.2;margin-bottom:.9rem}
  p{color:#777;line-height:1.65;font-size:.97rem}
  strong{color:#bbb}
</style>
</head>
<body>
<div class="box">
  <div class="badge">Preview expired</div>
  <h1>This demo is no longer available.</h1>
  <p>The 30-day preview period for <strong>${esc(displayName)}</strong> has ended.<br>Reach out to NodeAxis to renew access or get your real site built.</p>
</div>
</body>
</html>`;
}

function isExpired(createdAt: string | number): boolean {
  const ts = typeof createdAt === 'number'
    ? createdAt * 1000
    : new Date(createdAt).getTime();
  if (isNaN(ts)) return false; // malformed input — fail open, don't expire
  return Date.now() - ts > DEMO_TTL_MS;
}

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
  //         d = unix timestamp (seconds) of when the link was created — used for 30-day expiry
  if (sp.get('n')) {
    const d = sp.get('d');
    const dNum = d ? parseInt(d, 10) : NaN;
    if (!isNaN(dNum) && isExpired(dNum)) {
      return new NextResponse(expiredPage(sp.get('n') ?? 'this demo'), { status: 410, headers: HTML_HEADERS });
    }
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

  // Check demos/registry.json for the 30-day expiry window
  const registryPath = path.join(process.cwd(), 'demos', 'registry.json');
  if (fs.existsSync(registryPath)) {
    try {
      const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8')) as Record<string, string>;
      if (registry[safeSlug] && isExpired(registry[safeSlug])) {
        const displayName = safeSlug.replace(/-/g, ' ');
        return new NextResponse(expiredPage(displayName), { status: 410, headers: HTML_HEADERS });
      }
    } catch {
      // malformed registry.json — serve the demo rather than 500
    }
  }

  const html = fs.readFileSync(filePath, 'utf-8');
  return new NextResponse(html, { status: 200, headers: HTML_HEADERS });
}
