import { Metadata } from "next";
import App from "./app";

const appUrl = process.env.NEXT_PUBLIC_URL || 'https://followertest-bettercallzaals-projects.vercel.app';

// frame preview metadata
const appName = process.env.NEXT_PUBLIC_FRAME_NAME || "Inactive Followers Detector";
const splashImageUrl = `${appUrl}/splash.png`;
const iconUrl = `${appUrl}/icon.png`;

// Use a simpler frame metadata structure to avoid hydration issues
const framePreviewMetadata = {
  version: "next",
  imageUrl: `${appUrl}/opengraph-image`,
  button: {
    title: process.env.NEXT_PUBLIC_FRAME_BUTTON_TEXT || "Check Your Inactive Following",
    action: {
      type: "launch_frame",
      name: appName,
      url: appUrl,
      splashImageUrl,
      iconUrl,
      splashBackgroundColor: "#4f46e5", // Indigo color for better branding
    },
  },
};

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: appName,
    openGraph: {
      title: appName,
      description: process.env.NEXT_PUBLIC_FRAME_DESCRIPTION || "Find and unfollow users who haven&apos;t posted in a while",
    },
    other: {
      "fc:frame": JSON.stringify(framePreviewMetadata),
    },
  };
}

export default function Home() {
  return (<App />);
}
