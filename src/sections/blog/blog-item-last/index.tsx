"use client";

import React from "react";

import styles from "./styles.module.scss";
import clsx from "clsx";
import { BlogItemType } from "@/types";
import Image from "next/image";
import { getBlogDetailLink, getBlogImageUrl, getBlogReadTime, stripHtmlTags } from "@/lib/blog";
import dayjs from "dayjs";

export const BlogItemLast: React.FC<BlogItemType> = ({ id, title, content, thumbnail, publishedAt, category }) => {
  const summaryContent = stripHtmlTags(content);
  const dateFormat = dayjs(publishedAt).format("DD/MM/YYYY");

  const thumbnailUrl = getBlogImageUrl(thumbnail?.url);

  const readTime = getBlogReadTime(content);
  const readTimeText = readTime > 1 ? `${readTime} minutes read` : `${readTime} minute read`;

  const detailUri = getBlogDetailLink(id);

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles.date}>Last post: {dateFormat}</div>
            <div className={styles.title}>{title}</div>
            <div className={styles.description}>{summaryContent}</div>
            <div className={styles.readMore}>
              <a href={detailUri} className={clsx(styles.link, styles.button)}>
                Read more
              </a>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.infoContainer}>
              <div className={styles.category}>
                <span className={styles.categoryText}>{category}</span>
              </div>
              <div className={styles.readTime}>{readTimeText}</div>
            </div>
            <div className={styles.image}>
              <Image
                src={thumbnailUrl}
                alt="blog"
                objectFit="cover"
                fill
                className="left-0 top-0 h-full w-full max-w-full rounded-2xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
