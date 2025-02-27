"use client";

import React from "react";

import styles from "./styles.module.scss";
import lockIcon from "@/assets/images/icons/lock.svg";
import paperIcon from "@/assets/images/icons/paper.svg";
import firewallIcon from "@/assets/images/icons/firewall.svg";
import Image from "next/image";
import { STRAPI_ASSETS } from "@/lib";

export const Objective: React.FC<any> = ({ headline, title, cards }) => {
  const list = [
    {
      icon: lockIcon,
      content: "Protect your network assets.",
      sort: 1,
    },
    {
      icon: paperIcon,
      content: "Ensure compliance with Hong Kong’s security standards.",
      sort: 2,
    },
    {
      icon: firewallIcon,
      content: "Provide peace of mind with comprehensive risk prevention and detection.",
      sort: 3,
    },
  ];

  const sortedList = list.sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));
  return (
    <div className={styles.container}>
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
