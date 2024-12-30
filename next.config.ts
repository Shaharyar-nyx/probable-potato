import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: { ignoreDuringBuilds: true },
  env: {
    DIRECTUS_GRAPHQL_ENDPOINT: process.env.DIRECTUS_GRAPHQL_ENDPOINT,
    DIRECTUS_ASSETS_URL: process.env.DIRECTUS_ASSETS_URL,
  },
  publicRuntimeConfig: {
    Directus: {
      assetsUrl: process.env.DIRECTUS_ASSETS_URL,
      url: process.env.DIRECTUS_GRAPHQL_ENDPOINT,
    },
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
