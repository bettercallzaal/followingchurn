# Inactive Followers Detector for Farcaster 🔍

A Farcaster Mini App that helps users identify and unfollow contacts who haven't been active for a specified period.

This app is built with [NextJS](https://nextjs.org/), TypeScript, and React, using the Neynar API to interact with the Farcaster ecosystem.

## Features

- **Authentication**: Sign in with Farcaster (SIWF) for seamless authentication
- **Inactive User Detection**: Identify users who haven't posted within a specified period (30, 60, or 90 days)
- **Sorting Options**: Sort by most inactive first or oldest followers first
- **Unfollow Functionality**: Easily unfollow inactive users directly from the app
- **Responsive Design**: Works on both mobile and desktop devices

## Getting Started

To run the project locally:

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

The app will be available at http://localhost:3000

## Environment Variables

Create a `.env.local` file with the following variables:

```
NEYNAR_API_KEY="your-neynar-api-key"
NEYNAR_CLIENT_ID="your-neynar-client-id"
NEXT_PUBLIC_URL="http://localhost:3000" # Update for production
NEXT_PUBLIC_FRAME_NAME="Inactive Followers Detector"
NEXT_PUBLIC_FRAME_DESCRIPTION="Find and unfollow inactive Farcaster users"
```

## Deploying to Production

This app can be deployed to Vercel or any other hosting platform that supports Next.js:

```bash
# Build for production
npm run build

# Deploy to Vercel
npm run deploy:vercel
```

## Testing in Farcaster

To test your frame in Farcaster:
1. Open the Warpcast Frame Developer Tools: https://warpcast.com/~/developers/frames
2. Enter your app URL in the "Preview Frame" tool
3. Click "Preview" to see how your frame appears in Farcaster
