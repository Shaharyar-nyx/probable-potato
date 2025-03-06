"use client";

import { useForm, Controller } from "react-hook-form";

import styles from "./styles.module.scss";
import { Button, Dropdown, IconRenderer, Input, Textarea } from "@/components";
import formData from "@/data/home/demo-form.json";
import { useIsMobile } from "@/hooks";
import { DemoFormType } from "@/types";
import { useSubmitRequestDemo } from "@/hooks/useSubmitRequestDemo";
import { formatBtnId } from "@/lib";

export const DemoForm: React.FC<{ id: string }> = ({ id }) => {
  const isMobile = useIsMobile();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<DemoFormType>();

  const { submit, loading, error, called } = useSubmitRequestDemo(reset);
  const shouldShowSuccessMessage = called && !loading && !error;

  const onSubmit = async (data: DemoFormType) => {
    submit(data);
  };

  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        <div className="w-full lg:w-1/2">
          <h1 className={`${styles.title} ${isMobile ? "heading-7" : "heading-1"} font-bold`}>Experience our security solution in real time</h1>
          <div className="flex flex-col gap-6 lg:gap-10">
            {[
              {
                title: "Proactive Defense",
                text: "Identify vulnerabilities before they become problems, saving time and costs.",
                icon: "ShieldCheckIcon",
              },
              {
                title: "Expert Support",
                text: "Access a global network of ethical hackers for on-demand, specialized protection.",
                icon: "UserCircleIcon",
              },
              {
                title: "Actionable Insights",
                text: "Optimize ROI and strengthen compliance through continuous, data-driven security strategies.",
                icon: "PresentationChartLineIcon",
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
            iconName="GlobeAltIcon"
            placeholder="Company Website *"
            {...register("website_url", {
              required: "Company Website is required",
              pattern: {
                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w .-]*)*\/?$/,
                message: "Please enter a valid URL",
              },
            })}
            error={errors.website_url?.message}
          />

          <Input
            disabled={loading}
            iconName="BriefcaseIcon"
            placeholder="Job Title *"
            {...register("title", { required: "Job Title is required" })}
            error={errors.title?.message}
          />

          <Controller
            control={control}
            name="request"
            render={({ field }) => (
              <Dropdown
                disabled={loading}
                error={errors.request?.message}
                handleChange={field.onChange}
                iconName="ListBulletIcon"
                id="request"
                label="Services you are interested (multiple choice)"
                multiple
                options={formData.demoFormData.serviceTypes.map((service) => service.label)}
                value={field.value}
              />
            )}
            rules={{ required: "Please select at least one service" }}
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
