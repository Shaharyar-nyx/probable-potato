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
        <div className="w-full max-w-screen-xl">
          <SemiCircle data={data.chart.features} text={data.chart.text} />
        </div>
      </div>
    </section>
  );
};
