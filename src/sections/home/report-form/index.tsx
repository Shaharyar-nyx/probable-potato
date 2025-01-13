"use client";

import { useState } from "react";

import styles from "./styles.module.scss";
import { Button, IconRenderer } from "@/components";

interface FormData {
  domain: string;
  email: string;
  jobTitle: string;
  fullName: string;
  message: string;
}

export const ReportForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    domain: "",
    fullName: "",
    jobTitle: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Form submitted with data:", formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        <div className="w-full lg:w-1/2">
          <h1 className={`${styles.title} heading-1 font-bold`}>Get Your Free Report</h1>
          <p className="paragraph-sm text-primary-800">
            Schedule a consultation with our team. We’ll verify ownership of your domain and send you a sample version
            of the CyberScan report.
          </p>
        </div>

        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              name="fullName"
              placeholder="Full Name *"
              required
              type="text"
              value={formData.fullName}
              onChange={handleInputChange}
            />
            <div className={styles.iconWrapper}>
              <IconRenderer iconName="UserIcon" className="h-5 w-5 text-primary-800" />
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              name="email"
              placeholder="Email *"
              required
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <div className={styles.iconWrapper}>
              <IconRenderer iconName="EnvelopeIcon" className="h-5 w-5 text-primary-800" />
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              name="domain"
              placeholder="Root Domain*"
              required
              type="text"
              value={formData.domain}
              onChange={handleInputChange}
            />
            <div className={styles.iconWrapper}>
              <IconRenderer iconName="BuildingOffice2Icon" className="h-5 w-5 text-primary-800" />
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              name="jobTitle"
              placeholder="Job Title *"
              required
              type="text"
              value={formData.jobTitle}
              onChange={handleInputChange}
            />
            <div className={styles.iconWrapper}>
              <IconRenderer iconName="BriefcaseIcon" className="h-5 w-5 text-primary-800" />
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <textarea
              className={styles.textarea}
              name="message"
              placeholder="Your Message (Optional)... "
              value={formData.message}
              onChange={handleInputChange}
            />
            <div className={styles.textareaIconWrapper}>
              <IconRenderer iconName="ChatBubbleOvalLeftEllipsisIcon" className="h-5 w-5 text-primary-800" />
            </div>
          </div>

          <Button className="!px-20" size="large" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};
