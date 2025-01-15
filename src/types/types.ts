export type ContactUsFormType = {
  email: string;
  notes: string;
  first_name: string;
  last_name: string;
  request_type: string;
};

export type ApplyFormType = {
  email: string;
  message: string;
  name: string;
  resume: File | null;
}