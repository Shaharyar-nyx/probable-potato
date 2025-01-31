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

export interface DemoFormType {
  website_url: string;
  email: string;
  title: string;
  name: string;
  message: string;
  request: string[];
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

export type SubscribeType = {
  email: string;
};
