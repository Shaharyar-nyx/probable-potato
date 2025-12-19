"use client";

import { useSubmitSubscribe } from "@/hooks/useSubmitSubscribe";
import { SubscribeType } from "@/types";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "../UI";
import { formatBtnId, getStrapiAssetUrl } from "@/lib";
import Image from "next/image";

const Footer: React.FC<any> = ({
  company_logo,
  navigations,
  company_socials,
  background_color,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SubscribeType>();

  const { submit, loading, error, called } = useSubmitSubscribe(reset);
  const shouldShowSuccessMessage = called && !loading && !error;

  const onSubmit = async (data: SubscribeType) => {
    submit(data);
  };

  // --- Safe helpers ---
  const primaryNav = navigations?.data?.[0];
  const legalNav = navigations?.data?.[1];

  const servicesItems =
    primaryNav?.attributes?.items?.data?.[0]?.attributes?.children?.data || [];

  const companyItemsRaw =
    primaryNav?.attributes?.items?.data?.[1]?.attributes?.children?.data || [];

  // Explicitly keep only About Nyxlab + Leadership
  const allowedCompanyTitles = ["about nyxlab", "leadership"];
  const companyItems = companyItemsRaw
    .filter(
      ({ attributes: { title } }: any) =>
        title && allowedCompanyTitles.includes(title.toLowerCase())
    )
    .slice(0, 2);

  // Legal items for "Information" column ONLY
  const infoItems = legalNav?.attributes?.items?.data || [];

  // Safe data access with fallbacks - same pattern as Nav component
  const logoUrl = company_logo?.data?.attributes?.url;

  const getHref = (url?: string) => {
    if (!url) return "/";
    if (url.startsWith("http")) return url;
    if (url.startsWith("/")) return url;
    return `/${url}`;
  };

  return (
    <footer className="bg-[#050509] text-white">
      <div className="mx-auto max-w-screen-2xl px-6 py-12 lg:px-16 lg:py-16">
        <div className="flex flex-col space-y-10">
          {/* ================= MAIN CONTENT ================= */}
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:gap-16">
            {/* Left: Logo + blurb + socials */}
            <div className="lg:max-w-md">
              <Link
                className="block w-[130px] mb-6"
                href="/"
                id={formatBtnId("logo")}
              >
                {logoUrl && (
                  <Image
                    alt={company_logo?.data?.attributes?.alternativeText || "Nyxlab"}
                    src={getStrapiAssetUrl(logoUrl)}
                    width={130}
                    height={40}
                    className="h-auto w-auto max-h-[40px]"
                    priority
                  />
                )}
              </Link>

              <p className="text-[13px] text-gray-400 mb-6 leading-relaxed">
                Advanced cybersecurity solutions protecting organizations from
                evolving digital threats.
              </p>

              <div className="flex items-center space-x-4">
                {company_socials?.data?.map(
                  ({
                    attributes: {
                      url: link,
                      social: {
                        data: {
                          attributes: {
                            icon: {
                              data: {
                                attributes: { name, url },
                              },
                            },
                          },
                        },
                      },
                    },
                  }: any) => {
                    const iconUrl = url ? getStrapiAssetUrl(url) : null;
                    if (!iconUrl) return null;
                    
                    return (
                      <Link
                        key={name}
                        id={formatBtnId(name)}
                        aria-label={name}
                        className="text-gray-400 hover:text-white transition-colors"
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={iconUrl}
                          alt={name || "Social icon"}
                          width={20}
                          height={20}
                        />
                      </Link>
                    );
                  }
                )}
              </div>
            </div>

            {/* Right: Columns + Subscribe */}
            <div className="w-full">
              {/* Grid:
                  - 2 cols on mobile
                  - 3 on md
                  - 6 on lg+ with custom widths
                    Services & Subscribe wider, Blog/Contact narrower
               */}
              <div
                className="
                  grid grid-cols-2 gap-8 
                  md:grid-cols-3 
                  lg:grid-cols-6 
                  lg:[grid-template-columns:1.6fr_1.1fr_1.1fr_0.8fr_0.8fr_1.6fr]
                "
              >
                {/* Services (wider) */}
                <div>
                  <h3 className="text-xs md:text-sm font-semibold mb-3 text-white">
                    Services
                  </h3>
                  <ul className="space-y-2.5">
                    {servicesItems.map(
                      ({ attributes: { title, url } }: any) => (
                        <li key={title}>
                          <Link
                            id={formatBtnId(title)}
                            className="text-[13px] text-gray-400 hover:text-white transition-colors whitespace-nowrap"
                            href={getHref(url)}
                            {...(url?.startsWith("http") && {
                              target: "_blank",
                            })}
                          >
                            {title}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Company */}
                <div>
                  <h3 className="text-xs md:text-sm font-semibold mb-3 text-white">
                    Company
                  </h3>
                  <ul className="space-y-2.5">
                    {companyItems.map(
                      ({ attributes: { title, url } }: any) => (
                        <li key={title}>
                          <Link
                            id={formatBtnId(title)}
                            className="text-[13px] text-gray-400 hover:text-white transition-colors whitespace-nowrap"
                            href={getHref(url)}
                            {...(url?.startsWith("http") && {
                              target: "_blank",
                            })}
                          >
                            {title}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Information – Terms + Privacy */}
                <div>
                  <h3 className="text-xs md:text-sm font-semibold mb-3 text-white">
                    Information
                  </h3>
                  <ul className="space-y-2.5">
                    {infoItems.map(
                      ({ attributes: { title, url } }: any) => (
                        <li key={title}>
                          <Link
                            id={formatBtnId(title)}
                            className="text-[13px] text-gray-400 hover:text-white transition-colors whitespace-nowrap"
                            href={getHref(url)}
                            {...(url?.startsWith("http") && {
                              target: "_blank",
                            })}
                          >
                            {title}
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Blog (narrow) */}
                <div>
                  <h3 className="text-xs md:text-sm font-semibold mb-3 text-white">
                    Blog
                  </h3>
                  <ul className="space-y-2.5">
                    <li>
                      <Link
                        id={formatBtnId("Blog")}
                        className="text-[13px] text-gray-400 hover:text-white transition-colors whitespace-nowrap"
                        href="/blog"
                      >
                        Blog
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Contact (narrow) */}
                <div>
                  <h3 className="text-xs md:text-sm font-semibold mb-3 text-white">
                    Contact
                  </h3>
                  <ul className="space-y-2.5">
                    <li>
                      <Link
                        id={formatBtnId("Contact us")}
                        className="text-[13px] text-gray-400 hover:text-white transition-colors whitespace-nowrap"
                        href="/contact"
                      >
                        Contact us
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Subscribe – wider again */}
                <div className="col-span-2 md:col-span-3 lg:col-span-1 lg:max-w-xs">
                  <h3 className="text-xs md:text-sm font-semibold mb-3 text-white">
                    Subscribe
                  </h3>
                  <p className="text-[13px] text-gray-400 mb-3 leading-relaxed">
                    Stay updated with the latest cybersecurity insights and
                    threat intelligence.
                  </p>

                  <form
                    id={formatBtnId("subscribe-form")}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-3.5"
                  >
                    <div>
                      <Input
                        parentClassName="shadow-none border-none px-0 pt-0 !outline-none"
                        className="text-[13px] w-full border-b border-gray-600 bg-transparent px-1 py-2 text-white placeholder-gray-500 outline-none focus:!outline-none focus:border-[#8b3dff] transition-colors"
                        disabled={loading}
                        placeholder="Your email"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: "Please enter a valid email address",
                          },
                        })}
                        error={errors.email?.message}
                      />
                      <p className="text-[11px] text-gray-500 mt-2">
                        Your data is secure with us
                      </p>
                    </div>

                    <Button
                      id={formatBtnId("subscribe")}
                      className="
                        w-full 
                        inline-flex items-center justify-center gap-2
                        py-[11px] px-[20px]
                        rounded-[8px]
                        font-semibold text-[0.9rem]
                        cursor-pointer
                        transition-all duration-300
                        bg-gradient-to-r from-[#e20074] to-[#b600ff]
                        text-white 
                        shadow-[0_0_18px_rgba(226,0,116,0.4)]
                        hover:opacity-90 hover:-translate-y-[2px]
                      "
                      disabled={loading}
                      loading={loading}
                      type="submit"
                    >
                      Subscribe
                    </Button>

                    {shouldShowSuccessMessage && (
                      <p
                        aria-live="polite"
                        className="text-[13px] text-green-400 mt-1"
                      >
                        Thank you for subscribing!
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* ================= BOTTOM STRIP ================= */}
          <div className="border-t border-[#1a1a1a] pt-6">
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
              <div className="text-[13px] text-gray-400">
                ©️ {dayjs().year()} Nyxlab. All rights reserved.
              </div>

              {/* No duplicated legal links here anymore */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;