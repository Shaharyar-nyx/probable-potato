"use client";

import React from "react";

import styles from "./styles.module.scss";

export const Packages: React.FC<any> = ({ headline, title, content, content_md, cards }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrap}>
        <div className={styles.left}>
          <div className={styles.offers}>{headline}</div>
          <div className={styles.heading}>{title}</div>
          <div className={styles.addOn}>{content}</div>
          <div className={styles.recomment}>
            <p className="flex" dangerouslySetInnerHTML={{ __html: content_md }}></p>
          </div>
        </div>
        <div className={styles.right}>
          {cards.map((it: any, i: number) => (
            <div className={styles.item} key={`package-${i}`}>
              <p className="flex" dangerouslySetInnerHTML={{ __html: it.content_md }}></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
