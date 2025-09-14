"use client";

import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useIsMobile } from "@/hooks";

import "swiper/css";
import "swiper/css/pagination";

export const Benefit_Cards: React.FC<any> = ({ title, content, benefit_sub_cards }) => {
  const isMobile = useIsMobile();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Section Heading */}
        {title && <h1 className={styles.title}>{title}</h1>}
        {content && <p className={styles.content}>{content}</p>}

        {/* Cards */}
        {isMobile ? (
          <Swiper
            className={styles.gridContent}
            modules={[Pagination, Autoplay]}
            spaceBetween={28}
            slidesPerView={1.5}
            centeredSlides
            loop
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
          >
            {benefit_sub_cards?.map(({ title, content_md }: any, index: number) => (
              <SwiperSlide key={index}>
                <div className={styles.card}>
                  {title && <h3 className={`heading-7 ${styles.cardTitle}`}>{title}</h3>}
                  {content_md && (
                    <ul className={styles.cardContent_md}>
                      {content_md.split("\n").map((line, idx) => (
                        line.trim() !== "" && <li key={idx} className="paragraph-sm">{line}</li>
                      ))}
                    </ul>
                  )}                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={styles.gridContent}>
            {benefit_sub_cards?.map(({ title, content_md }: any, index: number) => (
              <div key={index} className={styles.card}>
                {title && <h3 className={`heading-7 ${styles.cardTitle}`}>{title}</h3>}
                {content_md && (
                  <ul className={styles.cardContent_md}>
                    {content_md.split("\n").map((line, idx) => (
                      line.trim() !== "" && <li key={idx} className="paragraph-sm">{line}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};