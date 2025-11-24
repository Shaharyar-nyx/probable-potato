import React from "react";

import { BlockType } from "@/types";
import { getPageBySlug } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { Metadata } from "next";
import {
    HeroDark,
    CallToAction,
} from "@/sections";
import { ThreatAlertBar } from "@/sections/home/threat";
import ResearchSection from "@/sections/darklab-intelligence/research-section";
import HowWorksSection from "@/sections/darklab-intelligence/how-works-section";
import DarkBrand from "@/sections/darklab-intelligence/dark-brand";


// ✅ Components map
const blockComponents: Record<string, React.FC<BlockType>> = {
    hero_section: (props) => (
        <>
            <HeroDark {...props} />
            <ThreatAlertBar />
        </>
    ),
    ComponentBlocksResearchExists: ResearchSection,
    ComponentBlocksDarkBrand: DarkBrand,
    ComponentBlocksHowWorks: HowWorksSection,
    ComponentBlocksCallToActionSection: CallToAction,


};

// ✅ Fetch data from Strapi (slug: "nyxlab-build")
async function getNyxlabBuildPageData() {
    return getPageBySlug("nyxlab-build");
}

// ✅ Page component
async function NyxlabBuildPage() {
    const data = await getNyxlabBuildPageData();
    console.log("nyxlab-build data", data);

    if (!data?.blocks) return null;

    return (
        <main>
            <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
        </main>
    );
}

export default NyxlabBuildPage;
