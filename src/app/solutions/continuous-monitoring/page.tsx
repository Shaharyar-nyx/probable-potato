import React from "react";

import { Header } from "@/components";
import { Why, HarnessAi, SecurityPosture, Packages } from "@/sections";
import { getPageBySlug } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";

const blockComponents: Record<string, React.FC<any>> = {
  hero_section: Header,
  cm_why_essential: Why,
  cm_strengthen_security: SecurityPosture,
  cm_harness_ai: HarnessAi,
  packages_section: Packages,
};

const ContinuousMonitoringPage: React.FC = async () => {
  const data = await getPageBySlug("continuous-monitoring");

  if (!data?.blocks) {
    return null;
  }

  return (
    <main>
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
    </main>
  );
};

export default ContinuousMonitoringPage;
