"use client";

import { motion } from "framer-motion";
import React from "react";

import styles from "./styles.module.scss";
import { Button } from "@/components";
import { useIsMobile } from "@/hooks";
import { formatBtnId } from "@/lib";

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

export const CrowdSourcing: React.FC<any> = ({ headline, title, content, cta_text, cta_url, cards }) => {
  const isMobile = useIsMobile();

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
                <motion.h1 className={`${styles.crowdsourcingTitle} ${isMobile ? "heading-7" : "heading-1"}`} variants={fadeInUp}>
                  {title}
                </motion.h1>
                <motion.p className={`${styles.crowdsourcingDescription} ${isMobile ? "paragraph-md" : "paragraph-lg"}`} variants={fadeInUp}>
                  {content}
                </motion.p>
              </motion.div>

              <motion.div className={styles.benefitsGrid} variants={staggerChildren}>
                {cards.map(
                  (card: { title: string; content: string; cta_text: string; cta_url: string }, index: number) => (
                    <motion.div key={index} className={styles.benefitItem} variants={fadeInUp}>
                      <h3 className={`${styles.benefitTitle} heading-7`}>{card.title}</h3>
                      <p className={`${styles.benefitDescription} paragraph-md`}>{card.content}</p>
                    </motion.div>
                  ),
                )}
                {/* {cta_text && ( */}
                <MotionButton
                  id={formatBtnId(`crowdsourcing-${cta_text}`)}
                  className="mt-4 self-start w-full lg:w-fit"
                  href={cta_url || "solutions/bug-bounty"}
                  initial="hidden"
                  size="large"
                  variant="primary"
                  variants={fadeInUp}
                  viewport={{ once: true }}
                  whileInView="visible"
                >
                  {cta_text || "Learn More"}
                </MotionButton>
                {/* )} */}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
