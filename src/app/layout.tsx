import type { Metadata } from "next";
import { headers } from "next/headers";

import { getSession } from "~/auth"
import "./globals.css";
import { Providers } from "~/app/providers";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_FRAME_NAME || "Frames v2 Demo",
  description: process.env.NEXT_PUBLIC_FRAME_DESCRIPTION || "A Farcaster Frames v2 demo app",
  // Add Open Graph metadata for Farcaster
  openGraph: {
    title: process.env.NEXT_PUBLIC_FRAME_NAME || "Inactive Followers Detector",
    description: process.env.NEXT_PUBLIC_FRAME_DESCRIPTION || "Find and unfollow inactive users",
    images: ['/opengraph-image.png'],
  },
  // Add other metadata
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': `${process.env.NEXT_PUBLIC_URL || 'https://followertest-bettercallzaals-projects.vercel.app'}/opengraph-image.png`,
    'fc:frame:button:1': process.env.NEXT_PUBLIC_FRAME_BUTTON_TEXT || "Check Your Inactive Following today",
    'fc:frame:button:1:action': 'post',
    'fc:frame:post_url': process.env.NEXT_PUBLIC_URL || 'https://followertest-bettercallzaals-projects.vercel.app',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
  const session = await getSession()

  // Set headers for embedding in Farcaster
  const headersList = headers();
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent Grammarly from injecting its attributes */}
        <meta name="grammarly-disable" content="true" />
        
        {/* Allow embedding in frames */}
        <meta httpEquiv="X-Frame-Options" content="ALLOWALL" />
        <meta httpEquiv="Content-Security-Policy" content="frame-ancestors 'self' https://warpcast.com https://*.vercel.app https://*.farcaster.xyz *;" />
      </head>
      <body suppressHydrationWarning>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
