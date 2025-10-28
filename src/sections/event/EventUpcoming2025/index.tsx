"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { EventDetail, EventGroup } from "@/types/components";
import { STRAPI_ASSETS } from "@/lib/constants";
import dayjs from "dayjs";
export const EventUpcoming2025: React.FC<any> = ({ title, description, event_groups }) => {
  const [activeGroup, setActiveGroup] = useState<number>(0);
  const [activeEvents, setActiveEvents] = useState<EventDetail[]>([]);

  const handleGroupClick = (index: number) => {
    const events = event_groups[index].events || [];
    if (events.length > 0) {
      setActiveGroup(index);
    }
  };

  const getEventDateRange = (start_date?: string, end_date?: string) => {
    if (!start_date) return "";
    const start = dayjs(start_date);
    const startMonth = start.format("MMM");
    const startYear = start.format("YYYY");
    if (end_date) {
      const end = dayjs(end_date);
      const endMonth = end.format("MMM");
      const endYear = end.format("YYYY");
      if (startYear === endYear) {
        return `${startMonth}-${endMonth}, ${startYear}`;
      }
      return `${startMonth}, ${startYear} - ${endMonth}, ${endYear}`;
    } else {
      return `${startMonth}, ${startYear}`;
    }
  };

  useEffect(() => {
    const events = event_groups[activeGroup].events || [];
    setActiveEvents(events);
  }, [activeGroup]);

  return (
    <div className="py-12 text-[#02255B] md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8 text-center md:mb-16">
          <p className="mb-2 text-[12px] font-normal text-[#02255B] md:mb-4 md:text-[14px]">Community</p>
          <h2 className="mb-4 text-[32px] font-bold text-[#02255B] md:mb-6 md:text-[48px]">{title}</h2>
          <p className="text-[14px] font-normal text-[#02255B] md:text-[16px]">{description}</p>
        </div>

        {/* Month Tabs */}
        <div className="flex flex-col justify-between border-b md:flex-row">
          {event_groups?.map((group: EventGroup, index: number) => (
            <div
              key={index}
              className={`w-full pb-4 text-center text-[#02255B] md:w-1/3 ${index === activeGroup ? "border-b-2 border-[#045DE3]" : ""}`}
              onClick={() => handleGroupClick(index)}
            >
              <h3 className="text-[24px] font-bold md:text-[48px]">{group.title}</h3>
              <p className="mt-1 text-[14px] font-normal md:mt-2 md:text-[16px]">{group.description}</p>
            </div>
          ))}
        </div>

        {/* Event Cards */}
        {activeEvents.map((event) => (
          <div className="mt-6 space-y-8 ">
            <div className="overflow-hidden rounded-2xl bg-white p-4 shadow-lg md:p-8">
              <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
                {/* Event Image */}
                {event.image.data.attributes.url && (
                  <div className="relative h-[120px] w-[120px] flex-shrink-0 md:h-[160px] md:w-[160px] mb-8">
                    <Image
                      src={`${STRAPI_ASSETS}${event.image.data.attributes.url}`}
                      alt={event.title}
                      width={160}
                      height={160}
                      className="h-full w-full rounded-lg object-cover"
                    />
                    <span className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs md:text-sm font-medium min-w-[120px] text-center px-2 py-[2px] rounded-full shadow-md">
                      {event.type}
                    </span>

                  </div>

                )}
                {/* Event Content */}
                <div className="flex-grow text-center md:text-left w-full md:w-[10000px] mb-6 md:mb-8">
                  <h3 className="mb-1 text-[18px] sm:text-[20px] md:text-[24px] font-bold text-[#02255B] leading-snug">
                    {event.title}
                  </h3>
                  <p
                    className="text-[13px] sm:text-[14px] md:text-[16px] font-normal text-[#02255B] mt-1 sm:mt-2"
                    style={{ marginBottom: "8px" }}
                  >
                    {event.details}
                  </p>
                </div>



                <div className="w-full md:min-w-[200px]">
                  <div className=" flex-col items-center gap-1 md:items-start md:gap-8">
                    {event.location && (
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
                        <span className="text-[16px] font-bold text-[#02255B] md:text-[20px]">{event.location}</span>
                      </div>
                    )}
                    {event.start_date && (
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
                        <span className="text-[16px] font-bold text-[#02255B] md:text-[20px]">
                          {getEventDateRange(event.start_date, event.end_date)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex w-full justify-center md:mt-0 md:min-w-[170px] md:justify-end">
                  <a
                    href={event.details_url || "#"}
                    className="w-full rounded-lg bg-[#045DE4] px-6 py-3 text-center text-white font-normal underline transition hover:bg-[#0345A9] md:w-auto"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
