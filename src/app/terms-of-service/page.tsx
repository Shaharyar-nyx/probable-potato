import React from "react";

import { BlockType } from "@/types";
import { getPageBySlug } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { Metadata } from "next";

// Import any blocks you want to use here
import { HeroDark } from "@/sections";
import { CallToAction } from "@/sections";
import TermsTextBlock from "@/sections/terms-services/terms";

// OPTIONAL: If Terms page needs these later
// import OfferingsDark from "@/sections/...";
// import IntelligenceDark from "@/sections/...";


/* ---------------------------
   BLOCK REGISTRY FOR THIS PAGE
---------------------------- */
const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: (props) => (
    <>
      <HeroDark {...props} />
            <TermsTextBlock />

    </>
  ),
  ComponentBlocksCallToActionSection: CallToAction,

  // You can add more if needed
  // ComponentBlocksOfferingsDark: OfferingsDark,
  // ComponentBlocksIntelligenceDark: IntelligenceDark,
};


/* ---------------------------
     FETCH STRAPI PAGE
---------------------------- */
async function getTermsOfServiceData() {
  return getPageBySlug("terms-of-service");
}


/* ---------------------------
     MAIN PAGE COMPONENT
---------------------------- */
export default async function TermsOfServicePage() {
  const data = await getTermsOfServiceData();
  console.log("Terms of Service Data:", data);

  if (!data?.blocks) return null;

  return (
   <main>
               <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
           </main>
  );
}
