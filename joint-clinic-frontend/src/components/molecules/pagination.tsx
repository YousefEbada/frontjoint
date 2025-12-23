"use client";
import React from "react";

interface PaginationProps {
  total: number;
  current: number;
  onChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ total, current, onChange }) => {
  return (
    <div className="flex items-center justify-center gap-3 p-4">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = current === index;

        return (
          <button
            key={index}
            onClick={() => onChange(index)}
            aria-pressed={isActive}
            className={`
              relative overflow-hidden rounded-full border border-red-500 
              flex items-center justify-center transition-all duration-300
              h-8
              ${isActive ? "bg-red-500 w-24" : "bg-transparent w-12"}
            `}
          />
        );
      })}
    </div>
  );
};

export default Pagination;
