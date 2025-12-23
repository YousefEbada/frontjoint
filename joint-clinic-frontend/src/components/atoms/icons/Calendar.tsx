"use client";
import React from "react";

interface Props {
    fill?: string;
    className?: string;
    style?: React.CSSProperties;
}

const Calendar = ({ fill = "#9FD5E2", className, style }: Props) => (
    <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={style}
    >
        <path
            d="M32 6H6C4.89543 6 4 6.89543 4 8V32C4 33.1046 4.89543 34 6 34H32C33.1046 34 34 33.1046 34 32V8C34 6.89543 33.1046 6 32 6Z"
            fill={fill}
        />
        <path
            d="M32 12H6V32H32V12Z"
            fill={fill}
            fillOpacity="0.5"
        />
        <path
            d="M10 4V8"
            stroke={fill}
            strokeWidth="3"
            strokeLinecap="round"
        />
        <path
            d="M28 4V8"
            stroke={fill}
            strokeWidth="3"
            strokeLinecap="round"
        />
        <circle cx="26" cy="26" r="3" fill="white" />
    </svg>
);

export default Calendar;
