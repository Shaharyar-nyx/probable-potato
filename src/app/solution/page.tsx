import React from "react";
import styles from "./ServiceOfferings.module.scss";

const ServiceOfferings = () => {
  return (
    <main className={styles.pageFrame}>
      <div className={styles.content}>
        {/* Header */}
        

        {/* Intro */}
        <section>
          <h2 className={styles.sectionTitle}>Solutions</h2>
          <div className={styles.accentBar}></div>
          <p className={styles.intro}>
            NyxLab delivers comprehensive security solutions across offense, defense, response, and intelligence domains. Our integrated approach combines proactive threat simulation with 24/7 monitoring, rapid incident response capabilities, and cutting-edge research to protect enterprises from evolving cyber threats.

          </p>
        </section>

        {/* Journey row (Assess → Respond → Defend → Evolve) */}
        <section className={styles.journey}>
          

          <div className={styles.journeyTrack}>
            <div className={styles.journeyLine}></div>
            <div className={styles.journeySteps}>
              <div className={styles.step}>
                <div className={styles.stepCircle}>1</div>
                <div className={styles.stepTitle}>Assess</div>
                <p className={styles.stepCaption}>
                  Red Team Operations identify vulnerabilities

                </p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepCircle}>2</div>
                <div className={styles.stepTitle}>Respond</div>
                <p className={styles.stepCaption}>
                  Rapid Incident Response and Forensic

                </p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepCircle}>3</div>
                <div className={styles.stepTitle}>Defend</div>
                <p className={styles.stepCaption}>
Continuous Monitoring and Threat Hunting
                </p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepCircle}>4</div>
                <div className={styles.stepTitle}>Evolve</div>
                <p className={styles.stepCaption}>
Research Driven Security Improvement
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Columns: same structure as PPT, Nyxlab Offense / Defense / Response / DNS / Build / Intelligence / Research */}
       <section className={styles.columns}>
  <div className={`${styles.column} ${styles.columnOne}`}>
    <h3 className={styles.columnTitle}>Nyxlab <span>Offense</span></h3>
    <ul className={styles.columnList}>
      <li className={styles.columnListItem}>Red Team / Cyber Attack Simulation</li>
      <li className={styles.columnListItem}>Ransomware Attack Simulation</li>
      <li className={styles.columnListItem}>Application &amp; API penetration testing</li>
      <li className={styles.columnListItem}>Application Penetration Test</li>
      <li className={styles.columnListItem}>DevSecOps as a Service</li>
      <li className={styles.columnListItem}>AI Fuzzing</li>
    </ul>
    <a href="https://hammerhead-app-abb6t.ondigitalocean.app/offense/" className={styles.learnMoreLink}>Learn more</a>
  </div>

  <div className={`${styles.column} ${styles.columnTwo}`}>
    <h3 className={styles.columnTitle}>Nyxlab <span>Defense</span></h3>
    <ul className={styles.columnList}>
      <li className={styles.columnListItem}>24/7 Security Monitoring</li>
      <li className={styles.columnListItem}>Threat Hunting</li>
      <li className={styles.columnListItem}>Detection Engineering</li>
      <li className={styles.columnListItem}>Security Automation and SOAR</li>
      <li className={styles.columnListItem}>SIEM and EDR Optimization</li>
    </ul>
    <a href="https://hammerhead-app-abb6t.ondigitalocean.app/nyxlab-defense/" className={styles.learnMoreLink}>Learn more</a>
  </div>

  <div className={styles.column}>
    <h3 className={styles.columnTitle}>Nyxlab <span>Response</span></h3>
    <ul className={styles.columnList}>
      <li className={styles.columnListItem}>Incident Response</li>
      <li className={styles.columnListItem}>Digital Forensic Analysis</li>
      <li className={styles.columnListItem}>Crisis Coordination</li>
    </ul>
    <a href="https://hammerhead-app-abb6t.ondigitalocean.app/nyxlab-response/" className={styles.learnMoreLink}>Learn more</a>
  </div>

  <div className={`${styles.column} ${styles.columnFour}`}>
    <h3 className={styles.columnTitle}>Nyxlab <span>DNS</span></h3>
    <ul className={styles.columnList}>
      <li className={styles.columnListItem}>Phishing domain monitoring and take down</li>
      <li className={styles.columnListItem}>Brand monitoring</li>
      <li className={styles.columnListItem}>Abuse verification</li>
    </ul>
    <a href="https://hammerhead-app-abb6t.ondigitalocean.app/dns/" className={styles.learnMoreLink}>Learn more</a>
  </div>

  <div className={`${styles.column} ${styles.columnFour}`}>
    <h3 className={styles.columnTitle}>Nyxlab <span>Research</span></h3>
    <ul className={styles.columnList}>
      <li className={styles.columnListItem}>CVE identification</li>
      <li className={styles.columnListItem}>Exploitation Development</li>
      <li className={styles.columnListItem}>Security R&D</li>
    </ul>
    <a href="https://hammerhead-app-abb6t.ondigitalocean.app/research/" className={styles.learnMoreLink}>Learn more</a>
  </div>

  <div className={styles.column}>
    <h3 className={styles.columnTitle}>Nyxlab <span>Build</span></h3>
    <ul className={styles.columnList}>
      <li className={styles.columnListItem}>AI Automation</li>
      <li className={styles.columnListItem}>Cloud Landing Zone</li>
    </ul>
    <a href="#" className={styles.learnMoreLink}>Learn more</a>
  </div>

  <div className={styles.column}>
    <h3 className={styles.columnTitle}>Nyxlab <span>Intelligence</span></h3>
    <ul className={styles.columnList}>
      <li className={styles.columnListItem}>Threat intelligence feeds</li>
      <li className={styles.columnListItem}>Dark Web Monitoring</li>
      <li className={styles.columnListItem}>Attack Surface Management</li>
    </ul>
    <a href="https://hammerhead-app-abb6t.ondigitalocean.app/nyxlab-build/" className={styles.learnMoreLink}>Learn more</a>
  </div>
</section>
      </div>
    </main>
  );
};

export default ServiceOfferings;