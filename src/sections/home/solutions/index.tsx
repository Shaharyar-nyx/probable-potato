"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

import styles from "./styles.module.scss";
import { Button } from "@/components";
import { SolutionCardProps } from "@/types/components";
import { STRAPI_ASSETS } from "@/lib";

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

const SolutionCard: React.FC<SolutionCardProps> = ({ icon, title, cta_text, cta_url, content, isEven }) => {
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
          <Image
            alt={icon?.data?.attributes?.name}
            height={100}
            src={`${STRAPI_ASSETS}${icon?.data?.attributes?.url}`}
            width={100}
          />
        </div>
        <div className={`${styles.textContent} ${isEven ? styles.even : ""}`}>
          <h4 className={`${styles.cardTitle} heading-4 font-bold`}>{title}</h4>
          <p className={`${styles.cardDescription} paragraph-md`}>{content}</p>
          {(cta_url ?? "") && <Button href={cta_url}>{cta_text}</Button>}
        </div>
      </div>
    </motion.div>
  );
};

export const Solutions: React.FC<any> = ({ title, cards }) => {
  return (
    <div className={styles.solutionsContainer}>
      <div className={styles.sectionBackground} style={{ backgroundImage: `url(/images/bg-image.jpeg)` }}>
        <div className={styles.overlay} />

        <div className={styles.container}>
          <motion.div initial="hidden" variants={fadeInUp} viewport={{ once: true }} whileInView="visible">
            <motion.h1
              className="heading-1 font-bold text-primary-800"
              initial="hidden"
              variants={fadeInUp}
              viewport={{ once: true }}
              whileInView="visible"
            >
              {title}
            </motion.h1>

            <motion.div
              className={styles.solutionsWrapper}
              initial="hidden"
              variants={staggerChildren}
              viewport={{ once: true }}
              whileInView="visible"
            >
              {cards.map((solution: any, index: number) => (
                <SolutionCard key={index} {...solution} isEven={index % 2 === 1} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
