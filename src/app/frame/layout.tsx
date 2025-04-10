import type { Metadata } from "next";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_FRAME_NAME || "Inactive Followers Detector",
  description: process.env.NEXT_PUBLIC_FRAME_DESCRIPTION || "Find and unfollow inactive users",
  // Farcaster Frame metadata
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${process.env.NEXT_PUBLIC_URL || 'https://followertest-bettercallzaals-projects.vercel.app'}/opengraph-image.png`,
    'fc:frame:button:1': process.env.NEXT_PUBLIC_FRAME_BUTTON_TEXT || "Check Your Inactive Following today",
    'fc:frame:button:1:action': 'post_redirect',
    'fc:frame:post_url': `${process.env.NEXT_PUBLIC_URL || 'https://followertest-bettercallzaals-projects.vercel.app'}/api/frame`,
  },
};

export default function FrameLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <head>
        {/* Allow embedding in frames */}
        <meta httpEquiv="X-Frame-Options" content="ALLOWALL" />
        <meta httpEquiv="Content-Security-Policy" content="frame-ancestors 'self' https://warpcast.com https://*.vercel.app https://*.farcaster.xyz *;" />
      </head>
      {children}
    </>
  );
}
