"use client";
import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {x?:number}

const Circle: React.FC<Props> = ({ className, style, ...rest }) => (
  <svg
    width="42"
    height="42"
    viewBox="0 0 42 42"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    {...rest}
  >
    <circle
      cx="21"
      cy="21"
      r="20"
      fill="url(#paint0_linear_875_3902)"
      stroke="url(#paint1_linear_875_3902)"
      strokeWidth="2"
    />

    <defs>
      <linearGradient
        id="paint0_linear_875_3902"
        x1="21"
        y1="0"
        x2="21"
        y2="42"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0D294D" />
        <stop offset="1" stopColor="#1E5598" />
      </linearGradient>

      <linearGradient
        id="paint1_linear_875_3902"
        x1="21"
        y1="0"
        x2="21"
        y2="42"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#0D294D" />
        <stop offset="1" stopColor="#1E5598" />
      </linearGradient>
    </defs>
  </svg>
);

export default Circle;
