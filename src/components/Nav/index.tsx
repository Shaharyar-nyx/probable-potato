"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import { Button, IconRenderer } from "@/components";

import { STRAPI_ASSETS } from "@/lib";

export const Nav: React.FC<any> = ({ company_logo, navigations, supported_languages, button_group }) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSolutionsDropdown, setShowSolutionsDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState({
    code: "en",
    name: "EN",
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only handle click outside in desktop view (>= 1024px)
      if (window.innerWidth >= 1024) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node)
        ) {
          setShowSolutionsDropdown(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowSolutionsDropdown(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed left-0 right-0 lg:top-8 z-[9999] mx-auto h-[60px] w-full max-w-screen-2xl lg:px-4">
      <div
        className={`relative mx-auto flex h-full items-center justify-between bg-neutral-50 px-[29px] lg:px-4 shadow-lg ${showSolutionsDropdown ? "rounded-t-lg" : "rounded-lg"
          }`}
      >
        <div className="flex items-center gap-8">
          <Link href="/">
            <img alt="Cyberbay" src={STRAPI_ASSETS + company_logo.data.attributes.url} />
          </Link>

          <div className="hidden items-center gap-3 lg:flex">
            {navigations.data[0].attributes.items.data.map(
              ({ attributes: { title, url, has_children, children } }: any) => (
                <div key={title}>
                  {has_children ? (
                    <button
                      ref={buttonRef}
                      className={`group flex items-center rounded-lg px-3 py-2 text-base transition-colors hover:bg-[#EFF0F2CC] ${pathname.includes(title.toLowerCase()) || showSolutionsDropdown ? "text-primary-500" : "text-primary-800 hover:text-primary-500"}`}
                      onClick={() => setShowSolutionsDropdown(!showSolutionsDropdown)}
                    >
                      {title}
                      <span
                        className={`ml-1 inline-block transition-transform duration-200 ${showSolutionsDropdown ? "rotate-180" : ""}`}
                      >
                        <img alt="Chevron Down" src="/images/chevron-down.svg" />
                      </span>
                    </button>
                  ) : (
                    <Link
                      className={`group rounded-lg px-3 py-2 text-base transition-colors hover:bg-[#EFF0F2CC] ${pathname.includes(url) ? "text-primary-500" : "text-primary-800 hover:text-primary-500"
                        }`}
                      href={url.startsWith("/") ? url : `/${url}`}
                    >
                      {title}
                    </Link>
                  )}

                  {has_children && showSolutionsDropdown && (
                    <div
                      ref={dropdownRef}
                      className="absolute left-0 top-[60px] w-full rounded-b-xl bg-neutral-50 shadow-lg"
                    >
                      <div className="px-10 pb-10 pt-5">
                        <div className="grid grid-cols-3 gap-[44px]">
                          {children?.data.map(({ attributes: { title, children } }: any) => {
                            return (
                              <div key={title} className="w-full">
                                <h3 className="paragraph-md mb-5 font-semibold text-primary-800">{title}</h3>
                                <div className="space-y-6">
                                  {children?.data.map(({ attributes: { title, url, icon, description } }: any) => (
                                    <Link
                                      key={title}
                                      className="group block rounded-[8px] p-4 hover:bg-primary-500"
                                      href={url.startsWith("/") ? url : `/${url}`}
                                      onClick={() => setShowSolutionsDropdown(false)}
                                    >
                                      <div className="flex items-start gap-2">
                                        <span className="rounded-[4px] p-1 text-2xl group-hover:bg-neutral-50">
                                          {icon?.data?.attributes?.url ? (
                                            <img
                                              alt={title}
                                              className="text-primary-80 h-[20px] w-[20px]"
                                              src={STRAPI_ASSETS + icon?.data?.attributes?.url}
                                            />
                                          ) : (
                                            <div className="h-[20px] w-[20px] bg-neutral-300" />
                                          )}
                                        </span>
                                        <div className="w-full">
                                          <div className="paragraph-md mb-1 text-primary-800 group-hover:text-neutral-50">
                                            {title}
                                          </div>
                                          <p className="paragraph-sm text-neutral-800 group-hover:text-neutral-50">
                                            {description}
                                          </p>
                                        </div>
                                      </div>
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ),
            )}
          </div>
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {/* <div className="relative">
            <button
              className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-[#EFF0F2CC]"
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            >
              <span className="text-primary-800">{selectedLanguage.name}</span>
              <span
                className={`transition-transform duration-200 ${showLanguageDropdown ? "rotate-180" : ""}`}
              >
                <img alt="Chevron Down" src="/images/chevron-down.svg" />
              </span>
            </button>

            {showLanguageDropdown && (
              <div className="absolute right-0 top-full mt-2 w-full min-w-[120px] rounded-lg bg-neutral-50 py-2 shadow-lg">
                {supported_languages.data.map(({ attributes: lang }: any) => (
                  <button
                    key={lang.code}
                    className="flex w-full items-center gap-2 px-4 py-2 transition-colors hover:bg-[#EFF0F2CC]"
                    onClick={() => {
                      setSelectedLanguage(lang);
                      setShowLanguageDropdown(false);
                    }}
                  >
                    <span className="text-primary-800">{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div> */}

          {button_group?.map((data: any, index: number) => (
            <Button
              key={index}
              href={data.href || undefined}
              externalHref={data.external_href || undefined}
              variant={data.variant}
              transparent={data.transparent}
              className="py-2 px-3 min-w-[100px]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {data.title}
            </Button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          className="flex items-center justify-center rounded-lg p-0 text-primary-800 lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <IconRenderer className="h-6 w-6" iconName="XMarkIcon" />
          ) : (
            <IconRenderer className="h-6 w-6" iconName="Bars3Icon" />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={`absolute left-0 right-0 top-[55px] overflow-y-scroll bg-neutral-50 shadow-lg transition-all duration-300 ease-in-out lg:top-[72px] lg:hidden ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
            }`}
          style={{ height: "calc(100vh - 55px)" }}
        >
          <div className="flex flex-col h-full justify-between space-y-2 py-[18px] px-[29px]">
            <div>
              {navigations.data[0].attributes.items.data.map(
                ({ attributes: { url, has_children, children, title, description } }: any) => (
                  <div key={title} className="w-full">
                    {has_children ? (
                      <button
                        className={`w-full border-b border-primary-800 px-0 pt-[15px] pb-2 text-left text-base transition-colors ${pathname === url ? "bg-primary-50 text-primary-500" : "text-primary-800"
                          }`}
                        onClick={() => {
                          setShowSolutionsDropdown(!showSolutionsDropdown);
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span>{title}</span>
                          {has_children && (
                            <IconRenderer
                              className={`h-5 w-5 ml-1 transition-transform duration-200 ${showSolutionsDropdown ? "rotate-180" : ""}`}
                              iconName="ChevronDownIcon"
                            />
                          )}
                        </div>
                      </button>
                    ) : (
                      <div className="w-full border-b border-primary-800 px-0 pt-[15px] pb-2 text-left transition-colors">
                        <Link
                          className={`text-base text-primary-800`}
                          href={url.startsWith("/") ? url : `/${url}`}
                        >
                          {title}
                        </Link>
                      </div>
                    )}

                    {has_children && showSolutionsDropdown && (
                      <div className="mt-2 space-y-2">
                        {children?.data.map(({ attributes: { title, children } }: any) => (
                          <div key={title} className="py-4">
                            <div className="mb-3 text-sm font-semibold text-primary-800">{title}</div>
                            <div className="space-y-3">
                              {children?.data.map(({ attributes: { title, url, icon, description } }: any) => (
                                <Link
                                  key={title}
                                  className="group flex items-start space-x-3 rounded-lg p-2 transition-colors hover:bg-primary-500 group-hover:text-neutral-50"
                                  href={url.startsWith("/") ? url : `/${url}`}
                                >
                                  <span className="flex-shrink-0 rounded-md p-1">
                                    <img
                                      alt={title}
                                      className="h-5 w-5 text-primary-500"
                                      src={STRAPI_ASSETS + icon?.data?.attributes?.url}
                                    />
                                  </span>
                                  <div>
                                    <div className="text-sm text-primary-800 group-hover:text-neutral-50">
                                      {title}
                                    </div>
                                    <p className="text-xs text-neutral-600 group-hover:text-neutral-50">{description}</p>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ),
              )}
            </div>

            {/* 
            <div className="relative">
              <button
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-medium transition-colors hover:bg-[#EFF0F2CC]"
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              >
                <span className="text-primary-800">{selectedLanguage.name}</span>
                <IconRenderer
                  iconName="ChevronDownIcon"
                  className={`h-5 w-5 transition-transform duration-200 ${showLanguageDropdown ? "rotate-180" : ""}`}
                />
              </button>

              {showLanguageDropdown && (
                <div className="absolute right-0 top-full mt-2 w-full rounded-lg bg-neutral-50 py-2 shadow-lg">
                  {supported_languages.data.map(({ attributes: lang }: any) => (
                    <button
                      key={lang.code}
                      className="flex w-full items-center px-4 py-2 text-base transition-colors hover:bg-[#EFF0F2CC]"
                      onClick={() => {
                        setSelectedLanguage(lang);
                        setShowLanguageDropdown(false);
                      }}
                    >
                      <span className="text-primary-800">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div> */}

            <div className="flex flex-row gap-3 pt-4 pt-[100px] pb-[42px]">
              {button_group?.map((data: any, index: number) => (
                <Button
                  key={index}
                  href={data.href || undefined}
                  externalHref={data.external_href || undefined}
                  variant={data.variant}
                  transparent={data.transparent}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {data.title}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
