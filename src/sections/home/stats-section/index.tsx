"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

interface StatItem {
  number: string;
  label: string;
  top_heading: string;
}

interface StatsSectionProps {
  heading?: string;
  achivementCounter: StatItem[];
  [key: string]: any;
}

export const StatsSection: React.FC<StatsSectionProps> = ({ heading, achivementCounter }) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [displayValues, setDisplayValues] = useState<string[]>([]);

  const isAnimatable = (value: string) => /^[\d\s.+%-]+$/.test(value);
  const extractNumber = (value: string) => parseFloat(value.replace(/[^\d.-]/g, "")) || 0;
  const extractSuffix = (value: string) => value.replace(/[\d.-]/g, "").trim();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) setHasAnimated(true);
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;
    const duration = 1500;
    const start = performance.now();

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const updated = achivementCounter.map((stat) => {
        if (!isAnimatable(stat.number)) return stat.number;
        const target = extractNumber(stat.number);
        const suffix = extractSuffix(stat.number);
        const value = Math.floor(target * progress);
        return `${value}${suffix}`;
      });
      setDisplayValues(updated);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [hasAnimated, achivementCounter]);

  return (
    <section ref={sectionRef} className={styles.statsSection}>
  <div className={styles.overlay}></div>

  {/* ✅ Heading at top */}
  {heading && (
    <div className={styles.headingWrapper}>
      <h2 className={styles.title}>{heading}</h2>
    </div>
  )}

  {/* Cards below */}
  <div className={styles.statsGrid}>
    {achivementCounter?.map((stat, i) => (
      <div key={i} className={styles.statCard}>
        <h4 className={styles.topHeading}>{stat.top_heading}</h4>
        <div className={styles.glowLine}></div>
        <h3 className={styles.statNumber}>
          {hasAnimated ? displayValues[i] || "0" : "0"}
        </h3>
        <p className={styles.statLabel}>{stat.label}</p>
      </div>
    ))}
  </div>
</section>


  );
};
