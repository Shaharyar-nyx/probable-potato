"use client";

import React from "react";
import Image from "next/image";
import styles from "./styles.module.scss";

/**
 * Hard-coded data here — edit text/icons as needed.
 * Icons use local files in /public/icons/*.svg (or replace with your STRAPI_ASSETS URLs).
 */

const SECTORS = [
  { title: "Banking", icon: "/images/thumbnail_Post_9_7_01850f5d8b.png" },
  { title: "Insurance", icon: "/images/thumbnail_Post_9_7_01850f5d8b.png" },
  { title: "Utilities", icon: "/images/thumbnail_Post_9_7_01850f5d8b.png" },
  { title: "Transportation", icon: "/images/thumbnail_Post_9_7_01850f5d8b.png" },
  { title: "Airlines", icon: "/images/thumbnail_Post_9_7_01850f5d8b.png" },
  { title: "Enterprises", icon: "/images/thumbnail_Post_9_7_01850f5d8b.png" },
];

const InternetInfrastructureFlow: React.FC = () => {
  return (
    <section className={styles.infrastructureSection}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2 className={styles.title}>
            Internet Infrastructure <span className={styles.highlight}>Flow</span>
          </h2>
          <p className={styles.subtitle}>
            We combine brand intel, proprietary telemetry, and OSINT to detect malicious registrations and coordinate takedowns and blocks.
          </p>
        </div>

        {/* Two column grid */}
        <div className={styles.grid}>
          {/* LEFT: stacked boxes */}
          <div className={styles.left}>
            <div className={styles.gradientBox}>
              <h4 className={styles.boxHeading}>DATA SOURCES</h4>
              <ul className={styles.points}>
                <li>Top-Level Domains (TLDs) — Zone files, new registrations & look-alikes</li>
                <li>Digital Certificates — Certificate IDs & issuance patterns</li>
                <li>Internet Service Providers — IP address telemetry & routing metadata</li>
              </ul>
            </div>

            <div className={styles.gradientBox}>
              <h4 className={styles.boxHeading}>NYXLAB ANALYSIS</h4>
              <ul className={styles.points}>
                <li>Brand & proprietary information</li>
                <li>Monitoring, OSINT & Threat Intelligence (TI)</li>
                <li>Squatting detection with AI-assisted scoring</li>
              </ul>
            </div>

            <div className={styles.gradientBox}>
              <h4 className={styles.boxHeading}>DECISION & ACTIONS</h4>
              <div className={styles.decisionRow}>
                <div className={styles.decisionCard}>
                  <div className={styles.decisionLabel}>Decision</div>
                  <div className={styles.decisionValue}>Malicious?</div>
                </div>
                <div className={styles.decisionCard}>
                  <div className={styles.decisionLabel}>If Yes</div>
                  <div className={styles.decisionValue}>Block — Firewall, SaaS rules, proxy</div>
                </div>
                <div className={styles.decisionCard}>
                  <div className={styles.decisionLabel}>Additionally</div>
                  <div className={styles.decisionValue}>Take-down — Registry / registrar coordination</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: sectors grid + outcomes */}
          <div className={styles.right}>
            <div className={styles.rightTop}>
              <h4 className={styles.rightHeading}>Critical Infrastructure We Help Protect</h4>
              <div className={styles.iconGrid}>
                {SECTORS.map((s) => (
                  <div key={s.title} className={styles.iconCard}>
                    <div className={styles.iconWrap}>
                      <Image src={s.icon} alt={s.title} width={28} height={28} />
                    </div>
                    <div className={styles.iconTitle}>{s.title}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.outcomeBox}>
              <h4 className={styles.outcomeHeading}>OUTCOMES</h4>
              <ul className={styles.points}>
                <li>Faster disruption of phishing & fraud infrastructure</li>
                <li>Reduced brand abuse exposure & takedown cycle time</li>
                <li>Shared community awareness for citizens & corporates</li>
              </ul>
            </div>
          </div>
        </div>

        <p className={styles.footerNote}>Actors: Hackers & abuse sources → Nyxlab DNS team → Citizens/Corporates protected.</p>
      </div>
    </section>
  );
};

export default InternetInfrastructureFlow;
