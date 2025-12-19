"use client";

import React from "react";
import { getStrapiAssetUrl } from "@/lib";
import styles from "./styles.module.scss";
import { motion } from "framer-motion";

export const Hero: React.FC<any> = ({
  background_file,
  cta_text,
  cta_modal,
  cta_url,
  content,
  title,
  secondary_cta_text,
  secondary_cta_url,
}) => {
  const cta = {
    label: cta_text,
    isModal: cta_modal,
    link: cta_url,
  };

  // Split title words for styling – but use simpler layout
  const words = title?.split(" ") || [];
  const firstTwo = words.slice(0, 2).join(" ");
  const second = words.slice(2, 3).join(" ");
  const third = words.slice(3).join(" ");

  return (
    <header className={styles.header}>
      {/* Background Layer */}
      <div className={styles.backgroundWrapper}>
        {background_file?.data?.attributes?.url && (
          <motion.video
            src={getStrapiAssetUrl(background_file.data.attributes.url)}
            playsInline
            preload="true"
            loop
            muted
            autoPlay
            aria-hidden="true"
            className={styles.backgroundVideo}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 5, ease: "easeOut" }}
          />
        )}
        <div className={styles.gradientOverlay} />
        <div className={styles.glowLayer} />
      </div>

      {/* Content */}
      <div className={styles.container}>
        <motion.div
          className={styles.textBox}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className={styles.title}>
            <span className={styles.titleLine}>
              <span className={styles.whitePart}>{firstTwo}</span>{" "}
              <span className={styles.gradientPart}>{second}</span>
            </span>
            {third && (
              <span className={`${styles.titleLine} ${styles.thirdLine}`}>
                <span className={styles.third}>{third}</span>
              </span>
            )}
          </h1>

          <p className={styles.description}>{content}</p>

          <div className={styles.buttonGroup}>
            {cta.link && (
              <a href={cta.link} className={styles.primaryBtn}>
                {cta.label || "Get Started"}
              </a>
            )}


          </div>
        </motion.div>
      </div>
    </header>
  );
};