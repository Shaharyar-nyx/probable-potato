import React from "react";

import { BlockType } from "@/types";
import { getPageBySlug, STRAPI_ASSETS } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { Metadata } from "next";
import {
  HeroDark,
  OfferingsDark,
  IntelligenceDark,
  OurServices,
  CallToAction,
  CaseStudies,
} from "@/sections";
import ResearchSection from "@/sections/darklab-intelligence/research-section";
import IntelligenceLayersDark from "@/sections/darklab-intelligence/intelligence-layers-dark";
import ResearchImpact from "@/sections/darklab-intelligence/research-impact";
import { ThreatAlertBar } from "@/sections/home/threat";

// 🧠 Define all available Strapi blocks
const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: (props) => (
    <>
      <HeroDark {...props} />
      <ThreatAlertBar />
    </>
  ),
  // ComponentBlocksOfferingsDark: OfferingsDark,
  ComponentBlocksIntelligenceDark: IntelligenceDark,
  ComponentBlocksOurServices: OurServices,
  ComponentBlocksResearchImpact: ResearchImpact,
    ComponentBlocksCaseStudies: CaseStudies,   
     ComponentBlocksCallToActionSection: CallToAction,
  ComponentBlocksIntelligenceLayersDark: IntelligenceLayersDark,  
    ComponentBlocksResearchExists:ResearchSection,

  
  // ComponentBlocksIntelligenceLayersDark: IntelligenceLayersDark,
  // ComponentBlocksCallToActionSection: CallToAction,
};

// 📡 Fetch Research Page data from Strapi
async function getResearchPageData() {
  return getPageBySlug("research");
}

// 🧩 Research Page Component
async function ResearchPage() {
  const data = await getResearchPageData();
  console.log("research data:", data);

  if (!data?.blocks) return null;

  return (
    <main>
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
    </main>
  );
}

export default ResearchPage;
