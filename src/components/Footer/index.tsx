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
    <footer className="text-white" style={{ backgroundColor: background_color }}>
      <div className="mx-auto max-w-screen-2xl px-6 py-[60px] lg:px-16 lg:py-20">
        <div className="flex flex-col space-y-10 lg:space-y-8">
          {/* Main Content */}
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:gap-16">
            {/* Left Side - Logo and Navigation */}
            <div className="flex flex-col gap-[40px] lg:flex-row">
              <div className="flex-shrink-0">
                <Link className="block w-[140px]" href="/" id={formatBtnId("logo")}>
                  <img alt="Cyberbay" src={`${STRAPI_ASSETS}${company_logo?.data?.attributes?.url}`} />
                </Link>
              </div>

              <div className="hidden grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-3 lg:grid">
                {navigations.data[0].attributes.items.data.map(
                  ({ attributes: { title, has_children, children } }: any) => (
                    <div key={title}>
                      <h3 className="heading-8 mb-6 font-bold">{title}</h3>
                      <ul className="paragraph-sm space-y-4">
                        {has_children &&
                          children?.data.map(({ attributes: { title, url } }: any) => (
                            <li key={url}>
                              <Link
                                id={formatBtnId(title)}
                                className="transition-colors hover:text-gray-300"
                                href={url?.startsWith("http") ? url : url?.startsWith("/") ? url : `/${url}`}
                                {...(url?.startsWith("http") && { target: "_blank" })}
                              >
                                {title}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ),
                )}
              </div>
            </div>

            {/* Right Side - Stay Connected */}
            <div className="flex-shrink-0 lg:w-[360px]">
              <h3 className="heading-8 mb-[20px] font-bold lg:mb-4">Subscribe to Our Newsletter</h3>
              <p className="paragraph-sm mb-3 lg:mb-6">
                Get the latest cybersecurity insights and updates. You can unsubscribe at any time.
              </p>
              <form id={formatBtnId("subscribe-form")} onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-3">
                  <Input
                    parentClassName="shadow-none border-none px-0 pt-0 !outline-none"
                    className="paragraph-sm w-full border-b border-primary-500 bg-transparent px-1 py-2 text-white placeholder-[#EFF0F2B2] outline-none focus:!outline-none"
                    disabled={loading}
                    placeholder="Enter your email address"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: "Please enter a valid email address",
                      },
                    })}
                    error={errors.email?.message}
                  />

                  <Button
                    id={formatBtnId("subscribe")}
                    className="paragraph-sm w-full rounded bg-primary-500 px-8 py-3 text-white transition-colors hover:bg-[#1E90FF]/90"
                    disabled={loading}
                    loading={loading}
                    size="large"
                    type="submit"
                  >
                    Subscribe
                  </Button>

                  {shouldShowSuccessMessage && (
                    <p aria-live="polite" className="paragraph-sm text-neutral-50">
                      Thank you for reaching out! We will get back to you shortly.
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-8">
            <div className="flex flex-col items-start gap-3 lg:grid lg:grid-cols-3 lg:items-center">
              <div className="paragraph-sm flex items-center space-x-6 text-neutral-200">
                {navigations.data[1].attributes.items.data.map(({ attributes: { title, url } }: any) => (
                  <Link
                    key={url}
                    id={formatBtnId(title)}
                    href={url?.startsWith("http") ? url : url?.startsWith("/") ? url : `/${url}`}
                    {...(url?.startsWith("http") && { target: "_blank" })}
                  >
                    {title}
                  </Link>
                ))}
              </div>
              <div className="paragraph-sm text-center text-neutral-200">&copy; {dayjs().year()} Cyberbay.</div>
              <div className="flex items-center justify-end space-x-4">
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
                      className="text-neutral-200 hover:text-white"
                      href={link}
                      target="_blank"
                    >
                      <Image src={`${STRAPI_ASSETS}${url}`} alt={name} width={24} height={24} />
                    </Link>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
