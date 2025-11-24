import React from "react";
import { getPageBySlug } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import {
  HeroDark,
  OfferingsDark,
  IntelligenceDark,
  OurServices,
  CallToAction, // ✅ CallToAction
} from "@/sections";
import HowWorksSection from "@/sections/darklab-intelligence/how-works-section";
import { ThreatAlertBar } from "@/sections/home/threat";
import IntelligenceLayersDark from "@/sections/darklab-intelligence/intelligence-layers-dark";
import InternetInfrastructureFlow from "@/sections/darklab-intelligence/internetIn-frastructure-flow"; // ✅ Import

export default async function DnsPage() {
  const data = await getPageBySlug("dns");
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
            ComponentBlocksOfferingsDark: OfferingsDark,
            ComponentBlocksIntelligenceDark: IntelligenceDark,
            ComponentBlocksOurServices: OurServices,
            ComponentBlocksIntelligenceLayersDark: IntelligenceLayersDark,
            ComponentBlocksHowWorks: HowWorksSection,
                      ComponentBlocksCallToActionSection: CallToAction,

          }}
          blocks={data.blocks}
        />
      )}

    
    </main>
    
  );
}
