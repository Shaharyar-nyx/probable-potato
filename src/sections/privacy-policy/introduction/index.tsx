import { IntroductionProps } from "@/types";

export const Introduction: React.FC<IntroductionProps> = ({ title, description }) => {
  return (
    <div className="mx-auto max-w-[1440px] px-16 pb-10 pt-[120px] text-primary-800">
      <h2 className="heading-2 mb-5">{title}</h2>
      <div className="flex flex-col gap-10" dangerouslySetInnerHTML={{ __html: description }} />
    </div>
  );
};
