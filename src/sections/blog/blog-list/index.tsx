"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { BlogSummary } from "../blog-summary";
import { AppPagination } from "@/components/UI/pagination";
import { request } from "@/lib/request";
import { BlogCategories as arrCategory } from "@/lib";
import { Spinner } from "@/components";
import { BlogCategoryType } from "@/types";
import { BlogItemType } from "@/types";
import { BlogCategoryList } from "../blog-category-list";
import { BlogCategoryListMobile } from "../blog-category-list-mobile";
import { BlogItemLast } from "../blog-item-last";
import { useIsMobile } from "@/hooks";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export const BlogList: React.FC<any> = () => {
  const limit = 6;
  const currentPage = useRef(1);
  const form = useRef({
    categories: "",
  });
  const [categories, setCategories] = useState<BlogCategoryType[]>([]);
  const [lastest, setLastest] = useState<BlogItemType | null>(null);
  const [news, setNews] = useState<BlogItemType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const isMobile = useIsMobile();

  const handleChangeCategory = async (value: string | undefined) => {
    form.current = { categories: value ?? "" };
    currentPage.current = 1;
    handleFetch();
  };

  const handleChangePage = async (page: number) => {
    currentPage.current = page;
    handleFetch();
  };

  const parseToSearchParams = (values: any) => {
    const { categories } = values;

    const params = {
      category: categories && categories.length ? categories : undefined,
    };

    // Remove undefined, null, empty array or empty string values
    return Object.fromEntries(
      Object.entries(params).filter(([_, value]) => {
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        return value !== undefined && value !== null && value !== "";
      }),
    );
  };

  const handleFetch = async () => {
    setLoading(true);
    try {
      const formData = parseToSearchParams(form.current);
      const data = { ...formData, page: currentPage.current, limit };
      const response = await request("/api/blog-posts", data, "GET");
      const json = await response.json();
      const { hits, total } = json;
      setNews(hits);
      setTotal(total);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleFetchLastest = async () => {
    try {
      const data = { page: 1, limit: 1 };
      const response = await request("/api/blog-posts", data, "GET");
      const json = await response.json();
      const { hits, total } = json;
      setLastest(hits[0] || null);
    } catch (error) {}
  };

  // const fetchCategories = async () => {
  //   return request("/api/blog-posts/fields/category", null, "GET");
  // };

  const init = async () => {
    //const listCategory = await (await fetchCategories()).json();
    //setCategories(listCategory);
    setCategories(arrCategory);
  };

  useEffect(() => {
    handleFetchLastest();
    handleFetch();
    init();
  }, []);

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.lastItem}>{lastest && <BlogItemLast {...lastest} />}</div>
        <div className={styles.content}>
          {loading && (
            <div className={styles.loading}>
              <Spinner className={styles.spinner} />
            </div>
          )}

          {/* start pc */}
          {!isMobile && (
            <>
              <div className={styles.title}>
                The Digital Shield Blog:
                <br /> Your Online Protection Source
              </div>
              <div className={styles.twoCol}>
                <div className={styles.listCategory}>
                  {categories.length > 0 && (
                    <BlogCategoryList list={categories} onSelect={(name) => handleChangeCategory(name)} />
                  )}
                </div>
                <div className={styles.newsList}>
                  <div className={styles.newsListWrap}>
                    {news?.map((item) => <BlogSummary key={`news-item-${item.id}`} {...item} />)}
                  </div>
                  {(!news || news.length <= 0) && <div className={styles.noData}>
                    <p>Fresh blog content is on the way across all fronts of cybersecurity. From securing your tech stack to monitoring your evolving attack surface and strengthening enterprise governance—we're preparing expert insights to help you move from reactive to resilient.</p>
                    <p>At Nyxlab, we're not just tracking threats—we're helping you get ahead of them. Whether you're building in Web3, scaling your startup, or maturing your security posture, check back soon for actionable strategies, industry trends, cyber news, and bold perspectives designed to secure your next move.</p>
                  </div>}
                </div>
              </div>
            </>
          )}
          {/* end pc */}

          {/* start mobile */}
          {isMobile && (
            <div className={styles.twoCol}>
              <div className={styles.listCategory}>
                {categories.length > 0 && (
                  <BlogCategoryListMobile list={categories} onSelect={(name) => handleChangeCategory(name)} />
                )}
              </div>
              <div className={styles.title}>
                The Digital Shield Blog:
                <br /> Your Online Protection Source
              </div>
              <div className={styles.newsList}>
                <div className={styles.newsListWrap}>
                  <Swiper
                    className={styles.swiperContent}
                    modules={[Pagination, Autoplay]}
                    spaceBetween={28}
                    slidesPerView={1}
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
                {(!news || news.length <= 0) && <div className={styles.noData}>
                    <p>Fresh blog content is on the way across all fronts of cybersecurity. From securing your tech stack to monitoring your evolving attack surface and strengthening enterprise governance—we're preparing expert insights to help you move from reactive to resilient.</p>
                    <p>At Nyxlab, we're not just tracking threats—we're helping you get ahead of them. Whether you're building in Web3, scaling your startup, or maturing your security posture, check back soon for actionable strategies, industry trends, cyber news, and bold perspectives designed to secure your next move.</p>
                  </div>}
              </div>
            </div>
          )}
          {/* end mobile */}

          {/* mobile not show pagination */}
          {total > 0 && total > limit && (
            <div className={styles.paginationWrap}>
              <AppPagination
                total={total}
                offset={limit}
                className={styles.pagination}
                currentPage={currentPage.current}
                handleChangePage={(page: number) => handleChangePage(page)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
