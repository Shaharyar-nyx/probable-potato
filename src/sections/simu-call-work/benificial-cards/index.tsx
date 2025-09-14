"use client";

import styles from "./styles.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useIsMobile } from "@/hooks";

import "swiper/css";
import "swiper/css/pagination";

// ✅ Props ka interface
interface BenefitSubCard {
  title?: string;
  content_md?: string;
}

interface BenefitCardsProps {
  title?: string;
  content?: string;
  benefit_sub_cards?: BenefitSubCard[];
}

export const Benefit_Cards: React.FC<BenefitCardsProps> = ({ title, content, benefit_sub_cards }) => {
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
            {benefit_sub_cards?.map(({ title, content_md }, index) => {
              const lines = (content_md ?? "")
                .split("\n")
                .map((l) => l.trim())
                .filter(Boolean);

              return (
                <SwiperSlide key={index}>
                  <div className={styles.card}>
                    {title && <h3 className={`heading-7 ${styles.cardTitle}`}>{title}</h3>}
                    {lines.length > 0 && (
                      <ul className={styles.cardContent_md}>
                        {lines.map((line, idx) => (
                          <li key={idx} className="paragraph-sm">{line}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <div className={styles.gridContent}>
            {benefit_sub_cards?.map(({ title, content_md }, index) => {
              const lines = (content_md ?? "")
                .split("\n")
                .map((l) => l.trim())
                .filter(Boolean);

              return (
                <div key={index} className={styles.card}>
                  {title && <h3 className={`heading-7 ${styles.cardTitle}`}>{title}</h3>}
                  {lines.length > 0 && (
                    <ul className={styles.cardContent_md}>
                      {lines.map((line, idx) => (
                        <li key={idx} className="paragraph-sm">{line}</li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
