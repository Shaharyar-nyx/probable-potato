"use client";

import React, { useState } from "react";

import styles from "./styles.module.scss";
import clsx from "clsx";

export const NewsItem: React.FC<any> = ({ title, country, industry, createAt, content }) => {
  const [readMore, setReadMore] = useState(false);
  const summaryContent = content?.substring(0, 200);
  const isEqualLength = content?.length === summaryContent?.length;
  const dateFormat = new Date(createAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title} title={title}>
            {title}
          </div>
          <div className={styles.country}>{country}</div>
          <div className={styles.industry}>{industry}</div>
          <div className={styles.date}>{dateFormat}</div>
        </div>
        <div className={styles.content}>
          <span className={clsx(styles.summaryContent, { hidden: !readMore })}>
            {content}{" "}
            <span className={clsx(styles.readMore, { hidden: !readMore })} onClick={() => setReadMore(!readMore)}>
              <span className={styles.readMoreLink}>Show Less</span>
            </span>
          </span>
          <span className={clsx(styles.summaryContent, { hidden: !!readMore || isEqualLength })}>
            {summaryContent}{" "}
            <span
              className={clsx(styles.readMore, { hidden: !!readMore || isEqualLength })}
              onClick={() => setReadMore(!readMore)}
            >
              <span className={styles.readMoreLink}>Read More</span>
            </span>
          </span>
        </div>
      </div>
    </section>
  );
};
