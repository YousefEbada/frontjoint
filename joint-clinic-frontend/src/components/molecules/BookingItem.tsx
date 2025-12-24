import React from "react";
import Typography from "@/components/atoms/Typography";
import StatusBadge from "@/components/atoms/StatusBadge";
import ActionButton from "@/components/atoms/ActionButton";
import Link from "next/link";

interface BookingItemProps {
    sessionNumber: number;
    type: "patient" | "session";
    status: "Confirmed" | "Pending" | "Cancelled";
    date: string;
    time: string;
    onCancel?: () => void;
    onReschedule?: () => void;
}

const BookingItem: React.FC<BookingItemProps> = ({
    sessionNumber,
    type,
    status,
    date,
    time,
    onCancel,
    onReschedule,
}) => {
    return (
        <div className="grid grid-cols-2 grid-rows-2 md:grid-rows-1 md:grid-cols-[1.5fr_1fr_2fr_auto] items-center rounded-[39px] md:rounded-none md:border-none bg-[#eff6ff] md:bg-transparent md:border-gray-200 last:border-none">
            {/* Session Name */}
            <div className="py-3 pl-4 border-r border-b md:border-none border-[#9FD5E2]">
                <Typography
                    text={`${type === "patient" ? "Patient" : "Session No"} ${sessionNumber}`}
                    variant="bodyBold"
                    className="text-[#1E5598]"
                />
            </div>

            {/* Status */}
            <div className="py-3 pl-4 border-b md:border-none border-[#9FD5E2]">
                <StatusBadge status={status} />
            </div>

            {/* Date & Time */}
            <div className="py-3 pl-4 border-r md:border-none border-[#9FD5E2]">
                <Typography
                    text={`${date} - ${time}`}
                    variant="bodyBold"
                    className="text-[#1E5598]"
                />
            </div>

            {/* Actions */}
            <div className="hidden md:flex gap-3">
                <Link href="/staffboard/bookingcancel">
                    <ActionButton
                        text="Cancel"
                        variant="outline"
                        onClick={onCancel}
                        className="w-[100px]"
                    />
                </Link>
                <Link href="/staffboard/bookingchange">
                    <ActionButton
                        text={`${type === "patient" ? "Change" : "Reschedule"}`}
                        variant="solid"
                        onClick={onReschedule}
                        className="w-[120px]"
                    />
                </Link>
            </div>
            <div className="py-3 pl-4 md:hidden flex">
                <Typography
                    text={"Change/Cancel"}
                    variant="bodyBold"
                    className="text-red-600 underline"
                />
            </div>
        </div>
    );
};

export default BookingItem;
