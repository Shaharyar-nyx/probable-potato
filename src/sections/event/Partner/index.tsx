"use client";
import React from "react";
import Image from "next/image";
import { STRAPI_ASSETS } from "@/lib";

export const EventPartner = ({ title, cards }: { title: string; cards: any }) => {
  return (
    <div
      className="bg-cover bg-center bg-no-repeat"
      style={{
        background:
          "linear-gradient(180deg, #F6F7F8 0%, rgba(246, 247, 248, 0.00) 50%, #F6F7F8 100%), url(/images/events/pattern-bg.png) lightgray 50% / cover no-repeat",
      }}
    >
      <div className="relative py-12 md:py-16 lg:py-24">
        {/* Background Pattern */}
        <div className="relative mx-auto max-w-7xl px-4">
          {/* Co-Organizers Section */}
          <h2 className="mb-8 text-center text-2xl font-bold text-[#1F025B] md:mb-12 md:text-3xl lg:mb-16 lg:text-[48px]">
            Co-Organizers
          </h2>
          <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-12 lg:gap-20">
            {[...Array(3)].map((item: any, index: number) => (
              <div key={index} className={`w-full ${index === 2 ? "md:w-[150px]" : "md:w-[200px] lg:w-[280px]"}`}>
                <Image
                  src={`/images/events/2025_Bug_Hunting_Logo_${index + 1}.png`}
                  alt={title}
                  width={280}
                  height={140}
                  className="h-auto w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="relative mx-auto mt-12 max-w-7xl px-4 md:mt-16 lg:mt-20">
          {/* Strategic Partner Section */}
          <h2 className="mb-8 text-center text-xl font-bold text-[#1F025B] md:mb-12 md:text-2xl lg:mb-16 lg:text-[40px]">
            {title}
          </h2>
          <div className="flex flex-col flex-wrap justify-center gap-8 md:flex-row md:gap-12 lg:gap-16">
            {cards.map((item: any, index: number) => (
              <div key={index} className="w-full md:w-[300px] lg:w-[400px]">
                <Image
                  src={`${STRAPI_ASSETS}${item.background_image?.data?.attributes?.url}`}
                  alt={title}
                  width={400}
                  height={120}
                  className="h-auto w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
