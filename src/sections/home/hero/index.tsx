"use client";

import React from "react";
import { STRAPI_ASSETS } from "@/lib";
import styles from "./styles.module.scss";
import { PlayCircle } from "lucide-react";
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

  // ✅ Split title words for styling
  const words = title?.split(" ") || [];
  const firstTwo = words.slice(0, 2).join(" ");
  const second = words.slice(2, 3).join(" ");
  const third = words.slice(3).join(" ");

  return (
    <header className={styles.header}>
      {/* 🎥 Background Layer */}
      <div className={styles.backgroundWrapper}>
        <motion.video
          src={`${STRAPI_ASSETS}${background_file?.data?.attributes?.url}`}
          playsInline
          preload="true"
          loop
          muted
          autoPlay
          aria-hidden="true"
          className="z-20x"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 5, ease: "easeOut" }}
        />
        <div className={styles.gradientOverlay} />
        <div className={styles.glowLayer} />
      </div>

      {/* ✨ Text Content */}
      <div className={styles.container}>
        <motion.div
          className={styles.textBox}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <h1 className={styles.title}>
            <motion.span
              className={styles.whitePart}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {firstTwo}
            </motion.span>{" "}
            <motion.span
              className={styles.gradientPart}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {second}
            </motion.span>
            <br />
            <motion.span
              className={styles.third}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {third}
            </motion.span>
          </h1>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            {content}
          </motion.p>

          {/* ⚡ Buttons */}
          <motion.div
            className={styles.buttonGroup}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <motion.a
              href={cta.link}
              className={styles.primaryBtn}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(255,255,255,0.3)",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {cta.label || "Get Started"}
            </motion.a>

                     </motion.div>
        </motion.div>
      </div>
    </header>
  );
};
