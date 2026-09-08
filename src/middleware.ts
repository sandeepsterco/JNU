import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect /department/:slug/home -> /department/:slug
  const match = pathname.match(/^\/department\/([^/]+)\/home$/);
  if (match) {
    const slug = match[1];
    return NextResponse.redirect(
      new URL(`/department/${slug}`, request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};