/** @type {import('next').NextConfig} */
const developmentEval = process.env.NODE_ENV === 'development' ? " 'unsafe-eval'" : '';
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'${developmentEval};
  style-src 'self' 'unsafe-inline';
  font-src 'self' data:;
  img-src 'self' blob: data: https://res.cloudinary.com https://images.unsplash.com https://images.pexels.com;
  connect-src 'self';
  frame-src 'self' https://www.youtube.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
`.replace(/\n/g, '');

const nextConfig = {
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 82],
    minimumCacheTTL: 86400,
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'Content-Security-Policy', value: ContentSecurityPolicy },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
