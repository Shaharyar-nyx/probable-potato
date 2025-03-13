"use client";

import React, { useState } from "react";

import styles from "./styles.module.scss";
import { NewsItem } from "../news-item";
import { NewsSearchForm } from "../news-search-form";
import Pagination from "rc-pagination";
export const NewsList: React.FC<any> = ({ title }) => {
  const news = [
    {
      title: "Taylor Regional Hospital in Hawkinsville Hit by Cyber Attack",
      country: "United States",
      industry: "Healthcare",
      createAt: "2024-12-12 00:00:00",
      summary:
        "Taylor Regional Hospital was targeted by a ransomware attack, but officials quickly responded and managed to contain the issue. There is no immediate evidence of compromised patient data, but investigations continue.",
      content:
        "Taylor Regional Hospital was targeted by a ransomware attack, but officials quickly responded and managed to contain the issue. There is no immediate evidence of compromised patient data, but investigations continue.Taylor Regional Hospital was targeted by a ransomware attack, but officials quickly responded and managed to contain the issue. There is no immediate evidence of compromised patient data, but investigations continue.",
    },
    {
      title: "Taylor Regional Hospital in Hawkinsville Hit by Cyber Attack",
      country: "United States",
      industry: "Healthcare",
      createAt: "2024-12-12 00:00:00",
      summary:
        "Taylor Regional Hospital was targeted by a ransomware attack, but officials quickly responded and managed to contain the issue. There is no immediate evidence of compromised patient data, but investigations continue.",
      content:
        "Taylor Regional Hospital was targeted by a ransomware attack, but officials quickly responded and managed to contain the issue. There is no immediate evidence of compromised patient data, but investigations continue.",
    },
    {
      title: "Taylor Regional Hospital in Hawkinsville Hit by Cyber Attack",
      country: "United States",
      industry: "Healthcare",
      createAt: "2024-12-12 00:00:00",
      summary:
        "Taylor Regional Hospital was targeted by a ransomware attack, but officials quickly responded and managed to contain the issue. There is no immediate evidence of compromised patient data, but investigations continue.",
      content:
        "Taylor Regional Hospital was targeted by a ransomware attack, but officials quickly responded and managed to contain the issue. There is no immediate evidence of compromised patient data, but investigations continue.",
    },
  ];

  const [currentPage, setCurrentPage] = useState(0);

  const page = 10;
  const total = 100;
  const offset = 10;

  const start = currentPage * offset + offset;

  const handleFetch = (form: any) => {
    console.log("handleFetch", form);
  };

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles.title}>{title}</div>
        <div className={styles.searchForm}>
          <NewsSearchForm handleFetch={handleFetch} />
        </div>
        <div className={styles.content}>
          <div className={styles.showing}>
            Showing {start} of {total} incidents
          </div>
          {news?.map((item, i) => <NewsItem key={`news-item-${i}`} {...item} />)}
          <div className={styles.paginationWrap}>
            <Pagination total={total} className={styles.pagination} />
          </div>
        </div>
      </div>
    </div>
  );
};
