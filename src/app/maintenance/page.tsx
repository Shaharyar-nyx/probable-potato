import styles from "./maintenance.module.scss";

export const metadata = {
  title: "Maintenance | We'll Be Back Soon",
  description: "Our website is temporarily down while we work on some improvements.",
};

export default function MaintenancePage() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoWrapper}>
          <img
            src="/images/nyxlab-logo.svg"
            alt="Nyxlab"
            className={styles.logo}
          />
        </div>

        <h1 className={styles.title}>Hold Tight — We're Making Things Better</h1>

        <p className={styles.description}>
          Our website is temporarily down while we work on some improvements
          behind the scenes.
        </p>

        <p className={styles.subtext}>
          We'll be back very soon—better and faster than before.
          <br />
          Thanks for bearing with us!
        </p>
      </div>
    </div>
  );
}
