"use client";
import React from "react";

interface PaginationProps {
  total: number;
  current: number; // zero-based index
  onChange?: (index: number) => void;
}

export default function Pagination({ total, current, onChange }: PaginationProps) {
  return (
    <div className="flex items-center gap-3 p-4">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = current === index;

        return (
          <button
            key={index}
            onClick={() => onChange?.(index)}
            aria-pressed={isActive}
            className={`relative overflow-hidden rounded-full border border-red-500 flex items-center justify-center transition-all duration-300`}
            style={{
              width: isActive ? 96 : 48,
              height: 32,
              padding: 0,
              backgroundColor: isActive ? "red" : "transparent",
            }}
          >
          </button>
        );
      })}
    </div>
  );
}
