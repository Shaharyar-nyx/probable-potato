import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-navy-900 to-navy-800 text-white py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Fortify, Scale, and Triage with The Cyberbay Platform
            </h1>
            <p className="text-lg mb-8 text-gray-300">
              Secure and enhance your software with our cutting-edge bug bounty platform
            </p>
            <Link 
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              Request Demo
            </Link>
          </div>
          <div className="flex-1">
            <div className="relative w-full aspect-video">
              <Image
                src="/platform-hero.png"
                alt="Cyberbay Platform Interface"
                fill
                className="object-cover rounded-lg shadow-xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy-900/50 pointer-events-none" />
    </section>
  );
}
