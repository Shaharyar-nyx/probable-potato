"use client";

import React from "react";
import styles from "./styles.module.scss";

type ProvideItem = {
  id: string | number;
  title?: string;
  description?: string;
};

type Props = {
  subHeading?: string;
  heading?: string;
  miniHeading?: string;
  description?: string;
  CyberWatchpProvide?: ProvideItem[];
};

export default function CyberWatchDeliver({
  subHeading,
  heading,
  miniHeading,
  description,
  CyberWatchpProvide = [],
}: Props) {
  return (
    <section className={styles.cyberSection}>
      <div className={styles.container}>
        {/* 🔹 Text Block */}
        <div className={styles.textBlock}>
          {subHeading && <p className={styles.subHeading}>{subHeading}</p>}
          {heading && <h2 className={styles.heading}>{heading}</h2>}
          {miniHeading && <p className={styles.miniHeading}>{miniHeading}</p>}
          {description && <p className={styles.description}>{description}</p>}
        </div>

        {/* 🔹 Cards Grid */}
{CyberWatchpProvide.length > 0 && (
  <div className={styles.cardsWrapper}>
    <div className={styles.cardsGrid}>
      {CyberWatchpProvide.map((item, i) => (
        <div key={item.id || i} className={styles.card}>
          {item.title && <h4 className={styles.cardTitle}>{item.title}</h4>}
          {item.description && (
            <p className={styles.cardDesc}>{item.description}</p>
          )}
        </div>
      ))}
    </div>
  </div>
)}

      </div>
    </section>
  );
}

export { CyberWatchDeliver };
