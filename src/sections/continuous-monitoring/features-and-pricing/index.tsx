import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import React from "react";

import "./styles.scss";
import { IconRenderer, Tooltip } from "@/components";
import data from "@/data/continuous-monitoring/features-and-pricing.json";
import { formatToCurrency } from "@/lib";
import Modal from "@/components/UI/modal";
import { DemoForm } from "@/sections/home";

export const FeaturesAndPricing: React.FC = () => {
  return (
    <section className="features-and-pricing-parent-container">
      <div className="features-and-pricing-container">
        <h2 className="heading-1 features-and-pricing-title">{data.title}</h2>
        <p className="paragraph-md features-and-pricing-text">{data.text}</p>
        <div className="features-and-pricing-content">
          <div className="features-and-pricing-feature-container">
            {data.features.map((feature) => (
              <div key={feature.id}>
                <h3 className="heading-6 features-and-pricing-feature-title">{feature.title}</h3>
                <div className="features-and-pricing-sub-feature-container">
                  {feature.sub_features.map((subFeature) => (
                    <div key={subFeature.id} className="features-and-pricing-sub-feature-item">
                      <div className="features-and-pricing-sub-feature-icon-container">
                        <IconRenderer className="h-5 w-5 text-neutral-50" iconName="InformationCircleIcon" />
                      </div>
                      <div>
                        <h4 className="paragraph-lg features-and-pricing-sub-feature-title">{subFeature.title}</h4>
                        <p className="heading-9 features-and-pricing-sub-feature-text">{subFeature.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="features-and-pricing-card-container">
            <div>
              <div className="features-and-pricing-card-title-container">
                <div className="features-and-pricing-card-icon-container">
                  <IconRenderer className="features-and-pricing-card-icon" iconName={data.card.icon} />
                </div>
                <h3 className="heading-7 features-and-pricing-card-title">{data.card.title}</h3>
              </div>
              <div className="features-and-pricing-card-price-container">
                <span className="heading-1 features-and-pricing-card-price-number">
                  {formatToCurrency(data.card.price.number)}
                </span>
                <span className="paragraph-xs features-and-pricing-card-price-text"> /{data.card.price.type}</span>
              </div>
            </div>
            <p className="paragraph-md features-and-pricing-card-text">{data.card.text}</p>
            {data.card.cta.isModal && (
              <Modal cta={data.card.cta} buttonVariant="neutral">
                <DemoForm />
              </Modal>
            )}
          </div>
        </div>
        <div className="features-and-pricing-content">
          <table className="relative w-full">
            <thead>
              <tr>
                <th className="paragraph-xl inline-block text-left font-semibold text-primary-800">
                  <div className="rounded-tl-xl rounded-tr-xl border border-b-neutral-50 border-l-neutral-100 border-r-neutral-100 border-t-neutral-100 px-7 py-2">
                    {data.package_features.title}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.package_features.items.map((packageItem, index) => (
                <tr key={packageItem.id} className="flex">
                  <td className="w-[64%]">
                    <div
                      className={clsx(
                        "paragraph-sm flex w-full gap-2 border-b border-l border-b-neutral-100 border-l-neutral-100 px-7 py-4 text-left text-primary-800",
                        {
                          "border-t border-t-neutral-100": index === 0,
                          "rounded-bl-xl": index === data.package_features.items.length - 1,
                        },
                      )}
                    >
                      <span>{packageItem.title}</span>
                      {packageItem.tooltip !== undefined && (
                        <Tooltip content={packageItem.tooltip}>
                          <InformationCircleIcon className="h-5 w-5 text-primary-800" />
                        </Tooltip>
                      )}
                    </div>
                  </td>
                  <td className="w-[36%]">
                    <div
                      className={clsx(
                        "paragraph-sm flex w-full justify-center gap-2 border-b border-r border-b-neutral-100 border-r-neutral-100 px-7 py-4 text-left text-primary-800",
                        {
                          "rounded-tr-xl border-t border-t-neutral-100": index === 0,
                          "rounded-br-xl": index === data.package_features.items.length - 1,
                        },
                      )}
                    >
                      {packageItem.badge ? (
                        <CheckBadgeIcon className="h-5 w-5 text-primary-800" />
                      ) : (
                        <span>{packageItem.feature}</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
