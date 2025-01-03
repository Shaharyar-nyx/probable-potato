import React from "react";

import { Button, IconRenderer } from "@/components";
import data from "@/data/bug-hunters/referral.json";

import "./styles.scss";

export const Referral: React.FC = () => {
  return (
    <section className="referral-parent-container">
      <div className="referral-container">
        <div className="referral-container-item">
          <span className="tagline mb-10 inline-block">{data.tagline}</span>
          <h2 className="heading-1 mb-5 font-bold text-primary-800">{data.title}</h2>
          <p className="paragraph-md mb-2 font-bold text-primary-800">{data.subtitle}</p>
          <p className="paragraph-md mb-5 text-primary-800">{data.text}</p>
          <Button>Send a Referral</Button>
        </div>
        <div className="referral-container-item grid grid-cols-2 gap-6">
          {data.features.map((feature) => (
            <div key={feature.id} className="flex flex-col gap-3 p-10">
              <div className="flex gap-3">
                <div className="inline-block rounded-[4px] bg-primary-500 p-1">
                  <IconRenderer className="h-6 w-6 text-primary-50" iconName={feature.icon} />
                </div>
                <h3 className="heading-7 font-bold text-primary-800">{feature.title}</h3>
              </div>
              <p className="paragraph-md text-primary-800">{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
