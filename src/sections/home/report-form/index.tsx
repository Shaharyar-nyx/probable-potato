"use client";

import styles from "./styles.module.scss";
import { Button, Input, Textarea } from "@/components";
import { ReportFormType } from "@/types";
import { useForm } from "react-hook-form";
import { useSubmitReport } from "@/hooks/useSubmitReportForm";
import { useIsMobile } from "@/hooks";
import { formatBtnId } from "@/lib";

export const ReportForm: React.FC<{ id: string }> = ({ id }) => {
  const isMobile = useIsMobile();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReportFormType>();

  const { submit, loading, error, called } = useSubmitReport(reset);
  const shouldShowSuccessMessage = called && !loading && !error;

  const onSubmit = async (data: ReportFormType) => {
    submit(data);
  };
  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        <div className="w-full lg:w-1/2">
          <h1 className={`${styles.title} ${isMobile ? "heading-7" : "heading-1"} font-bold`}>Get Your Free Report</h1>
          <p className="paragraph-md text-primary-800">
            Schedule a consultation with our team. We’ll verify ownership of your domain and send you a sample version
            of the CyberScan report.
          </p>
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
            placeholder="Company website URL*"
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
