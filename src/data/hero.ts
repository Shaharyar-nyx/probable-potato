import { StaticImageData } from "next/image";

import ArrowUpRight from "assets/images/arrow-up-right.svg";
import BgVideo from "assets/images/bg-video.gif";
import Image1 from "assets/images/cyber-img-1.png";

export interface HeroContent {
  backgroundVideo: StaticImageData;
  cta: {
    icon: StaticImageData;
    text: string;
  };
  description: string;
  featuredImage: {
    alt: string;
    image: StaticImageData;
    monitoringLabel: string;
  };
  styles: {
    overlay: string;
    parallaxRange: {
      image: [number, number];
      label: [number, number];
    };
  };
  title: string;
}

export const heroContent: HeroContent = {
  backgroundVideo: BgVideo,
  title: "Building a Future Ecosystem of Cybersecurity Excellence",
  description:
    "We are on a mission to make cybersecurity proactive, inclusive, and accessible, empowering a safer digital age.",
  cta: {
    text: "Request a Demo",
    icon: ArrowUpRight,
  },
  featuredImage: {
    image: Image1,
    alt: "Cybersecurity Monitoring",
    monitoringLabel: "24/7 Threat Monitoring",
  },
  styles: {
    overlay: "absolute inset-0",
    parallaxRange: {
      image: [-20, 20],
      label: [15, -15],
    },
  },
};
