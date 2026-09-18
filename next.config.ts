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
      // Old WordPress URLs (now 404 in GSC) 301'd to the most relevant live page,
      // so link equity and any lingering rankings transfer instead of dying on a 404.
      { source: '/construction-project-management-tips', destination: '/general-contracting/', statusCode: 301 },
      { source: '/home-addition-contractors-save-money', destination: '/room-additions-las-vegas/', statusCode: 301 },
      { source: '/butlers-construction-las-vegas', destination: '/', statusCode: 301 },
      { source: '/construction-home-loans', destination: '/new-home-construction/', statusCode: 301 },
      { source: '/wp-content/:path*', destination: '/', statusCode: 301 },
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
