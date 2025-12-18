import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig = (phase: string) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isProduction = process.env.NODE_ENV === "production";

  const nextConfigOptions: NextConfig = {
    trailingSlash: true,

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
        // Development
        ...(!isProduction
          ? [
              {
                protocol: "http" as const,
                hostname: "localhost",
                port: "1337",
              },
              {
                protocol: "http" as const,
                hostname: "127.0.0.1",
                port: "1337",
              },
            ]
          : []),

        // Your production hosts
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
          hostname: "shark-app-tmqz4.ondigitalocean.app",
        },
        {
          protocol: 'https',
          hostname: 'nyxlab-public-web.s3.ap-southeast-1.amazonaws.com',
        },  
        {
          protocol: "https" as const,
          hostname: "shark-app-tmqz4.ondigitalocean.app",
        },

        // External sources
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

      // SAFE: Avoid build errors
      if (!cmsUrl) return [];

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

// -------------------------------------------
// Security headers
// -------------------------------------------

const securityHeadersConfig = (phase: string) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isProduction = process.env.NODE_ENV === "production";

  const cspReportOnly = !isProduction;

  const cspHeader = () => {
    const upgradeInsecure =
      isProduction && !cspReportOnly ? "upgrade-insecure-requests;" : "";

    const localhostSources = !isProduction ? "http://localhost:1337 http://127.0.0.1:1337" : "";
    // Get Strapi URL from env, remove /graphql suffix and trailing slash
    const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL?.replace(/\/graphql$/, '').replace(/\/$/, '') || '';

    const defaultCSP = `
      default-src 'none';
      media-src 'self' https://*.Nyxlab.tech https://*.ondigitalocean.app ${strapiBaseUrl};
      object-src 'none';
      worker-src 'self' blob:;
      child-src 'self' blob:;
      manifest-src 'self';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      img-src 'self' data: blob: https://www.google.com https://*.Nyxlab.tech https://*.linkedin.com https://*.ondigitalocean.app ${strapiBaseUrl} ${localhostSources};
      frame-src 'self' https://www.google.com https://www.gstatic.com https://challenges.cloudflare.com;
      font-src 'self' data: https://fonts.gstatic.com https://fonts.googleapis.com;
      style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
      connect-src 'self' https://*.Nyxlab.tech https://*.linkedin.com https://www.google-analytics.com https://*.ondigitalocean.app ${strapiBaseUrl} ${localhostSources} https://challenges.cloudflare.com;
      ${upgradeInsecure}
    `;

    const scriptSrc = `
      https://www.googletagmanager.com https://snap.licdn.com https://api.retargetly.com https://www.google.com https://www.gstatic.com https://*.Nyxlab.tech https://challenges.cloudflare.com
    `;

    if (isProduction) {
      return `
        ${defaultCSP}
        script-src 'self' 'unsafe-inline' ${scriptSrc};
      `;
    }

    return `
      ${defaultCSP}
      script-src 'self' 'unsafe-inline' 'unsafe-eval' ${scriptSrc};
    `;
  };

  return [
    {
      key: cspReportOnly
        ? "Content-Security-Policy-Report-Only"
        : "Content-Security-Policy",
      value: cspHeader().replace(/\n/g, ""),
    },
    { key: "X-DNS-Prefetch-Control", value: "on" },
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-XSS-Protection", value: "1; mode=block" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  ];
};

export default nextConfig;