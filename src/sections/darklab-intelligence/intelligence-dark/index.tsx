"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { STRAPI_ASSETS } from "@/lib";
import styles from "./styles.module.scss";

export const IntelligenceDark: React.FC<any> = ({
  title,
  description,
  box_icon,
  box_title,
  box_points,
}) => {
  return (
    <section className={styles.intelligenceSection}>
      {/* Background Orbs */}
      <div className={styles.gradientOrb1}></div>
      <div className={styles.gradientOrb2}></div>

      <div className={styles.container}>
        {/* === Left Text === */}
        <motion.div
          className={styles.left}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title && <h2 className={styles.title}>{title}</h2>}
          {description && <p className={styles.description}>{description}</p>}
        </motion.div>

        {/* === Right Card === */}
        <motion.div
          className={styles.rightCard}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.cardGlow}></div>
          <div className={styles.cardHeader}>
            {box_icon?.data?.attributes?.url && (
              <Image
                src={`${STRAPI_ASSETS}${box_icon.data.attributes.url}`}
                alt={box_icon?.data?.attributes?.alternativeText || "icon"}
                width={40}
                height={40}
                className={styles.cardIcon}
              />
            )}
            {box_title && <h3 className={styles.cardTitle}>{box_title}</h3>}
          </div>

          <ul className={styles.pointsList}>
            {box_points?.map((point: any, i: number) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <span className={styles.bullet}></span>
                {point.text}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};
