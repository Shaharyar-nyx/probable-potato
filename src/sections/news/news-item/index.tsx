"use client";

import React, { useState } from "react";

import styles from "./styles.module.scss";
import clsx from "clsx";
import { NewsItemType } from "@/types";
import { findFlagUrlByIso2Code } from "@/lib/flag";
import Image from "next/image";

export const NewsItem: React.FC<NewsItemType> = ({
  corporateName,
  country,
  countryFlag,
  corporateIndustry,
  accidentDate,
  newsSummary,
  newsUrl,
}) => {
  const [readMore, setReadMore] = useState(false);
  const summaryContent = newsSummary?.substring(0, 200);
  const isEqualLength = newsSummary?.length === summaryContent?.length;
  const dateFormat = new Date(accidentDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const flag: string = findFlagUrlByIso2Code(countryFlag.toLocaleUpperCase());

  const hasUri: boolean = newsUrl && newsUrl.length > 0 ? true : false;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title} title={corporateName}>
            {corporateName}
          </div>
          <div className={styles.country} title={country}>
            {flag && flag.length && <Image src={flag} alt={country} width={15} height={15} className={styles.flag} />}
            {country}
          </div>
          <div className={styles.industry} title={corporateIndustry}>
            {corporateIndustry}
          </div>
          <div className={styles.date}>{dateFormat}</div>
        </div>
        <div className={styles.content}>
          <span className={clsx(styles.summaryContent, { hidden: !readMore })}>{newsSummary} </span>
          <span className={clsx(styles.summaryContent, { hidden: !!readMore })}>
            {summaryContent}{" "}
            <span className={clsx(styles.readMore, { hidden: !!readMore || isEqualLength })}>
              {hasUri && (
                <a className={clsx(styles.readMore)} href={newsUrl} target="_blank">
                  <span className={styles.readMoreLink}>Read More</span>
                </a>
              )}

              {!hasUri && (
                <span onClick={() => setReadMore(!readMore)} className={styles.readMoreLink}>
                  Read More
                </span>
              )}
            </span>
          </span>
        </div>
      </div>
    </section>
  );
};
