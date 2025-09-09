const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL}:path*`
      }
    ];
  },
  images: {
    domains: [
      'marketingapi.techleadsit.com',
      'localhost',
      'localhost:5000',
      'dev.marketingapi.techleadsit.com',
      'test.marketingapi.techleadsit.com'
    ]
  },
  staticPageGenerationTimeout: 120,
  swcMinify: true,
  async headers() {
    return [
      {
        source: '/images/(.*)', // Adjust for your asset folders
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  }
};

module.exports = withBundleAnalyzer(nextConfig);