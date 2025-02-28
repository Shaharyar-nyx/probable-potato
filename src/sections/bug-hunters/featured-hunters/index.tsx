"use client";

import React, { useState, useEffect } from "react";
import "./styles.scss";
import clsx from "clsx";

import { formatNumberWithCommas, cyberbayApi, getOrdinalSuffix } from "@/lib";
import { useIsMobile } from "@/hooks";

export const FeaturedHunters: React.FC<any> = ({ title, content, headline }) => {
  const isMobile = useIsMobile();

  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    cyberbayApi
      .getLeaderboard()
      .then((res) => setLeaderboard(res.rankers))
      .catch((err) => {
        if (!controller.signal.aborted) {
          console.error("Error fetching leaderboard:", err);
        }
      });

    return () => controller.abort();
  }, []);

  return (
    <section className="featured-hunters-parent-container">
      <div className="featured-hunters-bottom-container">
        <p className={`${isMobile ? 'paragraph-md' : 'tagline'} mb-6 lg:mb-10 text-neutral-50`}>{headline}</p>
        <h2 className={`${isMobile ? 'heading-7' : 'heading-1'} featured-hunters-title mb-4 lg:mb-5`}>{title}</h2>
        <p className="paragraph-md mb-6 lg:mb-[60px] text-neutral-50 text-center">{content}</p>
        <div className="featured-hunters-hunters-container">
          <div className="w-full">
            <table className="w-full">
              <thead className="inline-block w-full">
                <tr className="featured-hunters-hunters-table-row px-5 py-4 lg:p-4 mb-4 lg:mb-3">
                  {["Rank", "Bounty Hunter", "Points"].map((header, index) => (
                    <th
                      key={header}
                      className={clsx(`${isMobile ? 'paragraph-sm' : 'heading-7'} inline-block text-neutral-50`, {
                        "w-[55px]": index === 0,
                        "w-[230px]": index === 1,
                        "w-[160px]": index === 2,
                      })}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="inline-flex w-full flex-col gap-4 lg:gap-3">
                {leaderboard?.map((data: { points: string; displayName: string }, index) => (
                  <tr key={index} className="featured-hunters-hunters-table-row">
                    <td className="featured-hunters-hunters-table-cell paragraph-sm w-[55px]">
                      {getOrdinalSuffix(index + 1)}
                    </td>
                    <td className="featured-hunters-hunters-table-cell paragraph-sm w-[230px]">
                      <div className="featured-hunters-hunters-table-avatar-cell">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-50 text-primary-800 uppercase">
                          {data.displayName[0]}
                        </span>
                        <span>{data.displayName}</span>
                      </div>
                    </td>
                    <td className="featured-hunters-hunters-table-cell paragraph-sm w-[160px]">
                      {formatNumberWithCommas(data?.points)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
