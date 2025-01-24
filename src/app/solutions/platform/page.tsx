import React from "react";

import { Header } from "@/components";
import { BugBountyGrid, ContinuousBugHunting, CTA, LaunchProgram, Packages } from "@/sections";
import { BlockType } from "@/types";
import { PageBuilder } from "@/components/PageBuilder";
import { getPageBySlug } from "@/lib";

const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: Header,
  cp_bugbounty_programs: BugBountyGrid,
  cp_countinuous_bug_hunting: ContinuousBugHunting,
  cp_launch_your_bugbounty: LaunchProgram,
  packages_section: Packages,
  single_card_section: CTA,
};

const PlatformPage: React.FC = async () => {
  const data = await getPageBySlug("platform");

  if (!data?.blocks) {
    return null;
  }

  return (
    <main>
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
    </main>
  );
};

export default PlatformPage;
