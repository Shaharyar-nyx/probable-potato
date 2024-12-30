"use client";

import { useState } from "react";

import styles from "./styles.module.scss";

interface FormData {
  companyName: string;
  email: string;
  fullName: string;
  jobTitle: string;
  message: string;
  phone: string;
  requestType: string;
}

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    companyName: "",
    jobTitle: "",
    email: "",
    phone: "",
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
          <h2 className={`${styles.title} text-h2`}>Get In Touch</h2>
          <p className={styles.description}>
            <span className="font-primarySemiBold">Looking to speak with a member of our team?</span>
            <br />
            Fill out the form with your contact details and a short message and we&apos;ll be in touch.
          </p>
        </div>

        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.inputGrid}>
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
                name="companyName"
                placeholder="Company Name"
                required
                type="text"
                value={formData.companyName}
                onChange={handleInputChange}
              />
              <div className={styles.iconWrapper}>
                <svg className={styles.icon} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.25 19H20.75M2.75 1V19M13.25 1V19M19.25 5.5V19M5.75 4.75H6.5M5.75 7.75H6.5M5.75 10.75H6.5M9.5 4.75H10.25M9.5 7.75H10.25M9.5 10.75H10.25M5.75 19V15.625C5.75 15.0037 6.25368 14.5 6.875 14.5H9.125C9.74632 14.5 10.25 15.0037 10.25 15.625V19M2 1H14M13.25 5.5H20M16.25 9.25H16.2575V9.2575H16.25V9.25ZM16.25 12.25H16.2575V12.2575H16.25V12.25ZM16.25 15.25H16.2575V15.2575H16.25V15.25Z"
                    id="Vector"
                    stroke="#02255B"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className={styles.inputGrid}>
            <div className={styles.inputWrapper}>
              <input
                className={styles.input}
                name="jobTitle"
                placeholder="Job Title"
                required
                type="text"
                value={formData.jobTitle}
                onChange={handleInputChange}
              />
              <div className={styles.iconWrapper}>
                <svg className={styles.icon} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18.25 12.1499V16.4C18.25 17.4944 17.4631 18.4359 16.3782 18.58C14.2915 18.857 12.1624 19 10 19C7.83757 19 5.70854 18.857 3.62185 18.58C2.5369 18.4359 1.75 17.4944 1.75 16.4V12.1499M18.25 12.1499C18.7219 11.7476 19 11.1389 19 10.4889V6.70569C19 5.62475 18.2321 4.69082 17.1631 4.53086C16.0377 4.36247 14.8995 4.23315 13.75 4.14432M18.25 12.1499C18.0564 12.315 17.8302 12.4453 17.5771 12.5294C15.1953 13.3212 12.6477 13.75 10 13.75C7.35229 13.75 4.80469 13.3212 2.42289 12.5294C2.16984 12.4452 1.94361 12.3149 1.75 12.1499M1.75 12.1499C1.27808 11.7476 1 11.1389 1 10.4889V6.70569C1 5.62475 1.7679 4.69082 2.83694 4.53086C3.96233 4.36247 5.10049 4.23315 6.25 4.14432M13.75 4.14432V3.25C13.75 2.00736 12.7426 1 11.5 1H8.5C7.25736 1 6.25 2.00736 6.25 3.25V4.14432M13.75 4.14432C12.5126 4.0487 11.262 4 10 4C8.73804 4 7.48744 4.0487 6.25 4.14432M10 10.75H10.0075V10.7575H10V10.75Z"
                    id="Vector"
                    stroke="#02255B"
                    stroke-width="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
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
          </div>

          <div className={styles.inputGrid}>
            <div className={styles.inputWrapper}>
              <input
                className={styles.input}
                name="phone"
                placeholder="Phone (Optional)"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <div className={styles.iconWrapper}>
                <svg className={styles.icon} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.25 5.75C1.25 14.0343 7.96573 20.75 16.25 20.75H18.5C19.7426 20.75 20.75 19.7426 20.75 18.5V17.1284C20.75 16.6121 20.3987 16.1622 19.8979 16.037L15.4747 14.9312C15.0355 14.8214 14.5734 14.9855 14.3018 15.3476L13.3316 16.6412C13.05 17.0166 12.563 17.1827 12.1223 17.0212C8.81539 15.8098 6.19015 13.1846 4.97876 9.87766C4.81734 9.43699 4.98336 8.94998 5.3588 8.6684L6.65242 7.69818C7.01453 7.4266 7.17861 6.96445 7.06883 6.52533L5.96304 2.10215C5.83783 1.60133 5.38785 1.25 4.87163 1.25H3.5C2.25736 1.25 1.25 2.25736 1.25 3.5V5.75Z"
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
                    <div
                      key={type.value}
                      className={styles.selectOption}
                      onClick={() => handleSelectOption(type.value)}
                    >
                      {type.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
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

          <button className={styles.submitButton} type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
