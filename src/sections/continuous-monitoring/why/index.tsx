import "./styles.scss";
import clsx from "clsx";
import React from "react";

import { IconRenderer } from "@/components";
import data from "@/data/continuous-monitoring/why.json";

export const Why: React.FC = () => {
  return (
    <section className="why-parent-container">
      <div className="why-container">
        <div className="w-[60%]">
          <span className="tagline why-tagline">{data.tagline}</span>
          <h2 className="heading-1 why-title">{data.title}</h2>
          <p className="paragraph-md why-content">{data.text}</p>
        </div>
        <div className="relative h-[460px] w-[38%] p-10 xl:h-[388px]">
          {data.features.map((feature, index) => (
            <div
              key={index}
              className={clsx(
                "why-feature-container",
                {
                  "bg-primary-500": index === 0,
                  "bg-primary-50": index !== 0,
                },
                `why-feature-container-${["first", "second", "third"][index]}`,
              )}
            >
              <div className="why-feature-title-container">
                <div
                  className={clsx("rounded-[4px] p-1", {
                    "bg-primary-50": index === 0,
                    "bg-primary-500": index !== 0,
                  })}
                >
                  <IconRenderer
                    className={clsx("h-4 w-4", {
                      "text-primary-800": index === 0,
                      "text-neutral-50": index !== 0,
                    })}
                    iconName={feature.icon}
                  />
                </div>
                <h3
                  className={clsx("heading-8 why-feature-title", {
                    "text-neutral-50": index === 0,
                    "text-primary-800": index !== 0,
                  })}
                >
                  {feature.title}
                </h3>
              </div>
              <div className="why-feature-number-container">
                <h3
                  className={clsx("heading-3 font-bold", {
                    "text-neutral-50": index === 0,
                    "text-primary-800": index !== 0,
                  })}
                >
                  {feature.number}
                </h3>
                {feature.percentage !== undefined && (
                  <span
                    className={clsx("flex items-center gap-1", {
                      "text-green-600": feature.percentage >= 0,
                      "text-red-600": feature.percentage < 0,
                    })}
                  >
                    <span
                      className={clsx("inline-flex h-4 w-4 items-center justify-center rounded-full", {
                        "bg-green-100": feature.percentage >= 0,
                        "bg-red-100": feature.percentage < 0,
                      })}
                    >
                      <IconRenderer
                        className="h-[10px] w-[10px]"
                        iconName={feature.percentage >= 0 ? "ArrowUpIcon" : "ArrowDownIcon"}
                      />
                    </span>
                    {feature.percentage}%
                  </span>
                )}
              </div>
              <p
                className={clsx("paragraph-xs", {
                  "text-neutral-50": index === 0,
                  "text-primary-800": index !== 0,
                })}
              >
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
