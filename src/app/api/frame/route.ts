import { NextResponse } from 'next/server';

export async function POST() {
  try {
    // Get the app URL
    const appUrl = process.env.NEXT_PUBLIC_URL || 'https://followertest-bettercallzaals-projects.vercel.app';
    
    // Create a redirect response to the mini app
    const response = NextResponse.redirect(`${appUrl}/frame`, { status: 302 });
    
    // Set headers to allow embedding in frames
    response.headers.set('X-Frame-Options', 'ALLOWALL');
    response.headers.set(
      'Content-Security-Policy',
      "frame-ancestors 'self' https://warpcast.com https://*.vercel.app https://*.farcaster.xyz *;"
    );
    
    return response;
  } catch (error) {
    console.error('Error in frame API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
