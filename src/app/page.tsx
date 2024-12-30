import React from "react";

import BrandMission from "@/components/Blocks/BrandMission";
import Clients from "@/components/Blocks/Clients";
import Hero from "@/components/Blocks/Hero";
import RequestDemo from "@/components/Blocks/RequestDemo";
import Solutions from "@/components/Blocks/Solutions";
import Testimonials from "@/components/Blocks/Testimonials";

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <BrandMission />
      <Solutions />
      <Testimonials />
      <Clients />
      <RequestDemo />
    </main>
  );
};

export default Home;
