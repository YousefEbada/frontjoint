"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import Calendar from "@/components/molecules/Calendar";
import CustomSelect from "@/components/atoms/CustomSelect";
import ActionButton from "@/components/atoms/ActionButton";
import Typography from "@/components/atoms/Typography";
import Divider from "@/components/atoms/Divider";
import Button from "@/components/atoms/Button";
import { usePendingBooking, useCreateBooking, useAvailableSlots } from "@/hooks/useBooking";
import { CreateBookingPayload, AvailableSlot } from "@/types/booking";
import { updatePatient } from "@/lib/api/patient.api";
import doctorsData from "@/components/organisms/WhoWeAre/doctors.json";
import Pagination from "@/components/molecules/Pagination2";

// Constants
const MOCK_INJURIES = [
    "Musculoskeletal Injury",
    "Sport Injury",
    "Post-surgical Rehabilitation",
    "Chronic Back Pain",
    "Neck Pain",
    "Tendon Injuries",
    "Knee Osteoarthritis",
];

const BRANCHES = ["Alaqiq", "King Salman"] as const;
type BranchType = (typeof BRANCHES)[number];

interface Doctor {
    _id: string;
    nixpendId: string;
    imgUrl: string;
    practitionerName: string;
    fullNameArabic: string;
    department: string;
    practitionerCompany: { company: string; branch: string }[];
}

