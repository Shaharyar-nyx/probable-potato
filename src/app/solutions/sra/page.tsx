import React from "react";
import type { Metadata } from "next";

import { Organization, Partner, Objective, ServiceList, PackagesV2, Faq, CTA, HeaderFrame } from "@/sections";
import { getPageBySlug, STRAPI_ASSETS } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { BlockType } from "@/types";

const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: HeaderFrame,
  organization_section: Organization,
  partner_section: Partner,
  objective_section: Objective,
  //service_section: Services,
  service_v2_section: ServiceList,
  package_section: PackagesV2,
  faq_section: Faq,
  cta_section: CTA,
};

async function getSraData() {
  return getPageBySlug("sra");
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getSraData();
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

async function Sra() {
  const data = await getSraData();
  if (!data?.blocks) {
    return null;
  }

  return <main>{<PageBuilder blockComponents={blockComponents} blocks={data.blocks} />}</main>;
}

export default Sra;
