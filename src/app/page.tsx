import React from "react";

import { Hero, BrandMission, Solutions, Testimonials, Clients, RequestDemo } from "@/sections";

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
