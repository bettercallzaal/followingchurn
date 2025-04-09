import type { Metadata } from "next";

import { getSession } from "~/auth"
import "./globals.css";
import { Providers } from "~/app/providers";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_FRAME_NAME || "Frames v2 Demo",
  description: process.env.NEXT_PUBLIC_FRAME_DESCRIPTION || "A Farcaster Frames v2 demo app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
  const session = await getSession()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent Grammarly from injecting its attributes */}
        <meta name="grammarly-disable" content="true" />
      </head>
      <body suppressHydrationWarning>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
