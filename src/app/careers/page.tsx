import React from "react";

import { Header } from "@/components";
import benefitsData from "@/data/careers/benefits.json";
import clientsContent from "@/data/careers/clients.json";
import heroData from "@/data/careers/hero.json";
import jobOpeningsData from "@/data/careers/job-openings.json";
import { ApplicationForm, Benefits, Clients, JobOpenings } from "@/sections";

const CareersPage: React.FC = () => {
  return (
    <main>
      <Header {...heroData} />
      <JobOpenings {...jobOpeningsData} />
      <Benefits {...benefitsData} />
      <ApplicationForm />
      <Clients {...clientsContent} />
    </main>
  );
};

export default CareersPage;
