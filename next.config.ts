import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    unoptimized: true, // For easier Vercel/Static Export compatibility
  },
};

export default nextConfig;
