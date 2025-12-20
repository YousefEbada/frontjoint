"use client";
import React from "react";
import Typography from "@/components/atoms/Typography";
import ProgressBar from "@/components/atoms/ProgressBar";
import StatsGroup from "@/components/molecules/StatsGroup";
import CorneredBoxes from "@/components/atoms/CorneredBoxes";

interface ProgressCardProps {
    percentage: number;
    stats: {
        label: string;
        value: string | number;
        valueColor?: string;
        labelColor?: string;
    }[];
}

const ProgressCard: React.FC<ProgressCardProps> = ({ percentage, stats }) => {
    return (
        <>
            <Typography
                text="Progress"
                variant="heading2"
                className="text-[#1E5598] font-bold text-2xl"
            />

            <div className="w-full">
                <ProgressBar percentage={percentage} className="h-6 md:h-8" />
            </div>

            <StatsGroup
                stats={stats}
                className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12 w-full"
            />
        </>
    );
};

export default ProgressCard;
