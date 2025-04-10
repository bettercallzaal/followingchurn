// Diagnostic endpoint to analyze headers
export default function handler(req, res) {
  // Get all request headers
  const requestHeaders = {};
  for (const [key, value] of Object.entries(req.headers)) {
    requestHeaders[key] = value;
  }
  
  // Log request information
  console.log('Header Diagnostic - Request URL:', req.url);
  console.log('Header Diagnostic - Request Method:', req.method);
  console.log('Header Diagnostic - Request Headers:', JSON.stringify(requestHeaders, null, 2));
  
  // Set the correct headers for frame embedding
  // Note: We're NOT using X-Frame-Options at all, as it's more restrictive
  // Instead, we use Content-Security-Policy which is more flexible
  res.setHeader('Content-Security-Policy', "frame-ancestors 'self' https://warpcast.com https://*.vercel.app https://*.farcaster.xyz *;");
  
  // Allow CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Get all response headers that have been set
  const responseHeaders = res.getHeaders ? res.getHeaders() : {};
  
  // Return HTML with diagnostic information
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Header Diagnostic</title>
  <meta property="fc:frame" content="vNext">
  <meta property="fc:frame:image" content="https://followingchurn123-o9vtsr5tq-bettercallzaals-projects.vercel.app/opengraph-image.png">
  <meta property="fc:frame:button:1" content="Check Your Inactive Following">
  <meta property="fc:frame:button:1:action" content="post_redirect">
  <meta property="fc:frame:post_url" content="https://followingchurn123-o9vtsr5tq-bettercallzaals-projects.vercel.app/api/frame">
  
  <!-- Use meta tags for CSP as well, for extra safety -->
  <meta http-equiv="Content-Security-Policy" content="frame-ancestors 'self' https://warpcast.com https://*.vercel.app https://*.farcaster.xyz *;">
  
  <style>
    body { font-family: system-ui, sans-serif; padding: 20px; line-height: 1.5; }
    pre { background: #f5f5f5; padding: 10px; border-radius: 4px; overflow-x: auto; }
    h1, h2 { color: #333; }
  </style>
</head>
<body>
  <h1>Header Diagnostic</h1>
  
  <h2>Request Headers</h2>
  <pre id="request-headers">${JSON.stringify(requestHeaders, null, 2)}</pre>
  
  <h2>Response Headers (Set by Server)</h2>
  <pre id="response-headers">${JSON.stringify(responseHeaders, null, 2)}</pre>
  
  <h2>Response Headers (Detected by Browser)</h2>
  <pre id="browser-headers">Loading...</pre>
  
  <h2>Frame Embedding Test</h2>
  <div id="frame-test">
    <p>Testing if this page can be embedded in an iframe...</p>
  </div>
  
  <script>
    // Log debugging information
    console.log('Header Diagnostic loaded');
    console.log('Document URL:', document.URL);
    console.log('Document referrer:', document.referrer);
    
    // Attempt to detect response headers via fetch
    async function detectHeaders() {
      try {
        const response = await fetch(window.location.href);
        const headers = {};
        response.headers.forEach((value, key) => {
          headers[key] = value;
        });
        document.getElementById('browser-headers').textContent = JSON.stringify(headers, null, 2);
        console.log('Headers detected by browser:', headers);
        
        // Check for X-Frame-Options
        if (headers['x-frame-options']) {
          document.getElementById('frame-test').innerHTML += 
            '<p style="color: red;">⚠️ X-Frame-Options detected: ' + headers['x-frame-options'] + '</p>';
        } else {
          document.getElementById('frame-test').innerHTML += 
            '<p style="color: green;">✅ No X-Frame-Options header detected</p>';
        }
        
        // Check for Content-Security-Policy
        if (headers['content-security-policy']) {
          const csp = headers['content-security-policy'];
          if (csp.includes('frame-ancestors')) {
            document.getElementById('frame-test').innerHTML += 
              '<p style="color: green;">✅ Content-Security-Policy includes frame-ancestors</p>';
          } else {
            document.getElementById('frame-test').innerHTML += 
              '<p style="color: red;">⚠️ Content-Security-Policy does not include frame-ancestors</p>';
          }
        } else {
          document.getElementById('frame-test').innerHTML += 
            '<p style="color: orange;">⚠️ No Content-Security-Policy header detected</p>';
        }
      } catch (error) {
        console.error('Error detecting headers:', error);
        document.getElementById('browser-headers').textContent = 'Error: ' + error.message;
      }
    }
    
    // Run header detection
    detectHeaders();
  </script>
</body>
</html>
  `);
}
