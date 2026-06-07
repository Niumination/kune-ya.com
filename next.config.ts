import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),

  // Security headers via middleware instead
  poweredByHeader: false,
  reactStrictMode: true,

  // Compress responses
  compress: true,

  // Optimize production builds
  swcMinify: true,
};

export default nextConfig;
