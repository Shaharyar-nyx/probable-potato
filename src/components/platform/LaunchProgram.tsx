import React from "react";
import Image from "next/image";

export default function LaunchProgram() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="space-y-8 text-primary-800">
            <span className="tagline">How It Works</span>
            <h2 className="heading-2 font-bold">Launch Your Bug Bounty Program With The Cyberbay Platform</h2>
            <p className="paragraph">Three simple steps to execute your bug bounty program.</p>
          </div>
          <div className="relative">
            <Image
              src="/launch-program.png"
              alt="Launch Program Interface"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
