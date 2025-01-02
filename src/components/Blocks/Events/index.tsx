import moment from "moment";
import Image from "next/image";
import { useState, useMemo } from "react";

import { Button } from "@/components/UI/button";
import { EventsProps } from "@/types";
import Link from "next/link";

const MONTH_NAMES = {
  Jan: "January",
  Feb: "February",
  Mar: "March",
  Apr: "April",
  May: "May",
  Jun: "June",
  Jul: "July",
  Aug: "August",
  Sep: "September",
  Oct: "October",
  Nov: "November",
  Dec: "December",
} as const;

type Month = keyof typeof MONTH_NAMES;

interface MonthYear {
  month: string;
  year: string;
}

export const Events: React.FC<EventsProps> = ({ title, subtitle, content, upcomingEvents }) => {
  const availableMonthsAndYears = useMemo(() => {
    const monthYears = new Set<string>();
    upcomingEvents.forEach((event) => {
      const [month, , year] = event.date.split(" ");
      monthYears.add(JSON.stringify({ month: MONTH_NAMES[month as Month], year }));
    });
    return Array.from(monthYears).map((my) => JSON.parse(my) as MonthYear);
  }, []);

  const [selectedMonthYear, setSelectedMonthYear] = useState<MonthYear>(availableMonthsAndYears[0]);

  const filteredEvents = useMemo(() => {
    return upcomingEvents.filter((event) => {
      const [month, , year] = event.date.split(" ");
      const fullMonth = MONTH_NAMES[month as Month];
      return fullMonth === selectedMonthYear.month && year === selectedMonthYear.year;
    });
  }, [selectedMonthYear]);

  return (
    <section className="px-16 py-[60px]">
      <div className="mb-10 text-center">
        <p className="mb-4 text-sm text-primary-800">{subtitle}</p>
        <h2 className="heading-2 mb-6 text-primary-800">{title}</h2>
        <p className="text-primary-800">{content}</p>
      </div>

      <div className="grid grid-cols-3 gap-y-8 p-8">
        {availableMonthsAndYears.map((my) => (
          <button
            key={`${my.month}-${my.year}`}
            className={`group relative text-center transition-colors ${
              selectedMonthYear.month === my.month && selectedMonthYear.year === my.year
                ? "cursor-default"
                : "cursor-pointer"
            }`}
            onClick={() => setSelectedMonthYear(my)}
          >
            <div className="flex flex-col items-center pb-8 text-primary-800">
              <h2 className="heading-2 mb-2">{my.month}</h2>
              <p>{my.year}</p>
            </div>
            <div
              className={`absolute bottom-0 left-0 right-0 h-[3px] ${
                selectedMonthYear.month === my.month && selectedMonthYear.year === my.year
                  ? "bg-primary-500"
                  : "bg-neutral-100"
              }`}
            />
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {filteredEvents.map((event, index) => (
          <div
            key={index}
            className="group cursor-pointer rounded-2xl border-b border-neutral-100 p-8 transition-shadow hover:bg-white hover:shadow-lg"
          >
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center justify-start gap-[44px]">
                <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-2xl">
                  <div className="absolute bottom-2 left-0 right-0 z-10 mx-[12%] rounded-[20px] bg-primary-500 px-4 py-1 text-center text-xxs text-white">
                    {event.type}
                  </div>
                  <Image alt={event.title} className="h-full w-full object-cover" fill src={event.image} />
                </div>
                <div className="w-[70%]">
                  <h3 className="heading-6 mb-2 text-primary-800">{event.title}</h3>
                  <p className="text-primary-800">{event.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between gap-[44px]">
                <div className="flex w-max flex-col justify-center gap-3">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-primary-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                      <path
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    <span className="heading-7 text-primary-800">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5 text-primary-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                      />
                    </svg>
                    <span className="heading-7 text-primary-800">{moment(event.date).format("dddd DD")}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <Button className="w-max" variant="primary">
                    <Link href={event.link} target="_blank">
                      View Details
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
