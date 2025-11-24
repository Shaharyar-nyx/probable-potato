"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutSection({ title, headline, content, image }: any) {
 const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_ASSETS;

const imgUrl = image?.data?.attributes?.url
  ? `${STRAPI_URL}${image.data.attributes.url}`
  : "/images/placeholder.jpg";


  return (
    <section className="relative bg-black text-white py-40 px-6 md:px-20 overflow-hidden">
      {/* 🔮 Background accent gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-black" />
      <div className="absolute top-0 left-1/2 w-[70vw] h-[70vw] bg-gradient-radial from-pink-600/20 to-transparent blur-3xl -translate-x-1/2 opacity-40" />

      <div className="relative max-w-6xl mx-auto text-center z-10">
        {/* 🧠 Title and headline */}
        <motion.h4
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="uppercase text-sm tracking-[6px] text-pink-500 mb-4"
        >
          {title}
        </motion.h4>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent leading-tight mb-12"
        >
          {headline}
        </motion.h2>

        {/* ✨ Floating Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 md:p-14 shadow-2xl text-left max-w-4xl"
        >
          {/* Background Image as offset visual */}
          <div className="absolute -top-20 -right-20 w-[300px] h-[300px] md:w-[400px] md:h-[400px] opacity-60 rotate-3">
            <Image
              src={imgUrl}
              alt={image?.data?.attributes?.alternativeText || "About Image"}
              fill
              className="object-cover rounded-3xl mix-blend-screen"
            />
          </div>

          {/* Text Content */}
          <p className="relative text-gray-300 leading-relaxed text-lg whitespace-pre-line z-10">
            {content}
          </p>

          {/* Small glowing border effect */}
          <div className="absolute inset-0 rounded-3xl border border-pink-500/10 hover:border-pink-500/30 transition-all duration-500" />
        </motion.div>
      </div>

      {/* Floating gradient orbs for vibe */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-pink-600/20 blur-3xl animate-pulse-slow rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-purple-600/20 blur-3xl animate-pulse-slow rounded-full"></div>
    </section>
  );
}
