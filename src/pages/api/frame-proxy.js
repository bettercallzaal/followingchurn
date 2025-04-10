// This is a special API route that will proxy your app with the correct headers
export default function handler(req, res) {
  // Set the headers to allow embedding in frames
  res.setHeader('X-Frame-Options', 'ALLOWALL');
  res.setHeader('Content-Security-Policy', "frame-ancestors 'self' https://warpcast.com https://*.vercel.app https://*.farcaster.xyz *;");
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Return HTML content that embeds your app
  res.status(200).send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inactive Followers Detector - Farcaster Frame</title>
  
  <!-- Farcaster Frame metadata -->
  <meta property="fc:frame" content="vNext">
  <meta property="fc:frame:image" content="https://followertest-bettercallzaals-projects.vercel.app/opengraph-image.png">
  <meta property="fc:frame:button:1" content="Check Your Inactive Following today">
  <meta property="fc:frame:button:1:action" content="post_redirect">
  <meta property="fc:frame:post_url" content="https://followertest-bettercallzaals-projects.vercel.app/api/frame">
  
  <!-- Allow embedding in frames -->
  <meta http-equiv="X-Frame-Options" content="ALLOWALL">
  <meta http-equiv="Content-Security-Policy" content="frame-ancestors 'self' https://warpcast.com https://*.vercel.app https://*.farcaster.xyz *;">
  
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      margin: 0;
      padding: 0;
      height: 100vh;
      width: 100vw;
      overflow: hidden;
    }
    iframe {
      border: none;
      width: 100%;
      height: 100%;
    }
  </style>
</head>
<body>
  <iframe src="/frame" allow="fullscreen" allowfullscreen></iframe>

  <script>
    // Log debugging information
    console.log('Frame proxy loaded');
    
    // Check if we're in an iframe
    const isInIframe = window !== window.parent;
    console.log('Is in iframe:', isInIframe);
    
    // Log headers (though this won't show response headers)
    console.log('Document URL:', document.URL);
    console.log('Document referrer:', document.referrer);
  </script>
</body>
</html>
  `);
}
