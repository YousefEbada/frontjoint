"use client";
import React from "react";

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ className = "", ...props }) => {
    return (
        <textarea
            className={`w-full px-6 py-4 rounded-[30px] border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#1E5598] focus:ring-1 focus:ring-[#1E5598] transition-colors resize-none ${className}`}
            {...props}
        />
    );
};

export default TextArea;
