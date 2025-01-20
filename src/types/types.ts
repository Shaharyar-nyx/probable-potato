export type ContactUsFormType = {
  email: string;
  message: string;
  first_name: string;
  last_name: string;
  request_type: string;
};

export type ApplyFormType = {
  email: string;
  message: string;
  first_name: string;
  last_name: string;
  resume: File | null;
}

export interface DemoFormType {
  company: string;
  email: string;
  job_title: string;
  first_name: string;
  last_name: string;
  message: string;
  services: string[];
}