import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: 10 * 1024 * 1024, // 4 MB
    },
    authInterrupts: true,
  },
};

export default nextConfig;
