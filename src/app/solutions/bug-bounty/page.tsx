import { Header } from "@/components";
import { PageBuilder } from "@/components/PageBuilder";
import { getPageBySlug } from "@/lib";
import { FindingBugBounty, ImportanceBugTesting, Packages, ProgramSafeguards, ProgramType } from "@/sections";
import { BlockType } from "@/types";

const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: Header,
  bb_findings_bugs: FindingBugBounty,
  bb_continuous_bug_testing: ImportanceBugTesting,
  bb_program_safeguards: ProgramSafeguards,
  // bb_which_program: ProgramType,
  packages_section: Packages,
};

const BugBountyPage: React.FC = async () => {
  const data = await getPageBySlug("bug-bounty");

  if (!data?.blocks) {
    return null;
  }

  return (
    <main>
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
    </main>
  );
};

export default BugBountyPage;
