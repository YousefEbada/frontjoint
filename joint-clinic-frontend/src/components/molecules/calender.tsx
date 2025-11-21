"use client";
import { useState } from "react";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const [selected, setSelected] = useState<number | null>(2);

  return (
    <div
      className="
        bg-white 
        p-3 sm:p-4 md:p-6 
        rounded-[16px] sm:rounded-[20px] md:rounded-[24px]
        shadow-[0px_15px_50px_rgba(30,85,152,0.15)]
        w-full
        max-w-[320px] sm:max-w-[350px] md:max-w-[380px]
      "
    >
      {/* Month Header */}
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h3 className="text-[14px] sm:text-[16px] md:text-[20px] font-semibold text-[#0D294D]">
          January 2026
        </h3>

        <div className="flex gap-2">
          <button className="text-[#1e5598] text-[16px] sm:text-[18px] md:text-[20px] font-bold hover:opacity-70">
            {"<"}
          </button>
          <button className="text-[#1e5598] text-[16px] sm:text-[18px] md:text-[20px] font-bold hover:opacity-70">
            {">"}
          </button>
        </div>
      </div>

      {/* Days Header */}
      <div
        className="
          grid grid-cols-7 
          text-center text-[#0D294D]/70 
          font-medium 
          mb-2
          text-[10px] sm:text-[11px] md:text-[14px]
        "
      >
        {days.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Days Grid */}
      <div
        className="
          grid grid-cols-7 
          gap-1 sm:gap-1.5 md:gap-2
          text-center text-[#0D294D] 
          font-semibold
        "
      >
        {Array.from({ length: 31 }).map((_, i) => {
          const day = i + 1;
          const isSelected = selected === day;

          return (
            <button
              key={i}
              onClick={() => setSelected(day)}
              className={`
                aspect-square 
                flex items-center justify-center 
                rounded-full
                text-[10px] sm:text-[12px] md:text-[16px]
                transition-all duration-200
                ${
                  isSelected
                    ? "bg-[#1e5598] text-white shadow-md scale-105"
                    : "hover:bg-[#e2ecf6]"
                }
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
