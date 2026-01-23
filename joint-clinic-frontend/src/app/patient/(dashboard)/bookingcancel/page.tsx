"use client";
import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import Link from "next/link";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import { color as colorConst } from "@/lib/constants/colors";
import CustomSelect from "@/components/atoms/CustomSelect";
import Button from "@/components/atoms/Button";
import { useBookingDetails, useCancelBooking } from "@/hooks/useBooking";
import dayjs from "dayjs";
import AppointmentItem from "@/components/molecules/AppointmentItem";
// import { toast } from "sonner"; 

// Force dynamic rendering - this page requires authentication
export const dynamic = 'force-dynamic';

function BookingCancelContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const bookingId = searchParams?.get("id");
    const [reason, setReason] = useState("");

    const { data: bookingDetails, isLoading } = useBookingDetails(bookingId || "");
    const { mutate: cancelBooking, isPending } = useCancelBooking();

    const handleCancel = () => {
        if (!bookingId) return;

        cancelBooking(
            { id: bookingId, data: { appointment_id: bookingDetails.booking.appointmentNixpendId, cancellation_source: "Patient", cancellation_date: dayjs().format("DD-MM-YYYY"), cancellation_reason: "reason", cancelled_by: "Phone" } },
            {
                onSuccess: () => {
                    // toast.success("Booking cancelled successfully");
                    router.push("/patient/bookings");
                },
                onError: () => {
                    // toast.error("Failed to cancel booking");
                },
            }
        );
    };

    if (isLoading) {
        return (
            <DashBoardContent>
                <div className="flex justify-center items-center h-full">
                    <Typography text="Loading booking details..." variant="bodyRegular" />
                </div>
            </DashBoardContent>
        );
    }

    if (!bookingDetails) {
        return (
            <DashBoardContent>
                <div className="flex flex-col justify-center items-center h-full gap-4">
                    <Typography text="Booking not found" variant="heading2" />
                    <Link href="/patient/bookings">
                        <Button text="Go Back" variant="primary" />
                    </Link>
                </div>
            </DashBoardContent>
        );
    }

    const formattedDate = dayjs(bookingDetails.appointmentDate).format("dddd, MMMM Do YYYY");
    const formattedTime = dayjs(`2000-01-01 ${bookingDetails.appointmentTime}`).format("h:mm A");

    return (
        <>
            <DashBoardHeader therapyName="Shoulder Therapy">
                <Typography
                    text="Upcoming Bookings"
                    variant="bodyRegular"
                    className="text-[#1e5598] font-medium"
                />
                <Link href="/patient/bookings">
                    <Typography
                        text="All Bookings"
                        variant="bodyRegular"
                        className="text-gray-400 font-medium hover:text-[#1e5598] transition-colors"
                    />
                </Link>
            </DashBoardHeader>

            <DashBoardContent>
                <div className="w-full h-full py-[4%] px-4 sm:px-6 md:px-0 gap-y-6 sm:gap-y-8 md:gap-y-[40px] flex flex-col items-center md:bg-white md:rounded-[20px] md:shadow-[0px_10px_30px_10px_rgba(0,0,0,0.08)]  md:overflow-y-auto md:custom-scrollbar">
                    <Typography
                        text="Cancel Patient Booking"
                        variant="heading1"
                        style={{
                            fontWeight: "bold",
                            fontSize: "45px",
                        }}
                        className="bg-gradient-to-b pl-0 from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-[45px] text-center px-2"
                    />
                    <CustomSelect
                        items={["Scheduling conflict", "Health issue", "Other"]}
                        value={reason}
                        onChange={setReason}
                        className="w-full sm:w-[90%] md:w-[400px] lg:w-[500px]"
                        placeholder="Select Reason"
                    />
                    <div className="flex flex-col items-center px-2 sm:px-4 md:px-0">
                        <h3 className="text-[22px] text-base sm:text-lg md:text-[22px] text-[#1E5598] font-bold my-3 sm:my-4 md:my-[15px] text-center">
                            You are cancelling a booking for:
                            <span style={{ color: colorConst.info, marginLeft: "5px" }} className="block sm:inline sm:ml-[5px] mt-1 sm:mt-0">
                                {bookingDetails.patientName || "Patient"}
                            </span>
                        </h3>
                        <h3 className="text-[22px] text-base sm:text-lg md:text-[22px] text-[#1E5598] font-bold text-center">
                            The booking was on:
                            <span style={{ color: colorConst.info, marginLeft: "5px" }} className="block sm:inline sm:ml-[5px] mt-1 sm:mt-0">
                                {formattedDate} at {formattedTime}
                            </span>
                        </h3>
                    </div>
                    <div className="btns flex flex-row gap-3 sm:gap-4 md:gap-5 flex-wrap justify-center px-2 sm:px-4 md:px-0">
                        <Button
                            text="Back"
                            variant="primary"
                            className="w-full sm:w-auto min-w-[100px] md:min-w-0"
                            onClick={() => router.back()}
                        />
                        <Button
                            text={isPending ? "Cancelling..." : "Proceed"}
                            variant="primary"
                            className="w-full sm:w-auto min-w-[100px] md:min-w-0"
                            onClick={handleCancel}
                            disabled={!reason}
                        />
                    </div>
                </div>
            </DashBoardContent>
        </>
    );
}

export default function BookingsPage() {
    return (
        <Suspense fallback={
            <DashBoardContent>
                <div className="flex justify-center items-center h-full">
                    <Typography text="Loading..." variant="bodyRegular" />
                </div>
            </DashBoardContent>
        }>
            <BookingCancelContent />
        </Suspense>
    );
}
