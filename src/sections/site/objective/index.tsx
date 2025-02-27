"use client";

import React from "react";

import styles from "./styles.module.scss";
import Image from "next/image";
import { STRAPI_ASSETS } from "@/lib";
import { Gardient } from "@/components/Blocks/Gardient";

export const Objective: React.FC<any> = ({ headline, title, cards }) => {
  return (
    <div className={styles.container}>
      <Gardient styles="absolute -right-[25%] top-[38%] h-[60%]" />
      <div className={styles.containerWrap}>
        <div className={styles.offers}>{headline}</div>
        <div className={styles.partner}>
          <div className={styles.heading}>{title}</div>
        </div>
        <div className={styles.detail}>
          <div className={styles.left}>
            {cards?.map((it: any, i: number) => (
              <div className={styles.item} key={`objective-${i}`}>
                <div className={styles.content}>
                  <div className={styles.icon}>
                    <Image src={`${STRAPI_ASSETS}${it?.icon?.data?.attributes?.url}`} width={90} height={90} alt="" />
                  </div>
                  <div className={styles.text}>{it.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
