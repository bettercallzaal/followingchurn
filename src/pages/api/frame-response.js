// API route that handles the frame response
export default function handler(req, res) {
  // Set the proper headers for frame embedding
  res.setHeader('Content-Security-Policy', "frame-ancestors 'self' https://warpcast.com https://*.vercel.app https://*.farcaster.xyz *;");
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/html');
  
  // Return HTML with Farcaster frame metadata for the response
  res.status(200).send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Inactive Followers Detector - Response</title>
  
  <!-- Farcaster Frame metadata -->
  <meta property="fc:frame" content="vNext">
  <meta property="fc:frame:image" content="https://followingchurn123.vercel.app/splash.png">
  <meta property="fc:frame:button:1" content="Go to App">
  <meta property="fc:frame:button:1:action" content="link">
  <meta property="fc:frame:button:1:target" content="https://followingchurn123.vercel.app">
  
  <style>
    body {
      font-family: system-ui, sans-serif;
      text-align: center;
      padding: 20px;
      background-color: #f5f5f5;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    h1 {
      color: #333;
      margin-bottom: 10px;
    }
    p {
      color: #666;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Thanks for using Inactive Followers Detector!</h1>
    <p>Click the button to go to the full app.</p>
  </div>
</body>
</html>
  `);
}
