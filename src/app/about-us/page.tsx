import React from "react";
import { getPageBySlug } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import {
  HeroDark,
} from "@/sections";
import { ThreatAlertBar } from "@/sections/home/threat";
import AboutSection from "@/sections/darklab-intelligence/content-section";


export default async function AboutPage() {
  // 🔹 Fetch About page data from Strapi using slug
  const data = await getPageBySlug("about-us");
  console.log("about page data", data);

  return (
    <main>
      {/* 🔹 Render Strapi Blocks */}
      {data?.blocks && (
        <PageBuilder
          blockComponents={{
            hero_section: (props) => (
              <>
                <HeroDark {...props} />
                <ThreatAlertBar />
              </>
            ),
                ComponentBlocksContentSection: AboutSection,
          }}
          blocks={data.blocks}
        />
      )}
    </main>
  );
}
