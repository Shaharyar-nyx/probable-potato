"use client";

import styles from "./styles.module.scss";
import { Button, Input, Textarea } from "@/components";
import { ReportFormType } from "@/types";
import { useForm } from "react-hook-form";
import { useSubmitReport } from "@/hooks/useSubmitReportForm";

export const ReportForm: React.FC = () => {
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
          <h1 className={`${styles.title} heading-1 font-bold`}>Get Your Free Report</h1>
          <p className="paragraph-sm text-primary-800">
            Schedule a consultation with our team. We’ll verify ownership of your domain and send you a sample version
            of the CyberScan report.
          </p>
        </div>

        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="w-full">
              <Input
                className="bg-transparent outline-none"
                disabled={loading}
                iconName="UserIcon"
                placeholder="First Name *"
                {...register("first_name", { required: "First Name is required" })}
                error={errors.first_name?.message}
              />
            </div>
            <div className="w-full">
              <Input
                className="h-6 bg-transparent pl-2 outline-none"
                disabled={loading}
                placeholder="Last Name *"
                {...register("last_name", { required: "Last Name is required" })}
                error={errors.last_name?.message}
              />
            </div>
          </div>

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
            className="bg-transparent outline-none"
            disabled={loading}
            iconName="BuildingOffice2Icon"
            placeholder="Company website URL*"
            {...register("company", {
              required: "Company Website is required",
              pattern: {
                value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w .-]*)*\/?$/,
                message: "Please enter a valid URL",
              },
            })}
            error={errors.company?.message}
          />

          <Input
            className="bg-transparent outline-none"
            disabled={loading}
            iconName="BriefcaseIcon"
            placeholder="Job Title *"
            {...register("job_title", { required: "Job Title is required" })}
            error={errors.job_title?.message}
          />

          <Textarea
            disabled={loading}
            iconName="ChatBubbleOvalLeftEllipsisIcon"
            placeholder="Your Message (Optional)..."
            rows={4}
            {...register("message")}
          />

          <Button className="self-start px-20" disabled={loading} size="large" type="submit">
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
