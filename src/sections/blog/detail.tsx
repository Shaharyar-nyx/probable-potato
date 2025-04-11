"use client";
import { getReadTime, formatDateToLongFormat } from "@/lib/utils";
import React, { useMemo, useRef } from "react";
import styles from "./styles.module.scss";
import { BlogItemType } from "@/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { BlogSummary } from "./blog-summary";
import ReactMarkdown from "react-markdown";

export interface BlogDetailProps {
  author: string;
  createdAt: string;
  banner: string;
  content: string;
  news: BlogItemType[];
}
export const BlogDetail: React.FC<any> = ({ author, createdAt, banner, content, news }: BlogDetailProps) => {
  const readTime = useMemo(() => getReadTime(content), [content]);
  const formattedDate = useMemo(() => formatDateToLongFormat(createdAt), [createdAt]);
  const currentPage = useRef(1);
  const form = useRef({
    categories: "",
  });
  return (
    <div className={styles.blogWrapper}>
      <div className={styles.blogContainer}>
        <div className={styles.banner}>
          <img src={banner} alt="Blog Banner" className={styles.bannerImage} />
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <div className={styles.info}>
              <div className={styles.author}>{author}</div>
              <div className={styles.divider}></div>
              <div className={styles.date}>{formattedDate}</div>
              <div className={styles.divider}></div>
              <div className={styles.readTime}>{readTime} min read</div>
            </div>
            <div>
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        </div>
        <div className={styles.news}>
          <div className={styles.newsTitle}>
            <span>News</span>
            <h3>Latest Insights</h3>
            <p>Keep up with key cybersecurity developments.</p>
          </div>
          <div className={styles.newsList}>
            <div className={styles.newsListWrap}>
              <Swiper
                className={styles.swiperContent}
                modules={[Pagination, Autoplay]}
                spaceBetween={28}
                slidesPerView={1}
                breakpoints={{
                  380: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1280: {
                    slidesPerView: 3,
                  },
                  1440: {
                    slidesPerView: 4,
                  },
                }}
                centeredSlides
                loop
                pagination={{ clickable: true }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                key={`swiper-${currentPage.current}-${form.current}-${news?.length}`}
              >
                {news?.map((item: BlogItemType) => (
                  <SwiperSlide key={`news-item-${item.id}`}>
                    <BlogSummary {...item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {(!news || news.length <= 0) && <div className={styles.noData}>Nothing to show</div>}
          </div>
        </div>
      </div>
    </div>
  );
};
