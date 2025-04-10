// This is a pure API route with no Next.js middleware or security headers
export default function handler(req, res) {
  // Set the headers to allow embedding in frames
  res.setHeader('X-Frame-Options', 'ALLOWALL');
  res.setHeader('Content-Security-Policy', "frame-ancestors 'self' https://warpcast.com https://*.vercel.app https://*.farcaster.xyz *;");
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // Return a simple HTML page with the Farcaster Frame metadata
  res.status(200).send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inactive Followers Detector</title>
  
  <!-- Farcaster Frame metadata -->
  <meta property="fc:frame" content="vNext">
  <meta property="fc:frame:image" content="https://followingchurn123-9b5lw05j6-bettercallzaals-projects.vercel.app/opengraph-image.png">
  <meta property="fc:frame:button:1" content="Check Your Inactive Following">
  <meta property="fc:frame:button:1:action" content="post_redirect">
  <meta property="fc:frame:post_url" content="https://followingchurn123-9b5lw05j6-bettercallzaals-projects.vercel.app/api/frame">
  
  <!-- Allow embedding in frames -->
  <meta http-equiv="X-Frame-Options" content="ALLOWALL">
  <meta http-equiv="Content-Security-Policy" content="frame-ancestors 'self' https://warpcast.com https://*.vercel.app https://*.farcaster.xyz *;">
</head>
<body style="margin: 0; padding: 0; display: flex; justify-content: center; align-items: center; height: 100vh; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
  <div style="text-align: center; max-width: 600px; padding: 20px;">
    <h1 style="color: #333; margin-bottom: 20px;">Inactive Followers Detector</h1>
    <p style="color: #666; margin-bottom: 30px; font-size: 18px;">Find and unfollow users who haven't posted in a while</p>
    <div style="background-color: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      <p style="color: #333; margin-bottom: 20px;">This is a simple frame that should work in Farcaster.</p>
      <p style="color: #333; margin-bottom: 20px;">If you're seeing this page directly, please use the Warpcast Frame Developer Tools to test this frame.</p>
    </div>
  </div>
  
  <script>
    // Log debugging information
    console.log('Pure frame loaded');
    console.log('Document URL:', document.URL);
    console.log('Document referrer:', document.referrer);
    console.log('Headers (meta):', document.querySelectorAll('meta'));
  </script>
</body>
</html>
  `);
}
