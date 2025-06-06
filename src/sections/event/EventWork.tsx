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
  <div className="bg-[url('/images/events/pattern-bg.png')] bg-cover bg-no-repeat">
    <div className="mx-auto max-w-screen-2xl overflow-hidden">
      <section className="relative w-full overflow-hidden px-4 py-24 md:px-6 lg:px-8">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-cover bg-center opacity-50" />

        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col items-center">
            {/* Title */}
            <h2 className="mb-24 text-center text-5xl font-bold text-[#02255B]">{title}</h2>

            {/* Steps Container */}
            <div className="relative flex w-full flex-col items-stretch justify-between gap-16 px-4 md:flex-row md:gap-8 lg:px-16">
              {/* Connecting Lines */}
              <div className="absolute left-[20%] right-[20%] top-6 hidden h-0.5 bg-[#0066FF] md:block" />

              {cards.map((step: any, index: number) => (
                <div key={`event-work-${index}`} className="relative flex flex-1 flex-col items-center">
                  {/* Step Number Circle */}
                  <div className="relative z-10 mb-8 flex h-12 w-12 items-center justify-center rounded-full bg-[#02255B] shadow-lg">
                    <span className="text-2xl font-bold text-white">{index + 1}</span>
                  </div>

                  {/* Step Card */}
                  <div className="h-full w-full rounded-2xl bg-[#02255B] p-8 text-center shadow-lg">
                    <h3 className="mb-4 text-xl font-bold text-white">{step.title}</h3>
                    <p className="text-base leading-relaxed text-gray-200">{step.content}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Note */}
            <p className="mt-20 text-center text-sm italic text-[#02255B]/60">{content}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
);
