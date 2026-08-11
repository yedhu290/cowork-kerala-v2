import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  // Pin the workspace root explicitly - this app lives inside a monorepo
  // (apps/web) and Next's auto-detection can otherwise pick the repo root
  // if it finds another lockfile-like file up the tree.
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-42db8ecb21ee4032993b252440411d20.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
