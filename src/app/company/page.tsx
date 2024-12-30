"use client";

import Image from "next/image";
import React from "react";

import { Button } from "@/components";

const coreTeam = [
  {
    name: "Felix Kim",
    title: "CEO & Co-founder",
    description: "Cybersecurity expert with over 15 years of experience in building secure systems.",
    image: "/images/team/felix-kim.jpg",
    location: "홍콩",
  },
  {
    name: "Golden Khip",
    title: "CTO",
    description: "Leading technical innovation with expertise in AI-driven security solutions.",
    image: "/images/team/golden-khip.jpg",
    location: "홍콩",
  },
  {
    name: "Brett Ngo",
    title: "Head of Research",
    description: "Pioneering research in advanced threat detection and prevention.",
    image: "/images/team/brett-ngo.jpg",
    location: "홍콩",
  },
  {
    name: "Zong Antirooide",
    title: "Head of Operations",
    description: "Ensuring seamless delivery of cybersecurity solutions globally.",
    image: "/images/team/zong-antirooide.jpg",
    location: "홍콩",
  },
  {
    name: "Isabella Chan",
    title: "Head of Marketing",
    description: "Driving global brand awareness and market expansion strategies.",
    image: "/images/team/isabella-chan.jpg",
    location: "홍콩",
  },
];

const cultureValues = [
  {
    title: "Innovative",
    description: "We embrace creative solutions and cutting-edge technologies to stay ahead.",
  },
  {
    title: "Proactive",
    description: "Taking initiative in identifying and addressing security challenges.",
  },
  {
    title: "Global",
    description: "Building solutions that work across borders and cultures.",
  },
  {
    title: "Performance",
    description: "Delivering exceptional results through dedication and expertise.",
  },
];

const upcomingEvents = [
  {
    title: "Cybersecurity Basics",
    date: "February 15",
    location: "Hong Kong",
    image: "/images/events/cyber-basics.jpg",
  },
  {
    title: "Advanced Threat Detection",
    date: "March 10",
    location: "Hong Kong",
    image: "/images/events/threat-detection.jpg",
  },
  {
    title: "Cybersecurity Innovation Summit",
    date: "April 5",
    location: "Hong Kong",
    image: "/images/events/innovation-summit.jpg",
  },
];

const CompanyPage: React.FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="relative mb-20 h-[500px] w-full">
        <div className="absolute inset-0">
          <Image alt="Cybersecurity background" className="object-cover brightness-50" fill src="/images/hero-bg.jpg" />
        </div>
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="mb-6 text-5xl font-bold">
            Innovating an Ecosystem of
            <br />
            Accessible Cybersecurity
          </h1>
          <p className="mb-8 max-w-3xl text-xl">Empowering organizations with cutting-edge cybersecurity solutions</p>
          <Button>Learn More</Button>
        </div>
      </section>

      {/* Building Future Section */}
      <section className="mx-auto mb-20 w-full max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-3xl font-bold text-blue-600">
              Building a Future
              <br />
              Ecosystem of
              <br />
              Cybersecurity Excellence
            </h2>
            <p className="mb-6 text-gray-600">
              At Cyberbay, we&#39;re committed to creating an innovative ecosystem where cybersecurity is accessible to
              all. Our platform combines cutting-edge technology with expert guidance to protect organizations in an
              evolving digital landscape.
            </p>
            <Button variant="neutral">Learn More →</Button>
          </div>
          <div className="relative h-[300px]">
            <Image
              alt="Cybersecurity ecosystem diagram"
              className="object-contain"
              fill
              src="/images/ecosystem-diagram.png"
            />
          </div>
        </div>
      </section>

      {/* Core Team Section */}
      <section className="mx-auto mb-20 w-full max-w-7xl px-4">
        <h2 className="mb-12 text-3xl font-bold">Our Core Team</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {coreTeam.map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative mx-auto mb-4 h-40 w-40">
                <Image alt={member.name} className="rounded-full object-cover" fill src={member.image} />
              </div>
              <h3 className="mb-1 text-xl font-semibold">{member.name}</h3>
              <p className="mb-1 text-gray-600">{member.title}</p>
              <p className="text-sm text-gray-500">{member.location}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Culture Section */}
      <section className="mb-20 w-full bg-blue-900 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-4 text-3xl font-bold text-white">Our Culture</h2>
          <p className="mb-12 max-w-2xl text-blue-100">
            We foster an environment of innovation, collaboration, and continuous learning, where every team member
            contributes to our mission of making cybersecurity accessible.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {cultureValues.map((value, index) => (
              <div key={index} className="rounded-lg bg-blue-800 p-6">
                <h3 className="mb-2 text-xl font-semibold text-white">{value.title}</h3>
                <p className="text-blue-100">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="mx-auto mb-20 w-full max-w-7xl px-4">
        <h2 className="mb-8 text-3xl font-bold">Events</h2>
        <div className="mb-6 flex gap-8">
          <button className="border-b-2 border-blue-600 pb-2 font-semibold text-blue-600">February</button>
          <button className="pb-2 text-gray-500">March</button>
          <button className="pb-2 text-gray-500">April</button>
        </div>
        <div className="space-y-4">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="flex items-center gap-6 rounded-lg border p-4">
              <div className="relative h-16 w-16 flex-shrink-0">
                <Image alt={event.title} className="rounded-lg object-cover" fill src={event.image} />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-gray-600">{event.location}</p>
              </div>
              <Button size="small">Register</Button>
            </div>
          ))}
        </div>
      </section>

      {/* Industry Updates Section */}
      <section className="mx-auto mb-20 w-full max-w-7xl px-4">
        <h2 className="mb-8 text-3xl font-bold">Industry Updates</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative mb-4 h-48 overflow-hidden rounded-lg">
                <Image
                  alt={`Industry update ${index + 1}`}
                  className="object-cover transition-transform group-hover:scale-105"
                  fill
                  src={`/images/updates/update-${index + 1}.jpg`}
                />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Latest Cybersecurity Trends</h3>
              <p className="mb-4 text-gray-600">Insights into emerging threats and solutions</p>
              <Button className="p-0 text-blue-600">Read More →</Button>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full bg-blue-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="mb-6 text-3xl font-bold">
            Connect with Cyberbay and join us
            <br />
            in building a secure digital future
          </h2>
          <Button variant="neutral">Get in Touch</Button>
        </div>
      </section>
    </main>
  );
};

export default CompanyPage;
