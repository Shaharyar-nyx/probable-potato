"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

import styles from "./styles.module.scss";
import { OurCoreTeamProps } from "@/types";

export const OurCoreTeam: React.FC<OurCoreTeamProps> = ({ title, content, core }) => {
  const [cardsPerRow, setCardsPerRow] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setCardsPerRow(window.innerWidth <= 768 ? 1 : 3);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const rows = core.reduce<Array<typeof core>>((acc, item, index) => {
    const rowIndex = Math.floor(index / cardsPerRow);
    if (!acc[rowIndex]) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(item);
    return acc;
  }, []);

  return (
    <section className={styles["our-core-team"]}>
      <h1 className={`${styles.title} heading-1 font-bold`}>{title}</h1>
      <h3 className={`${styles.content} heading-7`}>{content}</h3>
      <div className={styles.grid}>
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {row.map((member, index) => (
              <div key={index} className={styles.card}>
                <div className="flex flex-row items-center justify-between">
                  <h5 className={`${styles.name} heading-5 font-bold`}>{member.name}</h5>

                  <div className={styles.social}>
                    {member.social.map((social, idx) => (
                      <a key={idx} className={styles.link} href={social.link} rel="noopener noreferrer" target="_blank">
                        <Image alt={social.icon} height={10} src={social.icon} width={10} />
                      </a>
                    ))}
                  </div>
                </div>
                <p className={`${styles.title} paragraph-xs`}>{member.title}</p>
                <p className={`${styles.description} paragraph-sm`}>{member.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
