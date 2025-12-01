"use client";

import React, { useState } from "react";

type ContactFormState = {
  firstName: string;
  lastName: string;
  phone: string;
  jobTitle: string;
  companyName: string;
  businessEmail: string;
  message: string;
  consent: boolean;
};

const initialForm: ContactFormState = {
  firstName: "",
  lastName: "",
  phone: "",
  jobTitle: "",
  companyName: "",
  businessEmail: "",
  message: "",
  consent: false,
};

const ContactFormSection: React.FC = () => {
  const [form, setForm] = useState<ContactFormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value, type, checked } = e.target as any;

    setForm((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!form.consent) {
      setErrorMsg("Please provide consent so we can contact you.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/subscribe/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,
          jobTitle: form.jobTitle,
          companyName: form.companyName,
          businessEmail: form.businessEmail,
          message: form.message,
        }),
      });

      let json: any = {};
      const ct = res.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        try {
          json = await res.json();
        } catch {
          // ignore parse error
        }
      }

      if (!res.ok) {
        throw new Error(json.error || `Request failed: ${res.status}`);
      }

      setSuccessMsg(
        "Thank you for contacting us. Our team will get back to you shortly."
      );
      setForm(initialForm);
    } catch (err: any) {
      console.error("Contact form error:", err);
      setErrorMsg(
        err?.message || "Something went wrong while submitting the form."
      );
    } finally {
      setSubmitting(false);
    }
  };

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
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* First Name & Last Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-purple-300 mb-2 drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]"
                  >
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full px-4 py-3 bg-gray-800 border border-purple-500/50 rounded-lg text-white placeholder-purple-300/60 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all shadow-[0_0_10px_rgba(168,85,247,0.1)] focus:shadow-[0_0_15px_rgba(236,72,153,0.3),0_0_30px_rgba(168,85,247,0.2)]"
                    placeholder="First Name"
                    required
                    value={form.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-purple-300 mb-2 drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]"
                  >
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-4 py-3 bg-gray-800 border border-purple-500/50 rounded-lg text-white placeholder-purple-300/60 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all shadow-[0_0_10px_rgba(168,85,247,0.1)] focus:shadow-[0_0_15px_rgba(236,72,153,0.3),0_0_30px_rgba(168,85,247,0.2)]"
                    placeholder="Last Name"
                    required
                    value={form.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-purple-300 mb-2 drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]"
                >
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 bg-gray-800 border border-purple-500/50 rounded-lg text-white placeholder-purple-300/60 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all shadow-[0_0_10px_rgba(168,85,247,0.1)] focus:shadow-[0_0_15px_rgba(236,72,153,0.3),0_0_30px_rgba(168,85,247,0.2)]"
                  placeholder="Phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Job Title */}
              <div>
                <label
                  htmlFor="jobTitle"
                  className="block text-sm font-medium text-purple-300 mb-2 drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]"
                >
                  Job Title *
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  className="w-full px-4 py-3 bg-gray-800 border border-purple-500/50 rounded-lg text-white placeholder-purple-300/60 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all shadow-[0_0_10px_rgba(168,85,247,0.1)] focus:shadow-[0_0_15px_rgba(236,72,153,0.3),0_0_30px_rgba(168,85,247,0.2)]"
                  placeholder="Job Title"
                  required
                  value={form.jobTitle}
                  onChange={handleChange}
                />
              </div>

              {/* Company Name & Business Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-purple-300 mb-2 drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]"
                  >
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    className="w-full px-4 py-3 bg-gray-800 border border-purple-500/50 rounded-lg text-white placeholder-purple-300/60 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all shadow-[0_0_10px_rgba(168,85,247,0.1)] focus:shadow-[0_0_15px_rgba(236,72,153,0.3),0_0_30px_rgba(168,85,247,0.2)]"
                    placeholder="Company Name"
                    required
                    value={form.companyName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label
                    htmlFor="businessEmail"
                    className="block text-sm font-medium text-purple-300 mb-2 drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]"
                  >
                    Business Email *
                  </label>
                  <input
                    type="email"
                    id="businessEmail"
                    className="w-full px-4 py-3 bg-gray-800 border border-purple-500/50 rounded-lg text-white placeholder-purple-300/60 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all shadow-[0_0_10px_rgba(168,85,247,0.1)] focus:shadow-[0_0_15px_rgba(236,72,153,0.3),0_0_30px_rgba(168,85,247,0.2)]"
                    placeholder="Business Email"
                    required
                    value={form.businessEmail}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-purple-300 mb-2 drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]"
                >
                  Tell us about your security needs
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800 border border-purple-500/50 rounded-lg text-white placeholder-purple-300/60 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/30 transition-all shadow-[0_0_10px_rgba(168,85,247,0.1)] focus:shadow-[0_0_15px_rgba(236,72,153,0.3),0_0_30px_rgba(168,85,247,0.2)] resize-none"
                  placeholder="Tell us about your security needs"
                  required
                  value={form.message}
                  onChange={handleChange}
                />
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start space-x-3 p-4 bg-gray-800/50 rounded-lg border border-purple-500/30">
                <input
                  type="checkbox"
                  id="consent"
                  className="mt-1 h-4 w-4 text-pink-500 focus:ring-pink-500 border-purple-500 bg-gray-800 rounded checked:shadow-[0_0_10px_rgba(236,72,153,0.8)]"
                  required
                  checked={form.consent}
                  onChange={handleChange}
                />
                <label
                  htmlFor="consent"
                  className="text-sm text-purple-200 drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]"
                >
                  I consent to Nyxlab contacting me about my request and sharing
                  relevant service information as needed.
                </label>
              </div>

              {/* Error / Success */}
              {errorMsg && (
                <p className="text-sm text-red-400">{errorMsg}</p>
              )}
              {successMsg && (
                <p className="text-sm text-green-400">{successMsg}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 px-6 rounded-lg font-bold text-lg hover:from-purple-500 hover:to-pink-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 shadow-[0_0_20px_rgba(168,85,247,0.4),0_0_40px_rgba(236,72,153,0.2)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6),0_0_50px_rgba(236,72,153,0.3)] hover:translate-y-[-2px] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-purple-300/70 drop-shadow-[0_0_5px_rgba(168,85,247,0.3)]">
              By submitting this form, you agree to our Terms of Service and
              Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;