"use client";
import React from "react";

interface Props {
    fill?: string;
    className?: string;
    style?: React.CSSProperties;
    direction?: "left" | "right";
}

const Arrow = ({ fill = "currentColor", className, style, direction = "right" }: Props) => (
    <svg
        width="39"
        height="68"
        viewBox="0 0 39 68"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{
            ...style,
            transform: direction === "left" ? "rotate(0deg)" : "rotate(180deg)", // Based on left-arrow.svg being the default or vice versa? 
            // left-arrow.svg path: M36... L5... (points left)
            // right-arrow.svg path: M2... L33... (points right)
            // Actually, let's just use the path for the requested direction or rotate one.
            // Let's use the left arrow path and rotate it for right.
        }}
    >
        <path
            d="M36.0625 64.9099L5.35721 37.8792C3.58918 36.3228 3.54214 33.5832 5.25568 31.967L36.0625 2.90985"
            stroke={fill}
            strokeWidth="8"
            strokeLinecap="round" // Added for smoother look
            strokeLinejoin="round"
        />
    </svg>
);

export default Arrow;
