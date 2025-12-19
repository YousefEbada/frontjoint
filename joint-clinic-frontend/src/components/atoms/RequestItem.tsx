"use client";
import React from "react";

import Typography from "@/components/atoms/Typography";

type StatusType = "Done" | "Opened" | "Unread";

interface RequestItemProps {
  name: string;
  status: StatusType;
  phone: string;
  department: string;
  date: string;
  onViewDetails?: () => void;
}

const statusColor: Record<StatusType, string> = {
  Done: "text-green-600",
  Opened: "text-yellow-500",
  Unread: "text-red-500",
};

const dotColor: Record<StatusType, string> = {
  Done: "bg-green-600",
  Opened: "bg-yellow-500",
  Unread: "bg-red-500",
};

export default function RequestItem({
  name,
  status,
  phone,
  department,
  onViewDetails,
}: RequestItemProps) {
  return (
    <div className="
      w-full py-0 md:py-3 px-0 md:px-3
      grid grid-cols-2 grid-rows-2 md:grid-cols-5 md:grid-rows-1 justify-start text-start md:text-center md:justify-between items-center
      bg-[#F7F9FB] md:bg-transparent rounded-[20px] md:rounded-none overflow-hidden
    ">
      {/* Cell 1: Name + Dept (Mobile) */}
      <div className={`
          flex flex-col justify-center px-4 py-4 md:p-0
          border-r border-b border-gray-200 md:border-none
          h-full w-full
          col-span-1 md:col-span-1
      `}>
        <div className="flex items-center gap-3 font-semibold text-[#1E5598]">
          <span className={`w-3 h-3 rounded-full shrink-0 ${dotColor[status]}`}></span>
          <Typography
            text={name}
            variant="subheader"
            className="text-[#1E5598] font-bold"
          />
        </div>
        {/* Mobile Only Dept */}
        <Typography
          text={department}
          variant="bodyRegular"
          className="text-gray-500 text-sm mt-1 md:hidden block"
        />
      </div>

      {/* Cell 2: Status */}
      <div className={`
          flex items-center justify-center md:block px-4 py-4 md:p-0
          border-b border-gray-200 md:border-none
          h-full w-full
          md:col-span-1
          order-2 md:order-none
      `}>
        <Typography
          text={status}
          variant="bodyBold"
          className={`${statusColor[status]} font-medium text-[20px]`}
        />
      </div>

      {/* Cell 3: Phone */}
      <div className={`
          flex items-center justify-center md:block px-4 py-4 md:p-0
          border-r border-gray-200 md:border-none
          h-full w-full
          md:col-span-1
          order-3 md:order-none
      `}>
        <Typography
          text={phone}
          variant="bodyBold"
          className="text-gray-700 font-medium text-[20px]"
        />
      </div>

      {/* Cell 4: Department (Desktop) */}
      <Typography
        text={department}
        variant="bodyBold"
        className="text-[#1E5598] font-medium hidden md:block"
      />

      {/* Cell 4 (Mobile) / 5 (Desktop): Action */}
      <div className={`
          flex items-center justify-center md:block md:text-end md:col-span-1
          px-4 py-4 md:p-0
          h-full w-full
          order-4 md:order-none
      `}>
        <button
          onClick={onViewDetails}
          className=""
        >
          <Typography
            text="View Details"
            variant="bodyBold"
            className="text-green-700 underline font-medium hover:opacity-80 cursor-pointer"
          />
        </button>
      </div>
    </div>
  );
}
