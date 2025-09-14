import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com', // from original remotePatterns
      },
      {
        protocol: 'https',
        hostname: 'assets.pokemon.com', // from domains array
      },
    ],
  },
};

export default nextConfig;
