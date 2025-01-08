"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

import styles from "./styles.module.scss";
import { ProgramSafeguardsProps, SafeguardsProps } from "@/types/components";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.42, 0, 0.58, 1],
    },
  },
};

const slideIn = (isEven: boolean | undefined = false) => ({
  hidden: { opacity: 0, x: isEven ? 100 : -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
});

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const SafeguardCard: React.FC<SafeguardsProps> = ({ icon, title, description, isEven }) => {
  return (
    <motion.div
      className={`${styles.solutionCard} ${isEven ? styles.even : ""}`}
      initial="hidden"
      variants={slideIn(isEven)}
      viewport={{ once: true }}
      whileInView="visible"
    >
      <div className={styles.cardContent}>
        <div className={styles.iconWrapper}>
          <Image alt={title} height={100} src={icon} width={100} />
        </div>
        <div className={`${styles.textContent} ${isEven ? styles.even : ""}`}>
          <h4 className={`${styles.cardTitle} heading-4 font-bold`}>{title}</h4>
          <p className={`${styles.cardDescription} paragraph-md`}>{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const ProgramSafeguards: React.FC<ProgramSafeguardsProps> = ({ title, content, safeguards }) => {
  return (
    <div className={styles.solutionsContainer}>
      <div className={styles.sectionBackground} style={{ backgroundImage: `url(/images/bg-image.jpeg)` }}>
        <div className={styles.overlay} />

        <div className={styles.container}>
          <motion.div initial="hidden" variants={fadeInUp} viewport={{ once: true }} whileInView="visible">
            <motion.div
              className="flex flex-col gap-6 px-28 mb-20 text-center"
              initial="hidden"
              variants={fadeInUp}
              viewport={{ once: true }}
              whileInView="visible"
            >
              <h1 className="heading-1 font-bold text-primary-800">{title}</h1>
              <p className="paragraph-md text-primary-800">{content}</p>
            </motion.div>

            <motion.div
              className="flex flex-col gap-[30px]"
              initial="hidden"
              variants={staggerChildren}
              viewport={{ once: true }}
              whileInView="visible"
            >
              {safeguards.map((safeguard, index) => (
                <SafeguardCard key={index} {...safeguard} isEven={index % 2 === 1} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
