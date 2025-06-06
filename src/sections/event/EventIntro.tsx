"use client";

import React from "react";
import Image from "next/image";
import { STRAPI_ASSETS } from "@/lib";

export const EventIntro = ({
  background_file,
  title,
  headline,
  content,
  cards,
}: {
  background_file: any;
  title: string;
  headline: string;
  content: string;
  cards: any;
}) => (
  <div className="bg-[#F6F7F8]">
    <div className="mx-auto max-w-screen-2xl overflow-hidden">
      <section className="w-full px-4 py-8 md:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:gap-8">
            {/* Details Section */}
            <div className="text-xs text-[#02255B] md:text-sm">Details</div>

            {/* Date & Time Section */}
            <div className="flex flex-col gap-1 md:gap-2">
              <h2 className="text-xl font-bold text-[#02255B] md:text-2xl">Date & Time</h2>
              <p className="text-base text-[#02255B] md:text-xl">{headline}</p>
            </div>

            {/* Badge Section */}
            <div className="flex flex-col gap-6 md:gap-8">
              <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:gap-6">
                <div className="relative h-20 w-20 md:h-24 md:w-24">
                  <Image
                    src={
                      background_file?.data?.attributes?.url
                        ? `${STRAPI_ASSETS}${background_file?.data?.attributes?.url}`
                        : "/images/events/bughunting-badge-2025.png"
                    }
                    alt="BugHunting Campaign 2025 Badge"
                    width={96}
                    height={96}
                    className="rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-2 md:gap-[20px]">
                  <span className="text-2xl font-bold text-[#02255B] md:text-4xl">-</span>
                  <h1 className="text-center text-2xl font-bold text-[#02255B] md:text-left md:text-4xl">{title}</h1>
                </div>
              </div>

              <p className="text-center text-base text-[#02255B] md:text-left md:text-lg">{content}</p>

              {/* Requirements Grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-16">
                {cards.map((requirement: any, index: number) => (
                  <div key={index} className="relative rounded-2xl bg-white">
                    {/* Checkmark Circle */}
                    <div className="absolute left-0 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm md:h-12 md:w-12">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="md:h-6 md:w-6"
                      >
                        <path d="M20.5 6.41L8.5 18.41L3 12.91L4.41 11.5L8.5 15.58L19.09 5L20.5 6.41Z" fill="#0B8A54" />
                      </svg>
                    </div>

                    {/* Requirement Box */}
                    <div className="rounded-2xl border border-gray-200 p-4 text-[#02255B] md:p-6">
                      <p className="pl-2 text-sm font-bold leading-tight md:text-base">{requirement.title || ""}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
);
