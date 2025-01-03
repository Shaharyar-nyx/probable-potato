"use client";

import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";

import styles from "./styles.module.scss";
import { IconRenderer } from "@/components";
import { Button } from "@/components/UI/button";
import { EventsProps } from "@/types";

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
    <section className={styles.events}>
      <div className={styles.header}>
        <p className={`${styles.subtitle} tagline`}>{subtitle}</p>
        <h1 className={`${styles.title} heading-1`}>{title}</h1>
        <p className={`${styles.content} paragraph-md`}>{content}</p>
      </div>

      <div className={styles.monthsGrid}>
        {availableMonthsAndYears.map((my) => (
          <button
            key={`${my.month}-${my.year}`}
            className={`${styles.monthButton} ${
              selectedMonthYear.month === my.month && selectedMonthYear.year === my.year ? styles.active : ""
            } group`}
            onClick={() => setSelectedMonthYear(my)}
          >
            <div className={styles.monthContent}>
              <h1 className={`${styles.month} heading-1`}>{my.month}</h1>
              <p className={`${styles.year} paragraph-md`}>{my.year}</p>
            </div>
            <div
              className={`${styles.indicator} ${
                selectedMonthYear.month === my.month && selectedMonthYear.year === my.year ? styles.active : ""
              }`}
            />
          </button>
        ))}
      </div>

      <div className={styles.eventsList}>
        {filteredEvents.map((event, index) => (
          <div key={index} className={`${styles.eventCard} group`}>
            <div className={styles.cardContent}>
              <div className={styles.leftContent}>
                <div className={styles.imageContainer}>
                  <div className={`${styles.eventType} paragraph-xs`}>{event.type}</div>
                  <Image alt={event.title} className={styles.eventImage} fill src={event.image} />
                </div>
                <div className={styles.eventInfo}>
                  <h3 className={`${styles.eventTitle} heading-6`}>{event.title}</h3>
                  <p className={`${styles.eventDescription} paragraph-md`}>{event.description}</p>
                </div>
              </div>
              <div className={styles.rightContent}>
                <div className={styles.eventDetails}>
                  <div className={styles.detailItem}>
                    <IconRenderer className={styles.icon} iconName="MapPinIcon" />
                    <span className={`${styles.text} heading-7`}>{event.location}</span>
                  </div>
                  <div className={styles.detailItem}>
                    <IconRenderer className={styles.icon} iconName="CalendarIcon" />
                    <span className={`${styles.text} heading-7`}>{moment(event.date).format("dddd DD")}</span>
                  </div>
                </div>
                <div className={styles.actionButton}>
                  <Button
                    className="w-max group-hover:bg-primary-500 group-hover:text-white"
                    transparent
                    variant="primary"
                  >
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
