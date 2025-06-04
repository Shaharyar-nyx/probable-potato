import React from "react";

const CampaignTimeline = () => {
  const timelineItems = [
    {
      month: "Jun 2025",
      description: "Sign up and receive your CyberScan AI Digital Report — a free assessment of potential vulnerabilities.",
    },
    {
      month: "Jul 2025",
      description: "Attend AI-themed webinars and PCPD training sessions to enhance your team’s security knowledge.",
    },
    {
      month: "Aug 2025",
      description: "Collaborate with experts to resolve vulnerabilities and improve your security posture.",
    },
    {
      month: "Sep 2025",
      description: "Earn recognition and the BugHunter 2025 Badge for your organization.",
    },
  ];

  return (
    <div className="w-full px-6 py-10 bg-white text-gray-800">
      <h2 className="text-3xl font-bold text-center mb-12">Campaign Timeline</h2>

      <div className="relative w-full">
        {/* Horizontal line */}
        <div className="absolute top-20 left-0 w-full h-2 bg-gray-100 rounded" />

        <div className="flex justify-between items-start relative z-10">
          {timelineItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center w-1/4">
              <div className="text-sm font-semibold mb-4">{item.month}</div>

              <div className="relative flex flex-col items-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full z-10" />
                <div className="mt-4 w-44 text-center text-xs bg-gray-100 p-3 rounded shadow">
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Campaign Period bar */}
        <div className="absolute top-[68px] left-1/4 w-1/2 h-8 bg-blue-600 rounded-xl text-white text-xs flex items-center justify-center font-medium shadow">
          Campaign Period
        </div>
      </div>
    </div>
  );
};

export default CampaignTimeline;