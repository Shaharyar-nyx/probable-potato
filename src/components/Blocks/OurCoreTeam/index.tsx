import Image from "next/image";
import React from "react";

import { OurCoreTeamProps } from "@/types";

import "./styles.scss";

export const OurCoreTeam: React.FC<OurCoreTeamProps> = ({ title, content, core }) => {
  const CARDS_PER_ROW = 3;
  const rows = core.reduce<Array<typeof core>>((acc, item, index) => {
    const rowIndex = Math.floor(index / CARDS_PER_ROW);
    if (!acc[rowIndex]) {
      acc[rowIndex] = [];
    }
    acc[rowIndex].push(item);
    return acc;
  }, []);

  return (
    <section className="our-core-team">
      <h2 className="heading-2 our-core-team-title">{title}</h2>
      <p className="paragraph-2 our-core-team-content">{content}</p>
      <div className="our-core-team-grid">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="our-core-team-row">
            {row.map((member, index) => (
              <div key={index} className="our-core-team-card">
                <div className="flex flex-row items-center justify-between">
                  <h5 className="our-core-team-card-name heading-5">{member.name}</h5>

                  <div className="our-core-team-card-social">
                    {member.social.map((social, idx) => (
                      <a
                        key={idx}
                        className="our-core-team-card-social-link"
                        href={social.link}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Image alt={social.icon} height={10} src={social.icon} width={10} />
                      </a>
                    ))}
                  </div>
                </div>
                <p className="our-core-team-card-title">{member.title}</p>
                <p className="our-core-team-card-description">{member.description}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
