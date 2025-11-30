import React from "react";
import { HeroDark } from "@/sections";
import { BlockType } from "@/types";
import { getPageBySlug, STRAPI_ASSETS } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { Metadata } from "next";
import ContactFormSection from "@/components/contact-form/contactus-form";

const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: HeroDark,
};

async function getContactUsData() {
  return getPageBySlug("contact-us");
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContactUsData();
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
      images: [
        {
          url:
            STRAPI_ASSETS +
              data.seo.og_image?.data?.attributes?.url || "/favicon.ico",
        },
      ],
      url: data.seo.canonical_url,
      type: "website",
      siteName: "Nyxlab",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: data.seo.title,
      description: data.seo.meta_description,
      images: [
        STRAPI_ASSETS +
          data.seo.og_image?.data?.attributes?.url || "/favicon.ico",
      ],
    },
  };
}

async function ContactUs() {
  const data = await getContactUsData();
  if (!data?.blocks) {
    return null;
  }

  return (
    <main className="min-h-screen bg-black">
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
      <ContactFormSection />
    </main>
  );
}

export default ContactUs;