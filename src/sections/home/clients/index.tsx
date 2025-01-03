"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";

import styles from "./styles.module.scss";
import { clientsContent } from "@/data/clients";

export const Clients: React.FC = () => {
  return (
    <div className={styles.clientsSection}>
      <h1 className={`${styles.title} heading-1 font-bold`}>{clientsContent.title}</h1>
      <div className={styles.carouselContainer}>
        <Slider {...clientsContent.sliderSettings}>
          {clientsContent.clients.map((client, index) => (
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
