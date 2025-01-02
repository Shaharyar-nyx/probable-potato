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
      <CTA
        title="Secure Your Digital Future"
        description="Experience the power of proactive cybersecurity tailored to your organization's unique needs."
        buttonText="Request a Demo"
        href="/contact"
        backgroundImage={{
          src: "/images/demo/banner1.png",
        }}
      />
    </main>
  );
};

export default Home;
