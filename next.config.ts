import type { NextConfig } from "next";

// Security headers for every response (the strictest set that needs no per-request nonce)
const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests",
  },
];

const nextConfig: NextConfig = {
  // Used by our Dockerfile to produce a minimal `server.js` bundle.
  output: "standalone",
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The old pages became sections of the home page: their links and rankings carry over
  async redirects() {
    return [
      { source: "/projects", destination: "/#projets", statusCode: 301 },
      { source: "/experiences", destination: "/#parcours", statusCode: 301 },
      { source: "/contact", destination: "/#contact", statusCode: 301 },
      { source: "/ancien", destination: "/", statusCode: 301 },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
