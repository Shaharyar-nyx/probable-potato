"use client";

import Image from "next/image";
import React from "react";

import styles from "./styles.module.scss";
import Modal from "@/components/UI/modal";
import flowIcon from "@/assets/images/icons/flowchart.svg";
import clsx from "clsx";
import { STRAPI_ASSETS } from "@/lib";

export const ServiceList: React.FC<any> = ({ headline, title, cta_text, cta_modal, cta_url, background_file }) => {
  const cta = {
    label: cta_text,
    isModal: cta_modal,
    icon: "ArrowUpRightIcon",
    link: cta_url,
  };

  return (
    <div
      className={clsx(
        styles.full,
        "relative before:absolute before:h-full before:w-full before:bg-gradient-to-b before:from-[rgba(246,247,248,1)] before:via-[rgba(246,247,248,0)] before:to-[rgba(246,247,248,1)] before:content-['']",
      )}
      style={{
        backgroundImage: `url(/images/bg-image.jpeg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.containerInner}>
            <div className={styles.form}>
              <div className={styles.offers}>{headline}</div>
              <div className={styles.title}>{title}</div>

              <div className={`mt-5 flex justify-start`}>{<Modal cta={cta} buttonStyle="lg:mx-0" />}</div>
            </div>
            <div className={clsx(styles.list)}>
              <Image
                src={`${STRAPI_ASSETS}${background_file?.data?.attributes?.url}`}
                width={1273}
                height={546}
                alt="image"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
