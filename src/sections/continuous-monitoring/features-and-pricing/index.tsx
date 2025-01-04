import React from "react";

import "./styles.scss";
import { IconRenderer } from "@/components";
import data from "@/data/continuous-monitoring/features-and-pricing.json";

export const FeaturesAndPricing: React.FC = () => {
  return (
    <section className="features-and-pricing-parent-container">
      <div className="features-and-pricing-container">
        <h2 className="heading-1 features-and-pricing-title">{data.title}</h2>
        <p className="paragraph-md features-and-pricing-text">{data.text}</p>
        <div className="features-and-pricing-content">
          <div className="features-and-pricing-feature-container">
            {data.features.map((feature) => (
              <div key={feature.id}>
                <h3 className="heading-6 features-and-pricing-feature-title">{feature.title}</h3>
                <div className="features-and-pricing-sub-feature-container">
                  {feature.sub_features.map((subFeature) => (
                    <div key={subFeature.id} className="features-and-pricing-sub-feature-item">
                      <div className="features-and-pricing-sub-feature-icon-container">
                        <IconRenderer className="features-and-pricing-sub-feature-icon" iconName={subFeature.icon} />
                      </div>
                      <div>
                        <h4 className="paragraph-lg features-and-pricing-sub-feature-title">{subFeature.title}</h4>
                        <p className="heading-9 features-and-pricing-sub-feature-text">{subFeature.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="features-and-pricing-card-container">Hello world</div>
        </div>
      </div>
    </section>
  );
};
