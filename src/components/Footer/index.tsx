"use client";

import { useSubmitSubscribe } from "@/hooks/useSubmitSubscribe";
import { SubscribeType } from "@/types";
import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, Input } from "../UI";
import { formatBtnId, STRAPI_ASSETS } from "@/lib";
import Image from "next/image";

const Footer: React.FC<any> = ({ company_logo, navigations, company_socials, background_color }) => {
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

  return (
    <footer className="bg-[#0b0b0b] text-white">
      <div className="mx-auto max-w-screen-2xl px-6 py-12 lg:px-16 lg:py-16">
        <div className="flex flex-col space-y-8">
          {/* Main Content */}
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:gap-16">
            {/* Left Side - Logo and Description */}
            <div className="lg:max-w-md">
              <Link className="block w-[120px] mb-6" href="/" id={formatBtnId("logo")}>
                <img alt="DarkLab" src={`${STRAPI_ASSETS}${company_logo?.data?.attributes?.url}`} />
              </Link>
              <p className="text-sm text-gray-400 mb-6">
                Advanced cybersecurity solutions protecting organizations from evolving digital threats.
              </p>
              
              {/* Social Links */}
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
                  }: any) => (
                    <Link
                      key={name}
                      id={formatBtnId(name)}
                      aria-label={name}
                      className="text-gray-400 hover:text-white transition-colors"
                      href={link}
                      target="_blank"
                    >
                      <Image src={`${STRAPI_ASSETS}${url}`} alt={name} width={20} height={20} />
                    </Link>
                  ),
                )}
              </div>
            </div>

            {/* Navigation Sections - Using your existing navigation data */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-3">
              {/* Services Section */}
              <div>
                <h3 className="text-sm font-semibold mb-4 text-white">Solutions</h3>
                <ul className="space-y-3">
                  {navigations?.data?.[0]?.attributes?.items?.data?.[0]?.attributes?.children?.data?.map(
                    ({ attributes: { title, url } }: any) => (
                      <li key={url}>
                        <Link
                          id={formatBtnId(title)}
                          className="text-sm text-gray-400 hover:text-white transition-colors"
                          href={url?.startsWith("http") ? url : url?.startsWith("/") ? url : `/${url}`}
                          {...(url?.startsWith("http") && { target: "_blank" })}
                        >
                          {title}
                        </Link>
                      </li>
                    )
                  ) || <li className="text-sm text-gray-500">No services available</li>}
                </ul>
              </div>

              {/* Company Section */}
              <div>
                <h3 className="text-sm font-semibold mb-4 text-white">Company</h3>
                <ul className="space-y-3">
                  {navigations?.data?.[0]?.attributes?.items?.data?.[1]?.attributes?.children?.data?.map(
                    ({ attributes: { title, url } }: any) => (
                      <li key={url}>
                        <Link
                          id={formatBtnId(title)}
                          className="text-sm text-gray-400 hover:text-white transition-colors"
                          href={url?.startsWith("http") ? url : url?.startsWith("/") ? url : `/${url}`}
                          {...(url?.startsWith("http") && { target: "_blank" })}
                        >
                          {title}
                        </Link>
                      </li>
                    )
                  ) || <li className="text-sm text-gray-500">No links available</li>}
                </ul>
              </div>

              {/* Subscribe Section */}
              <div className="lg:max-w-xs">
                <h3 className="text-sm font-semibold mb-4 text-white">Subscribe</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Stay updated with the latest cybersecurity insights and threat intelligence.
                </p>
                
                <form id={formatBtnId("subscribe-form")} onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Input
                      parentClassName="shadow-none border-none px-0 pt-0 !outline-none"
                      className="text-sm w-full border-b border-gray-600 bg-transparent px-1 py-2 text-white placeholder-gray-500 outline-none focus:!outline-none focus:border-[#8b3dff] transition-colors"
                      disabled={loading}
                      placeholder="Your email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                          message: "Please enter a valid email address",
                        },
                      })}
                      error={errors.email?.message}
                    />
                    <p className="text-xs text-gray-500 mt-2">Your data is secure with us</p>
                  </div>

                  <Button
  id={formatBtnId("subscribe")}
  className="
    w-full 
    inline-flex items-center justify-center gap-2
    py-[14px] px-[28px]
    rounded-[8px]
    font-semibold text-[0.95rem]
    cursor-pointer
    transition-all duration-300
    bg-gradient-to-r from-[#e20074] to-[#b600ff]
    text-white 
    shadow-[0_0_20px_rgba(226,0,116,0.4)]
    hover:opacity-90 hover:-translate-y-[2px]
  "
  disabled={loading}
  loading={loading}
  type="submit"
>
  Subscribe
</Button>

                  {shouldShowSuccessMessage && (
                    <p aria-live="polite" className="text-sm text-green-400">
                      Thank you for subscribing!
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-[#1a1a1a] pt-6">
            <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between">
              <div className="text-sm text-gray-400">
                © {dayjs().year()} Nyxlab. All rights reserved.
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-400">
                {navigations?.data?.[1]?.attributes?.items?.data?.map(({ attributes: { title, url } }: any) => (
                  <Link
                    key={url}
                    id={formatBtnId(title)}
                    className="hover:text-white transition-colors"
                    href={url?.startsWith("http") ? url : url?.startsWith("/") ? url : `/${url}`}
                    {...(url?.startsWith("http") && { target: "_blank" })}
                  >
                    {title}
                  </Link>
                )) || <span className="text-gray-500">No links available</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;