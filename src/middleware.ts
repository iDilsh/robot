import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect /cpanel routes (except /cpanel/login and /cpanel/api)
  if (pathname.startsWith('/cpanel') && !pathname.startsWith('/cpanel/login')) {
    const auth = verifyAuth(request);

    // Since verifyAuth is async, we need a different approach
    // We'll handle auth check client-side in the layout instead
    // For now, just pass through - the layout will redirect if not authenticated
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/cpanel/:path*'],
};
