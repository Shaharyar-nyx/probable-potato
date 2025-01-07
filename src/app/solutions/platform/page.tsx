import React from "react";

import { Header } from "@/components";
import bugBountyGridData from "@/data/platform/big-bounty-grid.json";
import continuousBugHuntingData from "@/data/platform/bug-hunting.json";
import launchProgramData from "@/data/platform/launch-program.json";
import packagesData from "@/data/platform/packages.json";
import { BugBountyGrid, ContinuousBugHunting, CTA, LaunchProgram, Packages } from "@/sections";

const PlatformPage: React.FC = () => {
  return (
    <main>
      <Header
        backgroundImage="/platform/platform-hero-bg.webp"
        description="Execute public and private bug bounty programs with Cyberbay’s pre-vetted community of bug hunters."
        title="Fortify, Scale, and Triage with the Cyberbay Platform"
      />
      <BugBountyGrid {...bugBountyGridData} />
      <ContinuousBugHunting {...continuousBugHuntingData} />
      <LaunchProgram {...launchProgramData} />
      <Packages {...packagesData} />
      <CTA
        backgroundImage={{
          src: "/platform/platform-cta-bg.webp",
        }}
        buttonText="Contact Sales"
        description="Schedule a consult to receive tailored advice on launching your bug bounty program. Our experts will guide you through program setup and bounty pricing to ensure a smooth launch."
        href="/contact"
        tagline="Connect"
        title="Get Expert Guidance for Your Bug Bounty"
      />
    </main>
  );
};

export default PlatformPage;
