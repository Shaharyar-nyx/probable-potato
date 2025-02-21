import React from "react";

import { Header } from "@/components";
import { BugBountyGrid, ContinuousBugHunting, CTA, LaunchProgram, Packages } from "@/sections";
import { BlockType } from "@/types";
import { PageBuilder } from "@/components/PageBuilder";
import { getPageBySlug, STRAPI_ASSETS } from "@/lib";
import { Metadata } from "next";

const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: Header,
  cp_bugbounty_programs: BugBountyGrid,
  cp_countinuous_bug_hunting: ContinuousBugHunting,
  cp_launch_your_bugbounty: LaunchProgram,
  packages_section: Packages,
  single_card_section: CTA,
};

async function getPlatformData() {
  return getPageBySlug("platform");
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPlatformData();
  if (!data?.seo) {
    return {
      title: "Cyberbay",
      description: "",
      openGraph: {
        title: "Cyberbay",
        description: "",
        type: "website",
        siteName: "Cyberbay",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Cyberbay",
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
      siteName: "Cyberbay",
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
};

export default PlatformPage;
