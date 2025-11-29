"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface AboutSectionProps {
  title?: string;
  headline?: string;
  content?: string;
  image?: {
    data?: {
      attributes?: {
        url?: string;
        alternativeText?: string;
      };
    };
  };
}

const STRAPI_URL = "https://shark-app-tmqz4.ondigitalocean.app";

export default function AboutSection({
  title,
  headline,
  content,
  image,
}: AboutSectionProps) {
  const imgUrl = image?.data?.attributes?.url
    ? `${STRAPI_URL}${image.data.attributes.url}`
    : "/images/placeholder.jpg";

  const imgAlt =
    image?.data?.attributes?.alternativeText || "About section illustration";

  return (
    <section className="relative overflow-hidden bg-black text-white py-24 md:py-32">
      {/* 🔮 Background gradients */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black" />
      <div className="pointer-events-none absolute top-0 left-1/2 h-[70vw] w-[70vw] -translate-x-1/2 bg-gradient-radial from-pink-600/20 to-transparent blur-3xl opacity-40" />

      {/* Floating orbs */}
      <div className="pointer-events-none absolute top-10 left-10 h-32 w-32 rounded-full bg-pink-600/20 blur-3xl animate-pulse-slow" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-48 w-48 rounded-full bg-purple-600/20 blur-3xl animate-pulse-slow" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-8 lg:px-12">
        {/* 🧠 Title + Headline */}
        <motion.h4
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.35em] text-pink-500 md:text-sm"
        >
          {title}
        </motion.h4>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center text-3xl font-extrabold leading-tight text-transparent bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text md:mb-12 md:text-5xl lg:text-6xl"
        >
          {headline}
        </motion.h2>

        {/* ✨ Card: Text + Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md md:p-10 lg:p-12"
        >
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-12">
            {/* Text */}
            <div>
              <p className="whitespace-pre-line text-base leading-relaxed text-gray-300 md:text-lg">
                {content}
              </p>
            </div>

            {/* Image */}
            <div className="relative h-64 w-full overflow-hidden rounded-3xl border border-pink-500/15 bg-white/5 md:h-80 lg:h-96">
              <Image
                src={imgUrl}
                alt={imgAlt}
                fill
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </div>

          {/* Glowing border */}
          <div className="pointer-events-none absolute inset-0 rounded-3xl border border-pink-500/10 transition-all duration-500 hover:border-pink-500/30" />
        </motion.div>
      </div>
    </section>
  );
}