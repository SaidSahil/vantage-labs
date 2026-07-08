import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/session'

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (pathname === '/admin/login' || pathname === '/api/admin/login') {
    return NextResponse.next()
  }

  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const session = req.cookies.get('na_admin_session')?.value

    if (!verifySession(session)) {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      return NextResponse.redirect(new URL('/admin/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
}
