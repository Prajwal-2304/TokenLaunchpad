import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    R2_PUBLIC_URL: process.env.R2_PUBLIC_URL
  }
};

export default nextConfig;
