"use client";

import React, { createContext, useContext } from "react";

import { useSiteContext } from "@/hooks/use-site";

const SiteContext = createContext(null);

export type SiteContextType = {
  children: React.ReactNode;
  mainNav: any; // To be replace when proper types are available when fetching navigation.
  footerNav: any; // To be replace when proper types are available when fetching navigation.
};

export const SiteContextProvider = ({ children, mainNav, footerNav }: SiteContextType) => {
  const site = useSiteContext({ mainNav, footerNav });

  return <SiteContext.Provider value={site}>{children}</SiteContext.Provider>;
};

export const useSiteContextValue = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error("useSiteContextValue must be used within a SiteContextProvider");
  }
  return context;
};
