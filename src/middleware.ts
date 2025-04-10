import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Clone the request headers
  const requestHeaders = new Headers(request.headers);
  
  // Get response
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Set headers to allow embedding in frames
  response.headers.set('X-Frame-Options', 'ALLOWALL');
  response.headers.set(
    'Content-Security-Policy',
    "frame-ancestors 'self' https://warpcast.com https://*.vercel.app https://*.farcaster.xyz *;"
  );

  return response;
}

// See: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
