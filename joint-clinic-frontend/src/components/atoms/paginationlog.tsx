"use client";

import React from "react";

interface PaginationProps {
  total: number;        // عدد النقاط
  activeIndex: number;  // → النقطة المفعلة (بدل initial)
  className?: string;
}

export default function PaginationDots({ total, activeIndex, className = "" }: PaginationProps) {
  return (
    <div className={`flex gap-[120px] items-center ${className}`}>
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`
            w-[30px] h-[30px] rounded-full transition-all duration-300
            pointer-events-none             /* 🔥 منع الضغط نهائياً */
            ${activeIndex === index
              ? "bg-[#0a1c32] scale-110"
              : "border border-[#0D294D] bg-transparent"
            }
          `}
        />
      ))}
    </div>
  );
}
