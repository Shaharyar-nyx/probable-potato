import React from "react";

import { BlockType } from "@/types";
import { getPageBySlug } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { Metadata } from "next";
import {
  HeroDark,
  CallToAction,
  IntelligenceDark,
    TestimonialDarksSection,
      StatsSection,

} from "@/sections";
import { ThreatAlertBar } from "@/sections/home/threat";

// ✅ Components map
const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: (props) => (
    <>
      <HeroDark {...props} />
      <ThreatAlertBar />
    </>
  ),
    ComponentBlocksIntelligenceDark: IntelligenceDark,
      ComponentBlocksCallToActionSection: CallToAction,
        ComponentBlocksTestimonialsSection: TestimonialDarksSection,
                    ComponentBlocksAchivement: StatsSection,
        
};

// ✅ Fetch data from Strapi (slug: "nyxlab-academy")
async function getNyxlabAcademyPageData() {
  return getPageBySlug("nyxlab-academy");
}

// ✅ Page component
async function NyxlabAcademyPage() {
  const data = await getNyxlabAcademyPageData();
  console.log("nyxlab-academy data", data);

  if (!data?.blocks) return null;

  return (
    <main>
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
    </main>
  );
}

export default NyxlabAcademyPage;
