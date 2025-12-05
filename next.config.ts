import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable source maps in development to fix the source map errors
  productionBrowserSourceMaps: false,

  // Configure images if you're using external image sources
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all HTTPS images (update this for production)
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      // Remove this duplicate - it's incorrect
      {
        protocol: "https",
        hostname: "i.ibb.co.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com/",
      },
    ],
  },

  // Environment variables configuration
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || "http://localhost:3000",
  },
};

export default nextConfig;
