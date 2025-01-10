import React from "react";

import "./styles.scss";
import { SemiCircle } from "@/components";
import data from "@/data/continuous-monitoring/security-posture.json";

export const SecurityPosture: React.FC = () => {
  return (
    <section className="security-posture-parent-container">
      <div className="security-posture-container">
        <h2 className="heading-1 mb-5 font-bold text-primary-800">{data.title}</h2>
        <p className="paragraph-md mb-6 text-primary-800">{data.text}</p>
        <div className="hidden w-full max-w-screen-xl lg:block">
          <SemiCircle data={data.chart.features} text={data.chart.text} />
        </div>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 lg:hidden">
          {data.chart.features.map((feature) => (
            <div key={feature.id} className="rounded-xl bg-primary-500 p-5">
              <div className="flex items-start gap-4">
                <img alt={feature.title} className="h-8 w-8" src={feature.icon_light} />
                <h3 className="heading-8 font-bold text-neutral-50">{feature.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
