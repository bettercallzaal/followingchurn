// API route that serves HTML with proper headers for Farcaster frames
export default function handler(req, res) {
  // Set the proper headers for frame embedding
  res.setHeader('Content-Security-Policy', "frame-ancestors 'self' https://warpcast.com https://*.vercel.app https://*.farcaster.xyz *;");
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/html');
  
  // Return HTML with Farcaster frame metadata
  res.status(200).send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inactive Followers Detector</title>
  
  <!-- Farcaster Frame metadata -->
  <meta property="fc:frame" content="vNext">
  <meta property="fc:frame:image" content="https://followingchurn123.vercel.app/splash.png">
  <meta property="fc:frame:button:1" content="Check Your Inactive Following">
  <meta property="fc:frame:button:1:action" content="post">
  <meta property="fc:frame:post_url" content="https://followingchurn123.vercel.app/api/frame-response">
  
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f9fafb;
      color: #111827;
      text-align: center;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    h1 {
      font-size: 24px;
      margin-bottom: 16px;
    }
    p {
      color: #6b7280;
      margin-bottom: 24px;
    }
    .button {
      display: inline-block;
      background-color: #4f46e5;
      color: white;
      padding: 12px 20px;
      border-radius: 6px;
      text-decoration: none;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Inactive Followers Detector</h1>
    <p>Find and unfollow users who haven't posted in a while. Filter by inactivity period and sort by oldest followers.</p>
    <a href="https://followingchurn123.vercel.app" class="button">Launch App</a>
  </div>
</body>
</html>
  `);
}
