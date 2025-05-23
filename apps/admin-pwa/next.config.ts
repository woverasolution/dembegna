/* eslint-disable @typescript-eslint/no-require-imports */

import withSerwistInit from "@serwist/next";

// apps/admin-pwa/next.config.js
const withSerwist = withSerwistInit({
  swSrc: "src/sw.ts",
  swDest: "public/sw.js",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add other Next.js configurations if needed
  // If you want to run admin dev server on a different port:
  // (Note: `devServer` is not a standard Next.js config. Port is usually set via CLI: `next dev -p 3002`)
};

export default withSerwist(nextConfig);
