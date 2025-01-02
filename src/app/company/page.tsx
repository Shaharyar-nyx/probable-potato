"use client";

import React from "react";

import { Header } from "@/components";
import { BugBountyPrograms } from "@/components/Blocks/BugBountyPrograms";
import { Events } from "@/components/Blocks/Events";
import { News } from "@/components/Blocks/News";
import { OurCoreTeam } from "@/components/Blocks/OurCoreTeam";
import { OurCulture } from "@/components/Blocks/OurCulture";
import Tagline from "@/components/Blocks/Tagline";
import events from "@/data/company/events.json";
import heroData from "@/data/company/hero.json";
import news from "@/data/company/news.json";
import ourCoreTeam from "@/data/company/our-core-team.json";
import ourCulture from "@/data/company/our-culture.json";

const CompanyPage: React.FC = () => {
  return (
    <main>
      <Header {...heroData} />
      <BugBountyPrograms />
      <OurCoreTeam {...ourCoreTeam} />
      <OurCulture {...ourCulture} />
      <Events {...events} />
      <News {...news} />
      <Tagline />
    </main>
  );
};

export default CompanyPage;
