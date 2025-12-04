import React from "react";
import Typography from "@/components/atoms/Typography";
import StatusBadge from "@/components/atoms/StatusBadge";
import ActionButton from "@/components/atoms/ActionButton";

interface BookingItemProps {
    sessionNumber: number;
    status: "Confirmed" | "Pending" | "Cancelled";
    date: string;
    time: string;
    onCancel?: () => void;
    onReschedule?: () => void;
}

const BookingItem: React.FC<BookingItemProps> = ({
    sessionNumber,
    status,
    date,
    time,
    onCancel,
    onReschedule,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_2fr_auto] items-center gap-4 py-6 border-b border-gray-200 last:border-none">
            {/* Session Name */}
            <Typography
                text={`Session No ${sessionNumber}`}
                variant="bodyBold"
                className="text-[#1E5598]"
            />

            {/* Status */}
            <StatusBadge status={status} />

            {/* Date & Time */}
            <Typography
                text={`${date} at ${time}`}
                variant="bodyRegular"
                className="text-[#1E5598] font-medium"
            />

            {/* Actions */}
            <div className="flex gap-3">
                <ActionButton
                    text="Cancel"
                    variant="outline"
                    onClick={onCancel}
                    className="w-[100px]"
                />
                <ActionButton
                    text="Reschedule"
                    variant="solid"
                    onClick={onReschedule}
                    className="w-[120px]"
                />
            </div>
        </div>
    );
};

export default BookingItem;
