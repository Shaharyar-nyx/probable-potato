"use client";

import { useState } from "react";

import styles from "./styles.module.scss";
import { Button } from "@/components";

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
          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              name="fullName"
              placeholder="Full Name"
              required
              type="text"
              value={formData.fullName}
              onChange={handleInputChange}
            />
            <div className={styles.iconWrapper}>
              <svg className={styles.icon} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g id="Vector">
                  <path
                    d="M12.75 5C12.75 7.07107 11.071 8.75 8.99996 8.75C6.9289 8.75 5.24996 7.07107 5.24996 5C5.24996 2.92893 6.9289 1.25 8.99996 1.25C11.071 1.25 12.75 2.92893 12.75 5Z"
                    stroke="#02255B"
                    stroke-width="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1.5011 19.1182C1.5714 15.0369 4.90184 11.75 8.99996 11.75C13.0982 11.75 16.4287 15.0371 16.4988 19.1185C14.216 20.166 11.6764 20.75 9.00028 20.75C6.32396 20.75 3.78406 20.1659 1.5011 19.1182Z"
                    stroke="#02255B"
                    stroke-width="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </div>
          </div>

          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              name="email"
              placeholder="Email"
              required
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <div className={styles.iconWrapper}>
              <svg className={styles.icon} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M20.75 3.75V14.25C20.75 15.4926 19.7426 16.5 18.5 16.5H3.5C2.25736 16.5 1.25 15.4926 1.25 14.25V3.75M20.75 3.75C20.75 2.50736 19.7426 1.5 18.5 1.5H3.5C2.25736 1.5 1.25 2.50736 1.25 3.75M20.75 3.75V3.99271C20.75 4.77405 20.3447 5.49945 19.6792 5.90894L12.1792 10.5243C11.4561 10.9694 10.5439 10.9694 9.82078 10.5243L2.32078 5.90894C1.65535 5.49945 1.25 4.77405 1.25 3.99271V3.75"
                  id="Vector"
                  stroke="#02255B"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>

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

          <div className={styles.inputWrapper}>
            <textarea
              className={styles.textarea}
              name="message"
              placeholder="Your Message (Optional)..."
              value={formData.message}
              onChange={handleInputChange}
            />
            <div className={styles.textareaIconWrapper}>
              <svg className={styles.icon} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.625 9C6.625 9.20711 6.45711 9.375 6.25 9.375C6.04289 9.375 5.875 9.20711 5.875 9C5.875 8.79289 6.04289 8.625 6.25 8.625C6.45711 8.625 6.625 8.79289 6.625 9ZM6.625 9H6.25M10.375 9C10.375 9.20711 10.2071 9.375 10 9.375C9.79289 9.375 9.625 9.20711 9.625 9C9.625 8.79289 9.79289 8.625 10 8.625C10.2071 8.625 10.375 8.79289 10.375 9ZM10.375 9H10M14.125 9C14.125 9.20711 13.9571 9.375 13.75 9.375C13.5429 9.375 13.375 9.20711 13.375 9C13.375 8.79289 13.5429 8.625 13.75 8.625C13.9571 8.625 14.125 8.79289 14.125 9ZM14.125 9H13.75M19 9C19 13.5563 14.9706 17.25 10 17.25C9.11253 17.25 8.25506 17.1323 7.44517 16.9129C6.47016 17.5979 5.28201 18 4 18C3.80078 18 3.60376 17.9903 3.40967 17.9713C3.25 17.9558 3.0918 17.9339 2.93579 17.906C3.41932 17.3353 3.76277 16.6427 3.91389 15.8808C4.00454 15.4238 3.7807 14.9799 3.44684 14.6549C1.9297 13.1782 1 11.1886 1 9C1 4.44365 5.02944 0.75 10 0.75C14.9706 0.75 19 4.44365 19 9Z"
                  id="Vector"
                  stroke="#02255B"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
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
