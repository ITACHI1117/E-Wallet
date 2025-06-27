import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ this disables ESLint on Vercel
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    appDir: true, // Make sure this is here
  },
};

export default nextConfig;
