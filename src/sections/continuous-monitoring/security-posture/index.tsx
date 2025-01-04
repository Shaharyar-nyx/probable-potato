import React from "react";

import "./styles.scss";
import { SemiCircle } from "@/components";
import data from "@/data/continuous-monitoring/security-posture.json";

export const SecurityPosture: React.FC = () => {
  return (
    <section className="security-posture-parent-container">
      <div className="security-posture-container">
        <div className="w-full max-w-screen-xl">
          <SemiCircle data={data.chart.features} text={data.chart.text} />
        </div>
      </div>
    </section>
  );
};
