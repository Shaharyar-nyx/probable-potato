"use client";

import { Button } from "@/components/UI";
import { useIsMobile } from "@/hooks";

export const Tagline: React.FC<any> = ({ title, content, cta_text, cta_url }) => {
  const isMobile = useIsMobile();
  return (
    <section className="bg-primary-500 px-6 py-[60px] lg:px-16 lg:py-[120px] text-neutral-50">
      <div className="mx-auto flex max-w-screen-2xl flex-col lg:flex-row items-center gap-[24px]">
        <h2 className={`lg:w-[60%] font-bold ${isMobile ? 'heading-7' : 'heading-2'}`}>{title}</h2>

        <div className="lg:w-[30%]">
          <div className="paragraph-lg mb-4">{content}</div>
          <Button variant="neutral" href={cta_url} className="paragraph-md w-full lg:w-fit">{cta_text}</Button>
        </div>
      </div>
    </section>
  );
};
