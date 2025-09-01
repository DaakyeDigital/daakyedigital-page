import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure proper output for Vercel
  output: 'standalone',
  
  // Handle TypeScript
  typescript: {
    // Don't fail build on TypeScript errors in production
    ignoreBuildErrors: false,
  },
  
  // Handle ESLint
  eslint: {
    // Don't fail build on ESLint errors in production
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
