"use client";

import React from "react";
import styles from "./styles.module.scss";

interface Stats {
  value: string;
  label: string;
}

interface ResearchImpactProps {
  title?: string;
  description?: string;
  stats?: Stats[];
  [key: string]: any;
}

const ResearchImpact: React.FC<ResearchImpactProps> = ({
  title = "Research Impact",
  description = "Measured results from our lab and public disclosures.",
  stats = [],
}) => {
  return (
    <section className={styles.researchImpact}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            {title.split(" ")[0]}{" "}
            <span className={styles.highlight}>
              {title.split(" ").slice(1).join(" ")}
            </span>
          </h2>
          <p className={styles.subtitle}>{description}</p>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          {stats.map((item, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.value}>{item.value}</div>
              <div className={styles.label}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchImpact;
