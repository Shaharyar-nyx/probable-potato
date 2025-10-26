"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current || stats.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          startCounting();
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 } // section 30% visible hone par trigger
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [stats, hasAnimated]);

  const startCounting = () => {
    const duration = 3000; // ⏱️ slow & smooth (3 seconds)
    const startTime = performance.now();

    const parsedValues = stats.map((item) => {
      const num = parseInt(item.value.replace(/\D/g, ""), 10);
      return isNaN(num) ? 0 : num;
    });

    // 🔹 Smooth easing function (ease-out cubic)
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    function update() {
      const now = performance.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = easeOutCubic(progress);

      const newCounts = parsedValues.map((val) =>
        Math.floor(val * easedProgress)
      );
      setCounts(newCounts);

      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  };

  return (
    <section ref={sectionRef} className={styles.whatSection}>
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
              const displayValue = counts[i] ?? 0;
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
