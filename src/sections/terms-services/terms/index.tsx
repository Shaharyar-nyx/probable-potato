"use client";

import React from "react";
import styles from "./TermsTextBlock.module.scss";

const TermsTextBlock: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {/* Page title */}
        <header className={styles.header}>
          <h1 className={styles.mainTitle}>Terms of Service</h1>
          <p className={styles.lead}>
            Please read these Terms of Service carefully before using the NyxLab
            website. By accessing or using this site, you agree to be bound by
            the terms outlined below.
          </p>
        </header>

        {/* Sections */}
        <div className={styles.section}>
          <h2>1. Introduction</h2>
          <p>
            Welcome to the website of NyxLab Limited (“we,” “our,” “us”). By
            accessing or using this website, you agree to comply with and be
            bound by these Terms of Service. These terms govern your use of the
            website and any information you may choose to provide to us.
          </p>
        </div>

        <div className={styles.section}>
          <h2>2. Purpose of the Website</h2>
          <p>
            This website is designed to provide information about NyxLab
            Limited’s cybersecurity consulting services. It is intended for
            prospective clients, partners, and other interested parties seeking
            to learn more about our offerings.
          </p>
        </div>

        <div className={styles.section}>
          <h2>3. Contact Information Submission</h2>
          <p>
            Visitors may voluntarily provide contact details (such as name,
            email address, phone number, and company information) through forms
            or other communication channels on this website.
          </p>
          <p>
            By submitting your contact details, you consent to being contacted
            by NyxLab Limited for the purpose of discussing potential projects,
            services, or collaborations.
          </p>
          <p>
            You agree that the information you provide is accurate, current, and
            complete.
          </p>
        </div>

        <div className={styles.section}>
          <h2>4. Use of Information</h2>
          <p>
            Any information you submit will be used solely for business
            communication and service-related purposes.
          </p>
          <p>
            NyxLab Limited will not sell, rent, or share your information with
            third parties except as required by law or with your explicit
            consent.
          </p>
          <p>
            For details on how we handle personal data, please refer to our
            Privacy Policy.
          </p>
        </div>

        <div className={styles.section}>
          <h2>5. No Guarantee of Engagement</h2>
          <p>
            Submitting your contact details or engaging in preliminary
            discussions does not create a binding agreement for services. Any
            formal engagement will require a separate written contract signed by
            both parties.
          </p>
        </div>

        <div className={styles.section}>
          <h2>6. Intellectual Property</h2>
          <p>
            All content on this website, including text, graphics, logos, and
            designs, is the property of NyxLab Limited and may not be copied,
            reproduced, or distributed without prior written consent.
          </p>
        </div>

        <div className={styles.section}>
          <h2>7. Limitation of Liability</h2>
          <p>The website is provided “as is” without warranties of any kind.</p>
          <p>
            NyxLab Limited shall not be liable for any damages arising from your
            use of the website or reliance on its content.
          </p>
          <p>
            Cybersecurity consulting services are subject to separate
            contractual terms and conditions.
          </p>
        </div>

        <div className={styles.section}>
          <h2>8. Governing Law</h2>
          <p>
            These Terms of Service shall be governed by and construed in
            accordance with the laws of Hong Kong, without regard to its
            conflict of law principles.
          </p>
        </div>

        <div className={styles.section}>
          <h2>9. Changes to Terms</h2>
          <p>
            NyxLab Limited reserves the right to update or modify these Terms of
            Service at any time. Updates will be posted on this page with a
            revised effective date.
          </p>
        </div>

        <div className={styles.section}>
          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Service, please
            contact us at:
          </p>
          <p className={styles.contactBlock}>
            <strong>Email:</strong> info@nyxlab.com
            <br />
            <strong>Jurisdiction:</strong> Hong Kong
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsTextBlock;