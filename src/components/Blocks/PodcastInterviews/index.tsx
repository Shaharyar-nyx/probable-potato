"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.scss";
import { Button } from "@/components";
import { STRAPI_ASSETS } from "@/lib";

type Episode = {
  title?: string;
  guest_name?: string;
  host_name?: string;
  platform?: string;
  publish_date?: string;
  duration?: string;
  url?: string;
  thumbnail?: {
    data?: { attributes?: { url: string; alternativeText?: string } };
  };
  logo?: {
    data?: { attributes?: { url: string; alternativeText?: string } };
  };
};

const ITEMS_PER_PAGE = 2;

export const PodcastInterviews: React.FC<{
  title?: string;
  headline?: string;
  content?: string;
  content_md?: string;
  background_file?: { data?: { attributes?: { url?: string } } };
  featured_image?: { data?: { attributes?: { url?: string } } };
  episodes?: Episode[];
}> = ({
  title,
  headline,
  content,
  content_md,
  background_file,
  featured_image,
  episodes = [],
}) => {
    const bg = background_file?.data?.attributes?.url
      ? `${STRAPI_ASSETS}${background_file.data.attributes.url}`
      : undefined;

    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(episodes.length / ITEMS_PER_PAGE);
    const paginatedEpisodes = episodes.slice(
      (page - 1) * ITEMS_PER_PAGE,
      page * ITEMS_PER_PAGE
    );

    return (
      <section
        className={styles.container}
      >
        <h1 className={styles.pageTitle}>Podcast Interviews</h1>
        <div className={styles.overlay} />
        <div className={styles.inner}>
          <header className={styles.header}>
            {headline && <div className={styles.tagline}>{headline}</div>}
            {title && <h2 className={styles.mainTitle}>{title}</h2>}
            {content && <p className={styles.intro}>{content}</p>}




          </header>

          <ul className={styles.grid}>
            {paginatedEpisodes.map((ep, i) => {
              const tUrl = ep.thumbnail?.data?.attributes?.url
                ? `${STRAPI_ASSETS}${ep.thumbnail.data.attributes.url}`
                : undefined;
              const lUrl = ep.logo?.data?.attributes?.url
                ? `${STRAPI_ASSETS}${ep.logo.data.attributes.url}`
                : undefined;

              return (
                <li key={i} className={styles.card}>
                  <div className={styles.cardBody}>
                    <div className={styles.metaRow}>

                      <span>
                        {ep.duration}
                        {'\u00A0\u00A0|\u00A0\u00A0'}
                        {ep.publish_date}
                      </span>
                    </div>

                    {ep.title && (
                      <h3 className={styles.cardTitle}>{ep.title}</h3>
                    )}

                    {(ep.guest_name || ep.host_name) && (
                      <p className={styles.guests}>
                        {ep.guest_name ? `Guest: ${ep.guest_name}` : ""}
                        {ep.guest_name && ep.host_name ? " · " : ""}
                        {ep.host_name ? `Host: ${ep.host_name}` : ""}
                      </p>
                    )}

                    {ep.url && (
                      <Button href={ep.url} className={styles.listenBtn}>
                        Listen to Episode ↗
                      </Button>
                    )}
                  </div>

                  {tUrl && (
                    <div className={styles.thumb}>
                      <Image
                        src={tUrl}
                        alt={ep.title || "episode thumbnail"}
                        width={640}
                        height={360}
                        className="rounded-lg object-cover w-full h-auto"
                      />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {totalPages > 0 && (
            <div className={styles.pagination}>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                «
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={page === i + 1 ? styles.activePage : ""}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                »
              </button>
            </div>
          )}
        </div>
      </section>
    );
  };
