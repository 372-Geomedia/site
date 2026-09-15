import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Pre-render every route to static HTML; production serves dist/client with nginx.
  output: 'export',
  images: { unoptimized: true },
};

export default nextConfig;
