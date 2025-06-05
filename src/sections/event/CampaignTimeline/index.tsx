"use client";

import { STRAPI_ASSETS } from "@/lib";
import React from "react";
import Image from "next/image";

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
  console.log(background_file);
  // Calculate margin for each event based on column position
  const calculateMargin = (index: number) => {
    // Column positions: 2, 4, 6, 8
    // Each column is 12.5% wide
    const positions = [19, 41, 66.5, 85];
    return positions[index];
  };

  // Calculate title position to align with even columns
  const calculateTitlePosition = (index: number) => {
    // Each column is 12.5% wide
    // Column 2 position: 25% (2 * 12.5%)
    // Column 4 position: 50% (4 * 12.5%)
    // Column 6 position: 75% (6 * 12.5%)
    // Column 8 position: 100% (8 * 12.5%)
    const positions = [9.5, 32, 53.6, 76];
    return `${positions[index]}%`;
  };

  const calculateLinePosition = (index: number) => {
    // 100% / 17 = 5.8%
    return `${index * 5.8}%`;
  };

  return (
    <div className="bg-[#F6F7F8]">
      <div className="mx-auto max-w-screen-2xl overflow-hidden">
        <div className="min-h-screen gap-20 px-8 py-12 text-[#32363D]">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#02255B]">{title}</h2>
          <div className="pl-[40px]">
            <Image
              src={`${STRAPI_ASSETS}${background_file?.data?.attributes?.url}`}
              alt={title}
              width={1000}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
