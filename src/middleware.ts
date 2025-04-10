import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware executing for path:', request.nextUrl.pathname);
  
  // Clone the request headers
  const requestHeaders = new Headers(request.headers);
  console.log('Request headers:', Object.fromEntries(requestHeaders.entries()));
  
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
  response.headers.delete('X-Frame-Options-Set-By-Next');

  // Log the headers we're setting
  console.log('Response headers set in middleware:', Object.fromEntries(response.headers.entries()));

  return response;
}

// See: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
