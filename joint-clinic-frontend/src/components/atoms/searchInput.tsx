"use client";

import React from "react";

type SearchInputProps = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  rightIcon?: React.ReactNode;
};

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search by Injury",
  className = "",
  rightIcon,
}) => {
  return (
    <div
      className={`
        inline-flex items-center
        rounded-full
        bg-white
        px-4 sm:px-5
        h-[44px] sm:h-[48px]
        shadow-[0_8px_18px_rgba(0,0,0,0.08)]
        ${className}
      `}
    >
      {/* search icon */}
      <svg
        className="w-4 h-4 sm:w-5 sm:h-5 text-[#B3B3B3] mr-2 sm:mr-3 flex-shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="11"
          cy="11"
          r="6"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <line
          x1="15.2"
          y1="15.2"
          x2="20"
          y2="20"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>

      {/* input */}
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        className="
          w-full
          bg-transparent
          outline-none
          border-none
          text-[16px] sm:text-[16px]
          text-[#000]
          placeholder:text-[#B3B3B3]
        "
      />

      {/* right icon */}
      {rightIcon && (
        <div className="ml-2 sm:ml-3 text-[#B3B3B3] flex-shrink-0">
          {rightIcon}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
