import { StaticImageData } from "next/image";
import miraImage from "assets/images/team/mira.png";
import brandonImage from "assets/images/team/brandon.png";
import wilsonImage from "assets/images/team/wilson.png";
import jirouImage from "assets/images/team/jirou.png";
import marcelaImage from "assets/images/team/marcela.png";
import craigImage from "assets/images/team/craig.png";

export interface TeamMember {
  name: string;
  role: string;
  image: StaticImageData;
}

export interface BrandMissionContent {
  tags: string[];
  title: string;
  description: string;
  teamMembers: TeamMember[];
}

export const brandMissionContent: BrandMissionContent = {
  tags: ["Accessibility", "Academy", "Organizations"],
  title: "Democratizing\nCybersecurity for All",
  description: "At Cyberbay, we transform cybersecurity with a proactive and inclusive approach, leveraging the knowledge of ethical hackers to establish a robust, interconnected ecosystem that fosters transparency through innovative technologies and universal empowerment.",
  teamMembers: [
    { name: "Mira Siphron", role: "Engineer Student", image: miraImage },
    { name: "Brandon Donin", role: "Entrepreneur", image: brandonImage },
    { name: "Wilson Geidt", role: "Hacker", image: wilsonImage },
    { name: "Jirou Yuuma", role: "CEO", image: jirouImage },
    { name: "Marcela Nora", role: "College Dean", image: marcelaImage },
    { name: "Craig Culhane", role: "Hacker Leader", image: craigImage },
  ],
};
