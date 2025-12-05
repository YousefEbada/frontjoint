"use client";
import React from "react";

type PatientCardProps = {
  name: string;
  injury: string;
  status?: "Active" | "Inactive";
  statusColor?: string; // default لأخضر لو Active
  className?: string;   // في حالة تم تمريره من الخارج
};

const PatientCard: React.FC<PatientCardProps> = ({
  name,
  injury,
  status = "Active",
  statusColor,
  className = "",
}) => {
  const statusDefaultColor = statusColor || (status === "Active" ? "text-[#167C4F]" : "text-[#EE3124]");

  return (
    <div
      className={`
        rounded-[40px] bg-white shadow-[0px_5px_10px_5px_rgba(0,0,0,0.08)] px-[30px] py-[20px]
        flex flex-col justify-between min-w-[250px] h-[150px]
        hover:shadow-lg transition cursor-pointer
        ${className}
      `}
    >
      <div className="flex justify-between w-full items-center">
        <h3 className="text-[35px] font-bold text-[#1E5598]">{name}</h3>
        <span className={`text-[22px] font-medium ${statusDefaultColor}`}>{status}</span>
      </div>

      <span className="text-[22px] text-[#1E5598] font-medium">{injury}</span>
    </div>
  );
};

export default PatientCard;
