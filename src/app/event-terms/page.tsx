import React from "react";
import { Metadata } from "next";
import EventTermsBlock from "@/sections/terms-services/event-terms";


/* ---------------------------
     METADATA
---------------------------- */
export const metadata: Metadata = {
  title: "Event Terms & Conditions | Nyxlab",
  description: "Terms and conditions for events organised by NyxLab Limited.",
};


/* ---------------------------
     MAIN PAGE COMPONENT
---------------------------- */
export default function EventTermsPage() {
  return (
    <main>
      <EventTermsBlock />
    </main>
  );
}
