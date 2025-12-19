"use client";

import React, { useEffect, useRef } from "react";

import styles from "./styles.module.scss";
import { getStrapiAssetUrl } from "@/lib";
import { useIsMobile } from "@/hooks";

export const BrandMission: React.FC<any> = ({ highlights, title, content, hunters }) => {
  const isMobile = useIsMobile()
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef({ current: 0, target: 0 });
  const rafRef = useRef<number>(0);

  const lerp = (start: number, end: number, factor: number) => {
    return start + (end - start) * factor;
  };

  useEffect(() => {
    const smoothScroll = () => {
      if (!containerRef.current) return;

      // Update target scroll position
      scrollRef.current.target = window.scrollY;

      // Smooth interpolation of scroll position
      scrollRef.current.current = lerp(scrollRef.current.current, scrollRef.current.target, 0.1);

      const cards = containerRef.current.getElementsByClassName(styles.memberCard);
      const viewportCenter = window.innerHeight / 2;

      Array.from(cards).forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distanceFromCenter = Math.abs(viewportCenter - cardCenter);
        const isVisible = rect.top < window.innerHeight - 100 && rect.bottom >= 0;

        // Calculate blur based on distance from center
        const maxBlur = 5;
        const blurRadius = Math.min(maxBlur, (distanceFromCenter / viewportCenter) * maxBlur);

        if (isVisible) {
          const progress = 1 - Math.min(1, Math.abs(distanceFromCenter) / (window.innerHeight * 0.5));
          (card as HTMLElement).style.opacity = progress.toString();
          (card as HTMLElement).style.transform = `scale(${0.8 + 0.2 * progress}) translateY(${50 * (1 - progress)}px)`;
          (card as HTMLElement).style.filter = `blur(${blurRadius}px)`;
        } else {
          (card as HTMLElement).style.opacity = "0";
          (card as HTMLElement).style.transform = "scale(0.8) translateY(50px)";
          (card as HTMLElement).style.filter = "blur(5px)";
        }
      });

      rafRef.current = requestAnimationFrame(smoothScroll);
    };

    smoothScroll();
    window.addEventListener("scroll", () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(smoothScroll);
      }
    });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("scroll", smoothScroll);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      {highlights.map((tag: { text: string }) => (
        <div key={tag.text} className={`${styles[`${tag?.text?.toLowerCase()}Tag`]} paragraph-xs`}>
          {tag.text}
        </div>
      ))}

      <div className={styles.content}>
        <h1 className={`${styles.title} ${isMobile ? "heading-7" : "heading-1"}`}>{title}</h1>
        <p className={`${styles.description} paragraph-md`}>{content}</p>
      </div>

      {hunters.map(
        (
          member: { name: string; job_title: string; image: { data: { attributes: { url: string; name: string } } } },
          index: number,
        ) => (
          <div key={member.name} className={`${styles.memberCard} ${styles["member" + (index + 1)]}`}>
            <img
              alt={member.image?.data?.attributes?.name}
              className={styles.memberImage}
              src={getStrapiAssetUrl(member.image?.data?.attributes?.url)}
            />
            <div className={styles.memberInfo}>
              <p className="text-[9px] leading-[10px] lg:paragraph-sm lg:mb-1 font-semibold">{member.name}</p>
              <p className="text-[6px] leading-[8px] lg:paragraph-xs">{member.job_title}</p>
            </div>
          </div>
        ),
      )}
    </div>
  );
};
