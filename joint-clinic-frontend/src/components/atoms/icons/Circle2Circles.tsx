"use client";
import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {x?:number}

const Circle2Circles: React.FC<Props> = ({ className, style, ...rest }) => (
  <svg
    width="430"
    height="42"
    viewBox="0 0 430 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    {...rest}
  >
    <circle
      cx="215"
      cy="21"
      r="20"
      stroke="url(#paint0_linear_400_10769)"
      strokeWidth="2"
    />
    <line
      x1="236"
      y1="20.5"
      x2="410"
      y2="20.5"
      stroke="url(#paint1_linear_400_10769)"
    />
    <line
      x1="20"
      y1="20.5"
      x2="194"
      y2="20.5"
      stroke="url(#paint2_linear_400_10769)"
    />
    <circle
      cx="10"
      cy="21"
      r="10"
      fill="url(#paint3_linear_400_10769)"
    />
    <circle
      cx="420"
      cy="21"
      r="10"
      fill="url(#paint4_linear_400_10769)"
    />

    <defs>
      <linearGradient
        id="paint0_linear_400_10769"
        x1="215"
        y1="0"
        x2="215"
        y2="42"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0D294D" />
        <stop offset="1" stopColor="#1E5598" />
      </linearGradient>

      <linearGradient
        id="paint1_linear_400_10769"
        x1="323"
        y1="21"
        x2="323"
        y2="22"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0D294D" />
        <stop offset="1" stopColor="#1E5598" />
      </linearGradient>

      <linearGradient
        id="paint2_linear_400_10769"
        x1="107"
        y1="21"
        x2="107"
        y2="22"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0D294D" />
        <stop offset="1" stopColor="#1E5598" />
      </linearGradient>

      <linearGradient
        id="paint3_linear_400_10769"
        x1="10"
        y1="11"
        x2="10"
        y2="31"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0D294D" />
        <stop offset="1" stopColor="#1E5598" />
      </linearGradient>

      <linearGradient
        id="paint4_linear_400_10769"
        x1="420"
        y1="11"
        x2="420"
        y2="31"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0D294D" />
        <stop offset="1" stopColor="#1E5598" />
      </linearGradient>
    </defs>
  </svg>
);

export default Circle2Circles;
