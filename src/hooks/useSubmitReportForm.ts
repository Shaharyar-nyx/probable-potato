"use client";

import { useState } from "react";
import { ReportFormType } from "@/types";
import { NyxlabClient } from "@/lib/forms";
import { UseFormReset } from "react-hook-form";
import * as CompanyEmailValidator from "company-email-validator";
import { toast } from "react-toastify";

export async function submitReport(
  payload: ReportFormType,
  reset: UseFormReset<ReportFormType>,
  onDone: (error: Error | null, data: { message: string } | null) => void,
) {
  const isCompanyEmail = CompanyEmailValidator.isCompanyEmail(payload.email);

  const channel = "Free Report Form";

  const payloadData = {
    data: {
      body: {
        ...payload,
        isSaveApollo: isCompanyEmail,
        channel,
      },
      name: channel,
      key: channel?.toLowerCase()?.replace(/\s+/g, "_"),
    },
  };

  try {
    await NyxlabClient.createContact(JSON.stringify(payloadData));
    reset();
    onDone(null, { message: "Thank you for reaching out! We will get back to you shortly." });
     toast.success("Thank you! We will get back to you shortly.");
  } catch (error) {
    console.error("Failed to create contact:", error);
    onDone(error instanceof Error ? error : new Error("Failed to submit form"), null);
    toast.error("Failed to submit form");
  }
}

export function useSubmitReport(reset: UseFormReset<ReportFormType>) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<{ message: string } | null>(null);
  const [called, setCalled] = useState(false);

  function submit(payload: ReportFormType) {
    setLoading(true);

    submitReport(payload, reset, (err, data) => {
      setLoading(false);
      setCalled(true);
      setError(err);
      setData(data);
    });
  }
  return { loading, error, data, submit, called };
}
