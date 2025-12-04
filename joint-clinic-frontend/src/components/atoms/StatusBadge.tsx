import React from "react";
import Typography from "./Typography";

interface StatusBadgeProps {
    status: "Confirmed" | "Pending" | "Cancelled" | "Ready" | "In progress";
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    const colors = {
        Confirmed: "text-[#167c4f]", // Green
        Pending: "text-[#FDB515]",   // Orange/Yellow
        Cancelled: "text-[#ea392f]", // Red
        Ready: "text-[#167c4f]",     // Green (Same as Confirmed)
        "In progress": "text-[#FDB515]", // Orange/Yellow (Same as Pending)
    };

    return (
        <Typography
            text={status}
            variant="bodyBold"
            className={`${colors[status]} font-bold`}
        />
    );
};

export default StatusBadge;
