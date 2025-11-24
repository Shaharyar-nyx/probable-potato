import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig = (phase: string) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  const nextConfigOptions: NextConfig = {
    eslint: { ignoreDuringBuilds: true },

    env: {
      NEXT_PUBLIC_STRAPI_GRAPHQL_URL: process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL,
      NEXT_PUBLIC_STRAPI_ASSETS: process.env.NEXT_PUBLIC_STRAPI_ASSETS,
      NEXT_PUBLIC_Nyxlab_CMS_URL: process.env.NEXT_PUBLIC_Nyxlab_CMS_URL,
      NEXT_PUBLIC_Nyxlab_URL: process.env.NEXT_PUBLIC_Nyxlab_URL,
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    },

    images: {
      dangerouslyAllowSVG: true,
      contentDispositionType: "attachment",
      formats: ["image/avif", "image/webp"],
      remotePatterns: [
        // ✅ Allow localhost for development
        {
          protocol: "http",
          hostname: "localhost",
          port: "1337",
        },
        // ✅ Allow production domains
        {
          protocol: "https",
          hostname: "*.Nyxlab.tech",
        },
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },

    sassOptions: {
      silenceDeprecations: ["legacy-js-api", "import"],
    },

    async headers() {
      return [
        {
          source: "/(.*)",
          headers: securityHeadersConfig(phase),
        },
      ];
    },

    async rewrites() {
      return [
        {
          source: "/api/:path*",
          destination: `${process.env.NEXT_PUBLIC_Nyxlab_CMS_URL}/api/:path*`,
        },
      ];
    },
  };

  return nextConfigOptions;
};

// ⚙️ Security headers configuration
const securityHeadersConfig = (phase: string) => {
  const cspReportOnly = true;

  const cspHeader = () => {
    const upgradeInsecure =
      phase !== PHASE_DEVELOPMENT_SERVER && !cspReportOnly ? "upgrade-insecure-requests;" : "";

    const defaultCSPDirectives = `
      default-src 'none';
      media-src 'self' https://*.Nyxlab.tech;
      object-src 'none';
      worker-src 'self' blob:;
      child-src 'self' blob:;
      manifest-src 'self';
      base-uri 'none';
      form-action 'none';
      frame-ancestors 'none';
      img-src 'self' data: blob: https://www.google.com https://*.Nyxlab.tech https://*.linkedin.com http://localhost:1337;
      frame-src 'self' https://www.google.com;
      font-src 'self' data: https://fonts.gstatic.com https://fonts.googleapis.com;
      style-src 'self' 'unsafe-inline';
      connect-src 'self' https://*.Nyxlab.tech https://*.linkedin.com https://www.google-analytics.com http://localhost:1337;
      ${upgradeInsecure}
    `;

    const scriptSrc = `
      https://www.googletagmanager.com https://snap.licdn.com https://api.retargetly.com https://www.google.com https://www.gstatic.com https://*.Nyxlab.tech
    `;

    if (process.env.NODE_ENV === "production") {
      return `
        ${defaultCSPDirectives}
        script-src 'self' 'unsafe-inline' ${scriptSrc};
      `;
    }

    // Development environment allows unsafe-eval for hot reload
    return `
      ${defaultCSPDirectives}
      script-src 'self' 'unsafe-inline' 'unsafe-eval' ${scriptSrc};
    `;
  };

  const headers = [
    {
      key: cspReportOnly
        ? "Content-Security-Policy-Report-Only"
        : "Content-Security-Policy",
      value: cspHeader().replace(/\n/g, ""),
    },
  ];

  return headers;
};

export default nextConfig;
