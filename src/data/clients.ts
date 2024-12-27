import { StaticImageData } from "next/image";
import naverLogo from "assets/images/leaders/naver.svg";
import hktLogo from "assets/images/leaders/hkt.svg";
import transunionLogo from "assets/images/leaders/transunion.svg";
import ficoLogo from "assets/images/leaders/fico.svg";
import cyberportLogo from "assets/images/leaders/cyberport.svg";
import ricohLogo from "assets/images/leaders/ricoh.svg";

export interface Client {
  name: string;
  logo: StaticImageData;
}

export interface ClientsContent {
  title: string;
  clients: Client[];
  sliderSettings: {
    dots: boolean;
    arrows: boolean;
    infinite: boolean;
    speed: number;
    slidesToShow: number;
    cssEase: string;
    slidesToScroll: number;
    mobileFirst: boolean;
    autoplay: boolean;
    autoplaySpeed: number;
    responsive: Array<{
      breakpoint: number;
      settings: {
        slidesToShow: number;
        dots: boolean;
        arrows: boolean;
      };
    }>;
  };
}

export const clientsContent: ClientsContent = {
  title: "Trusted by industry leaders worldwide",
  clients: [
    { name: "NAVER", logo: naverLogo },
    { name: "HKT", logo: hktLogo },
    { name: "TransUnion", logo: transunionLogo },
    { name: "FICO", logo: ficoLogo },
    { name: "Cyberport", logo: cyberportLogo },
    { name: "RICOH", logo: ricohLogo },
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
