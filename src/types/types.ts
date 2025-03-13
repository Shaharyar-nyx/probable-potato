export type ContactUsFormType = {
  email: string;
  message: string;
  name: string;
  request: string;
};

export type ApplyFormType = {
  email: string;
  message: string;
  name: string;
  file: File | null;
};

export type DemoFormType = {
  email: string;
  message?: string;
  name: string;
  title: string;
  website_url: string;
  request: string[];
  recaptchaToken?: string | null;
};

export type ContactSalesFormType = {
  email: string;
  message?: string;
  name: string;
  organization_name: string;
  title: string;
  recaptchaToken?: string | null;
};

export type ReportFormType = {
  email: string;
  message: string;
  name: string;
  website_url: string;
  title: string;
};

export type SubscribeType = {
  email: string;
};
