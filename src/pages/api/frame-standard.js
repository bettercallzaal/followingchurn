// Standard-compliant frame implementation that follows best practices
export default function handler(req, res) {
  // IMPORTANT: Do NOT set X-Frame-Options at all
  // Instead, use Content-Security-Policy which is more flexible and modern
  res.setHeader('Content-Security-Policy', "frame-ancestors 'self' https://warpcast.com https://*.vercel.app https://*.farcaster.xyz *;");
  
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Set content type
  res.setHeader('Content-Type', 'text/html');
  
  // Return the minimal HTML needed for a Farcaster frame
  res.status(200).send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inactive Followers Detector</title>
  
  <!-- Farcaster Frame metadata -->
  <meta property="fc:frame" content="vNext">
  <meta property="fc:frame:image" content="https://followingchurn123-o9vtsr5tq-bettercallzaals-projects.vercel.app/opengraph-image.png">
  <meta property="fc:frame:button:1" content="Check Your Inactive Following">
  <meta property="fc:frame:button:1:action" content="post_redirect">
  <meta property="fc:frame:post_url" content="https://followingchurn123-o9vtsr5tq-bettercallzaals-projects.vercel.app/api/frame">
  
  <!-- Use meta tag for CSP as well, for extra safety -->
  <meta http-equiv="Content-Security-Policy" content="frame-ancestors 'self' https://warpcast.com https://*.vercel.app https://*.farcaster.xyz *;">
</head>
<body style="margin: 0; padding: 20px; font-family: system-ui, sans-serif; background-color: #f5f5f5; text-align: center;">
  <h1>Inactive Followers Detector</h1>
  <p>Find and unfollow users who haven't posted in a while</p>
  <p>Standard-compliant frame implementation</p>
</body>
</html>
  `);
}
