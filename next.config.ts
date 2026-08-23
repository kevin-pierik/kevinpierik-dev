import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
    globalNotFound: true,
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },

  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  async redirects() {
    return [
      { source: "/works", destination: "/", permanent: true },
      { source: "/works/:slug", destination: "/", permanent: true },
      { source: "/words", destination: "/", permanent: true },
      { source: "/words/:slug", destination: "/", permanent: true },
      { source: "/about", destination: "/", permanent: true },
      { source: "/privacy", destination: "/", permanent: true },
      { source: "/extra", destination: "/", permanent: true },
      { source: "/extra/:slug", destination: "/", permanent: true },
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:slug", destination: "/", permanent: true },
      { source: "/writing", destination: "/", permanent: true },
      { source: "/writing/:slug", destination: "/", permanent: true },
      { source: "/studio", destination: "/sanity-studio", permanent: false },
      {
        source: "/studio/:path*",
        destination: "/sanity-studio/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
