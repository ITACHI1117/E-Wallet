import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ this disables ESLint on Vercel
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
