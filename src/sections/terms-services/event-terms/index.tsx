"use client";

import React from "react";
import styles from "../terms/TermsTextBlock.module.scss";

const EventTermsBlock: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        {/* Page title */}
        <header className={styles.header}>
          <h1 className={styles.mainTitle}>Event Terms & Conditions</h1>
          <p className={styles.lead}>
            Please read these Terms & Conditions carefully before registering for
            or attending any Event organised by NyxLab Limited.
          </p>
        </header>

        {/* Sections */}
        <div className={styles.section}>
          <h2>1. Introduction</h2>
          <p>
            These Terms & Conditions (&quot;Terms&quot;) govern your participation in the
            Event (&quot;Event&quot;) organised by NyxLab Limited (&quot;Organizer&quot;). By
            registering for or attending the Event, you agree to be bound by
            these Terms.
          </p>
        </div>

        <div className={styles.section}>
          <h2>2. Registration & Access</h2>
          <ul>
            <li>Registration is required to attend the Event.</li>
            <li>
              The Organizer reserves the right to approve or decline
              registrations at its discretion.
            </li>
            <li>
              Access links are intended only for the registered participant and
              may not be shared.
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>3. Use of Content</h2>
          <ul>
            <li>
              All materials presented or distributed during the Event — including
              slides, recordings, documents, images, and demonstrations — are the
              intellectual property of the Organizer or its speakers.
            </li>
            <li>
              Participants may not copy, reproduce, distribute, or share the
              content without prior written consent.
            </li>
            <li>
              The content is provided for informational purposes only and does
              not constitute professional advice.
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>4. Recording & Privacy</h2>
          <ul>
            <li>
              The Organizer may record the Event (audio, video, chat discussion,
              and shared content).
            </li>
            <li>By joining the Event, you consent to being recorded.</li>
            <li>
              Recordings may be used for internal purposes, training, marketing,
              or redistribution unless otherwise stated.
            </li>
            <li>
              Personal information will be handled in accordance with the
              Organizer&apos;s privacy policy.
            </li>
          </ul>
        </div>

        <div className={styles.section}>
          <h2>5. Conduct Requirements</h2>
          <p>Participants agree not to:</p>
          <ul>
            <li>
              Disrupt the Event or interfere with the experience of others.
            </li>
            <li>
              Share harmful, defamatory, inappropriate, or illegal content.
            </li>
            <li>
              Attempt to gain unauthorized access to systems or materials.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default EventTermsBlock;
