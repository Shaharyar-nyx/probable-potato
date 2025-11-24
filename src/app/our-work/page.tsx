import React from "react";
import { BlockType } from "@/types";
import { getPageBySlug } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { Metadata } from "next";

import { HeroDark } from "@/sections";
import { ThreatAlertBar } from "@/sections/home/threat";
import CaseStudiesList from "../case-studies/page"; // ✅ correct import path

const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: (props) => (
    <>
      <HeroDark {...props} />
      <ThreatAlertBar />
    </>
  ),
  case_study_list: () => <CaseStudiesList />, // ✅ will show CaseStudiesList here
};

// 🗂️ Fetch page content from Strapi by slug
async function getOurWorkPageData() {
  return getPageBySlug("our-work");
}

async function OurWorkPage() {
  const data = await getOurWorkPageData();
  console.log("Our Work Page Data:", data);

  if (!data?.blocks) return null;

  return (
    <main>
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
    </main>
  );
}

export default OurWorkPage;
