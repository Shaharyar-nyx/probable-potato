import "./styles.scss";
import React from "react";

import data from "@/data/continuous-monitoring/why.json";

export const Why: React.FC = () => {
  return (
    <section className="why-parent-container">
      <div className="why-container">
        <div className="w-[60%]">
          <span className="tagline why-tagline">{data.tagline}</span>
          <h2 className="heading-1 why-title">{data.title}</h2>
          <p className="paragraph-md why-content">{data.text}</p>
        </div>
        <div className="w-[38%]">Hello world</div>
      </div>
    </section>
  );
};
