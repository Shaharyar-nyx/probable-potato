import { StaticImageData } from "next/image";

import brandonImage from "assets/images/team/brandon.png";
import craigImage from "assets/images/team/craig.png";
import jirouImage from "assets/images/team/jirou.png";
import marcelaImage from "assets/images/team/marcela.png";
import miraImage from "assets/images/team/mira.png";
import wilsonImage from "assets/images/team/wilson.png";

export interface TeamMember {
  image: StaticImageData;
  name: string;
  role: string;
}

export interface BrandMissionContent {
  description: string;
  tags: string[];
  teamMembers: TeamMember[];
  title: string;
}

export const brandMissionContent: BrandMissionContent = {
  tags: ["Accessibility", "Academy", "Organizations"],
  title: "Democratizing\nCybersecurity for All",
  description:
    "At Cyberbay, we transform cybersecurity with a proactive and inclusive approach, leveraging the knowledge of ethical hackers to establish a robust, interconnected ecosystem that fosters transparency through innovative technologies and universal empowerment.",
  teamMembers: [
    { name: "Mira Siphron", role: "Engineer Student", image: miraImage },
    { name: "Brandon Donin", role: "Entrepreneur", image: brandonImage },
    { name: "Wilson Geidt", role: "Hacker", image: wilsonImage },
    { name: "Jirou Yuuma", role: "CEO", image: jirouImage },
    { name: "Marcela Nora", role: "College Dean", image: marcelaImage },
    { name: "Craig Culhane", role: "Hacker Leader", image: craigImage },
  ],
};
