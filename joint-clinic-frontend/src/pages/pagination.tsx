"use client";
import { useState } from "react";

interface PaginationProps {
  total: number; // عدد الصفحات
}

export default function Pagination({ total }: PaginationProps) {
  const [current, setCurrent] = useState(1);

  return (
    <div className="flex items-center gap-3 p-4">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = current === index + 1;

        return (
          <button
            key={index}
            onClick={() => setCurrent(index + 1)}
            className={`
              w-8 h-8 rounded-full border border-red-500
              flex items-center justify-center
              transition-all duration-300
            `}
          >
            {/* الخط الأحمر */}
            <div
              className={`
                w-8 h-8 rounded-full bg-red-500 transition-all duration-300
                ${isActive ? "w-6 opacity-100" : "w-0 opacity-0"}
              `}
            ></div>
          </button>
        );
      })}
    </div>
  );
}
