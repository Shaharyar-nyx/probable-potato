import "./styles.scss";
import React from "react";

import data from "@/data/bug-hunters/featured-hunters.json";

export const FeaturedHunters: React.FC = () => {
  return (
    <section className="featured-hunters-parent-container">
      <div className="featured-hunters-top-container">
        <span />
      </div>
      <div className="featured-hunters-bottom-container">
        <span className="tagline featured-hunters-tagline">{data.tagline}</span>
        <h2 className="heading-1 featured-hunters-title">{data.title}</h2>
        <p className="paragraph-md featured-hunters-description">{data.description}</p>
      </div>
    </section>
  );
};
