import React from "react";

import { Header } from "@/components";
import { BugBountyGrid, ContinuousBugHunting, CTA, LaunchProgram } from "@/sections";
import { BlockType } from "@/types";
import { PageBuilder } from "@/components/PageBuilder";
import { getPageBySlug, STRAPI_ASSETS } from "@/lib";
import { Metadata } from "next";

const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: Header,
};

async function getPlatformData() {
  return getPageBySlug("dark-lab-defense");
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPlatformData();
  if (!data?.seo) {
    return {
      title: "Nyxlab",
      description: "",
      openGraph: {
        title: "Nyxlab",
        description: "",
        type: "website",
        siteName: "Nyxlab",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Nyxlab",
        description: "",
      },
    };
  }

  return {
    title: data.seo.title,
    description: data.seo.meta_description,
    keywords: data.seo.keywords,
    robots: {
      index: !data.seo.no_index,
      follow: !data.seo.no_follow,
    },
    openGraph: {
      title: data.seo.title,
      description: data.seo.meta_description,
      images: [{ url: STRAPI_ASSETS + data.seo.og_image?.data?.attributes?.url || "/favicon.ico" }],
      url: data.seo.canonical_url,
      type: "website",
      siteName: "Nyxlab",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: data.seo.title,
      description: data.seo.meta_description,
      images: [STRAPI_ASSETS + data.seo.og_image?.data?.attributes?.url || "/favicon.ico"],
    },
  };
}

async function PlatformPage() {
  const data = await getPlatformData();
  if (!data?.blocks) {
    return null;
  }
  return (
    <main>
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
    </main>
  );
}

export default PlatformPage;
