"use client";

import React from "react";

import styles from "./styles.module.scss";
import clsx from "clsx";
import { BlogItemType } from "@/types";
import Image from "next/image";
import { getBlogImageUrl, getBlogReadTime, getBlogDetailLink, stripHtmlTags, markdownToText } from "@/lib";

export const BlogSummary: React.FC<BlogItemType> = ({ id, title, content, thumbnail, category }) => {
  const summaryContent = stripHtmlTags(
    markdownToText(content, {
      stripListLeaders: true,
      gfm: true,
    }),
  );

  const thumbnailUrl = getBlogImageUrl(thumbnail?.url);

  const readTime = getBlogReadTime(content);
  const readTimeText = readTime > 1 ? `${readTime} minutes read` : `${readTime} minute read`;

  const detailUri = getBlogDetailLink(id);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.thumbnailContainer}>
            <div className={styles.infoContainer}>
              <div className={styles.category}>
                <span className={styles.categoryText}>{category}</span>
              </div>
              <div className={styles.readTime}>{readTimeText}</div>
            </div>
            <div className={styles.thumbnail}>
              {thumbnailUrl && (
                <Image src={thumbnailUrl} alt={thumbnail?.name} width={342} height={342} className={styles.thumbnail} />
              )}
            </div>
          </div>
          <div className={styles.title} title={title}>
            {title}
          </div>
          <div className={clsx(styles.summaryContent)}>{summaryContent} </div>
          <div className={styles.readMore}>
            <a href={detailUri} className={clsx(styles.link, styles.button)}>
              Read more
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
