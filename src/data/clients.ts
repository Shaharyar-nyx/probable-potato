import { StaticImageData } from "next/image";

export interface Client {
  logo: string;
  name: string;
  description: string;
}

export interface ClientsContent {
  clients: Client[];
  sliderSettings: {
    arrows: boolean;
    autoplay: boolean;
    autoplaySpeed: number;
    cssEase: string;
    dots: boolean;
    infinite: boolean;
    mobileFirst: boolean;
    responsive: Array<{
      breakpoint: number;
      settings: {
        arrows: boolean;
        dots: boolean;
        slidesToShow: number;
      };
    }>;
    slidesToScroll: number;
    slidesToShow: number;
    speed: number;
  };
  title: string;
  description: string;
}

export const clientsContent: ClientsContent = {
  title: "Trusted by Industry Leaders",
  description:
    "Join the ranks of industry leaders who trust Cyberbay for their cybersecurity needs. Our proven track record speaks for itself.",
  clients: [
    {
      logo: "/images/leaders/cyberport.svg",
      name: "Cyberport",
      description: "Digital technology hub and innovative ecosystem",
    },
    {
      logo: "/images/leaders/fico.svg",
      name: "FICO",
      description: "Analytics software company",
    },
    {
      logo: "/images/leaders/hkt.svg",
      name: "HKT",
      description: "Premier telecommunications service provider",
    },
    {
      logo: "/images/leaders/naver.svg",
      name: "Naver",
      description: "South Korean online platform company",
    },
    {
      logo: "/images/leaders/ricoh.svg",
      name: "Ricoh",
      description: "Japanese multinational imaging company",
    },
    {
      logo: "/images/leaders/transunion.svg",
      name: "TransUnion",
      description: "Global information and insights company",
    },
  ],
  sliderSettings: {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 4000,
    slidesToShow: 5,
    cssEase: "linear",
    slidesToScroll: 1,
    mobileFirst: true,
    autoplay: true,
    autoplaySpeed: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          dots: false,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          dots: false,
          arrows: false,
        },
      },
    ],
  },
};
