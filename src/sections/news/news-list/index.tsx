"use client";

import React, { useEffect, useState } from "react";
import debounce from "lodash/debounce";
import styles from "./styles.module.scss";
import { NewsItem } from "../news-item";
import { NewsSearchForm } from "../news-search-form";
import { AppPagination } from "@/components/UI/pagination";
import { NewsItemType } from "@/types";

export const NewsList: React.FC<any> = ({ title }) => {
  const news = Array<NewsItemType>(10).fill({
    id: 4,
    corporateName: "Taylor Regional Hospital in Hawkinsville Hit by Cyber Attack",
    corporateDomain: "example.com",
    corporateIndustry: "IT",
    newsSummary:
      "Taylor Regional Hospital was targeted by a ransomware attack, but officials quickly responded and managed to contain the issue. There is no immediate evidence of compromised patient data, but investigations continue.Taylor Regional Hospital was targeted by a ransomware attack, but officials quickly responded and managed to contain the issue. There is no immediate evidence of compromised patient data, but investigations continue. Taylor Regional Hospital was targeted by a ransomware attack, but officials quickly responded and managed to contain the issue. There is no immediate evidence of compromised patient data, but investigations continue.Taylor Regional Hospital was targeted by a ransomware attack, but officials quickly responded and managed to contain the issue. There is no immediate evidence of compromised patient data, but investigations continue. Taylor Regional Hospital was targeted by a ransomware attack, but officials quickly responded and managed to contain the issue. There is no immediate evidence of compromised patient data, but investigations continue.Taylor Regional Hospital was targeted by a ransomware attack, but officials quickly responded and managed to contain the issue. There is no immediate evidence of compromised patient data, but investigations continue. Taylor Regional Hospital was targeted by a ransomware attack, but officials quickly responded and managed to contain the issue. There is no immediate evidence of compromised patient data, but investigations continue.Taylor Regional Hospital was targeted by a ransomware attack, but officials quickly responded and managed to contain the issue. There is no immediate evidence of compromised patient data, but investigations continue. Taylor Regional Hospital was targeted by a ransomware attack, but officials quickly responded and managed to contain the issue. There is no immediate evidence of compromised patient data, but investigations continue.Taylor Regional Hospital was targeted by a ransomware attack, but officials quickly responded and managed to contain the issue. There is no immediate evidence of compromised patient data, but investigations continue. Taylor Regional Hospital was targeted by a ransomware attack, but officials quickly responded and managed to contain the issue. There is no immediate evidence of compromised patient data, but investigations continue.Taylor Regional Hospital was targeted by a ransomware attack, but officials quickly responded and managed to contain the issue. There is no immediate evidence of compromised patient data, but investigations continue. Taylor Regional Hospital was targeted by a ransomware attack, but officials quickly responded and managed to contain the issue. There is no immediate evidence of compromised patient data, but investigations continue.Taylor Regional Hospital was targeted by a ransomware attack, but officials quickly responded and managed to contain the issue. There is no immediate evidence of compromised patient data, but investigations continue.",
    accidentType: "Ransomware",
    accidentSource: "Internet",
    accidentDate: "2025-03-10T17:00:00.000Z",
    country: "VN",
    countryFlag: "VN",
    industry: "IT",
    createdAt: "2025-03-11T15:53:09.801Z",
    updatedAt: "2025-03-11T15:53:09.801Z",
    publishedAt: "2025-03-11T15:47:29.029Z",
  });
  const countryList = Array<any>(10).fill({
    country: "VN",
    countryName: "Viet Nam",
    countryFlag: "VN",
  });

  const industryList = Array<any>(10).fill({
    id: "VN",
    name: "Healcare",
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [form, setForm] = useState({
    countries: undefined,
    industries: undefined,
    times: undefined,
    keyword: undefined,
  });
  const [industries, setIndustries] = useState<any[]>([]);
  const [countries, setCountries] = useState<any[]>([]);

  const page = 10;
  const total = 100;
  const offset = 10;

  const start = currentPage * offset + offset;

  const handleSearch = (value: any) => {
    console.log("handleSearch", value);
    setForm(value);
    handleFetch();
  };

  const handleChangePage = (page: number) => {
    console.log("handleChangePage", page);
    setCurrentPage(page);
    handleFetch();
  };

  const handleFetch = () => {
    const data = { ...form, page: currentPage };
    debounce(
      () => {
        console.log("handleFetch", data);
      },
      1000,
      {},
    );
  };

  const fetchCountries = async () => {
    return Promise.resolve(countryList);
  };

  const fetchIndustries = async () => {
    return Promise.resolve(industryList);
  };

  const init = async () => {
    const listCountry = await fetchCountries();
    const listIndustry = await fetchIndustries();
    const arrCountry = listCountry.map((it) => {
      return {
        value: it.country,
        label: it.countryName,
      };
    });

    const arrIndustry = listIndustry.map((it) => {
      return {
        value: it.id,
        label: it.name,
      };
    });

    setCountries(arrCountry);
    setIndustries(arrIndustry);
  };

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
            handleFetch={handleSearch}
            listCountry={countries}
            listIndustry={industries}
            listTimes={industries}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.showing}>
            Showing {start} of {total} incidents
          </div>
          {news?.map((item, i) => <NewsItem key={`news-item-${i}`} {...item} />)}
          <div className={styles.paginationWrap}>
            <AppPagination
              total={total}
              pageSize={offset}
              className={styles.pagination}
              handleChangePage={(page: number) => handleChangePage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
