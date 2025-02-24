/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useRef, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import styles from "./styles.module.scss";
import { STRAPI_ASSETS } from "@/lib";

export const Testimonials: React.FC<any> = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const swiperRef = useRef<any>(null);
  const progressInterval = useRef<any>(null);

  const startProgress = () => {
    setProgress(0);
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
    }
    progressInterval.current = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + 1;
        if (nextProgress >= 100) {
          if (swiperRef.current?.swiper) {
            swiperRef.current.swiper.slideNext();
          }
          return 0;
        }
        return nextProgress;
      });
    }, 100); // 100ms * 100 steps = 10000ms (10 seconds)
  };

  useEffect(() => {
    startProgress();
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
    };
  }, [activeIndex]);

  const handleClientClick = (index: number) => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.clientsSection}>
            <h4 className={`${styles.title} heading-4`}>Clients</h4>
            <div className={styles.clientsList}>
              {testimonials.map((testimonial: any, index: number) => (
                <div
                  key={testimonial.client.data.attributes.company}
                  className={`${styles.client} ${index === activeIndex ? styles.clientActive : ""}`}
                  onClick={() => handleClientClick(index)}
                >
                  {testimonial.client.data.attributes.company}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.testimonialSection}>
            <h4 className={`${styles.title} heading-4`}>Testimonials</h4>
            <Swiper
              ref={swiperRef}
              autoplay={{
                delay: 10000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              slidesPerView={1}
              spaceBetween={30}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);
                startProgress();
              }}
            >
              {testimonials.map((testimonial: any, index: number) => (
                <SwiperSlide key={index}>
                  <div className={styles.testimonialSlide}>
                    <div className={styles.testimonialLeft}>
                      <div>
                        <h3 className={`${styles.testimonialAuthor} heading-7`}>{testimonial.name}</h3>
                        <p className={`${styles.testimonialPosition} paragraph-md`}>{testimonial.position}</p>
                      </div>
                      {testimonial?.client?.data?.attributes?.logo?.data && (
                        <img
                          alt={`${testimonial.client?.data?.attributes?.name} Logo`}
                          className={styles.testimonialLogo}
                          src={`${STRAPI_ASSETS}${testimonial?.client?.data?.attributes?.logo?.data?.attributes?.url}`}
                        />
                      )}
                    </div>
                    <div className={styles.testimonialRight}>
                      <p className={`${styles.testimonialQuote} paragraph-xxl`}>{testimonial.content}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div className={styles.progressContainer}>
          <div className={`${styles.progressBar} ${styles.progressBarActive}`}>
            <div className={styles.progressBarFill} style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
};
