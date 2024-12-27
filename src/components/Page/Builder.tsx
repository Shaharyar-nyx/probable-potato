/* eslint-disable @typescript-eslint/no-explicit-any */
import getConfig from "next/config";
import Head from "next/head";
import React, { useEffect, useState } from "react";

import { useBuilderService } from "./useBuilderService";
import BrandMission from "../Blocks/BrandMission";
import Clients from "../Blocks/Clients";
import RequestDemo from "../Blocks/RequestDemo";
import Solutions from "../Blocks/Solutions";
import Testimonials from "../Blocks/Testimonials";

import Layout from "layouts/default";

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
    image: seo.image?.id ? `${Directus.assetsUrl}/${seo.image.id}` : "/images/favicon.ico",
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
          <meta content={metadata.description} name="description" />
          <meta content={metadata.keywords} name="keywords" />

          {/* Robots meta tag to handle noindex/nofollow logic */}
          {(metadata.noIndex || metadata.noFollow) && (
            <meta
              content={`${metadata.noIndex ? "noindex" : "index"}, ${metadata.noFollow ? "nofollow" : "follow"}`}
              name="robots"
            />
          )}

          {/* Open Graph metadata for social media sharing */}
          <meta content={metadata.title} property="og:title" />
          <meta content={metadata.description} property="og:description" />
          <meta content={metadata.image} property="og:image" />
          <meta content={metadata.url} property="og:url" />
          <meta content={metadata.type} property="og:type" />
          <meta content={metadata.siteName} property="og:site_name" />
          <meta content={metadata.locale} property="og:locale" />

          {/* Twitter Card metadata */}
          <meta content={metadata.title} name="twitter:title" />
          <meta content={metadata.description} name="twitter:description" />
          <meta content={metadata.image} name="twitter:image" />
          <meta content="summary_large_image" name="twitter:card" />
        </Head>

        <main className="mx-auto" id="content">
          {blocks.map((block: { collection: any }, index: number) => {
            const collection = block?.collection;
            const Component = componentMap[collection];

            return Component ? (
              <Component key={index} {...block} isMobile={isMobile} permalink={permalink?.replace(/\//g, "")} />
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
