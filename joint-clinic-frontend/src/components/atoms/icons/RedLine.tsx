"use client";
import React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {x?:number}

const LineVertical: React.FC<Props> = ({ className, style, ...rest }) => (
  <svg
    width="4"
    height="83"
    viewBox="0 0 4 83"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
    {...rest}
  >
    <line
      x1="1.49989"
      y1="0.0180618"
      x2="2.48784"
      y2="82.0182"
      stroke="#EE3124"
      strokeWidth="3"
    />
  </svg>
);

export default LineVertical;
