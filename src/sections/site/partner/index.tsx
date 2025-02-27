"use client";

import React from "react";

import styles from "./styles.module.scss";
import Image from "next/image";
import { STRAPI_ASSETS } from "@/lib";

export const Partner: React.FC<any> = ({ headline, title, content, background_file, cards }) => {
  return (
    <div className={styles.container}>
      <div className={styles.containerWrap}>
        <div className={styles.offers}>{headline}</div>
        <div className={styles.partner}>
          <div className={styles.heading}>{title}</div>
          <div className={styles.description}>{content}</div>
        </div>
        <div className={styles.detail}>
          <div className={styles.left}>
            {cards?.map((it: any, i: number) => (
              <div className={styles.leftItem} key={`partner-${i}`}>
                <div className={styles.leftIcon}>
                  <Image src={`${STRAPI_ASSETS}${it?.icon?.data?.attributes?.url}`} width={24} height={24} alt="" />
                </div>
                <div className={styles.leftContent}>
                  <div className={styles.listLeft}>{it.title}</div>
                  <div className={styles.listRight}>{it.content}</div>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.right}>
            <Image src={`${STRAPI_ASSETS}${background_file?.data?.attributes?.url}`} width={568} height={428} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
