"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import { Button } from "@/components";
import { getStrapiAssetUrl } from "@/lib";

type PressItem = {
  source_name?: string;
  title?: string;
  guest_name?: string;
  url?: string;
  publish_date?: string;
  thumbnail?: { data?: { attributes?: { url: string; alternativeText?: string } } };
};

export const GlobalPressCoverage: React.FC<{
  coverage?: PressItem[];
}> = ({ coverage = [] }) => {
  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(coverage.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = coverage.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section className={styles.container}>
      <hr className={styles.topLine} />
      <h1 className={styles.pageTitle}>Global Press Coverage</h1>
      <div className={styles.inner}>
        <ul className={styles.grid}>
          {currentItems.map((it, i) => {
            const iUrl = it.thumbnail?.data?.attributes?.url
              ? getStrapiAssetUrl(it.thumbnail.data.attributes.url)
              : undefined;

            return (
              <li key={i} className={styles.card}>
                {iUrl && (
                  <Image
                    src={iUrl}
                    alt={it.title || "press cover"}
                    width={400}
                    height={400}
                    className={styles.hero}
                  />
                )}

                <div className={styles.cardBody}>
                  {it.publish_date && (
                    <span className={styles.date}>{it.publish_date}</span>
                  )}

                  {it.title && (
                    <h3 className={styles.title}>{it.title}</h3>
                  )}

                  {it.guest_name && (
                    <p className="text-sm text-gray-600 mt-1">{it.guest_name}</p>
                  )}

                  {it.url && (
                    <Button href={it.url} className={styles.listenBtn} iconName="ArrowUpRightIcon">
                      Read Article
                    </Button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        {/* Pagination */}
        {totalPages > 0 && (
          <div className={styles.pagination}>
            <button
              onClick={() =>
                setCurrentPage((p) => (p > 1 ? p - 1 : totalPages))
              }
              className={styles.paginationButton}
            >
              «
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={currentPage === i + 1 ? styles.activePage : ""}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((p) => (p < totalPages ? p + 1 : 1))
              }
              className={styles.paginationButton}
            >
              »
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
