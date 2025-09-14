import React from "react";

import { CTA, NewsList, NewsHero } from "@/sections";
import { BlockType } from "@/types";
import { getPageBySlug, STRAPI_ASSETS } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { Metadata } from "next";
import { StrategicGuidanceAcross } from "@/sections/vciso/StrategicGuidanceAcross";
import { ClearOutputs } from "@/sections/vciso/ClearOutputs";
import { CyberLeadership } from "@/sections/vciso/CyberLeadership";

const blockComponents: Record<string, React.FC<any>> = {
  hero_section: NewsHero,
  strategic_guidance_across: StrategicGuidanceAcross,
  clear_outputs: ClearOutputs,
  cyber_leadership: CyberLeadership
};

async function getNewsPage() {
  return getPageBySlug("vciso");
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getNewsPage();

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

async function VcisoPage() {
  const data = await getNewsPage();
  if (!data?.blocks) {
    return null;
  }
  return <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />;
}

export default VcisoPage;
