"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { NewsItem } from "../news-item";
import { NewsSearchForm } from "../news-search-form";
import { AppPagination } from "@/components/UI/pagination";
import { NewsItemType } from "@/types";
import { request } from "@/lib/request";
import { Spinner } from "@/components";
import dayjs from "dayjs";
import { getAllCountryName } from "@/lib/countries";
import { corporateIndistries } from "@/lib/corporate-industries";

export const NewsList: React.FC<any> = ({ title }) => {
  const limit = 10;
  const currentPage = useRef(1);
  const form = useRef({
    countries: undefined,
    industries: undefined,
    times: undefined,
    startAccidentDate: undefined,
    endAccidentDate: undefined,
    corporateName: undefined,
  });
  const [industries, setIndustries] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);
  const [news, setNews] = useState<NewsItemType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (value: any) => {
    form.current = value;
    currentPage.current = 1;
    handleFetch();
  };

  const handleChangePage = async (page: number) => {
    currentPage.current = page;
    handleFetch();
  };

  const parseToSearchParams = (values: any) => {
    const { countries, industries, times, corporateName } = values;
    const countriesCode = countries?.map((country: any) => country.value);
    const industriesCode = industries?.map((industry: any) => industry.value);
    const { startDate, endDate } = times || { startDate: undefined, endDate: undefined };

    // Format dates to YYYY-MM-DD if they exist
    const formattedStartDate = startDate ? dayjs(startDate).format("YYYY-MM-DD") : undefined;
    const formattedEndDate = endDate ? dayjs(endDate).format("YYYY-MM-DD") : undefined;

    const params = {
      country: countriesCode ?? undefined,
      startAccidentDate: formattedStartDate,
      corporateIndustry: industriesCode ?? undefined,
      endAccidentDate: formattedEndDate,
      corporateName:
        corporateName && typeof corporateName === "string" ? ("" + corporateName).trim() || undefined : undefined,
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
      const response = await request("/api/cyber-accidents", data, "GET");
      const json = await response.json();
      const { hits, total } = json;
      setNews(hits);
      setTotal(total);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // const fetchCountries = async () => {
  //   return request("/api/cyber-accidents/fields/country", {}, "GET");
  // };

  // const fetchIndustries = async () => {
  //   return request("/api/cyber-accidents/fields/corporateIndustry", {}, "GET");
  // };

  const init = async () => {
    //const listCountry = await (await fetchCountries()).json();
    //const listIndustry = await (await fetchIndustries()).json();
    const listCountry = getAllCountryName();
    const listIndustry = corporateIndistries;
    const arrCountry = listCountry
      ?.filter((it: string) => it)
      .map((it: string) => {
        return {
          value: it,
          label: it,
        };
      });

    const arrIndustry = listIndustry
      ?.filter((it: string) => it)
      .map((it: string) => {
        return {
          value: it,
          label: it,
        };
      });

    setCountries(arrCountry);
    setIndustries(arrIndustry);
  };

  useEffect(() => {
    const start = (currentPage.current > 0 ? currentPage.current - 1 : 0) * limit + news?.length || 0;
    setOffset(start);
  }, [news, currentPage]);

  useEffect(() => {
    handleFetch();
    init();
  }, []);

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        <div className={styles.searchForm}>
          <NewsSearchForm
            handleFetch={(form: any) => handleSearch(form)}
            listCountry={countries}
            listIndustry={industries}
            listTimes={industries}
          />
        </div>
        <div className={styles.content}>
          {loading && (
            <div className={styles.loading}>
              <Spinner className={styles.spinner} />
            </div>
          )}
          {total > 0 && (
            <div className={styles.showing}>
              Showing {offset} of {total} incidents
            </div>
          )}
          <div className={styles.newsList}>
            {news?.map((item, i) => <NewsItem key={`news-item-${i}`} {...item} />)}
            {news?.length === 0 && <div className={styles.noData}>Nothing to show</div>}
          </div>
          {total > 0 && total > limit && (
            <div className={styles.paginationWrap}>
              <AppPagination
                total={total}
                pageSize={limit}
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
