"use client";

import Image from "next/image";
import Link from "next/link";

interface Member {
  Name: string;
  Position: string;
  Location: string;
  LinkedInURL?: string;
  Description?: string;
  HierarchyLevel: string; // "Top" | "Mid"
  Image?: {
    data?: {
      attributes?: {
        url?: string;
        alternativeText?: string;
      };
    };
  };
}

interface LeadershipProps {
  Title: string;
  Description?: string;
  team_member: Member[];
}

const STRAPI_ASSETS = "https://shark-app-tmqz4.ondigitalocean.app";

const LeadershipSection: React.FC<LeadershipProps> = ({
  Title,
  Description,
  team_member,
}) => {
  if (!team_member || team_member.length === 0) return null;

  // Top leader first, then others – but visually same card layout
  const sortedMembers = [...team_member].sort((a, b) => {
    if (a.HierarchyLevel === "Top" && b.HierarchyLevel !== "Top") return -1;
    if (b.HierarchyLevel === "Top" && a.HierarchyLevel !== "Top") return 1;
    return 0;
  });

  return (
    <section className="relative bg-black text-white py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        {/* === Title & Intro === */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-5">{Title}</h2>
          {Description && (
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              {Description}
            </p>
          )}
        </div>

        {/* === Leaders Grid === */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
          {sortedMembers.map((member, index) => {
            const isTop = member.HierarchyLevel === "Top";

            return (
              <div
                key={`${member.Name}-${index}`}
                className="relative flex flex-col items-center text-center bg-gradient-to-b from-[#0a0a0a] to-[#111] border border-gray-800 rounded-2xl p-7 shadow-[0_0_30px_rgba(0,0,0,0.55)] hover:border-[#ff4fd8] transition"
              >
                {/* Small badge for the top leader (optional, can remove) */}
                {isTop && (
                  <span className="absolute -top-3 px-3 py-0.5 text-[10px] font-semibold tracking-wide uppercase rounded-full bg-[#ff4fd8] text-black">
                    Lead
                  </span>
                )}

                {/* Avatar */}
                {member.Image?.data?.attributes?.url && STRAPI_ASSETS && (
                  <div className="w-24 h-24 md:w-28 md:h-28 mx-auto mb-4 rounded-xl overflow-hidden border border-gray-700 shadow-[0_0_22px_rgba(255,79,216,0.25)]">
                    <Image
                      src={`${STRAPI_ASSETS}${member.Image.data.attributes.url}`}
                      alt={
                        member.Image.data.attributes.alternativeText ||
                        member.Name
                      }
                      width={112}
                      height={112}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                {/* Name / Role / Location */}
                <h3 className="text-lg md:text-xl font-semibold">
                  {member.Name}
                </h3>
                <p className="text-gray-300 text-xs md:text-sm mt-1">
                  {member.Position}
                </p>
                <p className="text-gray-500 text-[11px] md:text-xs mt-0.5">
                  {member.Location}
                </p>

                {/* LinkedIn */}
                {member.LinkedInURL && (
                  <Link
                    href={member.LinkedInURL}
                    target="_blank"
                    className="inline-flex justify-center items-center mt-3"
                  >
                    <div className="flex justify-center items-center w-8 h-8 rounded-full transition">
                      <img
                        src="/images/4494498-removebg-preview.png"
                        alt="LinkedIn"
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                  </Link>
                )}

                {/* Bio */}
                {member.Description && (
                  <p className="text-gray-400 text-[11px] md:text-xs mt-4 leading-relaxed">
                    {member.Description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LeadershipSection;