const BookingContent = () => {
    const router = useRouter();
    const { pendingBooking, cancelPendingBooking, refreshPendingBooking } = usePendingBooking();
    const { mutate: createBooking, isPending: isCreatingBooking } = useCreateBooking();

    // -- Global State --
    const [patientId, setPatientId] = useState<string>("");
    const [patientNixpendId, setPatientNixpendId] = useState<string>("");
    const [patientName, setPatientName] = useState<string>("");
    const [step, setStep] = useState(1); // 1: Branch, 2: Injury/Doctor, 3: Date/Time

    // -- Step 1: Branch Selection --
    const [selectedBranch, setSelectedBranch] = useState<BranchType | "">("");

    // -- Step 2: Injury & Doctor Selection --
    const [selectedInjury, setSelectedInjury] = useState<string>("");
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

    // -- Step 3: Date & Time Selection --
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedTime, setSelectedTime] = useState<string>("");

    // -- Booking Status --
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [bookingError, setBookingError] = useState<string>("");

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

    // Pre-fill from pending booking if available
    useEffect(() => {
        if (pendingBooking) {
            // If we have a pending booking, we treat it as being at the final confirmation step (effectively step 3 logic)
            // But visually we might just want to show the date/time selection if not fully selected, or confirmation.
            // Current flow implies pendingBooking has everything except maybe final confirmation or it allows re-selecting date.
            // Let's adopt the logic: pendingBooking -> fill state -> go to Step 3 directly.

            // Map string branch to BranchType if valid, else string
            if (pendingBooking && BRANCHES.includes(pendingBooking.branch as any)) {
                setSelectedBranch(pendingBooking.branch as BranchType);
            }

            setSelectedInjury(pendingBooking.injury);
            // We need to reconstruct the doctor object or at least enough for display/logic
            // Ideally we should find the doctor in our data to have the full object
            const doctor = (doctorsData.doctors as Doctor[]).find(d => d.nixpendId === pendingBooking.doctorNixpendId);
            if (doctor) setSelectedDoctor(doctor);

            setSelectedDate(pendingBooking.selectedDate);
            setSelectedTime(pendingBooking.selectedTime);

            // Force step 3 if we have a pending booking
            setStep(3);
        }
    }, [pendingBooking]);


    // Derived State: Filtered Doctors
    const filteredDoctors = useMemo(() => {
        if (!selectedBranch) return [];
        return (doctorsData.doctors as Doctor[]).filter(
            (doctor) =>
                doctor.department === "Physiotherapy" &&
                doctor.practitionerCompany?.some((pc) => pc.branch === selectedBranch)
        );
    }, [selectedBranch]);


    // Fetch available slots for the selected doctor
    const {
        data: slotsResponse,
        isLoading: slotsLoading,
    } = useAvailableSlots(selectedDoctor?.nixpendId || pendingBooking?.doctorNixpendId || "");

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

                // Check if slot is already taken (appointment_type_appointment should be null)
                const isTaken = slot.appointment_type_appointment !== null;

                if (!isFull && !isTaken) {
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

                // Check if slot is already taken
                const isTaken = slot.appointment_type_appointment !== null;

                return isSameDay && !isFull && !isTaken;
            })
            // Map to formatted string for display
            .map((slot) => dayjs(slot.start).format("h:mm A"));
    }, [slotsResponse, selectedDate]);


    // Handlers
    const next = () => {
        if (step === 1 && !selectedBranch) return;
        if (step === 2 && (!selectedInjury || !selectedDoctor)) return;
        if (step < 3) setStep(step + 1);
    };

    const back = () => {
        if (step > 1) {
            setStep(step - 1);
            setBookingError(""); // Clear errors when going back
        }
    };

    const handleDoctorSelect = (doctorName: string) => {
        const doctor = filteredDoctors.find((d) => d.practitionerName === doctorName);
        setSelectedDoctor(doctor || null);
        setSelectedDate("");
        setSelectedTime("");
    };

    // Format display date
    const displayDate = selectedDate
        ? dayjs(selectedDate).format("dddd, MMMM D, YYYY")
        : "";

    // Handle confirm booking
    const handleConfirmBooking = async () => {
        if (!patientId) {
            // Should not happen in dashboard, but good check
            setBookingError("Missing patient information.");
            return;
        }

        if (!selectedDate || !selectedTime) {
            setBookingError("Please select a date and time.");
            return;
        }

        if (!selectedDoctor) {
            setBookingError("Missing doctor information.");
            return;
        }

        // Find the slot that matches the selected date and time to get the correct branch/event name
        const selectedSlot = slotsResponse?.slots?.find((slot) => {
            if (!slot.start) return false;
            const slotDate = dayjs(slot.start).format("YYYY-MM-DD");
            const slotTime = dayjs(slot.start).format("h:mm A");
            return slotDate === selectedDate && slotTime === `${selectedTime}${selectedTime.includes(":") ? "" : ":00"}`.replace(":00:00", ":00"); // Normalize
        });

        // Simple time match since format might vary slightly
        const targetTimeStr = selectedTime.includes(":") ? selectedTime : ''; // Assuming selectedTime is "h:mm A" format based on previous logic

        // We need to be careful with time matching. 
        // selectedTime comes from dropdown which is `dayjs(slot.start).format("h:mm A")`
        // We can just find the slot again using index or matching formatted time

        const matchedSlot = slotsResponse?.slots?.find(slot => {
            if (!slot.start) return false;
            return dayjs(slot.start).format("h:mm A") === selectedTime && dayjs(slot.start).format("YYYY-MM-DD") === selectedDate;
        });


        const bookingData: CreateBookingPayload = {
            practitioner: selectedDoctor.nixpendId,
            patient: patientNixpendId,
            branch: (matchedSlot?.branch || selectedBranch) as "Alaqiq" | "King Salman",
            daily_practitioner_event: matchedSlot?.event_name || pendingBooking?.eventName || "",
            appointment_date: dayjs(selectedDate).format("YYYY-MM-DD"),
            appointment_time: selectedTime.includes("M") ? // it has AM/PM
                dayjs(`2000-01-01 ${selectedTime}`).format("HH:mm") :
                selectedTime,
            duration: matchedSlot?.slot_duration || pendingBooking?.duration || 30,
            appointment_type: "consultation",
            department: "Physiotherapy",
            company: "Joint Clinic",
            patient_name: patientName,
        };

        // 1. Update Patient's Doctor Assignment FIRST
        try {
            if (selectedDoctor.nixpendId) {
                // Optimistically update local storage
                localStorage.setItem("doctorNixpendId", selectedDoctor.nixpendId);
                localStorage.setItem("doctorName", selectedDoctor.practitionerName);

                // Await API update
                await updatePatient(patientId, {
                    doctorNixpendId: selectedDoctor.nixpendId
                });
            }
        } catch (err) {
            console.error("Failed to assign doctor to patient:", err);
            // We continue with booking even if assignment fails, or you could return; here
        }

        console.log("Booking Data:", bookingData);

        createBooking(bookingData, {
            onSuccess: async (response) => {
                if (response.ok) {
                    setBookingSuccess(true);
                    setBookingError("");

                    if (pendingBooking) {
                        cancelPendingBooking();
                    }
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
        if (pendingBooking) {
            cancelPendingBooking();
        }
        // If simply cancelling the process in dashboard, maybe reset to step 1
        setStep(1);
        setSelectedBranch("");
        setSelectedInjury("");
        setSelectedDoctor(null);
        setSelectedDate("");
        setSelectedTime("");
        setBookingSuccess(false);
    };


    // Success View
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

    // -- RENDER STEPS --

    return (
        <div className="flex flex-col w-full h-full min-h-[500px]">
            {/* Steps Visual Indicator (Optional, can replace Pagination) */}
            {/* Content Container */}
            <div className="flex-1 flex flex-col items-center w-full">

                {/* STEP 1: Branch Selection */}
                {step === 1 && (
                    <div className="flex flex-col items-center gap-8 w-full max-w-[600px] animate-fade-in text-center p-4">
                        <Typography
                            text="Select Branch"
                            variant="heading2"
                            gradient={true}
                            className="text-[24px] md:text-[32px]"
                        />

                        <CustomSelect
                            items={[...BRANCHES]}
                            value={selectedBranch || "Branch"}
                            onChange={(val) => setSelectedBranch(val as BranchType)}
                            placeholder="Select a branch"
                            width="100%"
                            height="60px"
                        />

                        <Button
                            text="Next"
                            variant="primary"
                            onClick={next}
                            disabled={!selectedBranch}
                            className="w-full md:w-auto px-12"
                        />
                    </div>
                )}

                {/* STEP 2: Injury & Doctor Selection */}
                {step === 2 && (
                    <div className="flex flex-col items-center gap-8 w-full max-w-[600px] animate-fade-in text-center p-4">
                        <div className="w-full">
                            <Typography
                                text="Select Injury"
                                variant="heading2"
                                gradient={true}
                                className="mb-4 text-[24px] md:text-[32px]"
                            />
                            <CustomSelect
                                items={MOCK_INJURIES}
                                value={selectedInjury || "Injury"}
                                onChange={(val) => setSelectedInjury(val)}
                                placeholder="Select an injury type"
                                dropdownMaxHeight="200px"
                                width="100%"
                                height="60px"
                            />
                        </div>

                        <div className="w-full">
                            <Typography
                                text="Select Doctor"
                                variant="heading2"
                                gradient={true}
                                className="mb-4 text-[24px] md:text-[32px]"
                            />
                            {filteredDoctors.length > 0 ? (
                                <CustomSelect
                                    items={filteredDoctors.map((d) => d.practitionerName)}
                                    value={selectedDoctor?.practitionerName || "Doctor"}
                                    onChange={handleDoctorSelect}
                                    dropdownMaxHeight="100px"
                                    placeholder="Select a doctor"
                                    width="100%"
                                    height="60px"
                                />
                            ) : (
                                <Typography text="No doctors available for this branch" variant="bodyRegular" className="text-gray-400" />
                            )}
                        </div>

                        <div className="flex gap-4 w-full justify-center">
                            <Button text="Back" variant="secondary" onClick={back} className="px-8" />
                            <Button
                                text="Next"
                                variant="primary"
                                onClick={next}
                                disabled={!selectedInjury || !selectedDoctor}
                                className="px-8"
                            />
                        </div>
                    </div>
                )}

                {/* STEP 3: Date & Time Selection (Modified functionality from original BookingContent) */}
                {step === 3 && (
                    <div className="flex flex-col md:flex-row gap-8 lg:gap-16 w-full h-full animate-fade-in">
                        {/* Left: Date Selection */}
                        <div className="flex flex-col gap-6 flex-1 items-center md:items-start mt-4 md:mt-12">
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
                                    <Typography text={selectedDoctor?.practitionerName || pendingBooking?.doctorName || "-"} variant="bodyBold" className="text-[#167c4f]" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <Typography text="Branch:" variant="bodyBold" className="text-[#1e5598]" />
                                    <Typography text={selectedBranch || pendingBooking?.branch || "-"} variant="bodyBold" className="text-[#167c4f]" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <Typography text="Injury:" variant="bodyBold" className="text-[#1e5598]" />
                                    <Typography text={selectedInjury || pendingBooking?.injury || "-"} variant="bodyBold" className="text-[#167c4f]" />
                                </div>
                            </div>

                            <div className="mt-4 md:hidden">
                                <Button text="Back to Selection" variant="secondary" onClick={back} />
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="hidden md:block h-full min-h-[400px]">
                            <Divider orientation="vertical" />
                        </div>

                        {/* Right: Time & Confirm */}
                        <div className="flex flex-col gap-8 flex-1 items-center md:items-start w-full">
                            {/* Time Slot */}
                            <div className="w-full max-w-[500px]">
                                <Typography text="Choose your time slot" variant="heading2" gradient={true} className="mb-4 text-center md:text-left" />
                                {timeSlotsForDate.length > 0 ? (
                                    <CustomSelect
                                        items={timeSlotsForDate}
                                        value={selectedTime || "Select Time"}
                                        onChange={setSelectedTime}
                                        dropdownMaxHeight="200px"
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
                                    {/* Only show Back button on Step 3 for navigation */}
                                    {!pendingBooking && (
                                        <ActionButton
                                            text="Back"
                                            variant="outline"
                                            onClick={back}
                                        />
                                    )}
                                    <ActionButton
                                        text="Cancel"
                                        variant="outline"
                                        onClick={handleCancel}
                                        className={!pendingBooking ? "hidden" : ""} // Hide cancel if standard flow, just use back/nav
                                    />
                                    <ActionButton
                                        text={isCreatingBooking ? "Booking..." : "Confirm"}
                                        variant="outline"
                                        onClick={handleConfirmBooking}
                                        disabled={!selectedDate || !selectedTime || isCreatingBooking}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Pagination/Stepper Indicator */}
            {!bookingSuccess && !pendingBooking && (
                <div className="mt-4 mb-4">
                    <Pagination total={3} current={step} onChange={() => { }} />
                </div>
            )}
        </div>
    );
};

export default BookingContent;
