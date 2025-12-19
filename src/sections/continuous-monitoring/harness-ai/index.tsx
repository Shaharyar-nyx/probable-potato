"use client";

import React from "react";

import "./styles.scss";
import Modal from "@/components/UI/modal";
import { getStrapiAssetUrl } from "@/lib";
import Image from "next/image";
import { useIsMobile } from "@/hooks";

export const HarnessAi: React.FC<any> = ({ title, headline, content, cards, cta_text, cta_modal_multi }) => {
  const isMobile = useIsMobile();
  return (
    <section className="harness-ai-parent-container">
      <div className="harness-ai-container">
        <span className={`${isMobile ? 'paragraph-md' : 'tagline'} harness-ai-tagline`}>{headline}</span>
        <h2 className={`${isMobile ? 'heading-7' : 'heading-1'} harness-ai-title`}>{title}</h2>
        <p className="paragraph-md harness-ai-text">{content}</p>
        <div className="harness-ai-feature-container">
          {cards.map(({ title, icon }: any, index: number) => (
            <div key={index} className="harness-ai-feature-item">
              <Image
                alt={icon.data.attributes.name}
                height={45}
                width={45}
                src={getStrapiAssetUrl(icon.data.attributes.url)}
              />
              <p className="paragraph-md harness-ai-feature-text">{title}</p>
            </div>
          ))}
        </div>
        <Modal
          id={`harness-ai-${cta_text}`}
          buttonSize="large"
          buttonStyle="mx-auto lg:w-fit w-full"
          buttonTransparent
          cta={{ label: cta_text, icon: "ArrowUpRightIcon", isModal: cta_modal_multi }}
        />
      </div>
    </section>
  );
};
