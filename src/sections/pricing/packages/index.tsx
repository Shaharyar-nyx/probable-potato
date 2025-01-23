"use client";

import { Roboto } from "next/font/google";
import React, { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

import styles from "./styles.module.scss";
import { Button } from "@/components";
import Modal from "@/components/UI/modal";
import { ContactSalesForm } from "@/sections";
import { STRAPI_ASSETS } from "@/lib";
import Image from "next/image";

const roboto = Roboto({
  weight: ["700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

const PackageCard = ({ data: { title, content, cta_text, cta_url, duration, icon, price } }: any) => {
  const cta = {
    label: cta_text,
    isModal: true,
    icon: "ArrowUpRightIcon",
    link: cta_url,
  };

  return (
    <div className={styles.package}>
      <div>
        <div className={styles.packageHeaderWrapper}>
          <div className={styles.packageIcon}>
            <Image
              alt={icon.data.attributes.name}
              height={24}
              src={`${STRAPI_ASSETS}${icon.data.attributes.url}`}
              width={24}
            />
          </div>
          <h3 className={`${styles.packageName} ${roboto.className} heading-6`}>{title}</h3>
        </div>
        <div className={styles.packageContentWrapper}>
          <div className={styles.priceContainer}>
            {duration ? (
              <h1 className={`${styles.price} heading-1 font-bold`}>
                {price}
                <span className={`${styles.perYear} paragraph-xs font-normal`}>{duration}</span>
              </h1>
            ) : (
              <h3 className={`${styles.price} heading-3 font-bold`}>{price}</h3>
            )}
          </div>
          <p className={styles.packageDescription}>{content}</p>
        </div>
      </div>

      <div className={styles.packageFooter}>
        {cta_text && (
          <>
            {cta?.isModal ? (
              <Modal
                cta={cta}
                buttonStyle="w-full text-center !font-normal text-primary-800"
                buttonSize="small"
                buttonVariant="neutral"
              >
                <ContactSalesForm />
              </Modal>
            ) : (
              <Button
                className="w-full text-center !font-normal text-primary-800"
                href={cta?.link}
                iconName={cta?.icon}
                size="small"
                variant="neutral"
              >
                {cta?.label}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const CheckIcon = () => (
  <svg
    className={styles.icon}
    fill="none"
    height="20"
    viewBox="0 0 19 20"
    width="19"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="Feature Value Icon">
      <path
        clipRule="evenodd"
        d="M10.9691 2.12895C10.1206 1.41275 8.87932 1.41275 8.03079 2.12895L7.25802 2.7812C6.89737 3.0856 6.45107 3.27048 5.9808 3.31025L4.97316 3.39546C3.86673 3.48903 2.989 4.36676 2.89543 5.47319L2.81022 6.48083C2.77045 6.9511 2.58557 7.3974 2.28117 7.75806L1.62891 8.53082C0.912716 9.37935 0.912718 10.6206 1.62891 11.4692L2.28117 12.2419C2.58557 12.6026 2.77045 13.0489 2.81022 13.5192L2.89543 14.5269C2.989 15.6333 3.86673 16.511 4.97316 16.6045L5.9808 16.6897C6.45107 16.7296 6.89737 16.9144 7.25803 17.2188L8.03079 17.8711C8.87932 18.5872 10.1206 18.5872 10.9691 17.8711L11.7419 17.2188C12.1026 16.9144 12.5489 16.7296 13.0191 16.6897L14.0268 16.6045C15.1333 16.511 16.011 15.6333 16.1045 14.5269L16.1897 13.5192C16.2295 13.0489 16.4144 12.6026 16.7188 12.2419L17.3711 11.4692C18.0872 10.6206 18.0872 9.37935 17.3711 8.53082L16.7188 7.75805C16.4144 7.3974 16.2295 6.9511 16.1897 6.48083L16.1045 5.47319C16.011 4.36676 15.1333 3.48903 14.0268 3.39546L13.0191 3.31025C12.5489 3.27048 12.1026 3.0856 11.7419 2.7812L10.9691 2.12895ZM13.6419 8.44706C14.0422 8.04677 14.0422 7.39778 13.6419 6.99749C13.2417 6.59719 12.5926 6.59719 12.1923 6.99749L8.36157 10.8283L6.80858 9.27527C6.4083 8.87497 5.7593 8.87497 5.35901 9.27527C4.95872 9.67555 4.95872 10.3245 5.35901 10.7248L7.63679 13.0026C8.03708 13.4029 8.68607 13.4029 9.08636 13.0026L13.6419 8.44706Z"
        fill="currentColor"
        fillRule="evenodd"
        id="Vector"
      />
    </g>
  </svg>
);

const XIcon = () => (
  <svg
    className={styles.icon}
    fill="none"
    height="13"
    viewBox="0 0 13 13"
    width="13"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.80957 13L6.30157 9.216L4.07957 13H0.77957L4.76157 6.884L0.73557 0.812H4.21157L6.69757 4.574L8.94157 0.812H12.2416L8.23757 6.884L12.2856 13H8.80957Z"
      fill="currentColor"
    />
  </svg>
);

const FeatureRow = ({
  feature,
  hoveredColumn,
  onColumnHover,
  packages,
}: {
  feature: any;
  hoveredColumn: number | null;
  onColumnHover: (index: number | null) => void;
  packages: any;
}) => {
  const renderValue = (value: boolean | string | undefined) => {
    if (typeof value === "undefined") return null;
    if (typeof value === "string") return value;
    return value ? (
      <div className={styles.iconContainer}>
        <CheckIcon />
      </div>
    ) : (
      <div className={styles.iconContainer}>
        <XIcon />
      </div>
    );
  };

  const getColumnClass = (columnIndex: number) => {
    return `${styles.tableCell} ${hoveredColumn === columnIndex ? styles.hovered : ""}`;
  };

  return (
    <tr className={styles.tableRow}>
      <td className={styles.tableCell}>
        {feature.name}
        {feature.tooltip && (
          <>
            <span
              className={styles.tooltipContainer}
              data-tooltip-content={feature.tooltip}
              data-tooltip-id={`tooltip-${feature.name}`}
            >
              <svg fill="none" height="22" viewBox="0 0 22 22" width="22" xmlns="http://www.w3.org/2000/svg">
                <g id="information-circle">
                  <path
                    d="M9.95486 10.3438L9.99117 10.3256C10.4926 10.0749 11.0573 10.5278 10.9213 11.0717L10.3009 13.5533C10.1649 14.0972 10.7296 14.5501 11.2311 14.2994L11.2674 14.2812M18.4861 11C18.4861 15.3492 14.9604 18.875 10.6111 18.875C6.26187 18.875 2.73611 15.3492 2.73611 11C2.73611 6.65076 6.26187 3.125 10.6111 3.125C14.9604 3.125 18.4861 6.65076 18.4861 11ZM10.6111 7.71875H10.6177V7.72531H10.6111V7.71875Z"
                    id="Vector"
                    stroke="#02255B"
                    strokeLinecap="round"
                    strokeWidth="1.3125"
                  />
                </g>
              </svg>
            </span>
            <Tooltip
              id={`tooltip-${feature.name}`}
              place="top"
              style={{
                backgroundColor: "#fff",
                color: "#02255B",
                padding: "12px 16px",
                borderRadius: "8px",
                fontSize: "14px",
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
                maxWidth: "280px",
                zIndex: 1000,
              }}
            />
          </>
        )}
      </td>
      {packages.map((pkg: any, index: number) => (
        <td
          key={pkg.type}
          className={getColumnClass(index)}
          onMouseEnter={() => onColumnHover(index)}
          onMouseLeave={() => onColumnHover(null)}
        >
          {renderValue(feature[pkg.title.toLowerCase().replace(/\s+/g, "") as keyof typeof feature])}
        </td>
      ))}
    </tr>
  );
};

export const Packages: React.FC<any> = ({ pricing_cards, features, table, content, title, backgroundImage }) => {
  const [hoveredColumn, setHoveredColumn] = useState<number | null>(null);
  const [gridCols, setGridCols] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      setGridCols(window.innerWidth <= 768 ? 1 : Object.keys(pricing_cards || {}).length + 1);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.background} style={{ backgroundImage: `url(${backgroundImage})` }} />
      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className="heading-1 mb-3 font-bold text-primary-800">{title}</h1>
          <p className={styles.subtitle}>{content}</p>
        </div>

        <div
          className={styles.packagesGrid}
          style={{
            gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
          }}
        >
          {features ? (
            <div>
              {features.data.map(({ attributes: { title, items } }: any, index: number) => (
                <div key={index} className="mb-16">
                  <h3 className="heading-6 mb-5 font-bold text-primary-800">{title}</h3>
                  {items.data.map(({ attributes: { title, description, icon } }: any, index: number) => (
                    <div key={index} className="flex flex-row items-start gap-6 mb-5">
                      <div className="flex items-center gap-4 rounded-[4px] bg-primary-500 p-2">
                        <Image
                          alt={icon.data.attributes.name}
                          height={24}
                          width={24}
                          src={`${STRAPI_ASSETS}${icon.data.attributes.url}`}
                        />
                      </div>
                      <div>
                        <p className="paragraph-lg font-bold">{title}</p>
                        <p className="paragraph-sm">{description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <div />
          )}
          {pricing_cards.map((pkg: any) => (
            <PackageCard key={pkg.name} data={pkg} />
          ))}
        </div>

        <div className="paragraph-xl relative top-[1px] inline-block text-left font-semibold text-primary-800">
          <div className="rounded-tl-xl rounded-tr-xl border border-b-[#fff] border-l-neutral-100 border-r-neutral-100 border-t-neutral-100 bg-white px-7 py-2">
            Package features
          </div>
        </div>
        <div className={styles.featuresTable}>
          <table className={styles.table}>
            <tbody>
              {(() => {
                const features = table.data.attributes.columns.data[0].attributes.rows.data.map((row: any) => ({
                  name: row.attributes.value,
                  tooltip: row.attributes.tooltip,
                  has_tooltip: row.attributes.has_tooltip,
                }));

                const packageValues = table.data.attributes.columns.data.slice(1).map((column: any) =>
                  column.attributes.rows.data.map((row: any) => ({
                    value: row.attributes.value,
                    hasCheckmark: row.attributes.image?.data !== null,
                  })),
                );

                return features.map((feature: any, rowIndex: number) => {
                  const featurePackages = packageValues.reduce((acc: any, columnValues: any, colIndex: number) => {
                    const value = columnValues[rowIndex].hasCheckmark ? true : columnValues[rowIndex].value;
                    const packageName = pricing_cards[colIndex].title.toLowerCase().replace(/\s+/g, "");
                    return { ...acc, [packageName]: value };
                  }, {});

                  return (
                    <FeatureRow
                      key={feature.name}
                      feature={{
                        name: feature.name,
                        tooltip: feature.tooltip,
                        ...featurePackages,
                      }}
                      packages={pricing_cards}
                      hoveredColumn={hoveredColumn}
                      onColumnHover={setHoveredColumn}
                    />
                  );
                });
              })()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
