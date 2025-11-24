import React from "react";

import { Header } from "@/components";
import { HeroDark } from "@/sections";
import { BlockType } from "@/types";
import { getPageBySlug, STRAPI_ASSETS } from "@/lib";
import { PageBuilder } from "@/components/PageBuilder";
import { Metadata } from "next";

const blockComponents: Record<string, React.FC<BlockType>> = {
  hero_section: HeroDark,
};

async function getContactUsData() {
  return getPageBySlug("contact-us");
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getContactUsData();
  if (!data?.seo) {
    return {
      title: "Nyxlab",
      description: "",
      openGraph: {
        title: "Nyxlab",
        description: "",
        type: "website",
        siteName: "Nyxlab",
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        title: "Nyxlab",
        description: "",
      },
    };
  }

  return {
    title: data.seo.title,
    description: data.seo.meta_description,
    keywords: data.seo.keywords,
    robots: {
      index: !data.seo.no_index,
      follow: !data.seo.no_follow,
    },
    openGraph: {
      title: data.seo.title,
      description: data.seo.meta_description,
      images: [{ url: STRAPI_ASSETS + data.seo.og_image?.data?.attributes?.url || "/favicon.ico" }],
      url: data.seo.canonical_url,
      type: "website",
      siteName: "Nyxlab",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: data.seo.title,
      description: data.seo.meta_description,
      images: [STRAPI_ASSETS + data.seo.og_image?.data?.attributes?.url || "/favicon.ico"],
    },
  };
}

