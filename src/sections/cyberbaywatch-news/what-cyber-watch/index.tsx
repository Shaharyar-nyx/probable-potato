"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

type Stat = {
  value: string;
  label: string;
  description?: string;
};

type WhatCyberWatchProps = {
  subHeading?: string;
  heading?: string;
  description?: string;
  content_md?: string;
  stats?: Stat[];
};

export default function WhatCyberWatch({
  subHeading,
  heading,
  description,
  content_md,
  stats = [],
}: WhatCyberWatchProps) {
  const [counts, setCounts] = useState<number[]>([]);

  useEffect(() => {
    if (stats.length === 0) return;

    const duration = 1500; // animation duration in ms
    const startTime = performance.now();

    // numeric values extract kar rahe hain
    const parsedValues = stats.map((item) => {
      const num = parseInt(item.value.replace(/\D/g, ""), 10);
      return isNaN(num) ? 0 : num;
    });

    function update() {
      const now = performance.now();
      const progress = Math.min((now - startTime) / duration, 1);

      const newCounts = parsedValues.map((val) =>
        Math.floor(val * progress)
      );
      setCounts(newCounts);

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }, [stats]);

  return (
    <section className={styles.whatSection}>
      <div className={styles.container}>
        {/* Text Section */}
        <div className={styles.textContent}>
          {subHeading && <h4 className={styles.subHeading}>{subHeading}</h4>}
          {heading && <h2 className={styles.heading}>{heading}</h2>}
          {description && (
            <p className={styles.description}>{description}</p>
          )}
          {content_md && (
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: content_md }}
            />
          )}
        </div>

        {/* Stats Section */}
        {stats.length > 0 && (
          <div className={styles.statsGrid}>
            {stats.map((item, i) => {
              const displayValue =
                counts[i] !== undefined ? counts[i] : 0;

              // "+" ya "s" ka logic wapas
              const suffix = i === stats.length - 1 ? "s" : "+";

              return (
                <div key={i} className={styles.statCard}>
                  <h3 className={styles.value}>
                    {displayValue}
                    <span className={styles.plus}>{suffix}</span>
                  </h3>
                  <h4 className={styles.label}>{item.label}</h4>
                  {item.description && (
                    <p className={styles.statDesc}>{item.description}</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export { WhatCyberWatch };
