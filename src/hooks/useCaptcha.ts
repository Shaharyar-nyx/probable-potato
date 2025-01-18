"use client";

import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useCallback } from "react";

export const CaptchaAction = {
  EVENT_SPONSOR_BUGPATROL_FORM_SUBMIT: "event_sponsor_bugpatrol_submit",
  REQUEST_DEMO_FORM_SUBMIT: "request_demo_form_submit",
  CONTACT_US_FORM_SUBMIT: "contact_us_form_submit",
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
