import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  env: {
    NEXT_PUBLIC_STRAPI_GRAPHQL_URL: process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL,
    NEXT_PUBLIC_STRAPI_ASSETS: process.env.NEXT_PUBLIC_STRAPI_ASSETS,
    NEXT_PUBLIC_CYBERBAY_URL: process.env.NEXT_PUBLIC_CYBERBAY_URL,
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
};

export default nextConfig;
