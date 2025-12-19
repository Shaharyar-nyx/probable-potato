"use client";
import React from "react";
import Image from "next/image";
import { getStrapiAssetUrl } from "@/lib";

export const EventOrganizers = ({ title, cards }: { title: string; cards: any }) => {
  return (
    <div className="relative bg-[#F6F7F8] pt-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/images/events/pattern-bg.png')] bg-cover bg-center opacity-10" />

      <div className="relative mx-auto max-w-7xl px-4">
        {/* Co-Organizers Section */}
        <h2 className="mb-16 text-center text-[48px] font-bold text-[#1F025B]">{title}</h2>
        <div className="flex items-center justify-center gap-20">
          {cards.map((item: any, index: number) => (
            <div key={index} className="w-[280px]">
              <Image
                src={getStrapiAssetUrl(item.background_image?.data?.attributes?.url)}
                alt={title}
                width={280}
                height={80}
                className="h-auto w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
