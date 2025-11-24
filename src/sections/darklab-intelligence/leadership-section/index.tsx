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
  Title?: string;
  Description?: string;
  team_member?: Member[];
  [key: string]: any;
}

// Updated: Removed localhost fallback
const STRAPI_ASSETS = process.env.NEXT_PUBLIC_STRAPI_ASSETS;

const LeadershipSection: React.FC<LeadershipProps> = ({
  Title = '',
  Description,
  team_member = [],
}) => {
  if (!team_member || team_member.length === 0) return null;

  const topLeader = team_member.find((m) => m.HierarchyLevel === "Top");
  const otherMembers = team_member.filter((m) => m.HierarchyLevel !== "Top");

  return (
    <section className="relative bg-black text-white py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center px-6">
        {/* === Title === */}
        <h2 className="text-3xl font-bold mb-6">{Title}</h2>
        {Description && (
          <p className="text-gray-400 max-w-2xl mx-auto mb-20 leading-relaxed">
            {Description}
          </p>
        )}

        {/* === Top Leader === */}
        {topLeader && (
          <div className="relative flex justify-center mb-32">
            <div className="bg-gradient-to-b from-[#0a0a0a] to-[#111] border border-gray-800 rounded-2xl p-8 w-[370px] shadow-[0_0_40px_rgba(0,0,0,0.6)] hover:border-blue-500 transition">
              {topLeader.Image?.data?.attributes?.url && STRAPI_ASSETS && (
                <div className="w-28 h-28 mx-auto mb-4 rounded-xl overflow-hidden border border-gray-700 shadow-[0_0_25px_rgba(59,130,246,0.3)]">
                  <Image
                    src={`${STRAPI_ASSETS}${topLeader.Image.data.attributes.url}`}
                    alt={
                      topLeader.Image.data.attributes.alternativeText ||
                      topLeader.Name
                    }
                    width={112}
                    height={112}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}

              <h3 className="text-xl font-semibold">{topLeader.Name}</h3>
              <p className="text-gray-300 text-sm mt-1">{topLeader.Position}</p>
              <p className="text-gray-500 text-xs">{topLeader.Location}</p>

              {topLeader.LinkedInURL && (
                <Link
                  href={topLeader.LinkedInURL}
                  target="_blank"
                  className="inline-flex justify-center items-center mt-3"
                >
                  <div className="flex justify-center items-center w-8 h-8 rounded-full transition">
                    <img src="images/4494498-removebg-preview.png" alt="" />
                  </div>
                </Link>
              )}

              {topLeader.Description && (
                <p className="text-gray-400 text-xs mt-4 leading-relaxed">
                  {topLeader.Description}
                </p>
              )}
            </div>

            {/* Connector Line (vertical to others) */}
            <div className="absolute left-1/2 top-full w-[2px] h-[60px] bg-gray-700/50 -translate-x-1/2"></div>
          </div>
        )}

        {/* === Lower Members === */}
        {otherMembers.length > 0 && (
          <div className="relative flex flex-wrap justify-center gap-12">
            {/* Horizontal Connector */}
            <div className="absolute -top-10 left-[8%] right-[8%] h-[2px] bg-gray-700/40"></div>

            {otherMembers.map((member, index) => (
              <div
                key={index}
                className="relative bg-gradient-to-b from-[#0a0a0a] to-[#111] border border-gray-800 rounded-2xl p-6 w-[330px] text-center shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:border-blue-500 transition"
              >
                {member.Image?.data?.attributes?.url && STRAPI_ASSETS && (
                  <div className="w-24 h-24 mx-auto mb-4 rounded-xl overflow-hidden border border-gray-700 shadow-[0_0_20px_rgba(59,130,246,0.25)]">
                    <Image
                      src={`${STRAPI_ASSETS}${member.Image.data.attributes.url}`}
                      alt={
                        member.Image.data.attributes.alternativeText ||
                        member.Name
                      }
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

                <h4 className="text-lg font-semibold">{member.Name}</h4>
                <p className="text-gray-300 text-sm mt-1">{member.Position}</p>
                <p className="text-gray-500 text-xs">{member.Location}</p>

                {member.LinkedInURL && (
                  <Link
                    href={member.LinkedInURL}
                    target="_blank"
                    className="inline-flex justify-center items-center mt-3"
                  >
                    <div className="flex justify-center items-center w-8 h-8 rounded-full transition">
                      <img src="images/4494498-removebg-preview.png" alt="" />
                    </div>
                  </Link>
                )}

                {member.Description && (
                  <p className="text-gray-400 text-xs mt-3 leading-relaxed">
                    {member.Description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default LeadershipSection;
