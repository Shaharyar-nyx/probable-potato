"use client";

import React from "react";
import styles from "./styles.module.scss"; // you can rename the file if needed

const PrivacyPolicyBlock: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {/* Page title */}
        <header className={styles.header}>
          <h1 className={styles.mainTitle}>Privacy Policy</h1>
          <p className={styles.lead}>
            Nyxlab Limited (“we,” “our,” “us”) respects your privacy and is committed to protecting the personal information you share with us. Please read this Privacy Policy carefully.
          </p>
        </header>

        {/* Sections */}
        <div className={styles.section}>
          <h2>1. Introduction</h2>
          <p>
            This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website and provide your contact details.
          </p>
        </div>

        <div className={styles.section}>
          <h2>2. Information We Collect</h2>
          <p><strong>Personal Information:</strong> Name, email address, phone number, company name, and other details you voluntarily provide.</p>
          <p><strong>Technical Information:</strong> IP address, browser type, operating system, and usage data collected through cookies or analytics tools.</p>
        </div>

        <div className={styles.section}>
          <h2>3. How We Use Your Information</h2>
          <ul>
            <li>To respond to inquiries and discuss potential projects.</li>
            <li>To provide information about our cybersecurity consulting services.</li>
            <li>To improve our website and user experience.</li>
            <li>To comply with legal obligations under Hong Kong law.</li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>4. Sharing of Information</h2>
          <p>We do not sell, rent, or trade your personal information.</p>
          <p>We may share information with trusted service providers who assist us in operating our website or communicating with you.</p>
          <p>We may disclose information if required by law, regulation, or legal process in Hong Kong.</p>
        </div>

        <div className={styles.section}>
          <h2>5. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet is completely secure.
          </p>
        </div>

        <div className={styles.section}>
          <h2>6. Data Retention</h2>
          <p>
            We retain your personal information only as long as necessary to fulfill the purposes outlined in this Privacy Policy or as required by law.
          </p>
        </div>

        <div className={styles.section}>
          <h2>7. Your Rights</h2>
          <p>
            Under applicable Hong Kong privacy laws, you have the right to:
          </p>
          <ul>
            <li>Access the personal information we hold about you.</li>
            <li>Request correction of inaccurate or incomplete information.</li>
            <li>Request deletion of your personal information, subject to legal obligations.</li>
            <li>Withdraw consent for processing where applicable.</li>
          </ul>
          <p>To exercise these rights, please contact us at info@Nyxlab.com.</p>
        </div>

        <div className={styles.section}>
          <h2>8. Cookies and Tracking</h2>
          <p>
            Our website may use cookies and similar technologies to enhance your browsing experience. You can adjust your browser settings to refuse cookies, but this may affect website functionality.
          </p>
        </div>

        <div className={styles.section}>
          <h2>9. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites.
          </p>
        </div>

        <div className={styles.section}>
          <h2>10. Changes to This Policy</h2>
          <p>
            Nyxlab Limited reserves the right to update or modify this Privacy Policy at any time. Updates will be posted on this page with a revised effective date.
          </p>
        </div>

        <div className={styles.section}>
          <h2>11. Contact Us</h2>
          <p className={styles.contactBlock}>
            <strong>Email:</strong> info@Nyxlab.com
            <br />
            <strong>Jurisdiction:</strong> Hong Kong
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicyBlock;
