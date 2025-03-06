"use client";

import Image from "next/image";

import 'swiper/css';
import 'swiper/css/pagination';
import styles from "./styles.module.scss";

import { Button } from "@/components";
import { formatBtnId, STRAPI_ASSETS } from "@/lib";
import { useIsMobile } from "@/hooks";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

export const OurCulture: React.FC<any> = ({ title, content, headline, cta_text, cta_url, cards }) => {
  const isMobile = useIsMobile();
  return (
    <section className={styles["our-culture"]}>
      <div className={styles.background} />
      <div className={styles.container}>
        <div className="w-full lg:w-1/2">
          <h2 className={`${styles.title} ${isMobile ? 'heading-7' : 'heading-2'}`}>{title}</h2>
          <p className={`${styles.paragraph} paragraph-md`}>{content}</p>
          <Button id={formatBtnId(`culture-${cta_text}`)} variant="neutral" href={cta_url} className="w-fit hidden lg:block">
            {cta_text}
          </Button>
        </div>
        {!isMobile &&
          <div className="flex w-full flex-col lg:w-1/2">
            <h3 className="heading-7 mb-6 text-neutral-50">{headline}</h3>
            <div className="grid gap-6 lg:grid-cols-2">
              {cards.map(({ title, content, icon }: any, index: number) => (
                <div key={index} className={styles["feature-container"]}>
                  <div className="flex items-center gap-3">
                    <div className="rounded-md bg-neutral-50">
                      <div className="flex h-8 w-8 items-center justify-center">
                        <Image
                          alt={icon.data.attributes.name}
                          height={24}
                          width={24}
                          src={`${STRAPI_ASSETS}${icon.data.attributes.url}`}
                        />
                      </div>
                    </div>
                    <h3 className="heading-7 font-bold text-neutral-50">{title}</h3>
                  </div>
                  <p className="paragraph-md text-neutral-50">{content}</p>
                </div>
              ))}
            </div>
          </div>
        }
      </div>

      {isMobile &&
        <div className="mx-auto px-6 pb-[60px]">
          <h3 className="paragraph-lg mb-6 text-neutral-50">{headline}</h3>
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
                    <p className="paragraph-lg font-bold text-neutral-50">{title}</p>
                  </div>
                  <p className="paragraph-md text-neutral-50">{content}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <Button variant="neutral" href={cta_url} className="paragraph-md w-full mt-6">
            {cta_text}
          </Button>
        </div>
      }
    </section>
  );
};
