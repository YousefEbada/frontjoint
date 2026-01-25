"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import Calendar from "@/components/molecules/Calendar";
import CustomSelect from "@/components/atoms/CustomSelect";
import ActionButton from "@/components/atoms/ActionButton";
import Typography from "@/components/atoms/Typography";
import Divider from "@/components/atoms/Divider";
import { usePendingBooking, useCreateBooking, useAvailableSlots } from "@/hooks/useBooking";
import { CreateBookingPayload } from "@/types/booking";

const BookingContent = () => {
    const router = useRouter();
    const { pendingBooking, cancelPendingBooking, refreshPendingBooking } = usePendingBooking();
    const { mutate: createBooking, isPending: isCreatingBooking } = useCreateBooking();

    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [bookingError, setBookingError] = useState<string>("");
    const [patientId, setPatientId] = useState<string>("");
    const [patientNixpendId, setPatientNixpendId] = useState<string>("");
    const [patientName, setPatientName] = useState<string>("");

    // Load patient ID and refresh pending booking on mount
    useEffect(() => {
        refreshPendingBooking();
        const storedPatientId = localStorage.getItem("patientId");
        const storedPatientNixpendId = localStorage.getItem("patientNixpendId");
        const storedPatientName = localStorage.getItem("patientName");
        if (storedPatientId) {
            setPatientId(storedPatientId);
            setPatientNixpendId(storedPatientNixpendId as any);
            setPatientName(storedPatientName || "");
        }
    }, [refreshPendingBooking]);

    // Pre-fill from pending booking
    useEffect(() => {
        if (pendingBooking) {
            setSelectedDate(pendingBooking.selectedDate);
            setSelectedTime(pendingBooking.selectedTime);
        }
    }, [pendingBooking]);

    // Fetch available slots for the selected doctor
    const {
        data: slotsResponse,
        isLoading: slotsLoading,
    } = useAvailableSlots(pendingBooking?.doctorNixpendId || "");

    // Extract unique available dates
    const availableDates = useMemo(() => {
        if (!slotsResponse?.ok || !slotsResponse.slots) return [];
        const dates = new Set<string>();
        slotsResponse.slots.forEach((slot) => {
            if (slot.start) {
                // Check capacity if fields are present
                const isFull = (slot.appointment_count !== null && slot.event_capacity !== null)
                    ? slot.appointment_count >= slot.event_capacity
                    : false;

                if (!isFull) {
                    dates.add(dayjs(slot.start).format("YYYY-MM-DD"));
                }
            }
        });
        return Array.from(dates);
    }, [slotsResponse]);

    // Get time slots for selected date
    const timeSlotsForDate = useMemo(() => {
        if (!slotsResponse?.ok || !slotsResponse.slots || !selectedDate) return [];
        return slotsResponse.slots
            .filter((slot) => {
                if (!slot.start) return false;
                const isSameDay = dayjs(slot.start).format("YYYY-MM-DD") === selectedDate;

                // Check capacity
                const isFull = (slot.appointment_count !== null && slot.event_capacity !== null)
                    ? slot.appointment_count >= slot.event_capacity
                    : false;

                return isSameDay && !isFull;
            })
            .map((slot) => dayjs(slot.start).format("h:mm A"));
    }, [slotsResponse, selectedDate]);

    // Format display date
    const displayDate = selectedDate
        ? dayjs(selectedDate).format("dddd, MMMM D, YYYY")
        : dayjs().format("dddd, MMMM D, YYYY");

    // Handle confirm booking
    const handleConfirmBooking = () => {
        if (!pendingBooking || !patientId) {
            setBookingError("Missing booking information. Please try again.");
            return;
        }

        if (!selectedDate || !selectedTime) {
            setBookingError("Please select a date and time.");
            return;
        }

        // Find the slot that matches the selected date and time to get the correct branch
        const selectedSlot = slotsResponse?.slots?.find((slot) => {
            if (!slot.start) return false;
            const slotDate = dayjs(slot.start).format("YYYY-MM-DD");
            const slotTime = dayjs(slot.start).format("h:mm A");
            return slotDate === selectedDate && slotTime === `${selectedTime}:00`;
        });
        console.log("5%%%%%%%%%%%%%%%%%%%%%%%%%%5%", selectedDate, "ggggggggggggggggggggggg", `${selectedTime}:00`);
        // if (!selectedSlot) {
        //     setBookingError("Selected slot is no longer available.");
        //     return;
        // }
        console.log("5%%%%%%%%%%%%%%%%%%%%%%%%%%5%", selectedSlot);
        const bookingData: CreateBookingPayload = {
            practitioner: pendingBooking.doctorNixpendId,
            patient: patientNixpendId,
            branch: (selectedSlot?.branch || pendingBooking.branch) as "Alaqiq" | "King Salman",
            daily_practitioner_event: selectedSlot?.event_name || pendingBooking.eventName,
            appointment_date: dayjs(selectedDate).format("YYYY-MM-DD"),
            appointment_time: selectedTime.includes(":") ?
                dayjs(`2000-01-01 ${selectedTime}`).format("HH:mm") :
                selectedTime,
            duration: pendingBooking.duration,
            appointment_type: "consultation",
            department: "Physiotherapy",
            company: "Joint Clinic",
            patient_name: patientName,
        };

        createBooking(bookingData, {
            onSuccess: (response) => {
                if (response.ok) {
                    setBookingSuccess(true);
                    setBookingError("");
                    cancelPendingBooking();
                } else {
                    setBookingError(response.error || "Failed to create booking");
                }
            },
            onError: () => {
                setBookingError("An error occurred while creating the booking");
            },
        });
    };

    // Handle cancel
    const handleCancel = () => {
        cancelPendingBooking();
        router.push("/#book");
    };

    // If no pending booking, show message
    if (!pendingBooking && !bookingSuccess) {
        return (
            <div className="flex flex-col items-center justify-center py-10 gap-6">
                <Typography
                    text="No pending booking found"
                    variant="heading2"
                    className="text-gray-500"
                />
                <Typography
                    text="Please select your appointment details from the booking page first."
                    variant="bodyRegular"
                    className="text-gray-400 text-center"
                />
                <ActionButton
                    text="Go to Booking"
                    variant="outline"
                    onClick={() => router.push("/#book")}
                />
            </div>
        );
    }

    // Success state
    if (bookingSuccess) {
        return (
            <div className="flex flex-col items-center justify-center py-10 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center max-w-md">
                    <Typography
                        text="✅ Booking Confirmed!"
                        variant="heading2"
                        className="text-green-700"
                    />
                    <Typography
                        text={`Your session has been booked for ${displayDate} at ${selectedTime}`}
                        variant="bodyRegular"
                        className="text-green-600 mt-4"
                    />
                    <Typography
                        text="You will receive a confirmation shortly."
                        variant="bodyRegular"
                        className="text-green-500 mt-2"
                    />
                </div>
                <ActionButton
                    text="Back to Dashboard"
                    variant="outline"
                    onClick={() => router.push("/patient/main")}
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 w-full h-full">
            {/* Pending booking info banner */}
            {pendingBooking && (
                <div className="absolute top-0 left-0 right-0 bg-blue-50 border-b border-blue-200 p-3 flex justify-between items-center">
                    <Typography
                        text={`Booking with Dr. ${pendingBooking.doctorName} at ${pendingBooking.branch} branch`}
                        variant="bodyRegular"
                        className="text-blue-700"
                    />
                    <button
                        onClick={handleCancel}
                        className="text-blue-600 underline text-sm hover:text-blue-800"
                    >
                        Cancel
                    </button>
                </div>
            )}

            <div className="flex flex-col gap-6 flex-1 items-center md:items-start mt-12">
                <Typography text="Select the date" variant="heading2" gradient={true} className="text-center md:text-left" />

                {slotsLoading ? (
                    <div className="flex items-center gap-3 py-10">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1e5598]"></div>
                        <span className="text-[#1e5598]">Loading available dates...</span>
                    </div>
                ) : (
                    <div className="w-full flex justify-center md:justify-start">
                        <Calendar
                            onSelect={setSelectedDate}
                            availableDates={availableDates}
                            selectedDate={selectedDate}
                        />
                    </div>
                )}

                <div className="hidden md:flex flex-col gap-2 mt-4 w-full max-w-[380px]">
                    <div className="flex justify-between items-center">
                        <Typography text="Doctor:" variant="bodyBold" className="text-[#1e5598]" />
                        <Typography text={pendingBooking?.doctorName || "-"} variant="bodyBold" className="text-[#167c4f]" />
                    </div>
                    <div className="flex justify-between items-center">
                        <Typography text="Branch:" variant="bodyBold" className="text-[#1e5598]" />
                        <Typography text={pendingBooking?.branch || "-"} variant="bodyBold" className="text-[#167c4f]" />
                    </div>
                </div>
            </div>

            <div className="hidden md:block h-full min-h-[400px]">
                <Divider orientation="vertical" />
            </div>

            <div className="flex flex-col gap-8 flex-1 items-center md:items-start w-full">
                {/* Time Slot */}
                <div className="w-full max-w-[500px]">
                    <Typography text="Choose your time slot" variant="heading2" gradient={true} className="mb-4 text-center md:text-left" />
                    {timeSlotsForDate.length > 0 ? (
                        <CustomSelect
                            items={timeSlotsForDate}
                            value={selectedTime || "Time"}
                            onChange={setSelectedTime}
                            width="100%"
                            height="60px"
                            className="w-full"
                        />
                    ) : selectedDate ? (
                        <Typography text="No time slots available for this date" variant="bodyRegular" className="text-gray-400" />
                    ) : (
                        <Typography text="Please select a date first" variant="bodyRegular" className="text-gray-400" />
                    )}
                </div>

                {/* Error Message */}
                {bookingError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 w-full max-w-[500px]">
                        <div className="text-red-600 text-sm" dangerouslySetInnerHTML={{ __html: `❌ ${bookingError}` }} />
                    </div>
                )}

                {/* Confirm Booking */}
                <div className="w-full max-w-[500px] flex flex-col gap-4">
                    <Typography text="Confirm your booking" variant="heading2" gradient={true} className="text-center lg:text-left" />

                    <div className="text-left flex flex-col gap-y-4 md:gap-y-0">
                        <Typography text="Your Session will be on: " variant="bodyBold" className="text-[#1E5598]" />
                        <Typography
                            text={selectedDate && selectedTime ? `${displayDate} at ${selectedTime}` : "Please select date and time"}
                            variant="bodyRegular"
                            className="text-[#167C4F]"
                        />
                    </div>

                    <Typography
                        text="Please note that the bookings can be rescheduled or cancelled at least 24 hours before the appointment"
                        variant="bodyRegular"
                        className="hidden md:block text-gray-400 text-center lg:text-left text-[14px]"
                    />

                    <div className="flex w-full h-full justify-end md:justify-start mt-4 gap-4">
                        <ActionButton
                            text="Cancel"
                            variant="outline"
                            onClick={handleCancel}
                        />
                        <ActionButton
                            text={isCreatingBooking ? "Booking..." : "Confirm"}
                            variant="outline"
                            onClick={handleConfirmBooking}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingContent;
