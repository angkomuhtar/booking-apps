import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: 10 * 1024 * 1024, // 4 MB
    },
    authInterrupts: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      },
      // Tambahkan domain lain kalau ada
      {
        protocol: "https",
        hostname: "*.palmpadel.id", // untuk avatar github
      },
    ],
  },
};

export default nextConfig;
