import React from "react";
import Typography from "@/components/atoms/Typography";
import { color } from "@/lib/constants/colors";

interface SummaryItemProps {
    title: string;
    subtitle?: string;
    status: "Done" | "Pending";
    date: string;
    time?: string;
}

const SummaryItem: React.FC<SummaryItemProps> = ({
    title,
    subtitle,
    status,
    date,
    time,
}) => {
    const isDone = status === "Done";
    const statusColor = isDone ? color.success : color.info;

    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full py-2 gap-2 sm:gap-0 border-b border-gray-100 sm:border-none last:border-0">
            <div className="flex flex-col gap-1 w-full sm:w-auto">
                <div className="flex flex-row items-center justify-between sm:justify-start gap-2">
                    <div className="flex flex-row items-center gap-2">
                        <div
                            className={`w-2 h-2 rounded-full ${isDone ? "bg-black" : "border border-black bg-transparent"}`}
                        />
                        <Typography variant="bodyBold" style={{ color: color.secondary }}>
                            {title}
                        </Typography>
                    </div>
                    {/* Show status next to title on mobile */}
                    <div className="flex sm:hidden items-center">
                        <Typography
                            variant="bodyBold"
                            style={{ color: statusColor }}
                        >
                            {status}
                        </Typography>
                    </div>
                </div>
                {subtitle && (
                    <div className="flex flex-row items-center gap-2 pl-4">
                        <div
                            className={`w-2 h-2 rounded-full border border-gray-400 bg-transparent`}
                        />
                        <Typography variant="bodyRegular" style={{ color: color.secondary }}>
                            {subtitle}
                        </Typography>
                    </div>
                )}
            </div>

            <div className="flex flex-row sm:flex-col items-center sm:items-end gap-4 sm:gap-1 pl-4 sm:pl-0 w-full sm:w-auto justify-between sm:justify-start">
                <Typography variant="bodyBold" style={{ color: color.secondary }}>
                    {date}
                </Typography>
                {time && (
                    <Typography variant="bodyBold" style={{ color: color.secondary }}>
                        {time}
                    </Typography>
                )}
            </div>

            {/* Hide status here on mobile, show on desktop */}
            <div className="hidden sm:flex items-center">
                <Typography
                    variant="bodyBold"
                    style={{ color: statusColor }}
                >
                    {status}
                </Typography>
            </div>
        </div>
    );
};

export default SummaryItem;
