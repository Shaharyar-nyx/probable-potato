"use client";

import React, { useState } from "react";
import Link from "next/link";
import styles from "./styles.module.scss";
import { Ticker } from "@/lib/tickers";

interface TickerBannerProps {
  tickers: Ticker[];
}

export const TickerBanner: React.FC<TickerBannerProps> = ({ tickers }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter out tickers without publishedAt
  const publishedTickers = tickers.filter(ticker => ticker.publishedAt);

  // If no tickers, don't render anything
  if (publishedTickers.length === 0) {
    return null;
  }

  const currentTicker = publishedTickers[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? publishedTickers.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % publishedTickers.length);
  };

  const content = (
    <div className={styles.tickerContent}>
      <div className={styles.tickerInfo}>
        <span className={styles.cveId}>{currentTicker.cve_id}</span>
        <span className={styles.separator}>•</span>
        <span className={styles.title}>{currentTicker.title}</span>
      </div>
      {currentTicker.description && (
        <p className={styles.description}>{currentTicker.description}</p>
      )}
    </div>
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
        {publishedTickers.length > 1 && (
          <button 
            className={styles.navButton}
            onClick={handlePrev}
            aria-label="Previous ticker"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
        
        {currentTicker.link ? (
          <Link href={currentTicker.link} className={styles.tickerLink} target="_blank" rel="noopener noreferrer">
            {content}
          </Link>
        ) : (
          content
        )}

        {publishedTickers.length > 1 && (
          <>
            <button 
              className={styles.navButton}
              onClick={handleNext}
              aria-label="Next ticker"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className={styles.indicators}>
              {publishedTickers.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to ticker ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
        </div>
      </div>
      {/* Spacer to push content below fixed banner */}
      <div className={styles.spacer} />
    </>
  );
};

export default TickerBanner;

