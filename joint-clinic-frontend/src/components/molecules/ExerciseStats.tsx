"use client";
import React from "react";
import Typography from "@/components/atoms/Typography";

interface ExerciseStatsProps {
    label: string;
    value: string | number;
    className?: string;
}

const ExerciseStats: React.FC<ExerciseStatsProps> = ({ label, value, className = "" }) => {
    return (
        <div className={`flex gap-2 items-center ${className}`}>
            <Typography text={label} variant="bodyBold" className="text-[#1E5598] text-[18px]" />
            <Typography text={String(value)} variant="bodyBold" className="text-[#1C9A55] text-[18px]" />
        </div>
    );
};

export default ExerciseStats;
