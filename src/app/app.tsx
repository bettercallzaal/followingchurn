"use client";

import dynamic from "next/dynamic";
import ClientOnly from "./client-only";

// Import InactiveFollowers component with SSR disabled
const InactiveFollowers = dynamic(() => import("~/components/InactiveFollowers"), {
  ssr: false,
  loading: () => <div className="text-center py-10">Loading...</div>
});

export default function App(
  { title }: { title?: string } = { title: process.env.NEXT_PUBLIC_FRAME_NAME || "Inactive Followers Detector" }
) {
  // Ensure title is never undefined
  const safeTitle = title || "Inactive Followers Detector";
  
  return (
    <ClientOnly>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-8 text-center">{safeTitle}</h1>
        <p className="text-center mb-8 text-gray-600">
          Find and unfollow users who haven't posted in a while. 
          Filter by inactivity period and sort by oldest followers.
        </p>
        <InactiveFollowers />
      </div>
    </ClientOnly>
  );
}
