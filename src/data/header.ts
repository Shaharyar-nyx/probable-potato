import { StaticImageData } from "next/image";
import BgPricing from "assets/images/headers/header-pricing.png";

export interface HeaderContent {
  title: string;
  backgroundImage: StaticImageData;
  description: string;
}

export const headerContent: HeaderContent = {
  title: "Cyberbay Pricing",
  backgroundImage: BgPricing,
  description:
    "Cyberbay connects highly skilled bounty hunters with enterprises to find and fix bugs through our Bounty Missions. Get Started Today!",
};
