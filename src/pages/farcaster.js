import { useEffect } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

// Import your app component with SSR disabled
const App = dynamic(() => import('../app/app'), { ssr: false });

export default function FarcasterPage() {
  useEffect(() => {
    // Check if we're in an iframe
    const isInIframe = window !== window.parent;
    console.log('Is in iframe:', isInIframe);
    
    // Log debugging information
    console.log('Farcaster page loaded');
    console.log('Document URL:', document.URL);
    console.log('Document referrer:', document.referrer);
  }, []);

  return (
    <>
      <Head>
        <title>Inactive Followers Detector - Farcaster</title>
        <meta name="description" content="Find and unfollow users who haven't posted in a while" />
        
        {/* Farcaster Frame metadata */}
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="https://followertest-bettercallzaals-projects.vercel.app/opengraph-image.png" />
        <meta property="fc:frame:button:1" content="Check Your Inactive Following today" />
        <meta property="fc:frame:button:1:action" content="post_redirect" />
        <meta property="fc:frame:post_url" content="https://followertest-bettercallzaals-projects.vercel.app/api/frame" />
        
        {/* Allow embedding in frames */}
        <meta httpEquiv="X-Frame-Options" content="ALLOWALL" />
        <meta httpEquiv="Content-Security-Policy" content="frame-ancestors 'self' https://warpcast.com https://*.vercel.app https://*.farcaster.xyz *;" />
      </Head>

      <App />
    </>
  );
}

// This is crucial - it tells Next.js to disable automatic security headers for this page
export async function getServerSideProps() {
  return {
    props: {},
    // Disable security headers that might interfere with frame embedding
    headers: {
      'X-Frame-Options': 'ALLOWALL',
      'Content-Security-Policy': "frame-ancestors 'self' https://warpcast.com https://*.vercel.app https://*.farcaster.xyz *;",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  };
}
