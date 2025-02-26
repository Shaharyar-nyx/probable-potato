"use client";

import { useRef, useState } from "react";

import styles from "./styles.module.scss";
import { useIsMobile } from "@/hooks";

export const Accordion: React.FC<any> = ({ cards }) => {
  const isMobile = useIsMobile();

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const headerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);

    // Scroll to the header when opening
    if (expandedIndex !== index) {
      setTimeout(() => {
        headerRefs.current[index]?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  };

  return (
    <div className={styles.container}>
      {cards.map(({ title, content_md }: any, index: number) => (
        <div key={`${index}${title}`} className={styles.accordionItem}>
          <button
            ref={(el: any) => (headerRefs.current[index] = el)}
            className={styles.accordionHeader}
            type="button"
            onClick={() => toggleAccordion(index)}
          >
            <h4 className={`${styles.accordionTitle} ${isMobile ? "paragraph-md" : "heading-4"}`}>{title}</h4>
            <svg
              className={`${styles.accordionIcon} ${expandedIndex === index ? styles.expanded : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.5 8.25L12 15.75L4.5 8.25"
                stroke="#32363D"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </button>
          {expandedIndex === index && (
            <div className={`${styles.accordionContent} ${styles.expanded}`}>
              <div
                className={`${styles.accordionText} paragraph-md`}
                dangerouslySetInnerHTML={{ __html: content_md }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
