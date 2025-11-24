"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { STRAPI_ASSETS } from "@/lib";
import styles from "./styles.module.scss";

const AnimatedBulletPoints: React.FC<{ text: string }> = ({ text }) => {
  const [index, setIndex] = useState(0);
  const lines = text ? text.split("\n") : [];

  useEffect(() => {
    if (lines.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % lines.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [lines]);

  if (lines.length === 0) return null;

  return (
    <ul className={styles.cardList}>
      {lines.map((line, i) => (
        <li
          key={i}
          className={`${styles.cardListItem} ${
            i === index ? styles.active : styles.hidden
          }`}
        >
          {line}
        </li>
      ))}
    </ul>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6 },
  }),
};

export const IntelligenceLayersDark: React.FC<any> = ({
  title,
  highlighted_word,
  subtitle,
  layer_cards,
}) => {
  return (
    <section className={styles.layersSection}>
      {/* Floating gradient orbs */}
      <div className={styles.gradientOrb1}></div>
      <div className={styles.gradientOrb2}></div>

      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {title && (
            <h2 className={styles.title}>
              {title}{" "}
              {highlighted_word && (
                <span className={styles.highlight}>{highlighted_word}</span>
              )}
            </h2>
          )}
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </motion.div>

        {/* Cards */}
        <div className={styles.cardsGrid}>
          {layer_cards?.map((item: any, i: number) => (
            <motion.div
              key={i}
              className={styles.card}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={i}
              viewport={{ once: true }}
            >
              <div className={styles.glowOverlay}></div>

              {item.icon?.data?.attributes?.url && (
                <div className={styles.iconWrapper}>
                  <Image
                    src={`${STRAPI_ASSETS}${item.icon.data.attributes.url}`}
                    alt={item.icon.data.attributes.alternativeText || "icon"}
                    width={50}
                    height={50}
                    className={styles.icon}
                  />
                </div>
              )}

              {item.title && <h3 className={styles.cardTitle}>{item.title}</h3>}
              {item.description && (
                <p className={styles.cardText}>{item.description}</p>
              )}

              {item.text && <AnimatedBulletPoints text={item.text} />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntelligenceLayersDark;
