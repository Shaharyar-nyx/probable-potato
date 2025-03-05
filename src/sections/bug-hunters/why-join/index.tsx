"use client";

import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Button } from "@/components";
import { formatBtnId, STRAPI_ASSETS } from "@/lib";
import Image from "next/image";
import { useIsMobile } from "@/hooks";

import 'swiper/css';
import 'swiper/css/pagination';
import "./styles.scss";

export const WhyJoin: React.FC<any> = ({ title, content, cta_text, cta_url, cards }) => {
  const isMobile = useIsMobile();
  return (
    <section className="why-join-parent-container">
      <div className="why-join-background" />
      <div className="why-join-container why-join-join-container">
        <div className="w-full lg:w-[32%]">
          <h2 className={`heading-1 why-join-title ${isMobile ? 'heading-7' : 'heading-1'}`}>{title}</h2>
          <p className={`paragraph-md why-join-paragraph`}>{content}</p>
          {!isMobile && <Button id={formatBtnId(`why-${cta_text}`)} className="w-[160px]" externalHref={cta_url} target="_blank" variant="neutral">
            {cta_text}
          </Button>}
        </div>
        <div className={`w-full lg:w-[66%] ${isMobile ? 'why-join-swiper-container' : 'grid grid-cols-1 gap-6 md:grid-cols-2'}`}>
          {isMobile ? (
            <Swiper
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
              className="why-join-swiper"
            >
              {cards.map(({ content, icon, title }: any, index: number) => (
                <SwiperSlide key={index}>
                  <div className="why-join-feature-container">
                    <div className="flex flex-col items-start gap-3">
                      <div className="rounded-md bg-primary-500 p-1">
                        <Image
                          src={`${STRAPI_ASSETS}${icon.data.attributes.url}`}
                          alt={icon.data.attributes.name}
                          width={24}
                          height={24}
                        />
                      </div>
                      <h3 className="paragraph-lg font-semibold text-primary-800">{title}</h3>
                    </div>
                    <p className="paragraph-md text-primary-800">{content}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            cards.map(({ content, icon, title }: any, index: number) => (
              <div key={index} className="why-join-feature-container">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-primary-500 p-1">
                    <Image
                      src={`${STRAPI_ASSETS}${icon.data.attributes.url}`}
                      alt={icon.data.attributes.name}
                      width={24}
                      height={24}
                    />
                  </div>
                  <h3 className="heading-7 font-bold text-primary-800">{title}</h3>
                </div>
                <p className="paragraph-md text-primary-800">{content}</p>
              </div>
            ))
          )}
        </div>
        {isMobile && <Button className="w-full mt-6" externalHref={cta_url} target="_blank" variant="neutral">
          {cta_text}
        </Button>}
      </div>
    </section>
  );
};
