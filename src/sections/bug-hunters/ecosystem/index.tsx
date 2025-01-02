import React from "react";

import "./styles.scss";
import data from "@/data/bug-hunters/ecosystem.json";

export const Ecosystem: React.FC = () => {
  return (
    <section className="ecosystem-parent-container">
      <div className="ecosystem-container">
        <h2 className="heading-1 ecosystem-title">{data.title}</h2>
        <p className="paragraph-md ecosystem-text">{data.subtitle}</p>
        <div className="ecosystem-feature-container">
          {data.features.map((feature) => (
            <div key={feature.id} className="ecosystem-feature-item">
              <img alt={feature.title} className="ecosystem-feature-icon" src={feature.icon} />
              <h3 className="heading-7 ecosystem-feature-title">{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
