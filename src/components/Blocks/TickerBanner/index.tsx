"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";
import { Ticker } from "@/lib/tickers";

interface TickerBannerProps {
  tickers: Ticker[];
}

export const TickerBanner: React.FC<TickerBannerProps> = ({ tickers }) => {
  const tickerListRef = useRef<HTMLDivElement>(null);

  // Filter out tickers without publishedAt
  const publishedTickers = tickers.filter(ticker => ticker.publishedAt);

  // If no tickers, don't render anything
  if (publishedTickers.length === 0) {
    return null;
  }

  // Create array with duplicate first item for smooth looping
  const displayTickers = publishedTickers.length > 1 
    ? [...publishedTickers, publishedTickers[0]]
    : publishedTickers;

  // Slot machine animation - matching the original HTML implementation exactly
  useEffect(() => {
    if (publishedTickers.length <= 1 || !tickerListRef.current) return;

    let index = 0;
    const itemHeight = 20;
    const totalItems = displayTickers.length; // includes duplicate first item

    // Set initial transition (matching original: "transform 0.6s cubic-bezier(.25,.8,.25,1)")
    if (tickerListRef.current) {
      tickerListRef.current.style.transition = 'transform 0.6s cubic-bezier(.25,.8,.25,1)';
    }

    const interval = setInterval(() => {
      index++;
      
      if (tickerListRef.current) {
        tickerListRef.current.style.transform = `translateY(-${index * itemHeight}px)`;
      }

      // Loop reset - matching original: if (index === items.length - 1)
      // When we reach the duplicate item (last item in the array)
      if (index === totalItems - 1) {
        setTimeout(() => {
          if (tickerListRef.current) {
            tickerListRef.current.style.transition = 'none';
            tickerListRef.current.style.transform = 'translateY(0px)';
            index = 0;

            setTimeout(() => {
              if (tickerListRef.current) {
                tickerListRef.current.style.transition = 'transform 0.6s cubic-bezier(.25,.8,.25,1)';
              }
            }, 20);
          }
        }, 600);
      }
    }, 2000); // every 2 seconds (matching original)

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publishedTickers.length]); // Only depend on publishedTickers.length, displayTickers is derived

  const content = (
    <div className={styles.tickerWindow}>
      <div ref={tickerListRef} className={styles.tickerList}>
        {displayTickers.map((ticker, index) => (
          <div key={`${ticker.id}-${index}`} className={styles.tickerItem}>
            {ticker.link ? (
              <Link href={ticker.link} className={styles.tickerLink} target="_blank" rel="noopener noreferrer">
                <span className={styles.cve}>{ticker.cve_id}</span>
                {ticker.title || ticker.description}
              </Link>
            ) : (
              <>
                <span className={styles.cve}>{ticker.cve_id}</span>
                {ticker.title || ticker.description}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.tickerLabel}>NYXLAB NEWLY DISCOVERED CVES</div>
          {content}
        </div>
      </div>
      {/* Spacer to push content below fixed banner */}
      <div className={styles.spacer} />
    </>
  );
};

export default TickerBanner;

