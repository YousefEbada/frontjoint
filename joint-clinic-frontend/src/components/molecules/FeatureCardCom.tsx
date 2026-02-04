"use client";
import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  isActive?: boolean;
  className?: string;
}

export default function FeatureCard({
  title,
  description,
  isActive = false,
  className = "",
}: FeatureCardProps) {
  return (
    <div
      className={`
        feature-card
        md:h-[370px] h-48 
        md:w-full w-[150px] md:px-6
        rounded-xl p-3 md:p-6 
        cursor-default
        transition-all duration-300
        border border-gray-200 
        flex flex-col justify-around md:justify-between
        ${
          isActive
            ? "bg-[#d5ece3] opacity-100 blur-0 scale-[1.02]"
            : "bg-[#d5ece3] opacity-40 blur-[1.4px] scale-100"
        }
        ${className}
      `}
    >
      <h2 className="md:text-[38px] capitalize text-sm text-left font-bold w-full text-[#0a1c32]">
        {title.toLowerCase()}
      </h2>

      <p className="md:text-sm capitalize text-xs text-left text-[#0a1c32] mt-3">
        {description.toLowerCase()}
      </p>
    </div>
  );
};

