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
        <div className="grid grid-cols-4 w-full items-center">
            <Typography text={name} variant="bodyBold" className="text-[#1E5598] text-lg" />

            <Typography
                text={status}
                variant="bodyRegular"
                className={`${statusColor} text-center`}
            />

            <Typography
                text={date}
                variant="bodyRegular"
                className="text-[#1E5598] text-center"
            />

            <div className="text-right">
                <Link
                    href="#"
                    className="text-[#1C9A55] font-bold underline decoration-2 underline-offset-4 hover:opacity-80"
                >
                    Patient Details
                </Link>
            </div>
        </div>
    );
};

export default AppointmentItem;
