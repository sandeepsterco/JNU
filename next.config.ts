import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline'
    ${isDev ? "'unsafe-eval'" : ""}
    https://www.google.com
    https://www.gstatic.com
    https://www.recaptcha.net
    https://www.googletagmanager.com
    https://www.google-analytics.com
    https://cdn.jsdelivr.net;
  style-src 'self' 'unsafe-inline'
    https://fonts.googleapis.com
    https://cdn.jsdelivr.net;
  img-src 'self' data: blob: https:;
  media-src 'self' https:;
  font-src 'self'
    https://fonts.gstatic.com
    https://cdn.jsdelivr.net
    data:;
  connect-src 'self'
    https://project-demo.in
    https://www.google-analytics.com
    https://analytics.google.com
    https://stats.g.doubleclick.net
    https://www.gstatic.com
    https://www.recaptcha.net;
  frame-src 'self'
    https://www.youtube.com
    https://youtube.com
    https://www.google.com
    https://www.gstatic.com
    https://www.recaptcha.net
    https://maps.google.com
    https://www.google.com/maps/
    https://maps.googleapis.com
    https://www.googletagmanager.com;
  frame-ancestors 'self';
  object-src 'none';
  base-uri 'self';
`.replace(/\s{2,}/g, ' ').trim();

const nextConfig: NextConfig = {
  experimental: {

  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Content-Security-Policy", value: cspHeader },
        ],
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://project-demo.in/jnu-jaipur/api/:path*",
      },
    ];
  },
};

export default nextConfig;