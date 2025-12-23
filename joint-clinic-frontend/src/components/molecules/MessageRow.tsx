import React from "react";
import Typography from "@/components/atoms/Typography";

interface MessageRowProps {
    name: string;
    status: string;
    statusColor: string;
    dotColor: string;
    title: string;
    context: string;
    time: string;
}

import Link from "next/link";

const MessageRow = ({ id, name, status, statusColor, dotColor, title, context, time }: MessageRowProps & { id?: number }) => {
    // Assuming route: /doctor/support/chat/[id] - User said "specified patient", usually tracked by ID. 
    // If ID is not passed, fall back or use #. Updating props to accept ID.
    const href = id ? `/doctor/support/chat/${id}` : "#";

    return (
        <Link href={href} className="w-full">
            <div className="grid grid-cols-2 grid-rows-2 md:grid-rows-1 md:grid-cols-[1.5fr_1fr_2fr_1.5fr_1fr] items-center rounded-[39px] md:rounded-none bg-[#eff6ff] md:bg-transparent md:border-b md:border-gray-200 last:border-none hover:bg-gray-50 transition-colors">
                {/* Name + Dot */}
                <div className="w-full h-full py-3 pl-4 border-r border-b md:border-none border-[#9FD5E2] flex items-center gap-3">
                    <div className={`hidden md:block w-3 h-3 rounded-full ${dotColor}`}></div>
                    <Typography text={name} variant="bodyBold" className="text-[#1E5598]" />
                </div>

                {/* Status */}
                <div className="w-full h-full py-3 pl-4 border-b md:border-none border-[#9FD5E2] flex items-center justify-start md:justify-center">
                    <span className={`${statusColor} font-bold`}>{status}</span>
                </div>

                {/* Title + Context (Mobile: Combined in BL, Desktop: Split) */}
                {/* On mobile, we put Title here. Context might be hidden or combined. 
                    Let's put Title in BL and Time in BR for the quadrants. 
                    Wait, desktop has Title AND Context. 
                    Let's hide Context on mobile or combine. 
                    Decision: Mobile BL = Title. Desktop has distinct cols.
                 */}
                <div className="w-full h-full hidden md:flex items-center justify-start">
                    <Typography text={title} variant="bodyRegular" className="text-[#9CA3AF] font-medium" />
                </div>

                {/* Context - Hidden on Mobile, Visible on Desktop */}
                <div className="w-full h-full py-3 pl-4 md:p-0 flex items-center border-r md:border-none border-[#9FD5E2] justify-center md:justify-end pr-4">
                    <Typography text={context} variant="bodyBold" className="text-[#1E5598]" />
                </div>

                {/* Time */}
                <div className="w-full h-full py-3 pl-4 md:p-0 flex items-center justify-center md:justify-end pr-4">
                    <Typography text={time} variant="bodyBold" className="text-[#1E5598]" />
                </div>
            </div>
        </Link>
    );
};

export default MessageRow;
