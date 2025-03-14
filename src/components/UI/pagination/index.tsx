"use client";

import React, { useState } from "react";

import styles from "./styles.module.scss";
import Pagination from "rc-pagination";

const PrevIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.7267 12L12.6667 11.06L9.61332 8L12.6667 4.94L11.7267 4L7.72666 8L11.7267 12Z" fill="#00143F" />
    <path d="M7.33332 12L8.27332 11.06L5.21998 8L8.27331 4.94L7.33331 4L3.33332 8L7.33332 12Z" fill="#00143F" />
  </svg>
);

const NextIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.27331 4L3.33331 4.94L6.38665 8L3.33331 11.06L4.27331 12L8.27331 8L4.27331 4Z" fill="black" />
    <path d="M8.66668 4L7.72668 4.94L10.78 8L7.72668 11.06L8.66668 12L12.6667 8L8.66668 4Z" fill="black" />
  </svg>
);

const ThreeDot: React.FC = () => (
  <svg width="9" height="3" viewBox="0 0 9 3" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.572 2.084C1.268 2.084 1.016 1.992 0.816 1.808C0.624 1.616 0.528 1.38 0.528 1.1C0.528 0.82 0.624 0.588 0.816 0.404C1.016 0.212 1.268 0.116 1.572 0.116C1.868 0.116 2.112 0.212 2.304 0.404C2.496 0.588 2.592 0.82 2.592 1.1C2.592 1.38 2.496 1.616 2.304 1.808C2.112 1.992 1.868 2.084 1.572 2.084ZM4.68919 2.084C4.38519 2.084 4.13319 1.992 3.93319 1.808C3.74119 1.616 3.64519 1.38 3.64519 1.1C3.64519 0.82 3.74119 0.588 3.93319 0.404C4.13319 0.212 4.38519 0.116 4.68919 0.116C4.98519 0.116 5.22919 0.212 5.42119 0.404C5.61319 0.588 5.70919 0.82 5.70919 1.1C5.70919 1.38 5.61319 1.616 5.42119 1.808C5.22919 1.992 4.98519 2.084 4.68919 2.084ZM7.80638 2.084C7.50238 2.084 7.25038 1.992 7.05038 1.808C6.85838 1.616 6.76238 1.38 6.76238 1.1C6.76238 0.82 6.85838 0.588 7.05038 0.404C7.25038 0.212 7.50238 0.116 7.80638 0.116C8.10238 0.116 8.34638 0.212 8.53838 0.404C8.73038 0.588 8.82638 0.82 8.82638 1.1C8.82638 1.38 8.73038 1.616 8.53838 1.808C8.34638 1.992 8.10238 2.084 7.80638 2.084Z"
      fill="#00143F"
    />
  </svg>
);

export const AppPagination: React.FC<any> = ({ total, offset, handleChangePage }) => {
  return (
    <>
      <Pagination
        total={total}
        pageSize={offset}
        className={styles.pagination}
        onChange={(page) => handleChangePage(page)}
        prevIcon={<PrevIcon />}
        nextIcon={<NextIcon />}
        jumpPrevIcon={<ThreeDot />}
        jumpNextIcon={<ThreeDot />}
        locale={{
          prev_page: "Previous",
          next_page: "Next",
          page_size: "Page size",
        }}
      />
    </>
  );
};
