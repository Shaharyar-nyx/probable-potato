import { StaticImageData } from "next/image";

import cyberportLogo from "assets/images/leaders/cyberport.svg";
import ficoLogo from "assets/images/leaders/fico.svg";
import hktLogo from "assets/images/leaders/hkt.svg";
import naverLogo from "assets/images/leaders/naver.svg";
import ricohLogo from "assets/images/leaders/ricoh.svg";
import transunionLogo from "assets/images/leaders/transunion.svg";

export interface Client {
  logo: StaticImageData;
  name: string;
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
}

export const clientsContent: ClientsContent = {
  title: "Trusted by industry leaders worldwide",
  clients: [
    { logo: naverLogo, name: "NAVER" },
    { logo: hktLogo, name: "HKT" },
    { logo: transunionLogo, name: "TransUnion" },
    { logo: ficoLogo, name: "FICO" },
    { logo: cyberportLogo, name: "Cyberport" },
    { logo: ricohLogo, name: "RICOH" },
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
