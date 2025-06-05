"use client";

//import { STRAPI_ASSETS } from "@/lib";
import React from "react";
//import Image from "next/image";

export const CampaignTimeline = ({
  background_file,
  title,
  content,
  cards,
}: {
  background_file: any;
  title: string;
  content: string;
  cards: any;
}) => {
  // Calculate margin for each event based on column position
  const calculateMargin = (index: number) => {
    const positions = [14, 38, 64.5, 85];
    return positions[index];
  };

  // Calculate title position to align with even columns
  const calculateTitlePosition = (index: number) => {
    const positions = [14, 38, 60.6, 84.5];
    return `${positions[index]}%`;
  };

  return (
    <div className="bg-[#F6F7F8]">
      <div className="mx-auto max-w-screen-2xl">
        <div className="min-h-screen gap-20 px-8 py-12 text-[#32363D]">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#02255B]">{title}</h2>
          {/* <div className="pl-[40px]">
            <Image
              src={`${STRAPI_ASSETS}${background_file?.data?.attributes?.url}`}
              alt={title}
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div> */}

          {/* Timeline Grid */}
          <div className="relative">
            {/* Month Labels */}
            <div className="relative mb-6 h-8">
              {cards.map((item: any, index: number) => (
                <div
                  key={index}
                  className="absolute text-center text-lg font-semibold text-[#02255B]"
                  style={{ left: calculateTitlePosition(index), transform: "translateX(0%)" }}
                >
                  {item.title}
                </div>
              ))}
            </div>

            {/* Vertical Lines */}
            <div className="absolute flex h-full w-full justify-between">
              {[...Array(17)].map((item: any, index: number) => (
                <div
                  key={index}
                  className={`h-full w-[5.8%] border-r border-black/10 ${index % 2 == 1 ? "hidden" : ""}`}
                ></div>
              ))}
            </div>

            {/* Campaign Period Bar */}
            <div className="absolute left-[41%] top-[4rem] flex h-12 w-[47.2%] items-center justify-center rounded-xl bg-[#045DE3] font-semibold text-white shadow-lg">
              {content}
            </div>

            {/* Events */}
            <div className="relative mt-36 space-y-20">
              {cards.map((item: any, index: number) => (
                <div
                  style={{ marginLeft: `${calculateMargin(index)}%` }}
                  key={index}
                  className={`flex w-1/4 items-start text-sm text-[#32363D]`}
                >
                  <div className="flex min-h-[60px] w-full">
                    <div className="mr-3 min-h-[60px] w-[20px] rounded-md bg-[#D0D3D7]"></div>
                    <p className="flex-1 text-left">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
