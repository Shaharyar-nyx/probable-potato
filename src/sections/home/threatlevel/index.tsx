"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.scss";

interface CriticalAlert {
  date: string;
  title: string;
  description: string;
}

interface ThreatLevelProps {
  title: string;
  status_label: string;
  description: string;
  button_text?: string;
  button_url?: string;
  progress_value: number;
  criticalAlerts: CriticalAlert[];
  [key: string]: any;
}

export const ThreatLevel: React.FC<ThreatLevelProps> = ({
  title,
  status_label,
  description,
  button_text,
  button_url,
  progress_value,
  criticalAlerts,
}) => {
  const [alerts, setAlerts] = useState<CriticalAlert[]>([]);

  useEffect(() => {
    setAlerts(criticalAlerts || []);
  }, [criticalAlerts]);

  return (
    <motion.section
      className={styles.wrapper}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* LEFT SIDE */}
      <motion.div
        className={styles.left}
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className={styles.heading}>{title}</h2>
        <p className={styles.statusText}>
          Current Status: <span className={styles.status}>ELEVATED</span>
        </p>

        {/* Progress bar animation */}
        <div className={styles.progressBar}>
          <motion.div
            className={styles.progress}
            initial={{ width: 0 }}
            whileInView={{ width: `${progress_value}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          />
          <motion.span
            className={styles.statusLabel}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {status_label}
          </motion.span>
        </div>

        <motion.p
          className={styles.description}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {description}
        </motion.p>

        {button_url && (
          <motion.a
            href={button_url}
            className={styles.downloadBtn}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            ⬇ {button_text || "Download Report"}
          </motion.a>
        )}
      </motion.div>

      {/* RIGHT SIDE */}
      <motion.div
        className={styles.right}
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h3 className={styles.subHeading}>Recent Critical Alerts</h3>
        <ul>
          {alerts.map((alert, index) => (
            <motion.li
              key={index}
              className={styles.alertItem}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
            >
              <motion.div
                className={styles.alertBar}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              />
              <div>
                <p className={styles.date}>
                  {alert.date
                    ? new Intl.DateTimeFormat("en-US", {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                      }).format(new Date(alert.date))
                    : ""}
                </p>
                <h4>{alert.title}</h4>
                <p>{alert.description}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.section>
  );
};
