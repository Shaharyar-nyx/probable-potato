"use client";

import Image from "next/image";
import React from "react";

import styles from "./styles.module.scss";
import Modal from "@/components/UI/modal";
import flowIcon from "@/assets/images/icons/flowchart.svg";
import clsx from "clsx";
import { STRAPI_ASSETS } from "@/lib";

export const Services: React.FC<any> = ({ headline, title, cta_text, cta_modal, cta_url, cards }) => {
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

              <div className={`mt-5 flex justify-start`}>{<Modal cta={cta} buttonStyle="mx-auto lg:mx-0" />}</div>
            </div>
            <div className={clsx(styles.list, "!w-[85%]")}>
              <Image
                src={flowIcon}
                width={100}
                height={100}
                alt="image"
                className="mb-[28%] aspect-[1040/428] h-auto w-full"
              />
              {cards?.map((c: any, i: number) => (
                <div
                  className={clsx(
                    styles.item,
                    styles[`item${i + 1}`],
                    "flex flex-col items-stretch",
                    i === 0 ? "justify-center" : "justify-end",
                  )}
                >
                  <div className="py-[16px]">
                    <p className={styles.title}>{c.title}</p>
                    <p className={styles.content}>{c.content}</p>
                  </div>
                  <Image
                    src={`${STRAPI_ASSETS}${c?.icon?.data?.attributes?.url}`}
                    width={356}
                    height={144}
                    alt="icon"
                    className={clsx(
                      "absolute right-0 top-0 h-full w-auto",
                      i === 0 ? "aspect-[182/449]" : "aspect-[104/144]",
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
