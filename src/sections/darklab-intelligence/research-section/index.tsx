"use client";
import React from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";

interface ResearchProps {
  heading: string;
  text: string;
}

const ResearchSection: React.FC<ResearchProps> = ({ heading, text }) => {
  // Split text into multiple lines based on line breaks
  const lines = text.split(/\r?\n/).filter(Boolean);

  return (
    <section className={styles.research}>
      {/* Animated gradient background overlay */}
      <div className={styles.gradientBg} />

      <div className="max-w-6xl mx-auto text-center relative z-10 px-6 py-20">
        <motion.h2
          className={styles.heading}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {heading}
        </motion.h2>

        <div className={styles.linesWrapper}>
          {lines.map((line, i) => (
            <motion.p
              key={i}
              className={styles.line}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: "easeOut",
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
