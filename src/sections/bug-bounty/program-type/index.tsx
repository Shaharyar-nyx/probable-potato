"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

import styles from "./styles.module.scss";
import { Button } from "@/components";
import { STRAPI_ASSETS } from "@/lib";
import { useIsMobile } from "@/hooks";

export const ProgramType: React.FC<any> = ({ title, content, cards }) => {
  const isMobile = useIsMobile();

  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  const handleLearnMore = (id: number | null) => {
    setExpandedFeature(expandedFeature === id ? null : id);
  };

  return (
    <section className={styles["program-type"]}>
      <div className={styles.background} />
      <div className={styles.container}>
        <div>
          <h2 className={`${styles.title} ${isMobile ? 'heading-7' : 'heading-2'}`}>{title}</h2>
          <p className={`${styles.paragraph} paragraph-md`}>{content}</p>
        </div>
        <div className="flex flex-col gap-6">
          <div className={`flex flex-col gap-6 lg:flex-row`}>
            {cards.map(({ title, content, content_md, icon }: any, index: number) => (
              <motion.div
                key={index}
                className={`${styles["feature-container"]} ${expandedFeature === index ? styles.expanded : expandedFeature !== index && expandedFeature !== null ? "h-max lg:w-[20%]" : ""}`}
                initial={false}
                layout
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                  <div className="w-fit rounded-md bg-neutral-50">
                    <div className="flex h-8 w-8 items-center justify-center">
                      <Image
                        alt={icon?.data?.attributes?.name}
                        height={24}
                        width={24}
                        src={`${STRAPI_ASSETS}${icon?.data?.attributes?.url}`}
                      />
                    </div>
                  </div>
                  <h3 className={`font-bold text-neutral-50 ${isMobile ? 'paragraph-lg' : 'heading-7'}`}>{title}</h3>
                </div>

                {expandedFeature !== index && expandedFeature !== null ? (
                  ""
                ) : (
                  <div className="flex flex-col gap-4">
                    {expandedFeature === index ? (
                      <div className="flex flex-col gap-3">
                        <p className="paragraph-md text-neutral-50">{content}</p>
                        <p
                          className="paragraph-md font-semibold text-neutral-50"
                          dangerouslySetInnerHTML={{ __html: content_md }}
                        />
                      </div>
                    ) : (
                      <p className="paragraph-md text-neutral-50">{content}</p>
                    )}
                  </div>
                )}

                <div>
                  {expandedFeature === index ? (
                    <Button className="float-right" variant="neutral" onClick={() => handleLearnMore(null)}>
                      <Image alt="arrow up right" height={24} src="/images/arrow-up-left.svg" width={24} />
                    </Button>
                  ) : expandedFeature !== index && expandedFeature !== null ? (
                    ""
                  ) : (
                    <Button className="paragraph-md w-full lg:w-max" variant="primary" onClick={() => handleLearnMore(index)}>
                      Learn More
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
          {/* <div className={`${styles["feature-container"]} lg:!flex-row lg:items-end justify-between`}>
            <div className="flex flex-col gap-3">
              <h3 className="heading-7 font-bold text-neutral-50">Want to become a Bug Bounty Hunter?</h3>
              <p className="paragraph-md text-neutral-50">
                <span className="font-bold">Need help determining what types of programs are right for you?</span>{" "}
                <br /> Our Cyberbay consultants are here to provide personalized advice and pricing tailored to your
                needs.
              </p>
            </div>
            <Button className="h-fit w-fit" href="/contact-us" variant="neutral">
              Get in Touch
            </Button>
          </div> */}
        </div>
      </div>
    </section>
  );
};
