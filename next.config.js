/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your configuration options here
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['your-domain.com'], // Add your image domains if needed
  },
  // Add dynamic route configuration
  experimental: {
    // Enable App Router
    appDir: true,
  },
  // Configure which routes should be dynamic
  dynamicRoutes: {
    '/api/tevents/getTevents': { dynamic: true },
    '/api/ntevents/getNTevents': { dynamic: true },
    '/api/workshop/getWorkshop': { dynamic: true },
    '/api/userCount': { dynamic: true }
  }
};

module.exports = nextConfig;
