"use client";

import React from "react";

import styles from "./styles.module.scss";
import { Button } from "@/components";
import Modal from "@/components/UI/modal";
import { formatBtnId } from "@/lib";

export const BlogCta: React.FC<any> = ({ card: { cta_text, cta_url, cta_modal, content, title } }) => {
  const cta = {
    label: cta_text,
    isModal: cta_modal,
    icon: "ArrowUpRightIcon",
    link: cta_url,
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.contentLeft}>
          <div className={styles.contentText}>{content}</div>
          {cta_text && (
            <>
              {cta?.isModal ? (
                <Modal id={`cta-${cta_text}`} cta={cta} buttonStyle={styles.button} />
              ) : (
                <Button
                  id={formatBtnId(`cta-${cta_text}`)}
                  className={styles.button}
                  href={cta?.link}
                  target="_blank"
                  iconName={cta?.icon}
                >
                  {cta?.label}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCta;
