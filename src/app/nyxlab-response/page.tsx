import React from "react";

import { BlockType } from "@/types";
import { getPageBySlug } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { Metadata } from "next";
import {
  HeroDark,
    CallToAction,
      StatsSection,

} from "@/sections";
import { ThreatAlertBar } from "@/sections/home/threat";
import IntelligenceLayersDark from "@/sections/darklab-intelligence/intelligence-layers-dark";
import ResearchImpact from "@/sections/darklab-intelligence/research-impact";

// ✅ Components map
const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: (props) => (
    <>
      <HeroDark {...props} />
      <ThreatAlertBar />
    </>
  ),
      ComponentBlocksIntelligenceLayersDark: IntelligenceLayersDark,
        ComponentBlocksResearchImpact: ResearchImpact,
            ComponentBlocksAchivement: StatsSection,
        
            ComponentBlocksCallToActionSection: CallToAction,
        
};

// ✅ Fetch data from Strapi (slug: "nyxlab-response")
async function getNyxlabResponsePageData() {
  return getPageBySlug("nyxlab-response");
}

// ✅ Page component
async function NyxlabResponsePage() {
  const data = await getNyxlabResponsePageData();
  console.log("nyxlab-response data", data);

  if (!data?.blocks) return null;

  return (
    <main>
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
    </main>
  );
}

export default NyxlabResponsePage;
