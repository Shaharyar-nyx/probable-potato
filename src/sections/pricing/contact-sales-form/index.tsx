"use client";

import { useForm } from "react-hook-form";

import styles from "./styles.module.scss";
import { Button, IconRenderer, Input, Textarea } from "@/components";
import { ContactSalesFormType } from "@/types";
import { useSubmitContactSales } from "@/hooks/useSubmitContactSales";
import { useIsMobile } from "@/hooks";
import { formatBtnId } from "@/lib";

export const ContactSalesForm: React.FC<{ id: string }> = ({ id }) => {
  const isMobile = useIsMobile();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactSalesFormType>();

  const { submit, loading, error, called } = useSubmitContactSales(reset);
  const shouldShowSuccessMessage = called && !loading && !error;

  const onSubmit = async (data: ContactSalesFormType) => {
    submit(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        <div className="w-full lg:w-1/2">
          <h1 className={`${styles.title} ${isMobile ? "heading-7" : "heading-1"} font-bold`}>Let’s Talk and Find the Right Solution for You</h1>
          <div className="flex flex-col gap-6 lg:gap-10">
            {[
              {
                title: "Tailored Solutions",
                text: "Work with our experts to craft cybersecurity plans specific to your business needs.",
                icon: "SquaresPlusIcon",
              },
              {
                title: "Transparent Pricing",
                text: "Get clarity on costs and maximize ROI with flexible, scalable packages.",
                icon: "CurrencyDollarIcon",
              },
              {
                title: "Expert Guidance",
                text: "Rely on our dedicated team for ongoing support and security optimization.",
                icon: "UserCircleIcon",
              },
            ].map((feature, id) => (
              <div key={id} className="flex flex-row items-start gap-3 lg:gap-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-primary-500 p-1">
                    <IconRenderer className="h-[24px] w-[24px] text-neutral-50" iconName={feature.icon} />
                  </div>
                </div>
                <div>
                  <p className="paragraph-lg font-semibold text-primary-800">{feature.title}</p>
                  <p className="paragraph-sm text-primary-800">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <form id={formatBtnId(`${id}-form`)} className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <Input
            disabled={loading}
            iconName="UserIcon"
            placeholder="Full Name *"
            {...register("name", { required: "Full Name is required" })}
            error={errors.name?.message}
          />

          <Input
            disabled={loading}
            iconName="EnvelopeIcon"
            placeholder="Email *"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Please enter a valid email address",
              },
            })}
            error={errors.email?.message}
          />

          <Input
            disabled={loading}
            iconName="BuildingOffice2Icon"
            placeholder="Company Name *"
            {...register("organization_name", {
              required: "Company is required",
            })}
            error={errors.organization_name?.message}
          />

          <Input
            disabled={loading}
            iconName="BriefcaseIcon"
            placeholder="Job Title *"
            {...register("title", { required: "Job Title is required" })}
            error={errors.title?.message}
          />

          <Textarea
            disabled={loading}
            iconName="ChatBubbleOvalLeftEllipsisIcon"
            placeholder="Your Message (Optional)..."
            rows={4}
            {...register("message")}
          />

          <Button id={formatBtnId(`${id}-submit`)} className="self-start px-20 !mt-6 paragraph-sm w-full lg:w-fit lg:paragraph-md" disabled={loading} loading={loading} size="large" type="submit">
            Submit
          </Button>


          {shouldShowSuccessMessage && (
            <p aria-live="polite" className="paragraph-sm text-green-500">
              Thank you for reaching out! We will get back to you shortly.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
