"use client";

import React from "react";
import Image from "next/image";

export const EventUpcoming2025 = ({ title, content }: any) => {
  return (
    <div className="py-24 text-[#02255B]">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 text-[14px] font-normal text-[#02255B]">Community</p>
          <h2 className="mb-6 text-[48px] font-bold text-[#02255B]">Upcoming Events</h2>
          <p className="text-[16px] font-normal text-[#02255B]">
            Join us for a series of engaging events designed to enhance your cybersecurity skills.
          </p>
        </div>

        {/* Month Tabs */}
        <div className="mb-6 flex justify-between border-b">
          <div className="relative w-1/3 border-b-2 border-[#045DE3] pb-4 text-center text-[#02255B]">
            <h3 className="text-[48px] font-bold">July</h3>
            <p className="mt-2 text-[16px] font-normal">2025</p>
          </div>
          <div className="w-1/3 pb-4 text-center text-[#02255B]">
            <h3 className="text-[48px] font-bold">August</h3>
            <p className="mt-2 text-[16px] font-normal">2025</p>
          </div>
          <div className="w-1/3 pb-4 text-center text-[#02255B]">
            <h3 className="text-[48px] font-bold">September</h3>
            <p className="mt-2 text-[16px] font-normal">2025</p>
          </div>
        </div>

        {/* Event Cards */}
        <div className="space-y-8">
          <div className="overflow-hidden rounded-2xl bg-white p-8 shadow-lg">
            <div className="flex items-center justify-center gap-8">
              {/* Event Image */}
              <div className="h-[160px] w-[160px] flex-shrink-0">
                <Image
                  src="/images/events/bughunting-badge-2025.png"
                  alt="BugHunting Campaign 2025"
                  width={160}
                  height={160}
                  className="h-full w-full rounded-lg object-cover"
                />
              </div>

              {/* Event Content */}
              <div className="flex-grow">
                <h3 className="mb-4 text-[24px] font-bold text-[#02255B]">{title}</h3>
                <p className="mb-6 text-[16px] font-normal text-[#02255B]">{content}</p>
              </div>
              <div className="min-w-[200px]">
                <div className="flex flex-col items-start gap-8">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
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
                    <span className="text-[20px] font-bold text-[#02255B]">Hong Kong</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M6.75 3V5.25M17.25 3V5.25M3 18.75V7.5C3 6.25736 4.00736 5.25 5.25 5.25H18.75C19.9926 5.25 21 6.25736 21 7.5V18.75M3 18.75C3 19.9926 4.00736 21 5.25 21H18.75C19.9926 21 21 19.9926 21 18.75M3 18.75V11.25C3 10.0074 4.00736 9 5.25 9H18.75C19.9926 9 21 10.0074 21 11.25V18.75"
                        stroke="#045DE3"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-[20px] font-bold text-[#02255B]">Jul-Sep, 2025</span>
                  </div>
                </div>
              </div>
              <div className="flex min-w-[170px] justify-end">
                <a
                  href="/events/protectHK2025"
                  className="rounded-lg bg-[#045DE3] px-6 py-3 font-semibold text-white transition hover:bg-[#0345A9]"
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
