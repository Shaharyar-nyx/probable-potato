import React from "react";

import "./styles.scss";
import { Button } from "@/components";
import data from "@/data/bug-hunters/hunter-levels.json";

export const HunterLevels: React.FC = () => {
  return (
    <section className="hunter-levels-parent-container">
      <div className="hunter-levels-container">
        <span className="tagline hunter-levels-tagline">{data.tagline}</span>
        <h2 className="heading-1 hunter-levels-title">{data.title}</h2>
        <p className="paragraph-md hunter-levels-description">{data.description}</p>
        <div className="hunter-levels-feature-container">
          {data.features.map((feature) => (
            <div key={feature.id} className="hunter-levels-feature-item">
              <div className="hunter-levels-feature-title-container">
                <h3 className="heading-3 hunter-levels-feature-title">{feature.title}</h3>
              </div>
              <div className="hunter-levels-feature-text-container">
                <div>
                  <p className="paragraph-lg hunter-levels-feature-subtitle">{feature.subtitle}</p>
                  <p className="paragraph-md hunter-levels-feature-description">{feature.description}</p>
                </div>
                {feature.button_text !== undefined && (
                  <Button variant="neutral" externalHref={feature.button_link}>
                    {feature.button_text}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
