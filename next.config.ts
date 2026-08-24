import type { NextConfig } from 'next';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  // WordPress served every URL with a trailing slash; keep that contract.
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // WordPress 301'd the old /about/ slug to the published /about-us/ page.
      { source: '/about', destination: '/about-us/', statusCode: 301 },
      // Canonicalise www to the bare apex so link equity consolidates on one host.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.bcss702.com' }],
        destination: 'https://bcss702.com/:path*',
        statusCode: 301,
      },
    ];
  },
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default nextConfig;
