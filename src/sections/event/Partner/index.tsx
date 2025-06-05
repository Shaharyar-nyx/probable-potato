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
      <div className="relative py-24">
        {/* Background Pattern */}
        <div className="relative mx-auto max-w-7xl px-4">
          {/* Co-Organizers Section */}
          <h2 className="mb-16 text-center text-[48px] font-bold text-[#1F025B]">Co-Organizers</h2>
          <div className="flex items-center justify-center gap-20">
            {[...Array(3)].map((item: any, index: number) => (
              <div key={index} className="w-[280px]">
                <Image
                  src={`/images/events/2025_Bug_Hunting_Logo_${index + 1}.png`}
                  alt={title}
                  width={280}
                  height={140}
                  className="h-[140px] w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="relative mx-auto max-w-7xl px-4">
          {/* Strategic Partner Section */}
          <h2 className="text-center text-[40px] font-bold text-[#1F025B]">{title}</h2>
          <div className="flex justify-center">
            {cards.map((item: any, index: number) => (
              <div key={index} className="w-[400px]">
                <Image
                  src={`${STRAPI_ASSETS}${item.background_image?.data?.attributes?.url}`}
                  alt={title}
                  width={400}
                  height={120}
                  className="h-auto w-full"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
