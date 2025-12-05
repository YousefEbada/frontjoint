"use client";
import React from "react";
import Typography from "@/components/atoms/Typography";

interface StatItem {
    label: string;
    value: string | number;
    valueColor?: string;
    labelColor?: string;
}

interface StatsGroupProps {
    stats: StatItem[];
    className?: string; // e.g. "grid grid-cols-2 gap-4"
}

const StatsGroup: React.FC<StatsGroupProps> = ({ stats, className = "grid grid-cols-1 md:grid-cols-2 gap-4" }) => {
    return (
        <div className={className}>
            {stats.map((stat, index) => (
                <div key={index} className="flex justify-between md:justify-start gap-2">
                    <Typography
                        text={stat.label}
                        variant="bodyBold"
                        className="text-[16px] md:text-[18px]"
                        style={{ color: stat.labelColor || "#1E5598" }}
                    />
                    <Typography
                        text={String(stat.value)}
                        variant="bodyBold"
                        className="text-[16px] md:text-[18px]"
                        style={{ color: stat.valueColor || "#1C9A55" }}
                    />
                </div>
            ))}
        </div>
    );
};

export default StatsGroup;
