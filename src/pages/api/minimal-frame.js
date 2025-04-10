// This is an absolutely minimal frame implementation with no dependencies on Next.js features
export default function handler(req, res) {
  // Set headers directly on the response
  res.setHeader('X-Frame-Options', 'ALLOWALL');
  res.setHeader('Content-Security-Policy', "frame-ancestors 'self' https://warpcast.com https://*.vercel.app https://*.farcaster.xyz *;");
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/html');
  
  // Return the absolute minimum HTML needed for a Farcaster frame
  res.status(200).end(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta property="fc:frame" content="vNext">
  <meta property="fc:frame:image" content="https://followingchurn123-9b5lw05j6-bettercallzaals-projects.vercel.app/opengraph-image.png">
  <meta property="fc:frame:button:1" content="Check Your Inactive Following">
  <meta property="fc:frame:button:1:action" content="post_redirect">
  <meta property="fc:frame:post_url" content="https://followingchurn123-9b5lw05j6-bettercallzaals-projects.vercel.app/api/frame">
  <meta http-equiv="X-Frame-Options" content="ALLOWALL">
</head>
<body>
  <h1>Inactive Followers Detector</h1>
  <p>Find and unfollow users who haven't posted in a while</p>
</body>
</html>
  `);
}
