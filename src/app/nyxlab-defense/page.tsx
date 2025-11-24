import React from "react";

import { BlockType } from "@/types";
import { getPageBySlug } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { Metadata } from "next";
import {
    HeroDark,
} from "@/sections";
import { ThreatAlertBar } from "@/sections/home/threat";
import ResearchSection from "@/sections/darklab-intelligence/research-section";
import IntelligenceLayersDark from "@/sections/darklab-intelligence/intelligence-layers-dark";
import ResearchImpact from "@/sections/darklab-intelligence/research-impact";
import DarkBrand from "@/sections/darklab-intelligence/dark-brand";
import FaqSection from "@/sections/darklab-intelligence/faqs";
import { IntelligenceDark } from "@/sections";
import { CallToAction } from "@/sections";
import HowWorksSection from "@/sections/darklab-intelligence/how-works-section";

// ✅ Components map
const blockComponents: Record<string, React.FC<BlockType>> = {
    hero_section: (props) => (
        <>
            <HeroDark {...props} />
            <ThreatAlertBar />
        </>
    ),
    // ✅ Rename to match Strapi typenames

    ComponentBlocksResearchImpact: ResearchImpact,
    ComponentBlocksIntelligenceLayersDark: IntelligenceLayersDark,
    ComponentBlocksResearchExists: ResearchSection,
    ComponentBlocksIntelligenceDark: IntelligenceDark,
    ComponentBlocksHowWorks: HowWorksSection,
    ComponentBlocksCallToActionSection: CallToAction,
    ComponentBlocksDarkBrand: DarkBrand,
    ComponentBlocksBlocksFaq: FaqSection,

};

// ✅ Fetch data from Strapi (slug: "nyxlab-defense")
async function getNyxlabDefensePageData() {
    return getPageBySlug("nyxlab-defense");
}

// ✅ Page component
async function NyxlabDefensePage() {
    const data = await getNyxlabDefensePageData();
    console.log("nyxlab-defense data", data);

    if (!data?.blocks) return null;

    return (
        <main>
            <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
        </main>
    );
}

export default NyxlabDefensePage;
