import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig = (phase: string) => {
  // report-uri /csp-violation-report-endpoint;
  const nextConfigOptions: NextConfig = {
    eslint: { ignoreDuringBuilds: true },
    env: {
      NEXT_PUBLIC_STRAPI_GRAPHQL_URL: process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL,
      NEXT_PUBLIC_STRAPI_ASSETS: process.env.NEXT_PUBLIC_STRAPI_ASSETS,
      NEXT_PUBLIC_CYBERBAY_CMS_URL: process.env.NEXT_PUBLIC_CYBERBAY_CMS_URL,
      NEXT_PUBLIC_CYBERBAY_URL: process.env.NEXT_PUBLIC_CYBERBAY_URL,
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    },
    images: {
      dangerouslyAllowSVG: true,
      contentDispositionType: "attachment",
      formats: ["image/avif", "image/webp"],
      remotePatterns: [
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
          destination: `${process.env.NEXT_PUBLIC_CYBERBAY_CMS_URL}/api/:path*`,
        },
      ];
    },
  };
  return nextConfigOptions;
};

const securityHeadersConfig = (phase: string) => {
  const cspReportOnly = true;

  const cspHeader = () => {
    const upgradeInsecure = phase !== PHASE_DEVELOPMENT_SERVER && !cspReportOnly ? "upgrade-insecure-requests;" : "";

    // worker-src is for sentry replay
    // child-src is because safari <= 15.4 does not support worker-src
    const defaultCSPDirectives = `
      default-src 'none';
      media-src 'self' https://*.cyberbay.tech;
      object-src 'none';
      worker-src 'self' blob:;
      child-src 'self' blob:;
      manifest-src 'self';
      base-uri 'none';
      form-action 'none';
      frame-ancestors 'none';
      img-src 'self' data: blob: https://www.google.com https://*.cyberbay.tech https://*.linkedin.com;
      frame-src 'self' https://www.google.com;
      font-src 'self' data: https://fonts.gstatic.com https://fonts.googleapis.com;
      style-src 'self' 'unsafe-inline';
      connect-src 'self' https://*.cyberbay.tech https://*.linkedin.com https://www.google-analytics.com;
      ${upgradeInsecure}
    `;

    const scriptSrc = `
      'https://www.googletagmanager.com https://snap.licdn.com https://api.retargetly.com https://www.google.com  https://www.gstatic.com https://*.cyberbay.tech
    `;
    // for production environment allowing vitals.vercel-insights.com
    // based on: https://vercel.com/docs/speed-insights#content-security-policy
    if (process.env.NODE_ENV === "production") {
      return `
          ${defaultCSPDirectives}
          script-src 'self' 'unsafe-inline' ${scriptSrc}; 
      `;
    }

    // for dev environment enable unsafe-eval for hot-reload
    return `
      ${defaultCSPDirectives}
      script-src 'self' 'unsafe-inline' 'unsafe-eval' ${scriptSrc}; 
    `;
  };

  const headers = [
    {
      key: cspReportOnly ? "Content-Security-Policy-Report-Only" : "Content-Security-Policy",
      value: cspHeader().replace(/\n/g, ""),
    },
  ];
  return headers;
};

export default nextConfig;
