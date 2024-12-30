import React from "react";

import { Header } from "@/components";
import Form from "@/components/Blocks/Form";
import heroData from "@/data/contact-us/hero.json";

const ContactUs: React.FC = () => {
  return (
    <main>
      <Header {...heroData} />
      <Form />
    </main>
  );
};

export default ContactUs;
