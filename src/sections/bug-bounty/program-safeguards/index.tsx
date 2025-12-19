"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';

import styles from "./styles.module.scss";
import { getStrapiAssetUrl } from "@/lib";
import { useIsMobile } from "@/hooks";

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

const SafeguardCard: React.FC<any> = ({ icon, title, content, isEven }) => {
  const isMobile = useIsMobile();
  const CardWrapper = isMobile ? 'div' : motion.div;

  return (
    <CardWrapper
      className={`${styles.solutionCard} ${isEven ? styles.even : ""}`}
      {...(!isMobile && {
        initial: "hidden",
        variants: slideIn(isEven),
        viewport: { once: true },
        whileInView: "visible"
      })}
    >
      <div className={styles.cardContent}>
        <div className={styles.iconWrapper}>
          <Image
            alt={icon?.data?.attributes?.name}
            height={100}
            src={getStrapiAssetUrl(icon?.data?.attributes?.url)}
            width={100}
          />
        </div>
        <div className={`${styles.textContent} ${isEven ? styles.even : ""}`}>
          <h4 className={`${styles.cardTitle} heading-4 font-bold`}>{title}</h4>
          <p className={`${styles.cardDescription} paragraph-md`}>{content}</p>
        </div>
      </div>
    </CardWrapper>
  );
};

export const ProgramSafeguards: React.FC<any> = ({ title, content, cards }) => {
  const isMobile = useIsMobile();
  return (
    <div className={styles.solutionsContainer}>
      <div className={styles.sectionBackground} style={{ backgroundImage: `url(/images/bg-image.jpeg)` }}>
        <div className={styles.overlay} />

        <div className={styles.container}>
          <motion.div initial="hidden" variants={fadeInUp} viewport={{ once: true }} whileInView="visible">
            <motion.div
              className="lg:mb-20 flex flex-col gap-6 lg:text-center lg:px-28"
              initial="hidden"
              variants={fadeInUp}
              viewport={{ once: true }}
              whileInView="visible"
            >
              <h1 className={`${isMobile ? 'heading-7' : 'heading-1'} font-bold text-primary-800`}>{title}</h1>
              <p className="paragraph-md text-primary-800">{content}</p>
            </motion.div>

            {!isMobile ? (
              <motion.div
                className="flex flex-col gap-[30px]"
                initial="hidden"
                variants={staggerChildren}
                viewport={{ once: true }}
                whileInView="visible"
              >
                {cards.map((safeguard: any, index: number) => (
                  <SafeguardCard key={index} {...safeguard} isEven={index % 2 === 1} />
                ))}
              </motion.div>
            ) : (
              <Swiper
                className={styles.swiperContent}
                modules={[Pagination, Autoplay]}
                spaceBetween={28}
                slidesPerView={1}
                centeredSlides
                loop
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
              >
                {cards.map((safeguard: any, index: number) => (
                  <SwiperSlide key={index}>
                    <SafeguardCard {...safeguard} isEven={false} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
