"use client";
import React from "react";

interface Props {
    fill?: string;
    className?: string;
    style?: React.CSSProperties;
}

const Plus = ({ fill = "currentColor", className, style }: Props) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
    >
        <path
            d="M12 5V19M5 12H19"
            stroke={fill}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default Plus;
