/* eslint-disable @typescript-eslint/no-explicit-any */
import Head from "next/head";
import getConfig from "next/config";
import React, { useEffect, useState } from "react";
import { useBuilderService } from "./useBuilderService";
import Layout from "layouts/default";
import BrandMission from "../Blocks/BrandMission";
import Solutions from "../Blocks/Solutions";
import Testimonials from "../Blocks/Testimonials";
import Clients from "../Blocks/Clients";
import RequestDemo from "../Blocks/RequestDemo";

interface BuilderProps {
  page: any;
}

const Builder: React.FC<BuilderProps> = ({ page }) => {
  const { pageData, blocks, componentMap, seo } = useBuilderService({
    page,
  });

  const permalink = pageData?.permalink;

  const { publicRuntimeConfig } = getConfig();
  const { Directus } = publicRuntimeConfig;

  const metadata = {
    title: "Cyberbay | A Trusted Bug Bounty Ecosystem",
    description:
      "Cyberbay connects highly skilled bounty hunters with enterprises to find and fix bugs through our Bounty Missions. Get Started Today!",
    image: seo.image?.id
      ? `${Directus.assetsUrl}/${seo.image.id}`
      : "/images/favicon.ico",
    url: seo.canonical_url || `https://www.cyberbay.tech/${permalink}`,
    keywords: seo.keywords?.join(", ") || "",
    type: "website",
    siteName: "Cyberbay",
    locale: "en_US",
    noIndex: seo.no_index,
    noFollow: seo.no_follow,
  };

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    setIsMobile(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  return (
    blocks && (
      <Layout>
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <meta name="keywords" content={metadata.keywords} />

          {/* Robots meta tag to handle noindex/nofollow logic */}
          {(metadata.noIndex || metadata.noFollow) && (
            <meta
              name="robots"
              content={`${metadata.noIndex ? "noindex" : "index"}, ${metadata.noFollow ? "nofollow" : "follow"}`}
            />
          )}

          {/* Open Graph metadata for social media sharing */}
          <meta property="og:title" content={metadata.title} />
          <meta property="og:description" content={metadata.description} />
          <meta property="og:image" content={metadata.image} />
          <meta property="og:url" content={metadata.url} />
          <meta property="og:type" content={metadata.type} />
          <meta property="og:site_name" content={metadata.siteName} />
          <meta property="og:locale" content={metadata.locale} />

          {/* Twitter Card metadata */}
          <meta name="twitter:title" content={metadata.title} />
          <meta name="twitter:description" content={metadata.description} />
          <meta name="twitter:image" content={metadata.image} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>

        <main id="content" className="mx-auto">
          {blocks.map((block: { collection: any }, index: number) => {
            const collection = block?.collection;
            const Component = componentMap[collection];

            return Component ? (
              <Component
                key={index}
                {...block}
                permalink={permalink?.replace(/\//g, "")}
                isMobile={isMobile}
              />
            ) : null;
          })}
        </main>
        <BrandMission />
        <Solutions />
        <Testimonials />
        <Clients />
        <RequestDemo />
      </Layout>
    )
  );
};

export default Builder;
