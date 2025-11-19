"use client";

import React, { useState } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
  const [active, setActive] = useState(false);

  return (
    <div
      onClick={() => setActive(true)}
      className={`
        md:w-72 md:h-64 h-40 w-45 rounded-xl p-6 cursor-pointer transition-all duration-300
        border border-gray-200 flex flex-col justify-between mx-[20px]
        ${active ? "bg-[#d5ece3] opacity-100 blur-0" : "bg-[#d5ece3] opacity-40 blur-[1.4px]"}
      `}
    >
      <h2 className="md:text-xl text-sm font-semibold w-[100%] text-gray-900">{title}</h2>

      <p className="md:text-sm text-xs text-gray-700 mt-3">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
