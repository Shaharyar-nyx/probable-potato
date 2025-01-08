"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import styles from "./styles.module.scss";
import { Button, IconRenderer } from "@/components";
import { Input } from "@/legacy/Input";
import { Textarea } from "@/legacy/Textarea";

interface FormData {
  fullName: string;
  email: string;
  resume: File | null;
  message: string;
}

export const ApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    resume: null,
    message: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, resume: file }));
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.chatCard}>
          <div className={styles.chatHeader}>
            <div className={styles.iconWrapper}>
              <IconRenderer className={styles.icon} iconName="ChatBubbleOvalLeftEllipsisIcon" />
            </div>
            <h3 className="heading-7 font-bold">Chat to us</h3>
          </div>
          <p className={`paragraph-md ${styles.chatDescription}`}>
            Our team is here to help <br />
            <Link className={`paragraph-md ${styles.chatEmail}`} href="mailto:careers@cyberbay.tech">
              careers@cyberbay.tech
            </Link>
          </p>
        </div>

        <div className={styles.formContainer}>
          <h1 className={`heading-1 ${styles.formTitle}`}>
            Your next career move <br /> starts here.
          </h1>
          <p className={`paragraph-lg ${styles.formSubtitle}`}>Let&apos;s grow together.</p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
              <IconRenderer className={styles.inputIcon} iconName="UserIcon" />
              <Input
                className={`${styles.input} paragraph-sm`}
                id="fullname"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
              />
            </div>

            <div className={styles.inputWrapper}>
              <IconRenderer className={styles.inputIcon} iconName="EnvelopeIcon" />
              <Input
                className={`${styles.input} paragraph-sm`}
                id="email"
                placeholder="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>

            <div>
              <p className={`paragraph-lg ${styles.uploadLabel}`}>Let us know about your experience</p>
              <div className="relative">
                <label className={styles.uploadButton}>
                  <span>Upload your resume</span>
                  <IconRenderer className="h-6 w-6" iconName="ArrowUpTrayIcon" />
                  <input accept=".pdf" className="hidden" id="resume" type="file" onChange={handleFileChange} />
                </label>
              </div>
              <div className="flex flex-row items-end gap-1">
                <IconRenderer className="h-[15px] w-[15px] text-[#02255B80]" iconName="ExclamationCircleIcon" />
                <p className={`paragraph-xs ${styles.uploadHelperText}`}>Format: .pdf, Max file size: 10MB</p>
              </div>
            </div>

            <div className={styles.inputWrapper}>
              <IconRenderer className={styles.textareaIcon} iconName="ChatBubbleOvalLeftEllipsisIcon" />
              <Textarea
                className={`${styles.textarea} paragraph-sm`}
                id="message"
                placeholder="Tell us what's excited about the future of cybersecurity..."
                value={formData.message}
                onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
              />
            </div>

            <Button className={styles.submitButton} type="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};
