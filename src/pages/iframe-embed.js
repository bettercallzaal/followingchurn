// This page will create a special iframe embed that works around X-Frame-Options
export default function IframeEmbedPage() {
  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', margin: 0, padding: 0 }}>
      <iframe 
        src="https://warpcast.com/~/developers/frames?url=https://followertest-bettercallzaals-projects.vercel.app/api/frame-proxy" 
        style={{ 
          border: 'none', 
          width: '100%', 
          height: '100%' 
        }}
        allow="fullscreen"
        allowFullScreen
      />
    </div>
  );
}

// Use getServerSideProps to set headers
export async function getServerSideProps() {
  return {
    props: {},
    // Set headers to allow embedding
    headers: {
      'X-Frame-Options': 'ALLOWALL',
      'Content-Security-Policy': "frame-ancestors 'self' https://warpcast.com https://*.vercel.app https://*.farcaster.xyz *;",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  };
}
