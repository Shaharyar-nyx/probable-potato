import { Button } from "@/components/UI";
import { TaglineProps } from "@/types";

export const Tagline: React.FC<TaglineProps> = ({ title, content, buttonText }) => {
  return (
    <section className="bg-primary-500 px-6 py-16 lg:px-16 lg:py-[120px] text-neutral-50">
      <div className="mx-auto flex max-w-screen-2xl flex-col lg:flex-row items-center gap-[24px]">
        <h2 className="heading-2 lg:w-[60%] font-bold">{title}</h2>

        <div className="lg:w-[30%]">
          <div className="paragraph-lg mb-4">{content}</div>
          <Button variant="neutral" href="/contact-us" className="w-fit">{buttonText}</Button>
        </div>
      </div>
    </section>
  );
};
