"use client";

import React from "react";
import Image from "next/image";

export const EventUpcoming2025 = ({ title, content }: any) => {
  return (
    <div className="py-12 text-[#02255B] md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8 text-center md:mb-16">
          <p className="mb-2 text-[12px] font-normal text-[#02255B] md:mb-4 md:text-[14px]">Community</p>
          <h2 className="mb-4 text-[32px] font-bold text-[#02255B] md:mb-6 md:text-[48px]">Upcoming Events</h2>
          <p className="text-[14px] font-normal text-[#02255B] md:text-[16px]">
            Join us for a series of engaging events designed to enhance your cybersecurity skills.
          </p>
        </div>

        {/* Month Tabs */}
        <div className="mb-6 flex flex-col justify-between border-b md:flex-row">
          <div className="relative w-full border-b-2 border-[#045DE3] pb-4 text-center text-[#02255B] md:w-1/3">
            <h3 className="text-[24px] font-bold md:text-[48px]">July</h3>
            <p className="mt-1 text-[14px] font-normal md:mt-2 md:text-[16px]">2025</p>
          </div>
          <div className="w-full pb-4 text-center text-[#02255B] md:w-1/3">
            <h3 className="text-[24px] font-bold md:text-[48px]">August</h3>
            <p className="mt-1 text-[14px] font-normal md:mt-2 md:text-[16px]">2025</p>
          </div>
          <div className="w-full pb-4 text-center text-[#02255B] md:w-1/3">
            <h3 className="text-[24px] font-bold md:text-[48px]">September</h3>
            <p className="mt-1 text-[14px] font-normal md:mt-2 md:text-[16px]">2025</p>
          </div>
        </div>

        {/* Event Cards */}
        <div className="space-y-8">
          <div className="overflow-hidden rounded-2xl bg-white p-4 shadow-lg md:p-8">
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
              {/* Event Image */}
              <div className="h-[120px] w-[120px] flex-shrink-0 md:h-[160px] md:w-[160px]">
                <Image
                  src="/images/events/bughunting-badge-2025.png"
                  alt="BugHunting Campaign 2025"
                  width={160}
                  height={160}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>

              {/* Event Content */}
              <div className="flex-grow text-center md:text-left">
                <h3 className="mb-2 text-[20px] font-bold text-[#02255B] md:mb-4 md:text-[24px]">{title}</h3>
                <p className="mb-4 text-[14px] font-normal text-[#02255B] md:mb-6 md:text-[16px]">{content}</p>
              </div>
              <div className="w-full md:min-w-[200px]">
                <div className="flex flex-col items-center gap-4 md:items-start md:gap-8">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="md:h-6 md:w-6"
                    >
                      <path
                        d="M15 10.5C15 12.1569 13.6569 13.5 12 13.5C10.3431 13.5 9 12.1569 9 10.5C9 8.84315 10.3431 7.5 12 7.5C13.6569 7.5 15 8.84315 15 10.5Z"
                        stroke="#045DE3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19.5 10.5C19.5 17.6421 12 21.75 12 21.75C12 21.75 4.5 17.6421 4.5 10.5C4.5 6.35786 7.85786 3 12 3C16.1421 3 19.5 6.35786 19.5 10.5Z"
                        stroke="#045DE3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-[16px] font-bold text-[#02255B] md:text-[20px]">Hong Kong</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="md:h-6 md:w-6"
                    >
                      <path
                        d="M6.75 3V5.25M17.25 3V5.25M3 18.75V7.5C3 6.25736 4.00736 5.25 5.25 5.25H18.75C19.9926 5.25 21 6.25736 21 7.5V18.75M3 18.75C3 19.9926 4.00736 21 5.25 21H18.75C19.9926 21 21 19.9926 21 18.75M3 18.75V11.25C3 10.0074 4.00736 9 5.25 9H18.75C19.9926 9 21 10.0074 21 11.25V18.75"
                        stroke="#045DE3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-[16px] font-bold text-[#02255B] md:text-[20px]">Jul-Sep, 2025</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex w-full justify-center md:mt-0 md:min-w-[170px] md:justify-end">
                <a
                  href="/events/protectHK2025"
                  className="w-full rounded-lg bg-[#045DE3] px-6 py-3 text-center font-semibold text-white transition hover:bg-[#0345A9] md:w-auto"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
