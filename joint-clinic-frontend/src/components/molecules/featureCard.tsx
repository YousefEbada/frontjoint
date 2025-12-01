"use client";
import React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  isActive?: boolean;       // يتحكم فيه الـ parent (GSAP + React)
  className?: string;       // لو حابب تزود ستايل من بره
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  isActive = false,
  className = "",
}) => {
  return (
    <div
      className={`
        feature-card
        md:h-[200%] h-48 
        md:w-[300px] w-[150px] 
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
      <h2 className="md:text-xl text-sm font-semibold w-full text-gray-900">
        {title}
      </h2>

      <p className="md:text-sm text-xs text-gray-700 mt-3">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