// Static Contact Form Component with Black & Pink/Purple Neon Theme
const ContactFormSection = () => {
  return (
    <section className="py-16 bg-black min-h-screen">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading with Neon Effect */}
          <h1 className="text-4xl lg:text-5xl font-bold text-center mb-12">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
              Contact Us
            </span>
          </h1>

          <div className="bg-gray-900 rounded-2xl border border-purple-500/30 shadow-2xl shadow-purple-500/20 p-6 lg:p-8 backdrop-blur-sm">
            <form className="space-y-6">
              {/* First Name & Last Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-purple-300 mb-2 drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-3 bg-gray-800 border border-purple-500/50 rounded-lg text-white placeholder-purple-300/60 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all shadow-[0_0_10px_rgba(168,85,247,0.1)] focus:shadow-[0_0_15px_rgba(236,72,153,0.3),0_0_30px_rgba(168,85,247,0.2)]"
                    placeholder="First Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-purple-300 mb-2 drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-3 bg-gray-800 border border-purple-500/50 rounded-lg text-white placeholder-purple-300/60 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all shadow-[0_0_10px_rgba(168,85,247,0.1)] focus:shadow-[0_0_15px_rgba(236,72,153,0.3),0_0_30px_rgba(168,85,247,0.2)]"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-purple-300 mb-2 drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 bg-gray-800 border border-purple-500/50 rounded-lg text-white placeholder-purple-300/60 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all shadow-[0_0_10px_rgba(168,85,247,0.1)] focus:shadow-[0_0_15px_rgba(236,72,153,0.3),0_0_30px_rgba(168,85,247,0.2)]"
                  placeholder="Phone"
                  required
                />
              </div>

              {/* Job Title */}
              <div>
                <label htmlFor="jobTitle" className="block text-sm font-medium text-purple-300 mb-2 drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]">
                  Job Title *
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  className="w-full px-4 py-3 bg-gray-800 border border-purple-500/50 rounded-lg text-white placeholder-purple-300/60 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all shadow-[0_0_10px_rgba(168,85,247,0.1)] focus:shadow-[0_0_15px_rgba(236,72,153,0.3),0_0_30px_rgba(168,85,247,0.2)]"
                  placeholder="Job Title"
                  required
                />
              </div>

              {/* Company Name & Business Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-purple-300 mb-2 drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    className="w-full px-4 py-3 bg-gray-800 border border-purple-500/50 rounded-lg text-white placeholder-purple-300/60 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all shadow-[0_0_10px_rgba(168,85,247,0.1)] focus:shadow-[0_0_15px_rgba(236,72,153,0.3),0_0_30px_rgba(168,85,247,0.2)]"
                    placeholder="Company Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="businessEmail" className="block text-sm font-medium text-purple-300 mb-2 drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]">
                    Business Email *
                  </label>
                  <input
                    type="email"
                    id="businessEmail"
                    className="w-full px-4 py-3 bg-gray-800 border border-purple-500/50 rounded-lg text-white placeholder-purple-300/60 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all shadow-[0_0_10px_rgba(168,85,247,0.1)] focus:shadow-[0_0_15px_rgba(236,72,153,0.3),0_0_30px_rgba(168,85,247,0.2)]"
                    placeholder="Business Email"
                    required
                  />
                </div>
              </div>

              {/* HeadTitle & Owner Option Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="headTitle" className="block text-sm font-medium text-purple-300 mb-2 drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]">
                    HeadTitle by *
                  </label>
                  <select
                    id="headTitle"
                    className="w-full px-4 py-3 bg-gray-800 border border-purple-500/50 rounded-lg text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all shadow-[0_0_10px_rgba(168,85,247,0.1)] focus:shadow-[0_0_15px_rgba(236,72,153,0.3),0_0_30px_rgba(168,85,247,0.2)]"
                    required
                  >
                    <option value="" className="text-purple-300/60">Select HeadTitle</option>
                    <option value="headteacher" className="text-white bg-gray-800">Headteacher</option>
                    <option value="counsel" className="text-white bg-gray-800">Counsel</option>
                    <option value="director" className="text-white bg-gray-800">Director</option>
                    <option value="manager" className="text-white bg-gray-800">Manager</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="ownerOption" className="block text-sm font-medium text-purple-300 mb-2 drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]">
                    Owner option *
                  </label>
                  <select
                    id="ownerOption"
                    className="w-full px-4 py-3 bg-gray-800 border border-purple-500/50 rounded-lg text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all shadow-[0_0_10px_rgba(168,85,247,0.1)] focus:shadow-[0_0_15px_rgba(236,72,153,0.3),0_0_30px_rgba(168,85,247,0.2)]"
                    required
                  >
                    <option value="" className="text-purple-300/60">Select Option</option>
                    <option value="owner" className="text-white bg-gray-800">Owner</option>
                    <option value="co-owner" className="text-white bg-gray-800">Co-Owner</option>
                    <option value="not-owner" className="text-white bg-gray-800">Not Owner</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-purple-300 mb-2 drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]">
                  Please share any experience or information *
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-purple-500/50 rounded-lg text-white placeholder-purple-300/60 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all shadow-[0_0_10px_rgba(168,85,247,0.1)] focus:shadow-[0_0_15px_rgba(236,72,153,0.3),0_0_30px_rgba(168,85,247,0.2)] resize-none"
                  placeholder="Please share any experience or information"
                  required
                />
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start space-x-3 p-4 bg-gray-800/50 rounded-lg border border-purple-500/30">
                <input
                  type="checkbox"
                  id="consent"
                  className="mt-1 h-4 w-4 text-pink-500 focus:ring-pink-500 border-purple-500 bg-gray-800 rounded checked:shadow-[0_0_10px_rgba(236,72,153,0.8)]"
                  required
                />
                <label htmlFor="consent" className="text-sm text-purple-200 drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]">
                  I confirm that Digital Policy may communicate with me about this form, position, wireless content, industry insights, and related resources.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4),0_0_40px_rgba(236,72,153,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6),0_0_50px_rgba(236,72,153,0.3)] hover:translate-y-[-2px]"
              >
                Submit
              </button>
            </form>
          </div>

          {/* Additional Information */}
          <div className="mt-8 text-center">
            <p className="text-sm text-purple-300/70 drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]">
              By submitting this form, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

async function ContactUs() {
  const data = await getContactUsData();
  if (!data?.blocks) {
    return null;
  }

  return (
    <main className="min-h-screen bg-black">
      <PageBuilder blockComponents={blockComponents} blocks={data.blocks} />
      {/* Add static contact form after the page blocks */}
      <ContactFormSection />
    </main>
  );
}

export default ContactUs;