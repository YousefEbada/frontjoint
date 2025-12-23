"use client";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
}

const Input: React.FC<InputProps> = ({ className = "", ...props }) => {
    return (
        <input
            className={`w-full px-6 py-3 rounded-full border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#1E5598] focus:ring-1 focus:ring-[#1E5598] transition-colors ${className}`}
            {...props}
        />
    );
};

export default Input;
