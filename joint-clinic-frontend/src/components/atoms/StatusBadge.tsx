import React from "react";
import Typography from "./Typography";

interface StatusBadgeProps {
    status: "Confirmed" | "Pending" | "Cancelled" | "Ready" | "In progress" | "Uploaded" | "Waiting";
    className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = "" }) => {
    const colors = {
        Confirmed: "text-[#167c4f]", // Green
        Pending: "text-[#FDB515]",   // Orange/Yellow
        Cancelled: "text-[#ea392f]", // Red
        Ready: "text-[#167c4f]",     // Green (Same as Confirmed)
        "In progress": "text-[#FDB515]", // Orange/Yellow (Same as Pending)
        Uploaded: "text-[#167c4f]",  // Green (Same as Ready)
        Waiting: "text-[#FDB515]",   // Orange/Yellow (Same as Pending)
    };

    return (
        <Typography
            text={status}
            variant="bodyBold"
            className={`${colors[status]} font-bold ${className}`}
        />
    );
};

export default StatusBadge;
