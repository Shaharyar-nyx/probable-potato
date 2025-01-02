import React from "react";

import "./styles.scss";
import data from "@/data/bug-hunters/ecosystem.json";

export const Ecosystem: React.FC = () => {
  return (
    <section className="ecosystem-parent-container">
      <div className="ecosystem-container">
        <h2 className="heading-1 text-center font-bold text-neutral-50">{data.title}</h2>
      </div>
    </section>
  );
};
