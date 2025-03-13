"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

import styles from "./styles.module.scss";
import { STRAPI_ASSETS } from "@/lib";
import { useIsMobile } from "@/hooks";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const slideVariants = {
  enter: {
    y: 50,
    opacity: 0,
  },
  center: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: -50,
    opacity: 0,
  },
};

export const BugBountyPrograms: React.FC<any> = ({ title, headline, content, tabs }) => {
  const isMobile = useIsMobile();
  const [activeSlide, setActiveSlide] = useState(0);
  const [expandedSlides, setExpandedSlides] = useState<number[]>([]);

  return (
    <section className={styles.section}>
      <motion.div
        animate={{ y: 0, opacity: 1 }}
        className="mb-6 text-primary-800 lg:text-center"
        initial={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.1 }}
      >
        <h1 className={`${isMobile ? "heading-7" : "heading-1"} mb-6 font-bold lg:mb-5`}>{title}</h1>
        <p className={`${isMobile ? "paragraph-md" : "paragraph-xl"} mb-4 font-semibold lg:mb-2`}>{headline}</p>
        <p className={`${isMobile ? "paragraph-md" : "paragraph-lg"}`}>{content}</p>
      </motion.div>

      {isMobile ? (
        <Swiper
          className={styles.swiperContent}
          modules={[Pagination, Autoplay]}
          spaceBetween={28}
          slidesPerView={1}
          centeredSlides
          loop
          pagination={{ clickable: true }}
          autoHeight
        >
          {tabs.map(({ title, headline, content, image }: any, index: number) => (
            <SwiperSlide key={index} className={styles.slide}>
              <div className={styles.slideContent}>
                <h1 className="paragraph-xl mb-[18px] font-bold text-primary-500">{title}</h1>
                <p
                  className={`paragraph-lg mb-3 text-primary-800 ${!expandedSlides.includes(index) ? "line-clamp-2" : ""}`}
                >
                  {headline}
                </p>
                {!expandedSlides.includes(index) && (
                  <button
                    onClick={() => setExpandedSlides((prev) => [...prev, index])}
                    className="paragraph-sm float-right flex items-center gap-1 text-primary-500"
                  >
                    Read More
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>
                )}
                {expandedSlides.includes(index) && (
                  <Image
                    alt={image?.data?.attributes?.name}
                    className={styles.image}
                    height={400}
                    src={`${STRAPI_ASSETS}${image?.data?.attributes?.url}`}
                    width={500}
                  />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <>
          <div className={styles.navigation}>
            {tabs.map(({ title }: any, index: number) => (
              <button
                key={index}
                className={`paragraph-sm ${styles.navButton} ${index === activeSlide ? styles.active : ""}`}
                onClick={() => setActiveSlide(index)}
              >
                {title}
              </button>
            ))}
          </div>

          <div className={styles.content}>
            <AnimatePresence mode="wait">
              {tabs.map(
                ({ title, headline, content, image }: any, index: number) =>
                  index === activeSlide && (
                    <motion.div
                      key={index}
                      animate="center"
                      className={styles.slide}
                      exit="exit"
                      initial="enter"
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                      }}
                      variants={slideVariants}
                    >
                      <div className={`${styles.slideContent} ${index % 2 !== 0 ? styles.reverse : ""}`}>
                        <motion.div
                          animate={{ y: 0, opacity: 1 }}
                          className={styles.textContent}
                          initial={{ y: 50, opacity: 0 }}
                          transition={{ duration: 0.1 }}
                        >
                          <h1 className="heading-1 mb-5 font-bold text-primary-500">{title}</h1>
                          <p className="paragraph-xl !mb-3 !mt-0 font-semibold text-primary-800">{headline}</p>
                          <p className="paragraph-md !mt-0 text-primary-800">{content}</p>
                        </motion.div>
                        <motion.div
                          animate={{ y: 0, opacity: 1 }}
                          className={styles.imageContent}
                          initial={{ y: 50, opacity: 0 }}
                          transition={{ duration: 0.1 }}
                        >
                          <Image
                            alt={image?.data?.attributes?.name}
                            className={styles.image}
                            height={400}
                            src={`${STRAPI_ASSETS}${image?.data?.attributes?.url}`}
                            width={500}
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  ),
              )}
            </AnimatePresence>
          </div>
        </>
      )}
    </section>
  );
};
