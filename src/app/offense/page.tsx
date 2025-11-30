import React from "react";
import { getPageBySlug , STRAPI_ASSETS} from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { Metadata } from "next";

import {
  HeroDark,
  OfferingsDark,
  IntelligenceDark,
  OurServices,
  CallToAction,
  CaseStudies,
  StatsSection,
  TestimonialDarksSection,
  
} from "@/sections";
import { CrowdSourcing } from "@/sections/home/crowdsourcing";
import ResearchSection from "@/sections/darklab-intelligence/research-section";
import IntelligenceLayersDark from "@/sections/darklab-intelligence/intelligence-layers-dark";
import ResearchImpact from "@/sections/darklab-intelligence/research-impact";
import { ThreatAlertBar } from "@/sections/home/threat";
import DarkBrand from "@/sections/darklab-intelligence/dark-brand";
import FaqSection from "@/sections/darklab-intelligence/faqs";
export default async function OffensePage() {
  const data = await getPageBySlug("offense");
  console.log("data", data);

  return (
    <main>
      {/* 🔹 Strapi Blocks */}
      {data?.blocks && (
        <PageBuilder
  blockComponents={{
    hero_section: (props) => (
      <>
        <HeroDark {...props} />
        <ThreatAlertBar />
      </>
    ),

    // ✅ Rename to match Strapi typenames
    ComponentBlocksIntelligenceDark: IntelligenceDark,
    ComponentBlocksOurServices: OurServices,
    ComponentBlocksResearchImpact: ResearchImpact,
    ComponentBlocksCaseStudies: CaseStudies,
    ComponentBlocksCallToActionSection: CallToAction,
    ComponentBlocksIntelligenceLayersDark: IntelligenceLayersDark,
    ComponentBlocksResearchExists: ResearchSection,
    ComponentBlocksAchivement: StatsSection,
    ComponentBlocksTestimonialsSection: TestimonialDarksSection,
    ComponentBlocksDarkBrand: DarkBrand,
    ComponentBlocksBlocksFaq: FaqSection,

  }}
  blocks={data.blocks}
/>

      )}
    </main>
  );
}
