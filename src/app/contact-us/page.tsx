import React from "react";

import Form from "@/components/Blocks/Form";
import Header from "@/components/Blocks/Header";
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
