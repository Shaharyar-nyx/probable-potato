"use client";

import { useRef, useState } from "react";

import styles from "./styles.module.scss";

interface AccordionItem {
  content: string;
  title: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
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
      {items.map((item, index) => (
        <div key={index} className={styles.accordionItem}>
          <button
            ref={(el) => (headerRefs.current[index] = el)}
            className={styles.accordionHeader}
            type="button"
            onClick={() => toggleAccordion(index)}
          >
            <h3 className={styles.accordionTitle}>{item.title}</h3>
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
              <div className={styles.accordionText} dangerouslySetInnerHTML={{ __html: item.content }} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;
