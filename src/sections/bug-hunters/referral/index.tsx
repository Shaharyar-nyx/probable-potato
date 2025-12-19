"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

import { Button } from "@/components";

import "./styles.scss";
import Image from "next/image";
import { formatBtnId, getStrapiAssetUrl } from "@/lib";
import { useIsMobile } from "@/hooks";

const SwiperButtonNext: React.FC<{ disabled: boolean }> = ({ disabled }) => {
  const swiper = useSwiper();

  return (
    <Button
      className="border-none p-3"
      disabled={disabled}
      iconName="ArrowRightIcon"
      transparent
      variant="neutral"
      onClick={() => swiper.slideNext()}
    />
  );
};

const SwiperButtonPrev: React.FC<{ disabled: boolean }> = ({ disabled }) => {
  const swiper = useSwiper();

  return (
    <Button
      className="border-none p-3"
      disabled={disabled}
      iconName="ArrowLeftIcon"
      transparent
      variant="neutral"
      onClick={() => swiper.slidePrev()}
    />
  );
};

export const Referral: React.FC<any> = ({ headline, title, content, content_md, cta_text, cards, collection }) => {
  const isMobile = useIsMobile();

  const [showReferralScreen, setShowReferralScreen] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleOpenReferral = () => {
    setShowReferralScreen(true);
  };

  const handleCloseReferral = () => {
    setShowReferralScreen(false);
  };

  // Handle body overflow when the referral screen is shown
  useEffect(() => {
    if (showReferralScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [showReferralScreen]);

  const isSlide = collection === "bh_how_it_works_1";

  return (
    <section className="referral-parent-container">
      <div className="referral-container mb-6" style={{ paddingTop: isSlide ? 0 : "", paddingBottom: !isSlide ? 0 : "" }}>
        <div className="referral-container-item">
          {collection !== "bh_how_it_works_1" && (
            <>
              <span className={`${isMobile ? "paragraph-md" : "tagline"} mb-6 lg:mb-10 inline-block`}>{headline}</span>
              <h2 className={`${isMobile ? "heading-7" : "heading-1"} mb-6 lg:mb-5 font-bold text-primary-800`}>{title}</h2>
              <p className="paragraph-md lg:mb-5 text-primary-800" dangerouslySetInnerHTML={{ __html: content_md }} />
            </>
          )}
          {collection === "bh_how_it_works_1" && <Button id={formatBtnId(cta_text)} className="w-full lg:w-fit paragraph-md" onClick={handleOpenReferral}>{cta_text}</Button>}
        </div>
        {collection !== "bh_how_it_works_1" && (
          <div className="referral-container-item grid grid-cols-1 gap-6 md:grid-cols-2">
            {cards.map(({ content_md, content, icon }: any, index: number) => (
              <div key={index} className="flex flex-col gap-3 lg:p-6 lg:p-10">
                <div className="flex items-start gap-3">
                  <div className="inline-block rounded-[4px] bg-primary-500 p-1">
                    <Image
                      alt={icon.data.attributes.name}
                      height={24}
                      width={24}
                      src={getStrapiAssetUrl(icon.data.attributes.url)}
                    />
                  </div>
                  <h3 className={`${isMobile ? "heading-8" : "heading-7"} font-bold text-primary-800`} dangerouslySetInnerHTML={{ __html: content_md }} />
                </div>
                <p className="paragraph-md text-primary-800" dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* AnimatePresence and Motion for Referral Screen */}
      {collection === "bh_how_it_works_1" && (
        <AnimatePresence>
          {showReferralScreen && (
            <motion.div
              animate={{ clipPath: "inset(0 0 0 0%)" }}
              className="referral-overlay"
              exit={{ clipPath: "inset(0 0 0 100%)" }}
              initial={{ clipPath: "inset(0 0 0 100%)" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div className="overlay-content">
                <nav className="mt-[3.5rem] lg:mt-[7rem] flex w-full justify-between bg-primary-500 px-6 py-4 lg:px-16 lg:py-5">
                  <div className="flex items-center gap-3">
                    <Button className="p-1 lg:p-3" iconName="ArrowLeftIcon" onClick={handleCloseReferral} />
                    <h2 className="heading-5 text-neutral-50">{title}</h2>
                  </div>
                  <Button className="p-1 lg:p-3" iconName="XMarkIcon" onClick={handleCloseReferral}>
                    {!isMobile && 'Close'}
                  </Button>
                </nav>
                <div className="overlay-content">
                  <div className="swiper-parent-container">
                    {isMobile ? (
                      <div className="px-6 w-full max-w-screen-3xl">
                        <p className="paragraph-sm mb-10 text-primary-800">{content}</p>
                        <h3 className="heading-7 mb-10 font-bold text-primary-800 lg:mb-10">{title}</h3>
                        <Swiper
                          className="swiper-container"
                          modules={[Pagination, Autoplay]}
                          spaceBetween={28}
                          slidesPerView={1}
                          centeredSlides
                          loop
                          pagination={{ clickable: true }}
                          autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                          }}
                        >
                          {cards.map(({ title, content, icon }: any, index: number) => (
                            <SwiperSlide key={index}>
                              <div className="md:py-6 lg:px-10 lg:py-10">
                                <div className="mb-3 flex items-center gap-3">
                                  <div className="flex h-[32px] w-[32px] items-center justify-center rounded bg-primary-500 p-2">
                                    <Image
                                      src={getStrapiAssetUrl(icon.data.attributes.url)}
                                      alt={icon.data.attributes.name}
                                      height={24}
                                      width={24}
                                    />
                                  </div>
                                  <h4 className="heading-7 font-bold text-primary-800">{title}</h4>
                                </div>
                                <p className="paragraph-md text-primary-800">{content}</p>
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    ) : (
                      <Swiper
                        modules={[Navigation]}
                        navigation={false}
                        onSlideChange={(swiper) => {
                          setIsBeginning(swiper.isBeginning);
                          setIsEnd(swiper.isEnd);
                        }}
                        onSwiper={(swiper) => {
                          setIsBeginning(swiper.isBeginning);
                          setIsEnd(swiper.isEnd);
                        }}
                      >
                        {Array.from({ length: Math.ceil(cards.length / 2) }).map((_, slideIndex) => (
                          <SwiperSlide key={slideIndex}>
                            <div className="w-full max-w-screen-3xl">
                              <p className="paragraph-sm mb-10 text-primary-800">{content}</p>
                              <h3 className="heading-1 mb-6 font-bold text-primary-800 lg:mb-10">
                                {slideIndex < 2 ? title : "Program Highlights"}
                              </h3>
                              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-6">
                                {cards
                                  .slice(slideIndex * 2, slideIndex * 2 + 2)
                                  .map(({ title, content, icon }: any, index: number) => (
                                    <div key={`${slideIndex}-${index}`} className="md:py-6 lg:px-10 lg:py-10">
                                      <div className="mb-3 flex items-start gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded bg-primary-500 p-2">
                                          <Image
                                            src={getStrapiAssetUrl(icon.data.attributes.url)}
                                            alt={icon.data.attributes.name}
                                            height={24}
                                            width={24}
                                          />
                                        </div>
                                        <h4 className="heading-4 font-bold text-primary-800">{title}</h4>
                                      </div>
                                      <p className="paragraph-xl text-primary-800">{content}</p>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}

                        <div className="relative z-10 flex justify-end gap-5 px-16 py-6 lg:py-[unset]">
                          <SwiperButtonPrev disabled={isBeginning} />
                          <SwiperButtonNext disabled={isEnd} />
                        </div>
                      </Swiper>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </section>
  );
};
