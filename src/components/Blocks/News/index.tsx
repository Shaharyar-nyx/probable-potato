import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Button } from "@/components/UI";
import { NewsProps } from "@/types";

import "./styles.scss";

export const News: React.FC<NewsProps> = ({ content, title, subtitle, news }) => {
  return (
    <section className="news">
      <div className="news-container">
        <div className="news-header">
          <div>
            <p className="news-link paragraph-2">{subtitle}</p>
            <h2 className="news-title heading-2">{title}</h2>
            <p className="news-description">{content}</p>
          </div>
        </div>

        <div className="news-swiper-container">
          <Swiper
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="news-swiper"
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              nextEl: ".news-navigation-next",
              prevEl: ".news-navigation-prev",
            }}
            pagination={{
              clickable: true,
              el: ".news-pagination",
            }}
            slidesPerView={3.5}
            spaceBetween={24}
          >
            {news.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="news-card">
                  <div className="news-card-image">
                    <Image alt={item.title} fill src={item.image} />
                    <div className="news-card-meta">
                      <span className="news-card-category">{item.category}</span>
                      <span className="news-card-read-time">{item.readTime}</span>
                    </div>
                  </div>
                  <h3 className="news-card-title">{item.title}</h3>
                  <p className="news-card-description">{item.description}</p>
                  <Button className="w-fit !text-[14px]" variant="primary">
                    <Link href={item.link}>Read More</Link>
                  </Button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="news-controls">
            <div className="news-pagination" />
            <div className="news-navigation">
              <button className="news-navigation-prev">
                <Image alt="Previous" height={24} src="/company/arrow-left.svg" width={24} />
              </button>
              <button className="news-navigation-next">
                <Image alt="Next" height={24} src="/company/arrow-right.svg" width={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
