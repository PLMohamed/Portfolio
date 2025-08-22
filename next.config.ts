import { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "10MB",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "udwoxnykuqlwcg3i.public.blob.vercel-storage.com",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
    incomingRequests: true,
  },
};

export default nextConfig;
