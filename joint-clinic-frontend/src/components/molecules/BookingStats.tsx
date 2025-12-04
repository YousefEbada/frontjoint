import React from "react";
import Typography from "@/components/atoms/Typography";

interface StatItemProps {
    label: string;
    value: string | number;
}

const StatItem: React.FC<StatItemProps> = ({ label, value }) => (
    <div className="flex items-center gap-2">
        <Typography
            text={`${label}:`}
            variant="bodyBold"
            className="text-[#1E5598]"
        />
        <Typography
            text={String(value)}
            variant="bodyRegular"
            className="text-[#167c4f] font-medium"
        />
    </div>
);

const BookingStats = () => {
    return (
        <div className="w-full flex flex-col md:flex-row justify-between mt-8 px-4">
            {/* Left Column */}
            <div className="flex flex-col gap-2">
                <StatItem label="Remaining Sessions" value={11} />
                <StatItem label="Remaining Weeks" value="5 Weeks" />
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-2">
                <StatItem label="Your next session in" value="1 Day" />
                <StatItem label="Current Week" value={3} />
            </div>
        </div>
    );
};

export default BookingStats;
