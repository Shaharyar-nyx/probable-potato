import { StaticImageData } from "next/image";

export interface TeamMember {
  image: string;
  name: string;
  title: string;
}

export interface BrandMissionContent {
  description: string;
  tags: string[];
  teamMembers: TeamMember[];
  title: string;
}

export const brandMissionContent: BrandMissionContent = {
  tags: ["Accessibility", "Academy", "Organizations"],
  title: "Democratizing Cybersecurity for All",
  description:
    "At Cyberbay, we transform cybersecurity with a proactive and inclusive approach, leveraging the knowledge of ethical hackers to establish a robust, interconnected ecosystem that fosters transparency through innovative technologies and universal empowerment.",
  teamMembers: [
    {
      image: "/images/team/mira.png",
      name: "Mira",
      title: "Chief Financial Officer",
    },
    {
      image: "/images/team/brandon.png",
      name: "Brandon",
      title: "Chief Executive Officer",
    },
    {
      image: "/images/team/wilson.png",
      name: "Wilson",
      title: "Chief Security Officer",
    },
    {
      image: "/images/team/jirou.png",
      name: "Jirou",
      title: "Chief Operating Officer",
    },
    {
      image: "/images/team/marcela.png",
      name: "Marcela",
      title: "Chief Marketing Officer",
    },
    {
      image: "/images/team/craig.png",
      name: "Craig",
      title: "Chief Technology Officer",
    },
  ],
};
