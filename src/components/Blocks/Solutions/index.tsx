import React, { useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { solutionsContent } from "@/data/solutions";
import bgImage from "assets/images/bg-image.jpeg";

gsap.registerPlugin(ScrollTrigger);

interface SolutionCardProps {
  icon: string;
  title: string;
  description: string;
  isEven: boolean;
}

interface SolutionsProps {
  content?: typeof solutionsContent;
}

const SolutionCard: React.FC<SolutionCardProps> = ({
  icon,
  title,
  description,
  isEven,
}) => {
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
      }
    );
  }, [isEven]);

  return (
    <div
      ref={cardRef}
      className={`flex flex-row items-start gap-8 w-full ${
        isEven ? "justify-end" : ""
      }`}
    >
      <div className="flex flex-row items-start gap-8">
        <div className="flex-shrink-0">
          <Image src={icon} alt={title} width={48} height={48} />
        </div>
        <div
          className={`flex flex-col ${
            isEven ? "items-end text-right" : "items-start text-left"
          }`}
        >
          <h3 className="text-[32px] max-w-[600px] font-primaryBold text-primary-800 mb-2">
            {title}
          </h3>
          <p className="text-gray-700 mb-4 text-[16px] max-w-[600px]">
            {description}
          </p>
          <button className="bg-primary-500 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

const Solutions = ({ content = solutionsContent }: SolutionsProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const crowdsourcingRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const elements = {
      title: titleRef.current,
      crowdsourcing: crowdsourcingRef.current,
      benefits: benefitsRef.current,
    };

    if (!elements.title || !elements.crowdsourcing || !elements.benefits)
      return;

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
      }
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
      }
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
      }
    );
  }, []);

  return (
    <div className={`${styles.solutionsContainer} relative overflow-hidden`}>
      <div
        className={`${styles.sectionBackground} py-16 px-4`}
        style={{ backgroundImage: `url(${bgImage.src})` }}
      >
        <div className={`absolute inset-0 ${styles.overlay}`} />

        <div className={styles.container}>
          <h2
            ref={titleRef}
            className="text-[2.5rem] font-primaryBold text-primary-800 mb-12"
          >
            {content.title}
          </h2>
          <div
            className={`${styles.glassBackground} flex flex-col gap-16 p-12`}
          >
            {content.solutions.map((solution, index) => (
              <SolutionCard
                key={index}
                {...solution}
                isEven={index % 2 === 1}
              />
            ))}
          </div>
        </div>

        <div className={`${styles.container} !mt-[120px]`}>
          <div
            className={`${styles.glassBackground} p-12 text-primary-800 crowdsourcing`}
          >
            <span className="text-[14px] font-primary">
              {content.crowdsourcing.label}
            </span>

            <h2 className="text-[48px] font-primaryBold mt-4 mb-6">
              {content.crowdsourcing.title}
            </h2>

            <p className="text-[16px] mb-12">
              {content.crowdsourcing.description}
            </p>

            <div ref={benefitsRef} className="grid grid-cols-2 gap-24">
              {content.crowdsourcing.benefits.map((benefit, index) => (
                <div key={index}>
                  <h3 className="text-[20px] font-primaryBold mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-[16px]">{benefit.description}</p>
                  {benefit.hasButton && (
                    <button className="bg-primary-500 text-white px-8 py-3 rounded mt-12 font-primaryMedium hover:bg-primary-700 transition-colors">
                      Learn More
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
