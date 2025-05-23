import withPWA from 'next-pwa';

// apps/admin-pwa/next.config.js
const nextConfig = {
  reactStrictMode: true,
  // Add other Next.js configurations if needed
  // If you want to run admin dev server on a different port:
  // (Note: `devServer` is not a standard Next.js config. Port is usually set via CLI: `next dev -p 3002`)
};

export default withPWA({
  dest: 'public', // Destination directory for PWA files
  register: true, // Register the service worker
  skipWaiting: true, // Install new service worker on activate
  disable: process.env.NODE_ENV === 'development', // Optionally disable PWA in dev
})(nextConfig);
