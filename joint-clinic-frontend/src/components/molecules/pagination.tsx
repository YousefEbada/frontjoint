"use client";
import React from "react";

interface PaginationProps {
  total: number;
  current: number;
  onChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ total, current, onChange }) => {
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-6 md:mt-10">
      {Array.from({ length: total }).map((_, idx) => {
        const step = idx + 1;
        const isActive = step === current;

        return (
          <button
            key={idx}
            onClick={() => onChange(step)}
            className={`
              rounded-full transition-all duration-300

              /* HEIGHT */
              h-2 sm:h-2.5 md:h-3

              /* ACTIVE DOT */
              ${isActive
                ? "bg-[#1e5598] w-4 sm:w-5 md:w-6"
                : "bg-[#C9D9EB] w-2.5 sm:w-3 md:w-3"
              }
            `}
          />
        );
      })}
    </div>
  );
};

export default Pagination;
