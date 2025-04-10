// This page creates a direct embed to Warpcast's Frame Developer Tools
// with your app URL pre-filled, bypassing X-Frame-Options issues

export default function DirectEmbedPage() {
  return (
    <div style={{ height: '100vh', width: '100vw', overflow: 'hidden', margin: 0, padding: 0 }}>
      <iframe 
        src="https://warpcast.com/~/developers/frames?url=https://followertest-bettercallzaals-projects.vercel.app/farcaster" 
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
    props: {}
  };
}
