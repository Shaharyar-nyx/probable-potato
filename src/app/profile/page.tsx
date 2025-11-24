import React from "react";

import { BlockType } from "@/types";
import { getPageBySlug } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { Metadata } from "next";
import {
  HeroDark,
  CallToAction,
} from "@/sections";
import IntelligenceLayersDark from "@/sections/darklab-intelligence/intelligence-layers-dark";
import { ThreatAlertBar } from "@/sections/home/threat";
import LeadershipSection from "@/sections/darklab-intelligence/leadership-section";


// ✅ Components map
const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: (props) => (
    <>
      <HeroDark {...props} />
      <ThreatAlertBar />
    </>
  ),
    ComponentBlocksLeadershipSection: LeadershipSection,
    

};

// ✅ Fetch data from Strapi (slug: "profile")
async function getProfilePageData() {
  return getPageBySlug("profile");
}

// ✅ Page component
async function ProfilePage() {
  const data = await getProfilePageData();
  console.log("profile data", data);

  if (!data?.blocks) return null;

  return (
    <main>
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
    </main>
  );
}

export default ProfilePage;
