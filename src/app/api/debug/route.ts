import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('Debug API called');
  
  // Get all headers from the request
  const requestHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    requestHeaders[key] = value;
    console.log(`Request header: ${key} = ${value}`);
  });

  // Skip server headers to avoid TypeScript errors

  // Get environment variables
  const envVars = {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    VERCEL_ENV: process.env.VERCEL_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
    NEXT_PUBLIC_FRAME_NAME: process.env.NEXT_PUBLIC_FRAME_NAME,
    NEXT_PUBLIC_FRAME_DESCRIPTION: process.env.NEXT_PUBLIC_FRAME_DESCRIPTION,
    NEXT_PUBLIC_FRAME_BUTTON_TEXT: process.env.NEXT_PUBLIC_FRAME_BUTTON_TEXT,
  };
  console.log('Environment variables:', envVars);

  // Get request information
  const requestInfo = {
    url: request.url,
    method: request.method,
    nextUrl: {
      pathname: request.nextUrl.pathname,
      searchParams: Object.fromEntries(request.nextUrl.searchParams.entries()),
      host: request.nextUrl.host,
      protocol: request.nextUrl.protocol,
    },
    referrer: request.headers.get('referer') || 'none',
    userAgent: request.headers.get('user-agent') || 'none',
  };
  console.log('Request info:', requestInfo);

  // Create response with explicit headers
  const response = NextResponse.json({
    message: 'Debug information',
    requestHeaders,
    requestInfo,
    envVars,
    timestamp: new Date().toISOString(),
  });

  // Explicitly set headers for frame embedding
  response.headers.set('X-Frame-Options', 'ALLOWALL');
  response.headers.set(
    'Content-Security-Policy',
    "frame-ancestors 'self' https://warpcast.com https://*.vercel.app https://*.farcaster.xyz *;"
  );
  
  // Add additional headers that might help
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Log response headers for debugging
  console.log('Response headers:', Object.fromEntries(response.headers.entries()));

  return response;
}
