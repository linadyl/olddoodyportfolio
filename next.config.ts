import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Remove swcMinify as it's not recognized in Next.js 15
  // swcMinify: true,
  
  // Required for Cloudflare Pages
  output: 'standalone',
  
  images: {
    // Avoid issues with image optimization
    unoptimized: true,
  },
};

export default nextConfig;