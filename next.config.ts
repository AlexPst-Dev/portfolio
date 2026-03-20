import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Used by our Dockerfile to produce a minimal `server.js` bundle.
  output: "standalone",
};

export default nextConfig;
