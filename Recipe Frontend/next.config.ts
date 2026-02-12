import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ✅ required for Amplify static hosting
  output: 'export',
  trailingSlash: true,

  // you already had these — keep them
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ IMPORTANT for static export when using next/image
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'edamam-product-images.s3.amazonaws.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
