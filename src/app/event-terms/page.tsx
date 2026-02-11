import React from "react";

import { BlockType } from "@/types";
import { getPageBySlug } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { Metadata } from "next";

import { HeroDark } from "@/sections";
import { CallToAction } from "@/sections";
import EventTermsBlock from "@/sections/terms-services/event-terms";


/* ---------------------------
   BLOCK REGISTRY FOR THIS PAGE
---------------------------- */
const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: (props) => (
    <>
      <HeroDark {...props} />
      <EventTermsBlock />
    </>
  ),
  ComponentBlocksCallToActionSection: CallToAction,
};


/* ---------------------------
     FETCH STRAPI PAGE
---------------------------- */
async function getEventTermsData() {
  return getPageBySlug("event-terms");
}


/* ---------------------------
     METADATA
---------------------------- */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Event Terms & Conditions | Nyxlab",
    description:
      "Terms and conditions for events organised by NyxLab Limited.",
  };
}


/* ---------------------------
     MAIN PAGE COMPONENT
---------------------------- */
export default async function EventTermsPage() {
  const data = await getEventTermsData();

  // If no Strapi page exists yet, render the block standalone
  if (!data?.blocks) {
    return (
      <main>
        <EventTermsBlock />
      </main>
    );
  }

  return (
    <main>
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
    </main>
  );
}
