import React from "react";

import { BlockType } from "@/types";
import { getPageBySlug, STRAPI_ASSETS } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { Metadata } from "next";
import { HeroDark, OfferingsDark, IntelligenceDark, OurServices, CallToAction } from "@/sections";
import { ThreatAlertBar } from "@/sections/home/threat";
import HowWorksSection from "@/sections/darklab-intelligence/how-works-section";


const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: (props) => (
    <>
      <HeroDark {...props} />
      <ThreatAlertBar />
    </>
  ),
  ComponentBlocksOfferingsDark: OfferingsDark,
  ComponentBlocksIntelligenceDark: IntelligenceDark,
  ComponentBlocksHowWorks: HowWorksSection,
  ComponentBlocksCallToActionSection: CallToAction,


};



async function getDarkLabResponseData() {
  return getPageBySlug("intelligence");
}


async function DarkLabResponse() {
  const data = await getDarkLabResponseData();
  console.log("data", data);
  if (!data?.blocks) return null;

  return (
    <main>
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
    </main>
  );
}



export default DarkLabResponse;
