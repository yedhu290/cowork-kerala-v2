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
    // Serve AVIF first (smaller than WebP), falling back to WebP, then the
    // original. next/image negotiates the best format the browser accepts.
    formats: ['image/avif', 'image/webp'],
    // Cache optimized images for 31 days.
    minimumCacheTTL: 60 * 60 * 24 * 31,
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
  // Permanent (301) redirects for renamed city slugs, so old indexed URLs and
  // inbound links resolve to the current page with a proper status (instead of
  // a soft 404). Thiruvananthapuram was renamed to Trivandrum across all
  // services.
  async redirects() {
    return [
      {
        source: '/:service(coworking-space|virtual-office|private-office)/thiruvananthapuram',
        destination: '/:service/trivandrum',
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
