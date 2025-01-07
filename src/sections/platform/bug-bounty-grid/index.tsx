import Image from "next/image";
import React from "react";

import styles from "./styles.module.scss";
import { BugBountyGridProps } from "@/types";

export const BugBountyGrid: React.FC<BugBountyGridProps> = ({ tagline, title, content, gridLeft, gridRight }) => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.gridContent} grid`}>
          <div className={styles.content}>
            <div className="tagline mb-10">{tagline}</div>
            <h2 className="heading-2 mb-6 font-bold">{title}</h2>
            <p className="paragraph-md">{content}</p>
          </div>
          <div className="relative">
            <div className={styles.cardContainer}>
              <div className={styles.cardColumn}>
                <div className={styles.programCard}>
                  <div className={styles.programCardContent}>
                    <div className="paragraph-sm">Bug Bounty</div>
                    <div className="paragraph-xxl font-semibold">Programs</div>
                  </div>
                  <Image
                    alt="Bug Bounty Programs"
                    className={styles.programImage}
                    height={400}
                    src="/platform/bug-bounty-programs-window.png"
                    width={600}
                  />
                </div>
                <div className={styles.featureCard}>
                  <div className={styles.featureHeader}>
                    <Image
                      alt="Bug Bounty Programs"
                      className={styles.featureIcon}
                      height={60}
                      src={gridLeft.icon}
                      width={60}
                    />
                    <h3 className="heading-7 font-bold">{gridLeft.title}</h3>
                  </div>
                  <p className="paragraph-md">{gridLeft.description}</p>
                </div>
              </div>
              <div className={styles.cardColumn}>
                <div className={styles.featureCard}>
                  <div className={styles.featureHeader}>
                    <Image
                      alt="Bug Bounty Programs"
                      className={styles.featureIcon}
                      height={60}
                      src={gridRight.icon}
                      width={60}
                    />
                    <h3 className="heading-7 font-bold">{gridRight.title}</h3>
                  </div>
                  <p className="paragraph-md">{gridRight.description}</p>
                </div>
                <div className={styles.missionsCard}>
                  <Image
                    alt="Missions"
                    className={styles.missionImage}
                    height={400}
                    src="/platform/missions-window.png"
                    width={600}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
