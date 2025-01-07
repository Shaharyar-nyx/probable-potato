import { Header } from "@/components";
import findingBugBountyData from "@/data/bug-bounty/finding-bug-bounty.json";
import heroData from "@/data/bug-bounty/hero.json";
import importanceBugTestingData from "@/data/bug-bounty/importance-bug-testing.json";
import packagesData from "@/data/bug-bounty/packages.json";
import programSafeguardsData from "@/data/bug-bounty/program-safeguards.json";
import programTypeData from "@/data/bug-bounty/program-type.json";
import { FindingBugBounty, ImportanceBugTesting, Packages, ProgramSafeguards, ProgramType } from "@/sections";

const BugBountyPage: React.FC = () => {
  return (
    <main>
      <Header {...heroData} />
      <FindingBugBounty {...findingBugBountyData} />
      <ImportanceBugTesting {...importanceBugTestingData} />
      <ProgramSafeguards {...programSafeguardsData} />
      <ProgramType {...programTypeData} />
      <Packages {...packagesData} />
    </main>
  );
};

export default BugBountyPage;
