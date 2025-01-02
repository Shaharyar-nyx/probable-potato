import { Metadata } from "next";
import React from "react";

import { Header } from "@/components";
import BugBountyPrograms from "@/components/platform/BugBountyPrograms";
import ContinuousBugHunting from "@/components/platform/ContinuousBugHunting";
import LaunchProgram from "@/components/platform/LaunchProgram";
import Packages from "@/components/Blocks/Packages";
import CTA from "@/components/Blocks/cta";

export const metadata: Metadata = {
  title: "Cyberbay Platform - Fortify, Scale, and Triage",
  description:
    "Discover how our platform helps you manage bug bounty programs effectively with continuous bug hunting through the product development lifecycle.",
};

const PlatformPage = () => {
  return (
    <main className="flex min-h-screen flex-col">
      <Header
        backgroundImage="/platform/platform-hero-bg.webp"
        description="Execute public and private bug bounty programs with Cyberbay’s pre-vetted community of bug hunters."
        title="Fortify, Scale, and Triage with the Cyberbay Platform"
      />
      <BugBountyPrograms />
      <ContinuousBugHunting />
      <LaunchProgram />
      <Packages />
      <CTA
        tagline="Connect"
        title="Get Expert Guidance for Your Bug Bounty"
        description="Schedule a consult to receive tailored advice on launching your bug bounty program. Our experts will guide you through program setup and bounty pricing to ensure a smooth launch."
        buttonText="Contact Sales"
        href="/contact"
        backgroundImage={{
          src: "/platform/platform-cta-bg.webp",
        }}
      />
    </main>
  );
};

export default PlatformPage;
