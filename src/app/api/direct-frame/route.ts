import { NextResponse } from 'next/server';

export async function GET() {
  // Create a simple HTML response with frame embedding headers
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inactive Followers Detector</title>
  
  <!-- Frame metadata -->
  <meta property="fc:frame" content="vNext">
  <meta property="fc:frame:image" content="https://followertest-bettercallzaals-projects.vercel.app/opengraph-image.png">
  <meta property="fc:frame:button:1" content="Check Your Inactive Following today">
  <meta property="fc:frame:button:1:action" content="post_redirect">
  <meta property="fc:frame:post_url" content="https://followertest-bettercallzaals-projects.vercel.app/api/frame">
</head>
<body>
  <h1>Inactive Followers Detector</h1>
  <p>Find and unfollow users who haven't posted in a while.</p>
  <a href="/frame">Launch App</a>
  
  <script>
    console.log('Direct frame loaded');
  </script>
</body>
</html>
  `;

  // Create response with HTML content
  const response = new NextResponse(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Frame-Options': 'ALLOWALL',
      'Content-Security-Policy': "frame-ancestors 'self' https://warpcast.com https://*.vercel.app https://*.farcaster.xyz *;",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });

  return response;
}
