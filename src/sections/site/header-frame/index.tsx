"use client";

import Image from "next/image";
import React from "react";

import styles from "./styles.module.scss";
import Modal from "@/components/UI/modal";
import { getStrapiAssetUrl } from "@/lib";

export const HeaderFrame: React.FC<any> = ({ background_file, cta_text, cta_modal, cta_url, content, title }) => {
  const cta = {
    label: cta_text,
    isModal: cta_modal,
    icon: "ArrowUpRightIcon",
    link: cta_url,
  };

  return (
    <header className={styles.header}>
      <div className={styles.backgroundWrapper}>
        <Image
          src={getStrapiAssetUrl(background_file?.data?.attributes?.url)}
          alt=""
          width={1440}
          height={600}
          className={styles.heroBackground}
        />
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={`${styles.title} display-3 font-bold`}>{title}</div>
          <p className={`${styles.description} paragraph-lg mt-5`}>{content}</p>
          <div className={`mt-5 flex justify-center`}>{<Modal cta={cta} buttonStyle="mx-auto lg:mx-0" />}</div>
        </div>
      </div>
    </header>
  );
};
