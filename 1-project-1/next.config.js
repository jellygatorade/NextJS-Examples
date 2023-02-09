/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // for developement - see: https://beta.reactjs.org/reference/react/StrictMode - causes components and effects to run twice in developement
  //reactStrictMode: false,
  // images.unoptimized = true is required for static html export 'next export'
  // see https://github.com/vercel/next.js/issues/40240
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
