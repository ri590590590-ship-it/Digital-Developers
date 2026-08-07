import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const ADMIN_PATH_PREFIX = '/admin';
const PUBLIC_PATHS = ['/login', '/api/contact'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const res = NextResponse.next();

  // Security headers
  res.headers.set('X-Robots-Tag', 'noindex, nofollow');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Permissions-Policy', 'geolocation=(), camera=(), microphone=()');

  // Protect admin routes
  if (pathname.startsWith(ADMIN_PATH_PREFIX) && !PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    const authCookies = req.cookies.getAll().filter((cookie) => {
      const name = cookie.name.toLowerCase();
      return name.includes('auth-token') && !name.includes('code-verifier');
    });

    if (authCookies.length === 0) {
      const loginUrl = new URL('/login', req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
