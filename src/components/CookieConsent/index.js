"use client";

import { useEffect } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import getConfig from "./config";

const CookieConsentComponent = () => {
  useEffect(() => {
    CookieConsent.run(getConfig());
  }, []);

  return null;
};

export default CookieConsentComponent;
