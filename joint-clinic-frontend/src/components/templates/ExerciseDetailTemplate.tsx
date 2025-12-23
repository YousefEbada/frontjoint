"use client";
import React from "react";

interface ExerciseDetailTemplateProps {
    header: React.ReactNode;
    content: React.ReactNode;
}

const ExerciseDetailTemplate: React.FC<ExerciseDetailTemplateProps> = ({ header, content }) => {
    return (
        <>
            {header}
            <main className="w-full h-full flex flex-col items-center p-4 md:p-8 overflow-y-auto custom-scrollbar">
                {content}
            </main>
        </>
    );
};

export default ExerciseDetailTemplate;
