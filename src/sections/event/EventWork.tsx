"use client";

import React from "react";
export const EventWork = ({
  title,
  content,
  cards,
  background_file,
}: {
  title: string;
  content: string;
  cards: any;
  background_file: any;
}) => (
  <div
    className="bg-cover bg-no-repeat"
    style={{ background: "url(/images/events/how-to-work-bg.png) lightgray 50% / cover no-repeat" }}
  >
    <div className="mx-auto max-w-screen-2xl overflow-hidden">
      <section className="relative w-full overflow-hidden px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-24">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-cover bg-center opacity-50" />

        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col items-center">
            {/* Title */}
            <h2 className="mb-12 text-center text-[48px] font-bold text-[#02255B] md:mb-16 lg:mb-24">{title}</h2>

            {/* Steps Container */}
            <div className="relative flex w-full flex-col items-stretch justify-between gap-8 px-4 md:flex-row md:gap-12 lg:gap-16 lg:px-16">
              {/* Connecting Lines */}
              <div className="absolute left-[20%] right-[20%] top-6 hidden h-0.5 bg-[#034AB6] md:block" />

              {cards.map((step: any, index: number) => (
                <div key={`event-work-${index}`} className="relative flex flex-1 flex-col items-center">
                  {/* Step Number Circle */}
                  <div className="relative z-10 mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#02255B] shadow-lg md:mb-6 md:h-12 md:w-12 lg:mb-8">
                    <span className="text-xl font-bold text-white md:text-2xl">{index + 1}</span>
                  </div>

                  {/* Step Card */}
                  <div className="h-full w-full rounded-2xl bg-[#02255B] p-4 text-center shadow-lg md:p-6 lg:p-8">
                    <h3 className="mb-2 text-lg font-bold text-white md:mb-3 md:text-xl lg:mb-4">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-200 md:text-base">{step.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Note */}
            <p className="mt-12 text-center text-xs italic text-[#02255B]/60 md:mt-16 md:text-sm lg:mt-20">{content}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
);
