"use client";
import React from "react";
import AccordionItem from "@/components/molecules/AccordionItem";

interface FAQ {
    question: string;
    answer: string;
}

interface AccordionProps {
    items: FAQ[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
    return (
        <div className="w-full md:bg-white md:rounded-2xl md:shadow-sm md:p-6">
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.question}
                    content={item.answer}
                />
            ))}
        </div>
    );
};

export default Accordion;
