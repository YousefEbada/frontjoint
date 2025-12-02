"use client";

import React, { useEffect, useRef } from "react";

interface PaginationProps {
  total: number;
  activeIndex: number;
  className?: string;
}

export default function PaginationDots({
  total,
  activeIndex,
  className = "",
}: PaginationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const redLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const redLine = redLineRef.current;
    if (!container || !redLine) return;

    const dots = container.querySelectorAll(".dot");
    if (dots.length === 0) return;

    const firstDot = dots[0] as HTMLElement;
    const lastActiveDot = dots[activeIndex] as HTMLElement;

    if (!firstDot || !lastActiveDot) return;

    const width =
      lastActiveDot.offsetLeft -
      firstDot.offsetLeft +
      lastActiveDot.offsetWidth;

    redLine.style.width = width + "px";
  }, [activeIndex]);

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center gap-[40px] md:gap-[120px] ${className}`}
    >
      {/* 🔥 الخط الأحمر */}
      <div
        ref={redLineRef}
        className="
          pagination-line 
          absolute top-1/2 left-0 -translate-y-1/2 
          h-[4px] bg-[#e41d1d] 
          transition-all duration-300
        "
      />

      {/* 🔵 النقاط */}
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`
            dot relative z-10
            md:w-[30px] md:h-[30px] w-[20px] h-[20px]
            rounded-full transition-all duration-300
            ${index <= activeIndex
              ? "bg-[#0a1c32] scale-110"
              : "border border-[#0D294D] bg-transparent"
            }
          `}
        />
      ))}
    </div>
  );
}
