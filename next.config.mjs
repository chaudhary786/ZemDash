/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `node:` protocol (not available in browser)
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: 'mock',
        child_process: false,
        module: false,
      };
    }
    return config;
  },
  // Disable server-side rendering for specific pages if needed
  // This can help with client-side only dependencies
  reactStrictMode: true,
  // Enable experimental features if needed
  experimental: {
    // This is experimental but can be helpful for certain dependencies
    // that rely on Node.js built-ins
    fallbackNodePolyfills: false,
  },
}

export default nextConfig
