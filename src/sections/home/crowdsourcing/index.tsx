"use client";

import { motion } from "framer-motion";
import React from "react";

import styles from "./styles.module.scss";
import { Button } from "@/components";

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

export const CrowdSourcing: React.FC<any> = ({ headline, title, content, cards }) => {
  return (
    <div className={styles.solutionsContainer}>
      <div className={styles.sectionBackground} style={{ backgroundImage: `url(/images/bg-image.jpeg)` }}>
        <div className={styles.overlay} />

        <div className={styles.container}>
          <motion.div
            className={styles.crowdsourcing}
            initial="hidden"
            variants={staggerChildren}
            viewport={{ once: true }}
            whileInView="visible"
          >
            <motion.div className={styles.crowdsourcingContent}>
              <motion.span className="tagline text-primary-800" variants={fadeInUp}>
                {headline}
              </motion.span>

              <motion.div>
                <motion.h1 className={`${styles.crowdsourcingTitle} heading-1`} variants={fadeInUp}>
                  {title}
                </motion.h1>
                <motion.p className={`${styles.crowdsourcingDescription} paragraph-md`} variants={fadeInUp}>
                  {content}
                </motion.p>
              </motion.div>

              <motion.div className={styles.benefitsGrid} variants={staggerChildren}>
                {cards.map(
                  (card: { title: string; content: string; cta_text: string; cta_url: string }, index: number) => (
                    <motion.div key={index} className={styles.benefitItem} variants={fadeInUp}>
                      <h3 className={`${styles.benefitTitle} heading-7`}>{card.title}</h3>
                      <p className={`${styles.benefitDescription} paragraph-md`}>{card.content}</p>

                      {card.cta_text && (
                        <MotionButton
                          className="mt-4 self-start"
                          href={card.cta_url}
                          initial="hidden"
                          size="large"
                          variant="primary"
                          variants={fadeInUp}
                          viewport={{ once: true }}
                          whileInView="visible"
                        >
                          {card.cta_text}
                        </MotionButton>
                      )}
                    </motion.div>
                  ),
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
