"use client";

import Image from "next/image";
import React from "react";

import styles from "./styles.module.scss";
import { LaunchProgramProps } from "@/types";

export const LaunchProgram: React.FC<LaunchProgramProps> = ({ tagline, title, content, steps }) => {
  const [currentStep, setCurrentStep] = React.useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={`${styles.gridContent} grid`}>
          <div className={styles.content}>
            <div className="tagline mb-10">{tagline}</div>
            <h2 className="heading-2 mb-6 font-bold">{title}</h2>
            <p className="paragraph-md">{content}</p>
          </div>
          <div className={styles.sliderContainer}>
            <div className={styles.navigationButtons}>
              <button
                className={styles.navigationButton}
                disabled={currentStep === 0}
                style={{
                  boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                }}
                onClick={prevStep}
              >
                <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z"
                    fill={currentStep === 0 ? "#B4CEF7" : "#02255B"}
                  />
                </svg>
              </button>
              <button
                className={styles.navigationButton}
                disabled={currentStep === steps.length - 1}
                style={{
                  boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                }}
                onClick={nextStep}
              >
                <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z"
                    fill={currentStep === steps.length - 1 ? "#B4CEF7" : "#02255B"}
                  />
                </svg>
              </button>
            </div>
            <div className={styles.carouselContainer}>
              {steps.map((step, index) => {
                const position = (index - currentStep + steps.length) % steps.length;
                const positionClass =
                  position === 0 ? styles.slideActive : position === 1 ? styles.slideNext : styles.slideFar;

                return (
                  <div key={index} className={`${styles.slide} ${positionClass}`}>
                    <div className={styles.slideContent}>
                      <div className={styles.slideHeader}>
                        <h4 className="heading-7 font-bold">Step {index + 1}:</h4>
                        <h4 className={`heading-7 ${styles.stepTitle}`}>{step.title}</h4>
                        <p className={`paragraph-md mb-6`}>{step.description}</p>
                      </div>
                      <div className={styles.imageContainer}>
                        <Image
                          alt="Step Image"
                          className={styles.stepImage}
                          layout="fill"
                          objectFit="contain"
                          src={step.icon}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
