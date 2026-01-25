"use client";
import React, { useState, useMemo, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import Link from "next/link";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import { color as colorConst } from "@/lib/constants/colors";
import Calendar from "@/components/molecules/Calendar";
import CustomSelect from "@/components/atoms/CustomSelect";
import Button from "@/components/atoms/Button";
import { useBookingDetails, useRescheduleBooking, useAvailableSlots } from "@/hooks/useBooking";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

// Force dynamic rendering - this page requires authentication
export const dynamic = 'force-dynamic';

function BookingChangeContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const bookingId = searchParams?.get("id");

    const [selectedDate, setSelectedDate] = useState(dayjs().format("MM-DD-YYYY"));
    const [selectedTime, setSelectedTime] = useState("");

    const { data: bookingDetails, isLoading: isLoadingDetails } = useBookingDetails(bookingId || "");
    const { mutate: rescheduleBooking, isPending: isRescheduling } = useRescheduleBooking();

    const doctorId = bookingDetails?.booking?.doctorNixpendId;

    const { data: slotsResponse, isLoading: slotsLoading } = useAvailableSlots(
        doctorId || ""
    );

    // Extract unique available dates from slots
    const availableDates = useMemo(() => {
        if (!slotsResponse?.ok || !slotsResponse.slots) return [];
        const dates = new Set<string>();
        slotsResponse.slots.forEach((slot: any) => {
            if (slot.start) {
                const date = dayjs(slot.start).format("YYYY-MM-DD");
                dates.add(date);
            }
        });
        return Array.from(dates);
    }, [slotsResponse]);

    // Filter slots for selected date
    const slotsForSelectedDate = useMemo(() => {
        if (!slotsResponse?.ok || !slotsResponse.slots || !selectedDate) return [];
        return slotsResponse.slots.filter((slot: any) => {
            if (!slot.start) return false;
            return dayjs(slot.start).format("YYYY-MM-DD") === selectedDate;
        });
    }, [slotsResponse, selectedDate]);

    // Format time slots for display
    const timeSlots = useMemo(() => {
        return slotsForSelectedDate.map((slot: any) => {
            if (!slot.start) return "Unknown Time";
            return dayjs(slot.start).format("h:mm A");
        });
    }, [slotsForSelectedDate]);

    function capitalizeFirstLetter(string: string) {
        if (!string) { // Handle empty or null strings
            return "";
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const handleReschedule = () => {
        if (!bookingId || !selectedDate || !selectedTime) return;

        // Convert selected 12h time back to 24h if API needs it, or just pass as is if API handles it.
        // The previous implementation used dayjs(`... ${time}`).format("h:mm A") for display.
        // API likely expects "HH:mm:ss" or "HH:mm".
        // get the current time in api time format edit api time
        const apiTime = dayjs(`2000-01-01 ${selectedTime}`).format("HH:mm");

        /*
        actual_duration
        : 
        30
        appointment_date
        : 
        "24-01-2026"
        appointment_time
        : 
        "13:00"
        appointment_type
        : 
        "Consultation"
        company
        : 
        "Joint Clinic"
        department
        : 
        "Physiotherapy"
        duration
        : 
        30
        service_unit
        : 
        ""
        */
        rescheduleBooking(
            {
                id: bookingId, data: {
                    practitioner: bookingDetails?.booking?.doctorNixpendId,
                    department: bookingDetails?.booking?.department,
                    company: bookingDetails?.booking?.company,
                    appointment_type: capitalizeFirstLetter(bookingDetails?.booking?.bookingType),
                    appointment_date: dayjs(selectedDate).format("YYYY-MM-DD"),
                    appointment_time: apiTime,
                    daily_practitioner_event: bookingDetails?.booking?.eventName,
                    service_unit: "",
                    duration: bookingDetails?.booking?.appointmentDuration,
                    actual_duration: bookingDetails?.booking?.appointmentDuration,
                }
            },
            {
                onSuccess: () => {
                    router.push("/patient/bookings");
                },
                onError: () => {
                    console.error("Reschedule failed");
                },
            }
        );
    };

    if (isLoadingDetails) {
        return (
            <DashBoardContent>
                <div className="flex justify-center items-center h-full"> <Typography text="Loading contents..." variant="bodyRegular" /> </div>
            </DashBoardContent>
        );
    }

    if (!bookingDetails) {
        return (
            <DashBoardContent>
                <div className="flex justify-center items-center h-full"> <Typography text="Booking not found" variant="heading2" /> </div>
            </DashBoardContent>
        );
    }

    const oldDate = dayjs(bookingDetails?.booking?.appointmentDate).format("dddd, MMMM Do YYYY");
    const oldTime = dayjs(`2000-01-01 ${bookingDetails?.booking?.appointmentTime}`).format("h:mm A");
    const newDateFormatted = dayjs(selectedDate).format("dddd, MMMM Do YYYY");

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
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 px-4 sm:px-6 md:px-0 mb-4 sm:mb-6 md:mb-0">
                    <Typography
                        text="Change Patient Booking"
                        variant="heading1"
                        style={{
                            fontWeight: "bold",
                            fontSize: "45px",
                        }}
                        className="bg-gradient-to-b pl-0 md:pl-[50px] from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-[45px] text-center md:text-left"
                    />
                    <p
                        style={{ color: colorConst.success }}
                        className="font-medium text-[20px] text-base sm:text-lg md:text-[20px]"
                    >
                        {bookingDetails.patientName || "Patient"}
                    </p>
                </div>

                <div className="booking-change-container w-full h-full flex flex-col gap-y-6 sm:gap-y-8 md:bg-white md:rounded-[20px] md:shadow-[0px_10px_30px_10px_rgba(0,0,0,0.08)] p-4 sm:p-6 md:p-5 md:overflow-y-auto md:custom-scrollbar">
                    <div className="booking-change-left leftside flex flex-col w-full pl-0 sm:pl-4 md:pl-[50px]">
                        <Typography
                            text="Select the date"
                            variant="heading1"
                            style={{
                                fontWeight: "bold",
                                fontSize: "45px",
                            }}
                            className="bg-gradient-to-b pl-0 from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-[45px] text-center md:text-left"
                        />
                        <div className="flex justify-center md:justify-start">
                            <Calendar
                                width="md:w-[340px]"
                                onSelect={(date) => setSelectedDate(date)}
                                availableDates={availableDates}
                                selectedDate={selectedDate}
                            />
                        </div>
                    </div>
                    <div className="booking-change-right rightside flex flex-col w-full px-2 sm:px-4 md:px-0">
                        <Typography
                            text="Choose your time slot"
                            variant="heading1"
                            style={{
                                fontWeight: "bold",
                                fontSize: "45px",
                            }}
                            className="bg-gradient-to-b pl-0 from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-[45px] text-center md:text-left"
                        />
                        <CustomSelect
                            items={timeSlots.length > 0 ? timeSlots : ["No slots available"]}
                            width="90%"
                            height="100px"
                            value={selectedTime}
                            onChange={setSelectedTime}
                            placeholder="Select Time"
                        />

                        <Typography
                            text="Confirm your booking"
                            variant="heading1"
                            style={{
                                fontWeight: "bold",
                                fontSize: "45px",
                                marginTop: "40px",
                            }}
                            className="bg-gradient-to-b pl-0 from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent text-2xl sm:text-3xl md:text-[45px] mt-6 sm:mt-8 md:mt-[40px] text-center md:text-left"
                        />
                        {/* <pre></pre> */}
                        <h3 className="text-[22px] text-base sm:text-lg md:text-[22px] text-[#1E5598] font-bold my-3 sm:my-4 md:my-[15px] text-center md:text-left">
                            Patient Booking was on:{" "}
                            <span style={{ color: colorConst.info, marginLeft: "35px" }} className="block sm:inline sm:ml-[35px] mt-1 sm:mt-0">
                                {oldDate} at {oldTime}
                            </span>
                        </h3>
                        <h3 className="text-[22px] text-base sm:text-lg md:text-[22px] text-[#1E5598] font-bold text-center md:text-left">
                            Patient Booking will be on:{" "}
                            <span style={{ color: colorConst.success, marginLeft: "6.5px" }} className="block sm:inline sm:ml-[6.5px] mt-1 sm:mt-0">
                                {newDateFormatted} at {selectedTime || "..."}
                            </span>
                        </h3>
                        <div className="flex gap-4 justify-center md:justify-start mt-5">
                            <Button
                                text="Back"
                                variant="primary"
                                className="w-full sm:w-[230px] md:w-[230px]"
                                onClick={() => router.back()}
                            />
                            <Button
                                text={isRescheduling ? "Confirming..." : "Confirm"}
                                variant="primary"
                                className="w-full sm:w-[230px] md:w-[230px]"
                                onClick={handleReschedule}
                                disabled={!selectedTime || isRescheduling}
                            />
                        </div>
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
            <BookingChangeContent />
        </Suspense>
    );
}
