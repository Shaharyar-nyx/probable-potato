export interface HeroContent {
  backgroundVideo: string;
  cta: {
    icon: string;
    text: string;
  };
  description: string;
  featuredImage: {
    alt: string;
    image: string;
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
  backgroundVideo: "/images/bg-video.gif",
  title: "Building a Future Ecosystem of Cybersecurity Excellence",
  description:
    "We are on a mission to make cybersecurity proactive, inclusive, and accessible, empowering a safer digital age.",
  cta: {
    text: "Request a Demo",
    icon: "/images/arrow-up-right.svg",
  },
  featuredImage: {
    image: "/images/cyber-img-1.png",
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
