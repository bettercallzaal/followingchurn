// This endpoint explicitly removes X-Frame-Options header if it exists
export default function handler(req, res) {
  // First, explicitly remove X-Frame-Options if it exists
  res.removeHeader('X-Frame-Options');
  
  // Set Content-Security-Policy to allow embedding
  res.setHeader('Content-Security-Policy', "frame-ancestors 'self' https://warpcast.com https://*.vercel.app https://*.farcaster.xyz *;");
  
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Set content type
  res.setHeader('Content-Type', 'text/html');
  
  // Return minimal HTML
  res.status(200).send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>No X-Frame-Options Test</title>
  
  <!-- Farcaster Frame metadata -->
  <meta property="fc:frame" content="vNext">
  <meta property="fc:frame:image" content="https://followingchurn123-o9vtsr5tq-bettercallzaals-projects.vercel.app/opengraph-image.png">
  <meta property="fc:frame:button:1" content="Check Your Inactive Following">
  <meta property="fc:frame:button:1:action" content="post_redirect">
  <meta property="fc:frame:post_url" content="https://followingchurn123-o9vtsr5tq-bettercallzaals-projects.vercel.app/api/frame">
  
  <!-- Meta tag for CSP -->
  <meta http-equiv="Content-Security-Policy" content="frame-ancestors 'self' https://warpcast.com https://*.vercel.app https://*.farcaster.xyz *;">
  
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; text-align: center; }
  </style>
</head>
<body>
  <h1>Inactive Followers Detector</h1>
  <p>This page explicitly removes X-Frame-Options header</p>
  
  <script>
    // Log debugging information
    console.log('No X-Frame-Options page loaded');
    console.log('Document URL:', document.URL);
    console.log('Document referrer:', document.referrer);
    
    // Check if we're in an iframe
    const isInIframe = window !== window.parent;
    console.log('Is in iframe:', isInIframe);
  </script>
</body>
</html>
  `);
}
