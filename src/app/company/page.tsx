"use client";

import React from "react";

import { Header } from "@/components";
import bugBountyData from "@/data/company/bug-bounty.json";
import events from "@/data/company/events.json";
import heroData from "@/data/company/hero.json";
import newsData from "@/data/company/news.json";
import ourCoreTeamData from "@/data/company/our-core-team.json";
import ourCultureData from "@/data/company/our-culture.json";
import taglineData from "@/data/company/tagline.json";
import { BugBountyPrograms, Events, News, OurCoreTeam, OurCulture, Tagline } from "@/sections";

const CompanyPage: React.FC = () => {
  return (
    <main>
      <Header {...heroData} />
      <BugBountyPrograms {...bugBountyData} />
      <OurCoreTeam {...ourCoreTeamData} />
      <OurCulture {...ourCultureData} />
      <Events {...events} />
      {/* <News {...newsData} /> */}
      <Tagline {...taglineData} />
    </main>
  );
};

export default CompanyPage;
