/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL', // Allow embedding in frames
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://warpcast.com https://*.vercel.app https://*.farcaster.xyz *;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
