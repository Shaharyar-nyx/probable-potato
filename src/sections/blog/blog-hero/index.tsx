"use client";

import Image from "next/image";
import React from "react";

import styles from "./styles.module.scss";
import { Button } from "@/components";
import Modal from "@/components/UI/modal";
import { formatBtnId, getStrapiAssetUrl } from "@/lib";

export const BlogHero: React.FC<any> = ({
  background_file,
  card: { cta_modal, cta_text, cta_url, content, content_md, headline, title },
}) => {
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
          <p className={`${styles.description} mt-5`}>{content}</p>
          <div className={`mt-5 flex justify-center`}>
            {cta_text && (
              <>
                {cta.isModal ? (
                  <Modal id={`header-${cta_text}`} cta={cta} />
                ) : (
                  <Button
                    id={formatBtnId(`header-${cta_text}`)}
                    className="paragraph-md w-fit"
                    href={cta.link}
                    iconName={cta.icon}
                  >
                    {cta.label}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
