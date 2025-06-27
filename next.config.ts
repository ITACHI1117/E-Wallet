import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ this disables ESLint on Vercel
  },
};

export default nextConfig;
