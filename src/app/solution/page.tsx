import React from "react";
import styles from "./ServiceOfferings.module.scss";

const ServiceOfferings = () => {
  return (
    <main className={styles.pageFrame}>
      <div className={styles.content}>
        {/* Intro */}
        <section className={styles.introSection}>
        
          <h2 className={styles.sectionTitle}>Solutions</h2>
          <div className={styles.accentBar}></div>
          <p className={styles.intro}>
            NyxLab delivers comprehensive security solutions across offense, defense,
            response, and intelligence domains. Our integrated approach combines
            proactive threat simulation with 24/7 monitoring, rapid incident response
            capabilities, and cutting-edge research to protect enterprises from
            evolving cyber threats.
          </p>
        </section>

        {/* Journey row (Assess → Respond → Defend → Evolve) */}
        <section className={styles.journey}>
          <div className={styles.journeyHeader}>
            <h3>End-to-end security lifecycle</h3>
            <p>
              From adversary simulation to continuous improvement, NyxLab helps you
              assess, respond, defend, and evolve your security posture.
            </p>
          </div>

          <div className={styles.journeyTrack}>
            <div className={styles.journeyLine}></div>
            <div className={styles.journeySteps}>
              <div className={styles.step}>
                <div className={styles.stepCircle}>1</div>
                <div className={styles.stepTitle}>Assess</div>
                <p className={styles.stepCaption}>
                  Red team operations identify vulnerabilities.
                </p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepCircle}>2</div>
                <div className={styles.stepTitle}>Respond</div>
                <p className={styles.stepCaption}>
                  Rapid incident response and digital forensics.
                </p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepCircle}>3</div>
                <div className={styles.stepTitle}>Defend</div>
                <p className={styles.stepCaption}>
                  Continuous monitoring and threat hunting.
                </p>
              </div>
              <div className={styles.step}>
                <div className={styles.stepCircle}>4</div>
                <div className={styles.stepTitle}>Evolve</div>
                <p className={styles.stepCaption}>
                  Research-driven security improvement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution Columns */}
        <section className={styles.columnsSection}>
          <h3 className={styles.columnsTitle}>NyxLab solution pillars</h3>
          <p className={styles.columnsSubtitle}>
            Modular capabilities that can be consumed individually or as part of an
            integrated security program.
          </p>

          <div className={styles.columns}>
            <div className={`${styles.column} ${styles.columnAccent}`}>
              <h4 className={styles.columnTitle}>
                NyxLab <span>Offense</span>
              </h4>
              <ul className={styles.columnList}>
                <li className={styles.columnListItem}>
                  Red team / cyber attack simulation
                </li>
                <li className={styles.columnListItem}>
                  Ransomware attack simulation
                </li>
                <li className={styles.columnListItem}>
                  Application &amp; API penetration testing
                </li>
                <li className={styles.columnListItem}>Application penetration test</li>
                <li className={styles.columnListItem}>DevSecOps as a service</li>
                <li className={styles.columnListItem}>AI fuzzing</li>
              </ul>
              <a
                href="https://hammerhead-app-abb6t.ondigitalocean.app/offense/"
                className={styles.learnMoreLink}
              >
                Learn more →
              </a>
            </div>

            <div className={`${styles.column} ${styles.columnAccentSoft}`}>
              <h4 className={styles.columnTitle}>
                NyxLab <span>Defense</span>
              </h4>
              <ul className={styles.columnList}>
                <li className={styles.columnListItem}>24/7 security monitoring</li>
                <li className={styles.columnListItem}>Threat hunting</li>
                <li className={styles.columnListItem}>Detection engineering</li>
                <li className={styles.columnListItem}>
                  Security automation and SOAR
                </li>
                <li className={styles.columnListItem}>SIEM and EDR optimization</li>
              </ul>
              <a
                href="https://hammerhead-app-abb6t.ondigitalocean.app/nyxlab-defense/"
                className={styles.learnMoreLink}
              >
                Learn more →
              </a>
            </div>

            <div className={styles.column}>
              <h4 className={styles.columnTitle}>
                NyxLab <span>Response</span>
              </h4>
              <ul className={styles.columnList}>
                <li className={styles.columnListItem}>Incident response</li>
                <li className={styles.columnListItem}>Digital forensic analysis</li>
                <li className={styles.columnListItem}>Crisis coordination</li>
              </ul>
              <a
                href="https://hammerhead-app-abb6t.ondigitalocean.app/nyxlab-response/"
                className={styles.learnMoreLink}
              >
                Learn more →
              </a>
            </div>

            <div className={styles.column}>
              <h4 className={styles.columnTitle}>
                NyxLab <span>DNS</span>
              </h4>
              <ul className={styles.columnList}>
                <li className={styles.columnListItem}>
                  Phishing domain monitoring and takedown
                </li>
                <li className={styles.columnListItem}>Brand monitoring</li>
                <li className={styles.columnListItem}>Abuse verification</li>
              </ul>
              <a
                href="https://hammerhead-app-abb6t.ondigitalocean.app/dns/"
                className={styles.learnMoreLink}
              >
                Learn more →
              </a>
            </div>

            <div className={styles.column}>
              <h4 className={styles.columnTitle}>
                NyxLab <span>Research</span>
              </h4>
              <ul className={styles.columnList}>
                <li className={styles.columnListItem}>CVE identification</li>
                <li className={styles.columnListItem}>Exploit development</li>
                <li className={styles.columnListItem}>Security R&amp;D</li>
              </ul>
              <a
                href="https://hammerhead-app-abb6t.ondigitalocean.app/research/"
                className={styles.learnMoreLink}
              >
                Learn more →
              </a>
            </div>

            <div className={styles.column}>
              <h4 className={styles.columnTitle}>
                NyxLab <span>Build</span>
              </h4>
              <ul className={styles.columnList}>
                <li className={styles.columnListItem}>AI automation</li>
                <li className={styles.columnListItem}>Cloud landing zone</li>
              </ul>
              <a href="https://hammerhead-app-abb6t.ondigitalocean.app/nyxlab-build/" className={styles.learnMoreLink}>
                Learn more →
              </a>
            </div>

            <div className={styles.column}>
              <h4 className={styles.columnTitle}>
                NyxLab <span>Intelligence</span>
              </h4>
              <ul className={styles.columnList}>
                <li className={styles.columnListItem}>Threat intelligence feeds</li>
                <li className={styles.columnListItem}>Dark web monitoring</li>
                <li className={styles.columnListItem}>
                  Attack surface management
                </li>
              </ul>
              <a
                href="https://hammerhead-app-abb6t.ondigitalocean.app/intelligence/"
                className={styles.learnMoreLink}
              >
                Learn more →
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ServiceOfferings;