"use client";

import React from "react";

import Image from "next/image";
import styles from "./styles.module.scss";
import { STRAPI_ASSETS } from "@/lib";

export const Organization: React.FC<any> = ({ title, cards }) => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>{title}</div>
      <div className={styles.containerWrap}>
        {cards?.map((organization: any, i: number) => (
          <div className={styles.itemWapper} key={`organization-${i}`}>
            <div className={styles.itemIcon}>
              <Image
                src={`${STRAPI_ASSETS}${organization?.icon?.data?.attributes?.url}`}
                alt=""
                width={48}
                height={48}
              />
            </div>
            <div className={styles.textWrap}>
              <div className={styles.title}>{organization.title}</div>
              <div className={styles.content}>{organization.content}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
