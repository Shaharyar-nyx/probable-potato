import React from "react";

import brandMissionContent from "@/data/home/brand-mission.json";
import clientsContent from "@/data/home/clients.json";
import heroContent from "@/data/home/hero.json";
import solutionsContent from "@/data/home/solutions.json";
import testimonialsContent from "@/data/home/testimonials.json";
import { Hero, BrandMission, Solutions, Testimonials, Clients, CTA } from "@/sections";

const Home: React.FC = () => {
  return (
    <main>
      <Hero {...heroContent} />
      <BrandMission {...brandMissionContent} />
      <Solutions {...solutionsContent} />
      <Testimonials {...testimonialsContent} />
      <Clients {...clientsContent} />
      <CTA
        backgroundImage={{
          src: "/images/demo/banner1.png",
        }}
        buttonText="Request a Demo"
        description="Experience the power of proactive cybersecurity tailored to your organization's unique needs."
        href="/contact"
        title="Secure Your Digital Future"
      />
    </main>
  );
};

export default Home;
