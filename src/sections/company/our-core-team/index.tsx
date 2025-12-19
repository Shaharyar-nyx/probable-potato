"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import 'swiper/css';
import 'swiper/css/pagination';
import styles from "./styles.module.scss";
import { formatBtnId, getStrapiAssetUrl } from "@/lib";
import { useIsMobile } from "@/hooks";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

export const OurCoreTeam: React.FC<any> = ({ title, content, member_profiles }) => {
  const isMobile = useIsMobile();

  const [cardsPerRow, setCardsPerRow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setCardsPerRow(window.innerWidth <= 768 ? 1 : 3);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const rows = member_profiles.data.reduce((acc: (typeof member_profiles.data)[], item: any, index: number) => {
    const rowIndex = Math.floor(index / cardsPerRow);
    if (!acc[rowIndex]) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(item);
    return acc;
  }, []);

  return (
    <section className={styles["our-core-team"]}>
      <h1 className={`${styles.title} ${isMobile ? "heading-7" : "heading-1"} font-bold`}>{title}</h1>
      <h3 className={`${styles.content} ${isMobile ? "paragraph-md" : "heading-7"}`}>{content}</h3>
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
          {member_profiles.data.map((member: any, index: number) => (
            <SwiperSlide key={index}>
              <div className={`${styles.card} h-full`}>
                <div className="flex flex-row items-center justify-between">
                  <h5 className={`${styles.name} heading-5 font-bold`}>{member?.attributes?.name}</h5>
                  <div className={styles.social}>
                    {member?.attributes?.social_links?.data?.map((social: any, idx: number) => (
                      <a
                        id={formatBtnId(`core-team-${social?.attributes?.social?.data?.attributes?.icon?.data?.attributes?.name}-${member?.attributes?.name}`)}
                        key={idx}
                        className={styles.link}
                        href={social?.attributes?.url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Image
                          alt={social?.attributes?.social?.data?.attributes?.icon?.data?.attributes?.name}
                          height={10}
                          src={getStrapiAssetUrl(social?.attributes?.social?.data?.attributes?.icon?.data?.attributes?.url)}
                          width={10}
                        />
                      </a>
                    ))}
                  </div>
                </div>
                <p className={`${styles.title} paragraph-xs`}>{member?.attributes?.job_title}</p>
                <p className={`${styles.description} paragraph-sm`}>{member?.attributes?.bio}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper> :
        <div className={styles.grid}>
          {rows.map((row: any, rowIndex: number) => (
            <div key={rowIndex} className={styles.row}>
              {row.map((member: any, index: number) => (
                <div key={index} className={styles.card}>
                  <div className="flex flex-row items-center justify-between">
                    <h5 className={`${styles.name} heading-5 font-bold`}>{member?.attributes?.name}</h5>

                    <div className={styles.social}>
                      {member?.attributes?.social_links?.data?.map((social: any, idx: number) => (
                        <a
                          key={idx}
                          id={formatBtnId(`core-team-${social?.attributes?.social?.data?.attributes?.icon?.data?.attributes?.name}-${member?.attributes?.name}`)}
                          className={styles.link}
                          href={social?.attributes?.url}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          <Image
                            alt={social?.attributes?.social?.data?.attributes?.icon?.data?.attributes?.name}
                            height={10}
                            src={getStrapiAssetUrl(social?.attributes?.social?.data?.attributes?.icon?.data?.attributes?.url)}
                            width={10}
                          />
                        </a>
                      ))}
                    </div>
                  </div>
                  <p className={`${styles.title} paragraph-xs`}>{member?.attributes?.job_title}</p>
                  <p className={`${styles.description} paragraph-sm`}>{member?.attributes?.bio}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      }
    </section>
  );
};
