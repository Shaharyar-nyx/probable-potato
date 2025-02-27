/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useState } from "react";

import styles from "./styles.module.scss";
import clsx from "clsx";
import { Gardient } from "@/components/Blocks/Gardient";

export const Faq: React.FC<any> = ({ headline, title, cards }) => {
  const [active, setActive] = useState<any>({});
  const handleCollapse = (index: string) => {
    const current = { ...active };
    const state = current[index] ?? false;
    current[index] = !state;
    setActive(current);
  };

  return (
    <div className={styles.container}>
      <Gardient styles="absolute left-0 top-[20%] h-[40%]" />
      <div className={styles.content}>
        <div className={styles.offers}>{headline}</div>
        <div className={styles.header}>
          <h4 className={`${styles.title} heading-4`}>{title}</h4>
        </div>
        <div className={styles.section}>
          <div className={styles.list}>
            {cards.map((it: any, i: number) => (
              <div key={`faq-${i}`} className="mb-[16px] sm:mb-[20px]">
                <div className="rounded-[17px] bg-gradient-to-br from-[rgba(66,126,218,0.1)] to-[rgba(66,126,218,0.4)] p-[1px]">
                  <div className={clsx(styles.itemWrap, "hover:shadow-[0_4px_4px_rgba(0,0,0,0.25)]")}>
                    <button
                      type="button"
                      className={styles.itemButton}
                      onClick={() => handleCollapse(i as unknown as string)}
                    >
                      <span
                        className={clsx(styles.itemButtonText, {
                          [styles.itemButtonTextActive]: active[i] ?? false,
                        })}
                      >
                        {it.title}
                      </span>
                      {!(active[i] ?? false) && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12.071 13.3139L17.021 8.36388C17.1133 8.26837 17.2236 8.19219 17.3456 8.13978C17.4676 8.08737 17.5988 8.05979 17.7316 8.05863C17.8644 8.05748 17.9961 8.08278 18.119 8.13306C18.2419 8.18334 18.3535 8.25759 18.4474 8.35149C18.5413 8.44538 18.6156 8.55703 18.6658 8.67993C18.7161 8.80282 18.7414 8.9345 18.7403 9.06728C18.7391 9.20006 18.7115 9.33128 18.6591 9.45329C18.6067 9.57529 18.5305 9.68564 18.435 9.77788L12.778 15.4349C12.5905 15.6224 12.3362 15.7277 12.071 15.7277C11.8059 15.7277 11.5515 15.6224 11.364 15.4349L5.70702 9.77788C5.61151 9.68564 5.53533 9.57529 5.48292 9.45329C5.43051 9.33128 5.40292 9.20006 5.40177 9.06728C5.40062 8.9345 5.42592 8.80282 5.4762 8.67993C5.52648 8.55703 5.60073 8.44538 5.69463 8.35149C5.78852 8.25759 5.90017 8.18334 6.02307 8.13306C6.14596 8.08278 6.27764 8.05748 6.41042 8.05863C6.5432 8.05979 6.67442 8.08737 6.79643 8.13978C6.91843 8.19219 7.02877 8.26837 7.12102 8.36388L12.071 13.3139Z"
                            fill="#4B5563"
                          />
                        </svg>
                      )}
                      {(active[i] ?? false) && (
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12.0709 10.6861L17.0209 15.6361C17.1131 15.7316 17.2235 15.8078 17.3455 15.8602C17.4675 15.9126 17.5987 15.9402 17.7315 15.9414C17.8643 15.9425 17.996 15.9172 18.1189 15.8669C18.2417 15.8167 18.3534 15.7424 18.4473 15.6485C18.5412 15.5546 18.6154 15.443 18.6657 15.3201C18.716 15.1972 18.7413 15.0655 18.7402 14.9327C18.739 14.7999 18.7114 14.6687 18.659 14.5467C18.6066 14.4247 18.5304 14.3144 18.4349 14.2221L12.7779 8.56512C12.5904 8.37765 12.3361 8.27233 12.0709 8.27233C11.8057 8.27233 11.5514 8.37765 11.3639 8.56512L5.7069 14.2221C5.61139 14.3144 5.53521 14.4247 5.4828 14.5467C5.43039 14.6687 5.4028 14.7999 5.40165 14.9327C5.4005 15.0655 5.4258 15.1972 5.47608 15.3201C5.52636 15.443 5.60061 15.5546 5.6945 15.6485C5.7884 15.7424 5.90005 15.8167 6.02295 15.8669C6.14584 15.9172 6.27752 15.9425 6.4103 15.9414C6.54308 15.9402 6.6743 15.9126 6.7963 15.8602C6.91831 15.8078 7.02865 15.7316 7.1209 15.6361L12.0709 10.6861Z"
                            fill="#4B5563"
                          />
                        </svg>
                      )}
                    </button>

                    <div className={clsx(styles.itemContent, { hidden: !active[i] })}>
                      <div>{active[i] && <div className={styles.line} />}</div>
                      <p dangerouslySetInnerHTML={{ __html: it.content_md }}></p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
