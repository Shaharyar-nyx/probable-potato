"use client";

import { useState } from "react";

import styles from "./styles.module.scss";
import { Button, IconRenderer } from "@/components";

interface FormData {
  company: string;
  email: string;
  jobTitle: string;
  fullName: string;
  message: string;
}

export const ContactSalesForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    company: "",
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
          <h1 className={`${styles.title} heading-1 font-bold`}>Let’s Talk and Find the Right Solution for You</h1>
          <div className="flex flex-col gap-10">
            {[
              {
                title: "Tailored Solutions",
                text: "Work with our experts to craft cybersecurity plans specific to your business needs.",
                icon: "SquaresPlusIcon",
              },
              {
                title: "Transparent Pricing",
                text: "Get clarity on costs and maximize ROI with flexible, scalable packages.",
                icon: "CurrencyDollarIcon",
              },
              {
                title: "Expert Guidance",
                text: "Rely on our dedicated team for ongoing support and security optimization.",
                icon: "UserCircleIcon",
              },
            ].map((feature, id) => (
              <div key={id} className="flex flex-row items-start gap-6">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-primary-500 p-1">
                    <IconRenderer className="h-[24px] w-[24px] text-neutral-50" iconName={feature.icon} />
                  </div>
                </div>
                <div>
                  <p className="paragraph-lg font-semibold text-primary-800">{feature.title}</p>
                  <p className="paragraph-sm text-primary-800">{feature.text}</p>
                </div>
              </div>
            ))}
          </div>
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
              name="company"
              placeholder="Company Website*"
              required
              type="text"
              value={formData.company}
              onChange={handleInputChange}
            />
            <div className={styles.iconWrapper}>
              <IconRenderer iconName="GlobeAltIcon" className="h-5 w-5 text-primary-800" />
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
