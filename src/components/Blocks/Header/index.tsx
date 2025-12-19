"use client";

import React from "react";
import Image from "next/image";

import styles from "./styles.module.scss";
import { Button } from "@/components";
import Modal from "@/components/UI/modal";
import { formatBtnId, getStrapiAssetUrl } from "@/lib";
import { useIsMobile } from "@/hooks";

export const Header: React.FC<any> = ({
  background_file,
  card: { cta_modal, cta_text, cta_url, content, content_md, headline, title },
}) => {
  const isMobile = useIsMobile();

  const cta = {
    label: cta_text,
    isModal: cta_modal,
    icon: "ArrowUpRightIcon",
    link: cta_url,
  };

  const backgroundImageUrl = background_file?.data?.attributes?.url
    ? getStrapiAssetUrl(background_file.data.attributes.url)
    : null;

  return (
    <section className={styles.container}>
      {backgroundImageUrl && (
        <div className={styles.imageWrapper}>
          <Image
            alt={background_file?.data?.attributes?.alternativeText || "header background"}
            src={backgroundImageUrl}
            fill
            className={styles.image}
            style={{ objectFit: "cover" }}
            priority
            sizes="100vw"
          />
        </div>
      )}
      <div className={styles.overlay} />
      <div className={styles.content}>
        {headline && <div className="tagline">{headline}</div>}
        <h2 className={`${isMobile ? 'heading-7' : 'heading-2'} max-w-screen-md font-bold`}>{title}</h2>
        {content_md ? (
          <div className={`${styles.description} paragraph-lg`} dangerouslySetInnerHTML={{ __html: content_md }} />
        ) : (
          <p className={`${styles.description} paragraph-lg`}>{content}</p>
        )}
        {cta_text && (
          <>
            {cta.isModal ? (
              <Modal id={`header-${cta_text}`} cta={cta} />
            ) : (
              <Button id={formatBtnId(`header-${cta_text}`)} className="paragraph-md w-fit" href={cta.link} iconName={cta.icon}>
                {cta.label}
              </Button>
            )}
          </>
        )}
      </div>
    </section>
  );
};
