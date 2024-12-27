/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import styles from "./styles.module.css";
import { testimonialsContent } from "@/data/testimonials";

interface TestimonialsProps {
  content?: typeof testimonialsContent;
}

const Testimonials = ({ content = testimonialsContent }: TestimonialsProps) => {
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
      <div className={styles.header}>
        <div className={styles.clientsSection}>
          <h2 className="text-h2 text-primary-800">{content.sections.clients.title}</h2>
          <div className={styles.clientsList}>
            {content.testimonials.map((testimonial, index) => (
              <div
                key={testimonial.client}
                className={`${styles.client} ${index === activeIndex ? styles.clientActive : ""}`}
                onClick={() => handleClientClick(index)}
              >
                {testimonial.client}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.testimonialSection}>
          <h2 className={styles.sectionTitle}>{content.sections.testimonials.title}</h2>
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
            {content.testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className={styles.testimonialSlide}>
                  <div className={styles.testimonialLeft}>
                    <div>
                      <h3 className={styles.testimonialAuthor}>{testimonial.author}</h3>
                      <p className={styles.testimonialPosition}>{testimonial.position}</p>
                    </div>
                    <img
                      alt={`${testimonial.client} Logo`}
                      className={styles.testimonialLogo}
                      src={testimonial.logo.src}
                    />
                  </div>
                  <div className={styles.testimonialRight}>
                    <p className={styles.testimonialQuote}>{testimonial.quote}</p>
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
    </section>
  );
};

export default Testimonials;
