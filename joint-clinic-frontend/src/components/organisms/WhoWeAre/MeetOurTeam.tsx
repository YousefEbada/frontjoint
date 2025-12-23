"use client";
import React from "react";
import Profile from "@/components/atoms/icons/Profile";


const MeetOurTeam = () => {
  const memberinfo = [
    { name: "Bryan", major: "BranchChiropractor Aqiq Branch", fill: "#d5ece3" },
    { name: "Saad Al Omar", major: "Chiropractor Aqiq Branch", fill: "#167c4f" },
    { name: "Abdallah El Mahya", major: "Physiotherapy Specialist Aqiq Branch", fill: "#112a4d" },
    { name: "Mohammed Alzahrani", major: "Physiotherapy Specialist Aqiq Branch", fill: "#ee3124" },
    { name: "Aly El Sennedy", major: "Physiotherapy Specialist Aqiq Branch", fill: "#fdb515" },
  ];

  return (
    <section
      className="team_section opacity-0 translate-y-20 bg-[#9fd5e2] h-screen flex flex-col justify-center items-center gap-8 transition-all"
    >
      <h1 className="text-[60px] md:text-[100px] font-bold font-['IBM_Plex_Sans'] text-white text-center">
        Meet Our Team
      </h1>

      <div
        className="members opacity-0 translate-y-20 w-full m-auto grid grid-cols-3 md:grid-cols-5 mt-10 overflow-hidden transition-all"
      >
        {memberinfo.map((member, index) => (
          <div key={index} className="flex flex-col items-center mb-4">
            <Profile fill={member.fill} className="w-[60px] mb-[10px]" />

            <h4 className="text-[15px] md:text-[20px] w-[250px] text-white font-bold text-center">
              {member.name}
            </h4>

            <p className="text-[16px] w-[160px] text-center text-white">
              {member.major}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetOurTeam;
