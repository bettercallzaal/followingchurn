#!/bin/bash

# Simple deployment script for Vercel
echo "Starting deployment to Vercel..."

# Create a vercel.json file with build settings
cat > vercel.json << EOF
{
  "version": 2,
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next",
  "env": {
    "NEXT_PUBLIC_URL": "https://followertest-bettercallzaals-projects.vercel.app",
    "NEXTAUTH_URL": "https://followertest-bettercallzaals-projects.vercel.app",
    "NEXT_PUBLIC_FRAME_NAME": "FollowerTest",
    "NEXT_PUBLIC_FRAME_DESCRIPTION": "test for following churn",
    "NEXT_PUBLIC_FRAME_BUTTON_TEXT": "Check Your Inactive Following today",
    "NEYNAR_API_KEY": "15CC284E-9C7E-44C8-9D32-BC82D3C05320",
    "NEYNAR_CLIENT_ID": "b8ef3593-7d21-4e7e-8e37-17adfec955d8"
  }
}
EOF

# Deploy to Vercel
npx vercel --prod

echo "Deployment complete!"
