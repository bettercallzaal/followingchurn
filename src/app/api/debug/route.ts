import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Get all headers from the request
  const requestHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    requestHeaders[key] = value;
  });

  // Get environment variables
  const envVars = {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    VERCEL_ENV: process.env.VERCEL_ENV,
    VERCEL_URL: process.env.VERCEL_URL,
  };

  // Create response with explicit headers
  const response = NextResponse.json({
    message: 'Debug information',
    requestHeaders,
    envVars,
    timestamp: new Date().toISOString(),
  });

  // Explicitly set headers for frame embedding
  response.headers.set('X-Frame-Options', 'ALLOWALL');
  response.headers.set(
    'Content-Security-Policy',
    "frame-ancestors 'self' https://warpcast.com https://*.vercel.app https://*.farcaster.xyz *;"
  );

  // Log headers for debugging
  console.log('Response headers:', Object.fromEntries(response.headers.entries()));

  return response;
}
