export type ContactUsFormType = {
  email: string;
  message: string;
  name: string;
  requestType: string;
};

export type ApplyFormType = {
  email: string;
  message: string;
  name: string;
  resume: File | null;
}