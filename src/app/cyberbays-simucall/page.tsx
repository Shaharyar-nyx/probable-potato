import React from "react";
import { Header } from "@/components";
import { getPageBySlug } from "@/lib/pages";
import { PageBuilder } from "@/components/PageBuilder";
import { FeaturedMedia , Offer , Benefit_Cards} from "@/sections/simu-call-work";
import {CTA } from "@/sections";


const blockComponents: Record<string, React.FC<any>> = {
  hero_section: Header,
  ComponentBlocksSimuFeaturedMedia: FeaturedMedia,
  ComponentBlocksOffer: Offer,
  ComponentBlocksBenefitCards: Benefit_Cards,
  single_card_section: CTA,
};

async function CyberbaysSimuCall() {
  const data = await getPageBySlug("cyberbays-simucall");
  console.log("Page data:", data);

  if (!data?.blocks) return null;

  return <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />;
}

export default CyberbaysSimuCall;
