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
        <div className="featured-hunters-top-hunters-container">
          {data["top-hunters"].map((hunter) => (
            <div key={hunter.id} className="overflow-hidden rounded-xl">
              <div className="relative rounded-xl">
                <img alt={hunter.name} className="featured-hunters-top-hunters-image" src={hunter.picture} />
                <div className="featured-hunters-top-hunters-text-container">
                  <h3 className="heading-5 featured-hunters-top-hunters-text-heading">{hunter.name}</h3>
                  <p className="paragraph-md featured-hunters-top-hunters-text-description">{hunter.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
