import React from "react";
import { Header } from "@/components";
import { getPageBySlug } from "@/lib/pages";
import { PageBuilder } from "@/components/PageBuilder";
import { EventUpcoming2025 } from "@/sections";

const blockComponents: Record<string, React.FC<any>> = {
  hero_section: Header,
  events_section: EventUpcoming2025,
};

async function CyberbaysSimuCall() {
  const data = await getPageBySlug("cyberbays-simu-call");
  console.log("Page data:", data);

  if (!data?.blocks) return null;

  return <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />;
}

export default CyberbaysSimuCall;
