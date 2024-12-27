import { StaticImageData } from "next/image";

import BgPricing from "assets/images/headers/header-pricing.png";

export interface HeaderContent {
  backgroundImage: StaticImageData;
  description: string;
  title: string;
}

export const headerContent: HeaderContent = {
  backgroundImage: BgPricing,
  description:
    "Cyberbay connects highly skilled bounty hunters with enterprises to find and fix bugs through our Bounty Missions. Get Started Today!",
  title: "Cyberbay Pricing",
};
