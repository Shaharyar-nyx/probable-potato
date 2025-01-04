import React from "react";

import "./styles.scss";
import { Button } from "@/components";
import data from "@/data/bug-hunters/knowledge.json";

export const Knowledge: React.FC = () => {
  return (
    <section className="knowledge-parent-container">
      <div
        className="knowledge-overlay"
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%), url(${data.background}) lightgray 50% / cover no-repeat`,
        }}
      />
      <div className="knowledge-container">
        <div className="knowledge-text-container">
          <h2 className="heading-2 knowledge-title">{data.title}</h2>
          <p className="paragraph-md knowledge-description">{data.text}</p>
          <Button>{data.button_text}</Button>
        </div>
      </div>
    </section>
  );
};
