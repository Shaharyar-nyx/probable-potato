'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';

const coreTeam = [
  {
    name: 'Felix Kim',
    title: 'CEO & Co-founder',
    description: 'Cybersecurity expert with over 15 years of experience in building secure systems.',
    image: '/images/team/felix-kim.jpg',
    location: '홍콩'
  },
  {
    name: 'Golden Khip',
    title: 'CTO',
    description: 'Leading technical innovation with expertise in AI-driven security solutions.',
    image: '/images/team/golden-khip.jpg',
    location: '홍콩'
  },
  {
    name: 'Brett Ngo',
    title: 'Head of Research',
    description: 'Pioneering research in advanced threat detection and prevention.',
    image: '/images/team/brett-ngo.jpg',
    location: '홍콩'
  },
  {
    name: 'Zong Antirooide',
    title: 'Head of Operations',
    description: 'Ensuring seamless delivery of cybersecurity solutions globally.',
    image: '/images/team/zong-antirooide.jpg',
    location: '홍콩'
  },
  {
    name: 'Isabella Chan',
    title: 'Head of Marketing',
    description: 'Driving global brand awareness and market expansion strategies.',
    image: '/images/team/isabella-chan.jpg',
    location: '홍콩'
  }
];

const cultureValues = [
  {
    title: 'Innovative',
    description: 'We embrace creative solutions and cutting-edge technologies to stay ahead.',
  },
  {
    title: 'Proactive',
    description: 'Taking initiative in identifying and addressing security challenges.',
  },
  {
    title: 'Global',
    description: 'Building solutions that work across borders and cultures.',
  },
  {
    title: 'Performance',
    description: 'Delivering exceptional results through dedication and expertise.',
  }
];

const upcomingEvents = [
  {
    title: 'Cybersecurity Basics',
    date: 'February 15',
    location: 'Hong Kong',
    image: '/images/events/cyber-basics.jpg'
  },
  {
    title: 'Advanced Threat Detection',
    date: 'March 10',
    location: 'Hong Kong',
    image: '/images/events/threat-detection.jpg'
  },
  {
    title: 'Cybersecurity Innovation Summit',
    date: 'April 5',
    location: 'Hong Kong',
    image: '/images/events/innovation-summit.jpg'
  }
];

export default function CompanyPage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative h-[500px] mb-20">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="Cybersecurity background"
            fill
            className="object-cover brightness-50"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-5xl font-bold mb-6">
            Innovating an Ecosystem of<br />Accessible Cybersecurity
          </h1>
          <p className="text-xl mb-8 max-w-3xl">
            Empowering organizations with cutting-edge cybersecurity solutions
          </p>
          <Button variant="primary" size="lg">
            Learn More
          </Button>
        </div>
      </section>

      {/* Building Future Section */}
      <section className="w-full max-w-7xl mx-auto mb-20 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-blue-600 mb-4">
              Building a Future<br />Ecosystem of<br />Cybersecurity Excellence
            </h2>
            <p className="text-gray-600 mb-6">
              At Cyberbay, we're committed to creating an innovative ecosystem where cybersecurity is accessible to all. 
              Our platform combines cutting-edge technology with expert guidance to protect organizations in an evolving digital landscape.
            </p>
            <Button variant="outline">Learn More →</Button>
          </div>
          <div className="relative h-[300px]">
            <Image
              src="/images/ecosystem-diagram.png"
              alt="Cybersecurity ecosystem diagram"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Core Team Section */}
      <section className="w-full max-w-7xl mx-auto mb-20 px-4">
        <h2 className="text-3xl font-bold mb-12">Our Core Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {coreTeam.map((member, index) => (
            <div key={index} className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-gray-600 mb-1">{member.title}</p>
              <p className="text-sm text-gray-500">{member.location}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Culture Section */}
      <section className="w-full bg-blue-900 py-16 mb-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Our Culture</h2>
          <p className="text-blue-100 mb-12 max-w-2xl">
            We foster an environment of innovation, collaboration, and continuous learning, 
            where every team member contributes to our mission of making cybersecurity accessible.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cultureValues.map((value, index) => (
              <div 
                key={index}
                className="bg-blue-800 p-6 rounded-lg"
              >
                <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-blue-100">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="w-full max-w-7xl mx-auto mb-20 px-4">
        <h2 className="text-3xl font-bold mb-8">Events</h2>
        <div className="flex gap-8 mb-6">
          <button className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-2">February</button>
          <button className="text-gray-500 pb-2">March</button>
          <button className="text-gray-500 pb-2">April</button>
        </div>
        <div className="space-y-4">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="flex items-center gap-6 border rounded-lg p-4">
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-gray-600">{event.location}</p>
              </div>
              <Button variant="primary" size="sm">Register</Button>
            </div>
          ))}
        </div>
      </section>

      {/* Industry Updates Section */}
      <section className="w-full max-w-7xl mx-auto mb-20 px-4">
        <h2 className="text-3xl font-bold mb-8">Industry Updates</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                <Image
                  src={`/images/updates/update-${index + 1}.jpg`}
                  alt={`Industry update ${index + 1}`}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">Latest Cybersecurity Trends</h3>
              <p className="text-gray-600 mb-4">Insights into emerging threats and solutions</p>
              <Button variant="link" className="text-blue-600 p-0">
                Read More →
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full bg-blue-900 text-white py-16">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">
            Connect with Cyberbay and join us<br />in building a secure digital future
          </h2>
          <Button variant="secondary" size="lg">
            Get in Touch
          </Button>
        </div>
      </section>
    </main>
  );
}
