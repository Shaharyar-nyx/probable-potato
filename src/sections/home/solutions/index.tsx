"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

import styles from "./styles.module.scss";
import { Button } from "@/components";
import { SolutionCardProps, SolutionsProps } from "@/types/components";

const MotionButton = motion(Button);

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

const SolutionCard: React.FC<SolutionCardProps> = ({ icon, title, link, description, isEven }) => {
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
          {(link ?? "") && (
            <Button externalHref={undefined} href={link}>
              Learn More
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const Solutions: React.FC<SolutionsProps> = ({ title, solutions, crowdsourcing }) => {
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
              {solutions.map((solution, index) => (
                <SolutionCard key={index} {...solution} isEven={index % 2 === 1} />
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.crowdsourcing}
            initial="hidden"
            variants={staggerChildren}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <motion.div className={styles.crowdsourcingContent}>
              <motion.span className="tagline text-primary-800" variants={fadeInUp}>
                {crowdsourcing.label}
              </motion.span>

              <motion.div>
                <motion.h1 className={`${styles.crowdsourcingTitle} heading-1`} variants={fadeInUp}>
                  {crowdsourcing.title}
                </motion.h1>
                <motion.p className={`${styles.crowdsourcingDescription} paragraph-md`} variants={fadeInUp}>
                  {crowdsourcing.description}
                </motion.p>
              </motion.div>

              <motion.div className={styles.benefitsGrid} variants={staggerChildren}>
                {crowdsourcing.benefits.map((benefit, index) => (
                  <motion.div key={index} className={styles.benefitItem} variants={fadeInUp}>
                    <h3 className={`${styles.benefitTitle} heading-7`}>{benefit.title}</h3>
                    <p className={`${styles.benefitDescription} paragraph-md`}>{benefit.description}</p>

                    {benefit.link && (
                      <MotionButton
                        className="mt-4 self-start"
                        href={benefit.link}
                        initial="hidden"
                        size="large"
                        variant="primary"
                        variants={fadeInUp}
                        viewport={{ once: true }}
                        whileInView="visible"
                      >
                        Learn More
                      </MotionButton>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
