/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // images.unoptimized = true is required for static html export 'next export'
  // see https://github.com/vercel/next.js/issues/40240
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
