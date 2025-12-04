"use client";
import React from "react";
import { IBM_Plex_Sans } from "next/font/google";

const ibm = IBM_Plex_Sans({
    subsets: ["latin"],
    weight: ["500", "600"],
});

interface ActionButtonProps {
    text: string;
    variant?: "solid" | "outline";
    onClick?: () => void;
    className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
    text,
    variant = "solid",
    onClick,
    className = "",
}) => {
    const baseStyles = `${ibm.className} h-[40px] px-6 rounded-full text-[14px] font-semibold transition-all duration-300 flex items-center justify-center`;

    const variants = {
        solid: "bg-[#1E5598] text-white hover:bg-[#0D294D]",
        outline: "bg-white text-[#0D294D] border border-[#0D294D] hover:bg-gray-50",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default ActionButton;
