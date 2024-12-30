"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";
import React, { useEffect, useRef } from "react";

import styles from "./styles.module.scss";
import { solutionsContent } from "@/data/solutions";
import { SolutionCardProps, SolutionsProps } from "@/types/components";

gsap.registerPlugin(ScrollTrigger);

const SolutionCard: React.FC<SolutionCardProps> = ({ icon, title, description, isEven }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    gsap.fromTo(
      element,
      {
        opacity: 0,
        x: isEven ? 100 : -100,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=100",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, [isEven]);

  return (
    <div ref={cardRef} className={`${styles.solutionCard} ${isEven ? styles.even : ""}`}>
      <div className={styles.cardContent}>
        <div className={styles.iconWrapper}>
          <Image alt={title} height={48} src={icon} width={48} />
        </div>
        <div className={`${styles.textContent} ${isEven ? styles.even : ""}`}>
          <h3 className={`${styles.cardTitle} text-h2__medium`}>{title}</h3>
          <p className={styles.cardDescription}>{description}</p>
          <button className={styles.button}>Learn More</button>
        </div>
      </div>
    </div>
  );
};

const Solutions: React.FC<SolutionsProps> = ({ content = solutionsContent }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const crowdsourcingRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = {
      title: titleRef.current,
      crowdsourcing: crowdsourcingRef.current,
      benefits: benefitsRef.current,
    };

    if (!elements.title || !elements.crowdsourcing || !elements.benefits) return;

    // Title animation
    gsap.fromTo(
      elements.title,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: elements.title,
          start: "top bottom-=100",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Crowdsourcing section animations
    gsap.fromTo(
      elements.crowdsourcing.children,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: elements.crowdsourcing,
          start: "top bottom-=100",
          end: "center center",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Benefits animations
    gsap.fromTo(
      elements.benefits.children,
      { opacity: 0, x: (index) => (index % 2 === 0 ? -50 : 50) },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: elements.benefits,
          start: "top bottom-=100",
          end: "center center",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  return (
    <div className={styles.solutionsContainer}>
      <div className={styles.sectionBackground} style={{ backgroundImage: `url(/images/bg-image.jpeg)` }}>
        <div className={styles.overlay} />

        <div className={styles.container}>
          <h2 ref={titleRef} className={`${styles.mainTitle} text-h2__big`}>
            {content.title}
          </h2>
          <div className={styles.solutionsWrapper}>
            {content.solutions.map((solution, index) => (
              <SolutionCard key={index} {...solution} isEven={index % 2 === 1} />
            ))}
          </div>
        </div>

        <div className={`${styles.container} ${styles.crowdsourcing}`}>
          <div ref={crowdsourcingRef} className={styles.crowdsourcingContent}>
            <span className={styles.label}>{content.crowdsourcing.label}</span>

            <div>
              <h2 className={`${styles.crowdsourcingTitle} text-h2__big`}>{content.crowdsourcing.title}</h2>
              <p className={`${styles.crowdsourcingDescription} text-p__medium`}>{content.crowdsourcing.description}</p>
            </div>

            <div ref={benefitsRef} className={styles.benefitsGrid}>
              {content.crowdsourcing.benefits.map((benefit, index) => (
                <div key={index} className={styles.benefitItem}>
                  <h4 className={`${styles.benefitTitle} text-h3__small`}>{benefit.title}</h4>
                  <p className={`${styles.benefitDescription} text-p__medium`}>{benefit.description}</p>
                </div>
              ))}
            </div>

            <button className={`${styles.button} ${styles.large}`}>Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
