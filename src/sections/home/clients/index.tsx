"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";

import styles from "./styles.module.scss";
import { STRAPI_ASSETS } from "@/lib";
import { useIsMobile } from "@/hooks";

const sliderSettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 4000,
  slidesToShow: 5,
  cssEase: "linear",
  slidesToScroll: 1,
  mobileFirst: true,
  autoplay: true,
  autoplaySpeed: 0,
  centerMode: true,
  centerPadding: '0px',
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        dots: false,
        arrows: false,
        centerMode: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        dots: true,
        infinite: true,
        arrows: false,
        centerMode: true,
        centerPadding: '50px',
        focusOnSelect: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: 'ease',
      },
    },
  ],
};
export const Clients: React.FC<any> = ({ clients, title }) => {
  const isMobile = useIsMobile();

  return (
    <div className={styles.clientsSection}>
      <h1 className={`${styles.title} ${isMobile ? "heading-7" : "heading-1"} font-bold`}>{title}</h1>
      <div className={styles.carouselContainer}>
        <Slider {...sliderSettings}>
          {clients.data.map(
            (
              client: {
                name: string;
                attributes: {
                  logo: { data: { attributes: { url: string } } };
                };
              },
              index: number,
            ) => (
              <div key={`${client.name}-${index}`} className={styles.div}>
                <div className={styles.logoWrapper}>
                  <img
                    alt={`${client.name} logo`}
                    className={styles.clientLogo}
                    src={`${STRAPI_ASSETS}${client.attributes.logo.data.attributes.url}`}
                  />
                </div>
              </div>
            ),
          )}
        </Slider>
      </div>
    </div>
  );
};
