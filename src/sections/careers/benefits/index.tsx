"use client";

import styles from "./styles.module.scss";
import { STRAPI_ASSETS } from "@/lib";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useIsMobile } from "@/hooks";

import "swiper/css";
import "swiper/css/pagination";

export const Benefits: React.FC<any> = ({ title, content, headline, cards }) => {
  const isMobile = useIsMobile();
  return (
    <section className={styles.section}>
      <div className={styles.background} />
      <div className={styles.container}>
        <div className={styles.content}>
          <p className={`paragraph-sm ${styles.subtitle}`}>{headline}</p>
          <h1 className={`${isMobile ? 'heading-7' : 'heading-1'} ${styles.title}`}>{title}</h1>
          <p className="paragraph-md">{content}</p>
        </div>

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
            {cards.map(({ title, icon }: any, index: number) => (
              <SwiperSlide key={index}>
                <div className={styles.card}>
                  <div className={styles.iconWrapper}>
                    <div className="flex h-8 w-8 items-center justify-center">
                      <Image
                        alt={icon.data.attributes.name}
                        height={24}
                        width={24}
                        src={`${STRAPI_ASSETS}${icon.data.attributes.url}`}
                      />
                    </div>
                  </div>
                  <h3 className={`heading-7 ${styles.cardTitle}`}>{title}</h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className={styles.gridContent}>
            {cards.map(({ title, icon }: any, index: number) => (
              <div key={index} className={styles.card}>
                <div className={styles.iconWrapper}>
                  <div className="flex h-8 w-8 items-center justify-center">
                    <Image
                      alt={icon.data.attributes.name}
                      height={24}
                      width={24}
                      src={`${STRAPI_ASSETS}${icon.data.attributes.url}`}
                    />
                  </div>
                </div>
                <h3 className={`heading-7 ${styles.cardTitle}`}>{title}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
