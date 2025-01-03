import React from "react";

import { Hero, BrandMission, Solutions, Testimonials, Clients, CTA } from "@/sections";

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      <BrandMission />
      <Solutions />
      <Testimonials />
      <Clients />
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
