import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig = (phase: string) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isProduction = process.env.NODE_ENV === "production";

  const nextConfigOptions: NextConfig = {
    basePath: '/app',
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
        // Development: Allow localhost
        ...(!isProduction ? [{
          protocol: "http" as const,
          hostname: "localhost",
          port: "1337",
        }] : []),
        // Production: Nyxlab domains
        {
          protocol: "https" as const,
          hostname: "*.Nyxlab.tech",
        },
        {
          protocol: "https" as const,
          hostname: "cms-public-web.Nyxlab.tech",
        },
        {
          protocol: "https" as const,
          hostname: "helios-cms.dev.Nyxlab.tech",
        },
        // External services (only what you actually need)
        {
          protocol: "https" as const,
          hostname: "www.google.com",
        },
        {
          protocol: "https" as const,
          hostname: "*.linkedin.com",
        },
      ],
    },

    sassOptions: {
      silenceDeprecations: ["legacy-js-api", "import", "mixed-decls"],
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
      const cmsUrl = process.env.NEXT_PUBLIC_Nyxlab_CMS_URL;

      // FIX: Only apply the rewrite rule if the environment variable is defined.
      // If cmsUrl is undefined (during the build phase on DO), return an empty array.
      if (!cmsUrl) {
        return []; 
      }

      return [
        {
          source: "/api/:path*",
          destination: `${cmsUrl}/api/:path*`,
        },
      ];
    },
  };

  return nextConfigOptions;
};

// ⚙️ Security headers configuration
const securityHeadersConfig = (phase: string) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isProduction = process.env.NODE_ENV === "production";
  
  // Set to false in production to enforce CSP
  const cspReportOnly = !isProduction;

  const cspHeader = () => {
    const upgradeInsecure = isProduction && !cspReportOnly ? "upgrade-insecure-requests;" : "";
    
    // Dynamic localhost inclusion based on environment
    const localhostSources = !isProduction ? "http://localhost:1337" : "";

    const defaultCSPDirectives = `
      default-src 'none';
      media-src 'self' https://*.Nyxlab.tech;
      object-src 'none';
      worker-src 'self' blob:;
      child-src 'self' blob:;
      manifest-src 'self';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      img-src 'self' data: blob: https://www.google.com https://*.Nyxlab.tech https://*.linkedin.com ${localhostSources};
      frame-src 'self' https://www.google.com https://www.gstatic.com;
      font-src 'self' data: https://fonts.gstatic.com https://fonts.googleapis.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      connect-src 'self' https://*.Nyxlab.tech https://*.linkedin.com https://www.google-analytics.com ${localhostSources};
      ${upgradeInsecure}
    `;

    const scriptSrc = `
      https://www.googletagmanager.com https://snap.licdn.com https://api.retargetly.com https://www.google.com https://www.gstatic.com https://*.Nyxlab.tech
    `;

    if (isProduction) {
      return `
        ${defaultCSPDirectives}
        script-src 'self' 'unsafe-inline' ${scriptSrc};
      `;
    }

    // Development: Allow unsafe-eval for hot reload
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
    {
      key: "X-DNS-Prefetch-Control",
      value: "on",
    },
    {
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    },
    {
      key: "X-Frame-Options",
      value: "DENY",
    },
    {
      key: "X-Content-Type-Options",
      value: "nosniff",
    },
    {
      key: "X-XSS-Protection",
      value: "1; mode=block",
    },
    {
      key: "Referrer-Policy",
      value: "strict-origin-when-cross-origin",
    },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=()",
    },
  ];

  return headers;
};

export default nextConfig;