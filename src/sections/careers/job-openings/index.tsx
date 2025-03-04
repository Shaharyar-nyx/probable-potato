"use client";

import React from "react";

import styles from "./styles.module.scss";
import { Button } from "@/components";

const jobOpenings = [
  {
    title: "Software Engineer",
    contractType: "Full Time",
    location: "Remote",
    link: "https://example.com/apply/software-engineer"
  },
  {
    title: "Product Designer",
    contractType: "Full Time",
    location: "Remote",
    link: "https://example.com/apply/product-designer"
  },
  {
    title: "Marketing Manager",
    contractType: "Full Time",
    location: "Remote",
    link: "https://example.com/apply/marketing-manager"
  }
];
import { useIsMobile } from "@/hooks";

export const JobOpenings: React.FC<any> = ({ title, content }) => {
  const isMobile = useIsMobile();
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 className={`${isMobile ? 'heading-7' : 'heading-1'} ${styles.title}`}>{title}</h1>
        <p className={`paragraph-lg ${styles.description}`}>{content}</p>

        <div className={styles.gridContent}>
          <p className={`paragraph-lg ${styles.columnHeader}`}>Job Title</p>
          <p className={`paragraph-lg ${styles.columnHeader}`}>Contract Type</p>
          <p className={`paragraph-lg ${styles.columnHeader}`}>Location</p>
          <div />

          {jobOpenings.map(({ title, contractType, location, link }, index) => (
            <React.Fragment key={index}>
              <h2 className={`${isMobile ? 'paragraph-xl mb-6' : 'heading-2'} ${styles.row}`}>{title}</h2>
                <p className={`${isMobile ? 'paragraph-md' : 'heading-7'} ${styles.row}`}>{contractType}</p>
                <p className={`${isMobile ? 'paragraph-md mb-6' : 'heading-7'} ${styles.row}`}>{location}</p>
                <div className={styles.buttonWrapper}>
                  <Button externalHref={link} variant="neutral" className="paragraph-md w-full lg:w-full">
                    Apply Now
                  </Button>
                </div>
                {index !== jobOpenings.length - 1 && <div className={styles.divider} />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
