import React from "react";
import Link from "next/link";

interface AppointmentItemProps {
    name: string;
    status: string;
    date: string;
    statusColor?: string;
}

import Typography from "@/components/atoms/Typography";

const AppointmentItem = ({ name, status, date, statusColor = "text-[#1E5598]" }: AppointmentItemProps) => {
    return (
        <div className="grid grid-cols-2 grid-rows-2 md:grid-rows-1 md:grid-cols-4 items-center rounded-[39px] md:rounded-none bg-[#eff6ff] md:bg-transparent md:border-b md:border-gray-200 last:border-none">
            {/* Name */}
            <div className="w-full h-full py-3 pl-4 border-r border-b md:border-none flex items-center justify-start border-[#9FD5E2]">
                <Typography text={name} variant="bodyBold" className="text-[#1E5598] text-lg" />
            </div>

            {/* Status */}
            <div className="w-full h-full py-3 pl-4 border-b md:border-none border-[#9FD5E2] flex items-center justify-start md:justify-center">
                <Typography
                    text={status}
                    variant="bodyBold"
                    className={`${statusColor} text-center`}
                />
            </div>

            {/* Date */}
            <div className="w-full h-full py-3 pl-4 border-r md:border-none border-[#9FD5E2] flex items-center justify-start md:justify-center">
                <Typography
                    text={date}
                    variant="bodyRegular"
                    className="text-[#1E5598] text-center"
                />
            </div>

            {/* Details Link */}
            <div className="w-full h-full py-3 pl-4 md:p-0 flex items-center justify-start md:justify-end">
                <Link href="#">
                    <Typography text="Patient Details" variant="bodyBold" className="text-[#1C9A55] underline" />
                </Link>
            </div>
        </div>
    );
};

export default AppointmentItem;
