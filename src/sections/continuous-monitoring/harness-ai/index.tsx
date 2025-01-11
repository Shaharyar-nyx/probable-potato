import React from "react";

import "./styles.scss";
import Modal from "@/components/UI/modal";
import data from "@/data/continuous-monitoring/harness-ai.json";
import { DemoForm } from "@/sections/home";

export const HarnessAi: React.FC = () => {
  return (
    <section className="harness-ai-parent-container">
      <div className="harness-ai-container">
        <span className="tagline harness-ai-tagline">{data.tagline}</span>
        <h2 className="heading-1 harness-ai-title">{data.title}</h2>
        <p className="paragraph-md harness-ai-text">{data.text}</p>
        <div className="harness-ai-feature-container">
          {data.features.map((feature, index) => (
            <div key={index} className="harness-ai-feature-item">
              <img alt={feature.text} className="harness-ai-feature-image" src={feature.icon} />
              <p className="paragraph-md harness-ai-feature-text">{feature.text}</p>
            </div>
          ))}
        </div>
        <Modal
          buttonSize="large"
          buttonStyle="mx-auto"
          buttonTransparent
          cta={{ label: "Request a demo", icon: "ArrowUpRightIcon" }}
        >
          <DemoForm />
        </Modal>
      </div>
    </section>
  );
};
