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
  requestType: string[];
}

export const DemoForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    company: "",
    fullName: "",
    jobTitle: "",
    email: "",
    requestType: [],
    message: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const requestTypes = [
    { value: "bug-bounty", label: "Bug Bounty" },
    { value: "continuous-monitoring", label: "Continuous Monitoring" },
    { value: "cybersecurity-advisory", label: "Cybersecurity Advisory" },
    { value: "other", label: "Other" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectOption = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      requestType: prev.requestType.includes(value)
        ? prev.requestType.filter((type) => type !== value)
        : [...prev.requestType, value],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.requestType.length === 0) {
      return;
    }

    console.log("Form submitted with data:", formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        <div className="w-full lg:w-1/2">
          <h1 className={`${styles.title} heading-1 font-bold`}>Experience our security solution in real time</h1>
          <div className="flex flex-col gap-10">
            {[
              {
                title: "Proactive Defense",
                text: "Identify vulnerabilities before they become problems, saving time and costs.",
                icon: "ShieldCheckIcon",
              },
              {
                title: "Expert Support",
                text: "Access a global network of ethical hackers for on-demand, specialized protection.",
                icon: "UserCircleIcon",
              },
              {
                title: "Actionable Insights",
                text: "Optimize ROI and strengthen compliance through continuous, data-driven security strategies.",
                icon: "PresentationChartLineIcon",
              },
            ].map((feature, id) => (
              <div key={id} className="flex flex-row gap-6 items-start">
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
            <button
              className={`${styles.select} ${formData.requestType.length === 0 && "text-neutral-400"}`}
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {formData.requestType.length > 0
                ? formData.requestType.map((type) => requestTypes.find((t) => t.value === type)?.label).join(", ")
                : "Services you are interested (multiple choice)"}
            </button>
            <div className={styles.iconWrapper}>
              <IconRenderer iconName="ListBulletIcon" className="h-5 w-5 text-primary-800" />
            </div>
            <div className={styles.selectIconWrapper}>
              <IconRenderer iconName="ChevronDownIcon" className="h-5 w-5 text-primary-800" />
            </div>
            {isDropdownOpen && (
              <div className={styles.selectDropdown}>
                {requestTypes.map((type) => (
                  <div
                    key={type.value}
                    className={`${styles.selectOption} flex items-center gap-2 ${
                      formData.requestType.includes(type.value) ? "text-primary-800" : ""
                    }`}
                    onClick={() => handleSelectOption(type.value)}
                  >
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded border border-primary-800 ${
                        formData.requestType.includes(type.value) ? "bg-primary-500 text-white" : "bg-white"
                      }`}
                    >
                      {formData.requestType.includes(type.value) && (
                        <IconRenderer iconName="CheckIcon" className="h-4 w-4" />
                      )}
                    </div>
                    {type.label}
                  </div>
                ))}
              </div>
            )}
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
