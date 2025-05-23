import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // Ensure your API is running on localhost:3001
        destination: 'http://localhost:3001/api/:path*', 
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
