"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./styles.module.scss";

const slides = [
  {
    title: "Building a Future Ecosystem of Cybersecurity Excellence",
    subtitle:
      "The future we envision at Cyberbay is not just about individual solutions; it's about building an integrated ecosystem.",
    description:
      "Every solution, every service, and every innovation we create is a piece of a broader, interconnected tapestry that serves our clients and partners holistically. We see Cyberbay as a self-sustaining ecosystem where protection is seamless, knowledge is shared, and security is woven into every layer of our clients' digital landscapes.",
    images: "/company/bug-bounty-1.png",
    isActive: true,
  },
  {
    title: "Democratizing and Decentralizing Cybersecurity for All",
    subtitle:
      "At Cyberbay, we want to create a secure digital landscape for all and strengthen companies with robust data security and ethical hacking principles.",
    description:
      "Through continuous improvement and proactive monitoring, we detect data breaches at their source. Guided by integrity, driven by innovation, and fueled by collaboration, we are shaping the next generation of cybersecurity leaders.",
    images: "/company/bug-bounty-2.png",
    isActive: false,
  },
  {
    title: "Proactive Protection for a Resilient Tomorrow",
    subtitle: "In cybersecurity, waiting for a problem to occur is like turning a blind eye to reality.",
    description:
      "Cyberbay champions a proactive approach because we believe in staying ahead, not just in defense but in empowerment. Continuous assessment is the keystone to resilience. Imagine the breaches that could have been thwarted, the trust that could have been preserved, had the right measures been in place—our mission is to turn this vision into reality. With Cyberbay, businesses don't just prepare for threats; they stand guard, ready and fortified. They inspect for cracks, backdoors, and fix problems before they begin.",
    images: "/company/bug-bounty-3.png",
    isActive: false,
  },
  {
    title: "Redefining Cybersecurity through Humanity and Inclusivity",
    subtitle: "At Cyberbay, we believe cybersecurity is about empowerment, not fear.",
    description:
      "Hackers, often misunderstood, are evolving into key ethical guardians of the digital world. Their goal is to protect, strengthen, and improve security. We aim to elevate these cybersecurity professionals, recognizing their skill and dedication. By rethinking the role of hackers, we highlight their value in creating a safer, more trustworthy digital environment. For every malicious actor, there are thousands working to make the internet safer.",
    images: "/company/bug-bounty-4.png",
    isActive: false,
  },
];

const slideVariants = {
  enter: {
    y: 50,
    opacity: 0,
  },
  center: {
    y: 0,
    opacity: 1,
  },
  exit: {
    y: -50,
    opacity: 0,
  },
};

export const BugBountyPrograms: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section className={styles.section}>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.1 }}
        className="mb-6 text-center text-primary-800"
      >
        <h1 className="heading-1 mb-5 font-bold">Who We Are</h1>
        <p className="paragraph-xl mb-2 font-semibold">
          Cyberbay is a secure, welcoming space where trust, inclusivity, and cybersecurity come together.
        </p>
        <p className="paragraph-lg">
          Like a natural bay, it offers protection and stability, shielding against digital threats while providing a
          platform for expertise and innovation. It's a place where the digital landscape is constantly monitored and
          safeguarded.
        </p>
      </motion.div>
      <div className={styles.navigation}>
        {slides.map((slide, index) => (
          <button
            key={index}
            className={`paragraph-sm ${styles.navButton} ${index === activeSlide ? styles.active : ""}`}
            onClick={() => setActiveSlide(index)}
          >
            {slide.title}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        <AnimatePresence mode="wait">
          {slides.map(
            (slide, index) =>
              index === activeSlide && (
                <motion.div
                  key={index}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className={styles.slide}
                >
                  <div className={`${styles.slideContent} ${index % 2 !== 0 ? styles.reverse : ""}`}>
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.1 }}
                      className={styles.textContent}
                    >
                      <h1 className="heading-1 mb-5 font-bold text-primary-500">{slide.title}</h1>
                      <p className="paragraph-xl !mb-3 !mt-0 font-semibold text-primary-800">{slide.subtitle}</p>
                      <p className="paragraph-md !mt-0 text-primary-800">{slide.description}</p>
                    </motion.div>
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.1 }}
                      className={styles.imageContent}
                    >
                      <Image src={slide.images} alt={slide.title} width={500} height={400} className={styles.image} />
                    </motion.div>
                  </div>
                </motion.div>
              ),
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
