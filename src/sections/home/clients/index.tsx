"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";

import styles from "./styles.module.scss";
import { ClientsProps } from "@/types";

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
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        dots: false,
        arrows: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        dots: false,
        arrows: false,
      },
    },
  ],
};
export const Clients: React.FC<ClientsProps> = ({ clients, title }) => {
  return (
    <div className={styles.clientsSection}>
      <h1 className={`${styles.title} heading-1 font-bold`}>{title}</h1>
      <div className={styles.carouselContainer}>
        <Slider {...sliderSettings}>
          {clients.map((client, index) => (
            <div key={`${client.name}-${index}`} className={styles.div}>
              <div className={styles.logoWrapper}>
                <img alt={`${client.name} logo`} className={styles.clientLogo} src={client.logo} />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
