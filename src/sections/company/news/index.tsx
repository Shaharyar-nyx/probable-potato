"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./styles.module.scss";
import { Button } from "@/components/UI";
import { NewsProps } from "@/types";

export const News: React.FC<NewsProps> = ({ content, title, subtitle, news }) => {
  return (
    <section className={styles.news}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div>
            <p className={`${styles.link} tagline`}>{subtitle}</p>
            <h2 className={`${styles.title} heading-2 font-bold`}>{title}</h2>
            <p className={`${styles.description} paragraph-md`}>{content}</p>
          </div>
        </div>

        <div className={styles["swiper-container"]}>
          <Swiper
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className={styles.swiper}
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              nextEl: ".navigation-next",
              prevEl: ".navigation-prev",
            }}
            pagination={{
              clickable: true,
              el: `.${styles.pagination}`,
            }}
            slidesPerView={3.5}
            spaceBetween={24}
          >
            {news.map((item, index) => (
              <SwiperSlide key={index}>
                <div className={styles.card}>
                  <div className={styles.image}>
                    <Image alt={item.title} fill src={item.image} />
                    <div className={styles.meta}>
                      <span className={styles.category}>{item.category}</span>
                      <span className={styles["read-time"]}>{item.readTime}</span>
                    </div>
                  </div>
                  <h3 className={`${styles.title} heading-6 font-bold`}>{item.title}</h3>
                  <p className={`${styles.description} paragraph-md`}>{item.description}</p>
                  <Button className="w-fit !text-[14px]" variant="primary">
                    <Link href={item.link}>Read More</Link>
                  </Button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={styles.controls}>
            <div className={styles.pagination} />
            <div className={styles.navigation}>
              <button className={styles.prev}>
                <Image alt="Previous" height={24} src="/images/company/arrow-left.svg" width={24} />
              </button>
              <button className={styles.next}>
                <Image alt="Next" height={24} src="/images/company/arrow-right.svg" width={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
