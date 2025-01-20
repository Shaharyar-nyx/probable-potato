export type ContactUsFormType = {
  email: string;
  message: string;
  name: string;
  channel: string;
};

export type ApplyFormType = {
  email: string;
  message: string;
  name: string;
  resume: File | null;
};

export interface DemoFormType {
  website_url: string;
  email: string;
  title: string;
  name: string;
  message: string;
  channel: string[];
}

export type ContactSalesFormType = {
  email: string;
  message: string;
  name: string;
  organization_name: string;
  title: string;
};

export type ReportFormType = {
  email: string;
  message: string;
  name: string;
  website_url: string;
  title: string;
};
