import { StaticImageData } from "next/image";
import Image1 from "assets/images/cyber-img-1.png";
import BgVideo from "assets/images/bg-video.gif";
import ArrowUpRight from "assets/images/arrow-up-right.svg";

export interface HeroContent {
  backgroundVideo: StaticImageData;
  title: string;
  description: string;
  cta: {
    text: string;
    icon: StaticImageData;
  };
  featuredImage: {
    image: StaticImageData;
    alt: string;
    monitoringLabel: string;
  };
  styles: {
    overlay: string;
    parallaxRange: {
      image: [number, number];
      label: [number, number];
    };
  };
}

export const heroContent: HeroContent = {
  backgroundVideo: BgVideo,
  title: "Building a Future Ecosystem of Cybersecurity Excellence",
  description: "We are on a mission to make cybersecurity proactive, inclusive, and accessible, empowering a safer digital age.",
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
