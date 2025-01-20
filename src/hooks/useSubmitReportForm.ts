"use client";

import { useState } from "react";
import useCaptcha, { CaptchaAction } from "./useCaptcha";
import { ReportFormType } from "@/types";
import { apolloIoClient } from "@/lib/forms";
import { UseFormReset } from "react-hook-form";

export async function submitReport(
  payload: ReportFormType,
  reset: UseFormReset<ReportFormType>,
  onDone: (error: Error | null, data: { message: string } | null) => void,
) {
  const payloadData = {
    ...payload,
    label_names: ["Free Report Form"],
    isSaveApollo: true,
  };

  try {
    await apolloIoClient.createContact(payloadData);
    reset();
    onDone(null, { message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Failed to create contact:", error);
    onDone(error instanceof Error ? error : new Error("Failed to submit form"), null);
  }
}

export function useSubmitReport(reset: UseFormReset<ReportFormType>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<{ message: string } | null>(null);
  const [called, setCalled] = useState(false);
  const executeRecaptcha = useCaptcha();

  function submit(payload: ReportFormType) {
    setLoading(true);

    executeRecaptcha(CaptchaAction.CONTACT_SALES_FORM_SUBMIT)
      .then(() => {
        console.log("Captcha verified");
        submitReport(payload, reset, (err, data) => {
          setLoading(false);
          setCalled(true);
          setError(err);
          setData(data);
        });
      })
      .catch((err) => {
        console.log("Captcha verification failed");
        setLoading(false);
        setCalled(true);
        setError(err instanceof Error ? err : new Error("Captcha verification failed"));
      });
  }
  return { loading, error, data, submit, called };
}
