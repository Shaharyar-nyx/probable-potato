"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import styles from "./styles.module.scss";
import { Button, IconRenderer } from "@/components";
import { ProgramTypeProps } from "@/types";

export const ProgramType: React.FC<ProgramTypeProps> = ({ title, content, features }) => {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  const handleLearnMore = (id: number | null) => {
    setExpandedFeature(expandedFeature === id ? null : id);
  };

  return (
    <section className={styles["program-type"]}>
      <div className={styles.background} />
      <div className={styles.container}>
        <div>
          <h2 className={`${styles.title} heading-2`}>{title}</h2>
          <p className={`${styles.paragraph} paragraph-md`}>{content}</p>
        </div>
        <div className="flex flex-col gap-6">
          <div className={`flex flex-col lg:flex-row gap-6`}>
            {features.map((feature, id) => (
              <motion.div
                key={id}
                className={`${styles["feature-container"]} ${expandedFeature === id ? styles.expanded : expandedFeature !== id && expandedFeature !== null ? "h-max w-[20%]" : ""}`}
                initial={false}
                layout
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-neutral-50 p-1">
                    <IconRenderer className="h-[24px] w-[24px] text-primary-800" iconName={feature.icon} />
                  </div>
                  <h3 className="heading-7 font-bold text-neutral-50">{feature.title}</h3>
                </div>

                {expandedFeature !== id && expandedFeature !== null ? (
                  ""
                ) : (
                  <div className="flex flex-col gap-4">
                    {expandedFeature === id ? (
                      <div className="flex flex-col gap-3">
                        <p className="paragraph-md text-neutral-50">{feature.text}</p>
                        <p
                          className="paragraph-md font-semibold text-neutral-50"
                          dangerouslySetInnerHTML={{ __html: feature.content }}
                        />
                      </div>
                    ) : (
                      <p className="paragraph-md text-neutral-50">{feature.text}</p>
                    )}
                  </div>
                )}

                <div>
                  {expandedFeature === id ? (
                    <Button className="float-right" variant="neutral" onClick={() => handleLearnMore(null)}>
                      <Image alt="arrow up right" height={24} src="/images/arrow-up-left.svg" width={24} />
                    </Button>
                  ) : expandedFeature !== id && expandedFeature !== null ? (
                    ""
                  ) : (
                    <Button className="w-max" variant="primary" onClick={() => handleLearnMore(id)}>
                      Learn More
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          <div className={`${styles["feature-container"]} lg:!flex-row lg:items-end justify-between`}>
            <div className="flex flex-col gap-3">
              <h3 className="heading-7 font-bold text-neutral-50">Want to become a Bug Bounty Hunter?</h3>
              <p className="paragraph-md text-neutral-50">
                <span className="font-bold">Need help determining what types of programs are right for you?</span>{" "}
                <br /> Our Cyberbay consultants are here to provide personalized advice and pricing tailored to your
                needs.
              </p>
            </div>
            <Button className="h-fit w-fit" href="/contact-us" variant="neutral">
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
