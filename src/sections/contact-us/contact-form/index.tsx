"use client";

import { useState } from "react";

import styles from "./styles.module.scss";
import { Button, Input, Textarea } from "@/components";

interface FormData {
  email: string;
  fullName: string;
  message: string;
  requestType: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    requestType: "",
    message: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const requestTypes = [
    { value: "demo", label: "Request a demo" },
    { value: "sales", label: "Contact Sales" },
    { value: "recruitment", label: "Recruitment" },
    { value: "hacker", label: "Join Hacker Community" },
    { value: "partner", label: "Become a Partner" },
    { value: "others", label: "others" },
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
      requestType: value,
    }));
    setIsDropdownOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
  };

  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        <div className="w-[40%]">
          <h2 className={`${styles.title} heading-2 font-bold`}>Get In Touch</h2>
          <p className={styles.description}>
            <span className="font-semibold">Looking to speak with a member of our team?</span>
            <br />
            Fill out the form with your contact details and a short message and we&apos;ll be in touch.
          </p>
        </div>

        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <Input iconName="UserIcon" name="fullName" placeholder="Full Name" />
          <Input iconName="EnvelopeIcon" name="email" placeholder="Email" />

          <div className={styles.inputWrapper}>
            <button className={styles.select} type="button" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {formData.requestType
                ? requestTypes.find((type) => type.value === formData.requestType)?.label
                : "Request Type"}
            </button>
            <div className={styles.iconWrapper}>
              <svg className={styles.icon} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g id="bars-arrow-up">
                  <path
                    d="M3 4.5H17.25M3 9H12.75M3 13.5H8.25M13.5 12.75L17.25 9M17.25 9L21 12.75M17.25 9V21"
                    id="Vector"
                    stroke="#02255B"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </g>
              </svg>
            </div>
            <div className={styles.selectIconWrapper}>
              <svg className={styles.icon} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g id="bars-arrow-up">
                  <g id="chevron-down">
                    <path
                      d="M19.5 8.25L12 15.75L4.5 8.25"
                      id="Vector 335"
                      stroke="#32363D"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    />
                  </g>
                </g>
              </svg>
            </div>
            {isDropdownOpen && (
              <div className={styles.selectDropdown}>
                {requestTypes.map((type) => (
                  <div key={type.value} className={styles.selectOption} onClick={() => handleSelectOption(type.value)}>
                    {type.label}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Textarea iconName="ChatBubbleOvalLeftEllipsisIcon" name="message" placeholder="Your Message (Optional)..." rows={4} />

          <Button className="!px-20" size="large" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};
