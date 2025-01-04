import React from "react";

import "./styles.scss";
import { SemiCircle } from "@/components";

export const SecurityPosture: React.FC = () => {
  return (
    <section className="security-posture-parent-container">
      <div className="security-posture-container">
        <div className="w-full max-w-screen-xl">
          <SemiCircle />
        </div>
      </div>
    </section>
  );
};
