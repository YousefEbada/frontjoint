"use client";
import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    className?: string;
    options: { value: string; label: string }[];
    placeholder?: string;
}

const Select: React.FC<SelectProps> = ({ className = "", options, placeholder, ...props }) => {
    return (
        <div className="relative w-full">
            <select
                className={`w-full px-6 py-3 rounded-full border border-gray-200 text-gray-700 bg-white appearance-none focus:outline-none focus:border-[#1E5598] focus:ring-1 focus:ring-[#1E5598] transition-colors ${className} ${!props.value ? 'text-gray-400' : ''}`}
                {...props}
            >
                {placeholder && (
                    <option value="" disabled selected hidden>
                        {placeholder}
                    </option>
                )}
                {options.map((option) => (
                    <option key={option.value} value={option.value} className="text-gray-700">
                        {option.label}
                    </option>
                ))}
            </select>
            <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L11 1" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    );
};

export default Select;
