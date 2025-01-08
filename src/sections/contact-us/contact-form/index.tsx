"use client";

import { useState } from "react";

import styles from "./styles.module.scss";
import { Button, Dropdown, Input, Textarea } from "@/components";

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
          <Dropdown
            iconName="BarsArrowUpIcon"
            label="Request Type"
            options={requestTypes.map((requestType) => requestType.label)}
          />
          <Textarea
            iconName="ChatBubbleOvalLeftEllipsisIcon"
            name="message"
            placeholder="Your Message (Optional)..."
            rows={4}
          />

          <Button className="!px-20" size="large" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};
