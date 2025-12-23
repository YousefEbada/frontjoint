"use client";
import React, { useState } from "react";
import Typography from "@/components/atoms/Typography";
import Plus from "@/components/atoms/icons/Plus";
import Minus from "@/components/atoms/icons/Minus";

interface AccordionItemProps {
    title: string;
    content: string;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, content }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border-b border-gray-200 last:border-b-0">
            <button
                className="w-full flex justify-between items-center py-6 text-left focus:outline-none group"
                onClick={toggleOpen}
            >
                <Typography
                    text={title}
                    variant="bodyBold"
                    className="text-[#1E5598] font-semibold"
                />
                <div className="transition-all duration-300">
                    {isOpen ? (
                        <Minus fill="#B3B3B3" className="w-5 h-5" />
                    ) : (
                        <Plus fill="#B3B3B3" className="w-5 h-5" />
                    )}
                </div>
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100 pb-6" : "max-h-0 opacity-0"
                    }`}
            >
                <Typography text={content} variant="bodyRegular" className="text-[#B3B3B3]" />
            </div>
        </div>
    );
};

export default AccordionItem;
