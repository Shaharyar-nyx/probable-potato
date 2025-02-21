import React from "react";

import { Header } from "@/components";
import { CTA, Ecosystem, FeaturedHunters, HunterLevels, KeyBenefits, Referral, WhyJoin } from "@/sections";
import { BlockType } from "@/types";
import { getPageBySlug, STRAPI_ASSETS } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { Metadata } from "next";

const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: Header,
  bh_why_bughunters_join: WhyJoin,
  bh_key_benefits: KeyBenefits,
  bh_referral_program: Referral,
  bh_how_it_works_1: Referral,
  bh_building_ecosystem: Ecosystem,
  bh_levels: HunterLevels,
  bh_featured_hunters: FeaturedHunters,
  single_card_section: CTA,
};


async function getBugHuntersData() {
  return getPageBySlug("bug-hunters");
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getBugHuntersData();
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

async function EthicalHackersPage() {
  const data = await getBugHuntersData();
  if (!data?.blocks) {
    return null;
  }

  return (
    <main>
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
    </main>
  );
}

export default EthicalHackersPage;
