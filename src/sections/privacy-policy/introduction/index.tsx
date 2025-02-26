"use client";

import { useIsMobile } from "@/hooks";

export const Introduction: React.FC<any> = ({ title, content }) => {
  const isMobile = useIsMobile();
  return (
    <div className="mx-auto max-w-screen-2xl px-6 py-[60px] text-primary-800 lg:px-16 lg:pb-10 lg:pt-[120px]">
      <h2 className={`mb-5 font-bold ${isMobile ? 'paragraph-lg' : 'heading-2'}`}>{title}</h2>
      <div className="paragraph-md flex flex-col gap-10" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};
