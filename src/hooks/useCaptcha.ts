"use client";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useCallback } from "react";

export const CaptchaAction = {
  REQUEST_DEMO_FORM_SUBMIT: "request_demo_form_submit",
  CONTACT_US_FORM_SUBMIT: "contact_us_form_submit",
  CAREERS_FORM_SUBMIT: "careers_form_submit",
  CONTACT_SALES_FORM_SUBMIT: "contact_sales_form_submit",
  FREE_REPORT_FORM_SUBMIT: "free_report_form_submit",
};
export default function useCaptcha() {
  const { executeRecaptcha } = useGoogleReCaptcha();

  return useCallback(
    async (action: string) => {
      if (!executeRecaptcha) {
        return "";
      }
      return await executeRecaptcha(action).catch((e) => {
        return "";
      });
    },
    [executeRecaptcha]
  );
}
