import React from "react";
import Typography from "@/components/atoms/Typography";
import StatusBadge from "@/components/atoms/StatusBadge";
import ActionButton from "@/components/atoms/ActionButton";
import Link from "next/link";
import dayjs from "dayjs";

interface BookingItemProps {
    id: string;
    sessionNumber: number;
    patientName?: string;
    doctorName?: string;
    type: "patient" | "session";
    status: "Confirmed" | "Pending" | "Cancelled";
    date: string;
    time: string;
    rawDateTime: string; // ISO string or combinable date time string
    onCancel?: () => void;
    onReschedule?: () => void;
}

const BookingItem: React.FC<BookingItemProps> = ({
    id,
    sessionNumber,
    patientName,
    doctorName,
    type,
    status,
    date,
    time,
    rawDateTime,
    onCancel,
    onReschedule,
}) => {
    const [isPassed, setIsPassed] = React.useState(false);
    const [isLateCancellation, setIsLateCancellation] = React.useState(false);

    React.useEffect(() => {
        const bookingTime = dayjs(rawDateTime);
        const now = dayjs();

        const passed = bookingTime.isBefore(now);
        setIsPassed(passed);

        if (!passed) {
            const hoursDiff = bookingTime.diff(now, 'hour');
            setIsLateCancellation(hoursDiff < 24);
        } else {
            setIsLateCancellation(false);
        }
    }, [rawDateTime]);

    return (
        <div className="grid grid-cols-2 grid-rows-2 md:grid-rows-1 md:grid-cols-[1.5fr_1fr_2fr_auto] items-center rounded-[39px] md:rounded-none md:border-none bg-[#eff6ff] md:bg-transparent md:border-gray-200 last:border-none">
            {/* Session Name */}
            <div className="py-3 pl-4 border-r border-b md:border-none border-[#9FD5E2]">
                <Typography
                    text={doctorName ? doctorName : `${type === "patient" ? "Patient" : "Session No"} ${sessionNumber}`}
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
            <div className="hidden md:flex gap-3 justify-end min-w-[200px]">
                {status === "Cancelled" ? (
                    <Typography
                        text="Booking Canceled"
                        variant="bodyBold"
                        className="text-red-600 pr-4 self-center"
                    />
                ) : isPassed ? (
                    <Typography
                        text="Booking passed"
                        variant="bodyBold"
                        className="text-[#167c4f] pr-4 self-center"
                    />
                ) : isLateCancellation ? (
                    <Typography
                        text="Cannot cancel (<24h)"
                        variant="bodyBold"
                        className="text-[#167c4f] pr-4 self-center"
                    />
                ) : (
                    <>
                        <Link href={`${type === "patient" ? `/patient/bookingcancel?id=${id}` : `/staffboard/bookingcancel?id=${id}`}`}>
                            <ActionButton
                                text="Cancel"
                                variant="outline"
                                onClick={onCancel}
                                className="w-[100px] cursor-pointer"
                            />
                        </Link>
                        <Link href={`${type === "patient" ? `/patient/bookingchange?id=${id}` : `/staffboard/bookingchange?id=${id}`}`}>
                            <ActionButton
                                text={`${type === "patient" ? "Reschedule" : "Change"}`}
                                variant="solid"
                                onClick={onReschedule}
                                className="w-[120px] cursor-pointer"
                            />
                        </Link>
                    </>
                )}
            </div>
            {/* Mobile View Actions/Text */}
            <div className="py-3 pl-4 md:hidden flex">
                {status === "Cancelled" ? (
                    <Typography
                        text="Booking Canceled"
                        variant="bodyBold"
                        className="text-red-600"
                    />
                ) : isPassed ? (
                    <Typography
                        text="Booking passed"
                        variant="bodyBold"
                        className="text-[#167c4f]"
                    />
                ) : isLateCancellation ? (
                    <Typography
                        text="Cannot cancel (<24h)"
                        variant="bodyBold"
                        className="text-[#167c4f]"
                    />
                ) : (
                    <Typography
                        text={"Change/Cancel"}
                        variant="bodyBold"
                        className="text-red-600 underline"
                    />
                )}
            </div>
        </div>
    );
};

export default BookingItem;
