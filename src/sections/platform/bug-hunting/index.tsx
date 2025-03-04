"use client";

import Image from "next/image";
import React from "react";

import 'swiper/css';
import 'swiper/css/pagination';
import styles from "./styles.module.scss";
import { STRAPI_ASSETS } from "@/lib";
import { useIsMobile } from "@/hooks";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

export const ContinuousBugHunting: React.FC<any> = ({ headline, content, title, cards }) => {
  const isMobile = useIsMobile();

  return (
    <section className={styles.section}>
      <div className={`${styles.container} container`}>
        <div className={styles.header}>
          <div className={`${isMobile ? 'paragraph-md' : 'tagline'} mb-6 lg:mb-10 text-primary-800`}>{headline}</div>
          <h2 className={`${styles.title} ${isMobile ? 'heading-7' : 'heading-2'} mb-4 lg:mb-6`}>{title}</h2>
          <p className="paragraph-md mb-6">{content}</p>
        </div>

        {isMobile ?
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
            {cards.map(({ content, icon, title }: any, index: number) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col gap-[18px] justify-start p-7 bg-primary-500 rounded-xl h-auto">
                  <div className="flex flex-col items-start gap-3">
                    <Image
                      src={`${STRAPI_ASSETS}${icon.data.attributes.url}`}
                      alt={icon.data.attributes.name}
                      width={45}
                      height={45}
                      className="brightness-0 invert"
                    />
                    <h3 className="heading-8 font-bold text-neutral-50">{title}</h3>
                  </div>
                  <p className="paragraph-md text-neutral-50">{content}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          : (
            <div className={styles.featuresGrid}>
              {cards.map(({ title, content, icon }: any, index: number) => (
                <div key={index} className={`${styles.featureCard} group`}>
                  <div className={styles.featureHeader}>
                    <Image
                      alt={icon.data.attributes.name}
                      className={styles.featureIcon}
                      height={105}
                      src={`${STRAPI_ASSETS}${icon.data.attributes.url}`}
                      width={105}
                    />
                    <h3
                      className={`heading-7 font-bold text-neutral-50 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100`}
                    >
                      {title}
                    </h3>
                  </div>
                  <div className="relative flex h-32 flex-col items-end justify-end">
                    <p
                      className={`paragraph-md absolute left-0 right-0 text-neutral-50 opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-100`}
                    >
                      {content}
                    </p>
                    <h3
                      className="heading-7 absolute left-0 right-0 font-bold text-neutral-50 transition-all duration-300 ease-in-out group-hover:translate-y-8 group-hover:opacity-0"
                      style={{ whiteSpace: "break-spaces" }}
                    >
                      {title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </section>
  );
};
