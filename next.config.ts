import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  experimental: {
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;