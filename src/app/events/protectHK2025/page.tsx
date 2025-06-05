import React from "react";

import { EventIntro, CampaignTimeline, EventWork, CTA, EventPartner } from "@/sections";
import { PageBuilder } from "@/components/PageBuilder";
import { getPageBySlug, STRAPI_ASSETS } from "@/lib";
import { Metadata } from "next";
import { Header } from "@/components";

const blockComponents: Record<string, React.FC<any>> = {
  hero_section: Header,
  intro_section: EventIntro,
  work_section: EventWork,
  timeline_section: CampaignTimeline,
  //co_organizers_section: EventUpcoming2025,
  partner_section: EventPartner,
  cta_section: CTA,
};

async function getPageData() {
  return getPageBySlug("protectHK2025");
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getPageData();
  console.log("Event 2025 page data:", data);
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

async function Event2025Page() {
  const data = await getPageData();
  if (!data?.blocks) {
    return null;
  }

  return <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />;
}

export default Event2025Page;
