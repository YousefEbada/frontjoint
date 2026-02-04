"use client";
import React, { useState, useEffect, useMemo } from "react";
import Button from "@/components/atoms/Button";
import Calendar from "@/components/molecules/Calendar";
import Pagination from "@/components/molecules/Pagination2";
import CustomSelect from "@/components/atoms/CustomSelect";
import "./book.css";
import doctorsData from "@/components/organisms/WhoWeAre/doctors.json";
import { useAvailableSlots, usePendingBooking } from "@/hooks/useBooking";
import { AvailableSlot } from "@/types/booking";
import dayjs from "dayjs";

// Mock injuries list
const MOCK_INJURIES = [
  "Musculoskeletal Injury",
  "Sport Injury",
  "Post-surgical Rehabilitation",
  "Chronic Back Pain",
  "Neck Pain",
  "Tendon Injuries",
  "Knee Osteoarthritis",
];

// Branch options
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

interface BookProps {
  redirectPath?: string;
}

const Book = ({ redirectPath }: BookProps) => {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  // Step 1: Branch selection
  const [selectedBranch, setSelectedBranch] = useState<BranchType | "">("");

  // Step 2: Injury and Doctor selection
  const [selectedInjury, setSelectedInjury] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  // Step 3: Date and Time selection
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<AvailableSlot | null>(null);

  // Booking state
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState<string>("");

  // Get patient ID from localStorage
  const [patientId, setPatientId] = useState<string>("");
  useEffect(() => {
    const storedPatientId = localStorage.getItem("patientId");
    if (storedPatientId) {
      setPatientId(storedPatientId);
    }
  }, []);

  // Filter doctors by department (Physiotherapy) and selected branch
  const filteredDoctors = useMemo(() => {
    if (!selectedBranch) return [];
    return (doctorsData.doctors as Doctor[]).filter(
      (doctor) =>
        doctor.department === "Physiotherapy" &&
        doctor.practitionerCompany?.some((pc) => pc.branch === selectedBranch)
    );
  }, [selectedBranch]);

  // Fetch available slots when doctor is selected
  const {
    data: slotsResponse,
    isLoading: slotsLoading,
    error: slotsError,
  } = useAvailableSlots(selectedDoctor?.nixpendId || "");

  // Pending booking hook for auth-based routing
  const { initiateBooking } = usePendingBooking();

  // Extract unique available dates from slots
  const availableDates = useMemo(() => {
    if (!slotsResponse?.ok || !slotsResponse.slots) return [];
    const dates = new Set<string>();
    slotsResponse.slots.forEach((slot) => {
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
    return slotsResponse.slots.filter((slot) => {
      if (!slot.start) return false;
      return dayjs(slot.start).format("YYYY-MM-DD") === selectedDate;
    });
  }, [slotsResponse, selectedDate]);

  // Format time slots for display
  const timeSlotOptions = useMemo(() => {
    return slotsForSelectedDate.map((slot) => {
      if (!slot.start) return "Unknown Time";
      return dayjs(slot.start).format("h:mm A");
    });
  }, [slotsForSelectedDate]);

  const next = () => {
    if (step === 1 && !selectedBranch) return;
    if (step === 2 && (!selectedInjury || !selectedDoctor)) return;
    if (step < totalSteps) setStep(step + 1);
  };

  const back = () => step > 1 && setStep(step - 1);

  // Handle doctor selection from dropdown
  const handleDoctorSelect = (doctorName: string) => {
    const doctor = filteredDoctors.find((d) => d.practitionerName === doctorName);
    setSelectedDoctor(doctor || null);
    // Reset date/slot when doctor changes
    setSelectedDate("");
    setSelectedSlot(null);
  };

  // Handle time slot selection
  const handleSlotSelect = (timeStr: string) => {
    const slot = slotsForSelectedDate.find((s) => {
      if (!s.start) return false;
      return dayjs(s.start).format("h:mm A") === timeStr;
    });
    setSelectedSlot(slot || null);
  };

  // Handle date selection from calendar
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset slot when date changes
  };

  // Handle booking confirmation - saves pending booking and redirects
  const handleConfirmBooking = () => {
    if (!selectedDoctor || !selectedSlot || !selectedDate) {
      setBookingError("Please select a date and time slot.");
      return;
    }

    // Save pending booking data and redirect based on auth status
    const redirectUrl = redirectPath ? `${redirectPath}?date=${selectedDate}` : undefined;

    initiateBooking({
      branch: selectedSlot.branch || "",
      injury: selectedInjury,
      doctorNixpendId: selectedDoctor.nixpendId,
      doctorName: selectedDoctor.practitionerName,
      selectedDate: selectedDate,
      selectedTime: dayjs(selectedSlot.start).format("HH:mm"),
      eventName: selectedSlot.event_name || "",
      duration: selectedSlot.slot_duration || 30,
      createdAt: new Date().toISOString(),
    }, redirectUrl);
  };

  // Format confirmation message
  const confirmationMessage = useMemo(() => {
    if (!selectedDate || !selectedSlot?.start) return "";
    const date = dayjs(selectedDate);
    const time = dayjs(selectedSlot.start).format("h:mm A");
    return `${date.format("dddd, MMMM D")} ${date.format("YYYY")} at ${time}`;
  }, [selectedDate, selectedSlot]);

  return (
    <div
      id="book"
      className="min-h-screen w-full flex flex-col items-center justify-start bg-[#edf7f9] pb-10"
    >
      {/* MAIN CONTAINER */}
      <div
        className="
        w-[95%] max-w-[1700px]
        h-full md:h-[95%]
        bg-[#fff] 
        shadow-[0px_25px_60px_rgba(30,85,152,0.15)]
        rounded-[20px] sm:rounded-[32px] md:rounded-[48px]
        flex flex-col items-center my-auto
        py-2 md:py-4
      "
      >
        {/* TITLE */}
        <h2
          className="
          text-[9vw] text-[27px] sm:text-[25px] xsm:text-[20px] md:text-[80px]
          font-bold 
          bg-gradient-to-b from-[#0D294D] to-[#1E5598]
          bg-clip-text text-transparent 
          text-center leading-tight
        "
        >
          Book Your Session Now
        </h2>

        {/* SUBTEXT */}
        {(step === 1 || step === 2) && !patientId && (
          <p
            className="
            text-[#afafaf]
            text-[12px] sm:text-[14px] md:text-[22px]
            font-medium
            text-center
          "
          >
            If you are already a member, please{" "}
            <a href="sign-in" className="text-[#1e5598] underline">
              sign in
            </a>{" "}
            first
          </p>
        )}

        {/* MAIN BOX */}
        <div
          className={`
            relative 
            w-[92%] md:w-[85%] bg-[#fff]            
            mt-2 sm:mt-4 md:mt-2
            rounded-[18px] sm:rounded-[22px] md:rounded-[32px]
            p-[30px] sm:p-5 md:p-8
            flex flex-col justify-between
            min-h-[300px] sm:min-h-[350px] md:min-h-[400px]
            ${step === 3 ? "" : "shadow-[0px_20px_60px_rgba(30,85,152,0.15)]"}
          `}
        >
          {/* STEP 1: Branch Selection */}
          {step === 1 && (
            <div className="flex flex-col items-center justify-between min-h-[300px] sm:min-h-[350px] md:min-h-[400px] gap-5 w-full">
              <h3 className="text-[22px] sm:text-[28px] md:text-[48px] font-bold bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent">
                Choose The Branch
              </h3>

              <div className="w-full flex justify-center">
                <CustomSelect
                  items={[...BRANCHES]}
                  value={selectedBranch || "Branch"}
                  onChange={(val) => setSelectedBranch(val as BranchType)}
                  placeholder="Select a branch"
                  width="100%"
                  height="70px"
                  className="md:!w-[600px]"
                />
              </div>

              <Button
                text="Next"
                variant="primary"
                onClick={next}
                disabled={!selectedBranch}
              />
            </div>
          )}

          {/* STEP 2: Injury & Doctor Selection */}
          {step === 2 && (
            <div className="flex flex-col items-center gap-6 w-full">
              <h3 className="text-[22px] sm:text-[28px] md:text-[48px] font-bold bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent text-center">
                Choose The Injury
              </h3>

              <CustomSelect
                items={MOCK_INJURIES}
                value={selectedInjury || "Injury"}
                onChange={(val) => setSelectedInjury(val)}
                placeholder="Select an injury type"
                dropdownMaxHeight="200px"
                width="100%"
                height="70px"
                className="md:!w-[600px]"
              />

              <h3 className="text-[22px] sm:text-[28px] md:text-[48px] font-bold bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent text-center">
                Choose The Doctor
              </h3>

              {filteredDoctors.length > 0 ? (
                <CustomSelect
                  items={filteredDoctors.map((d) => d.practitionerName)}
                  value={selectedDoctor?.practitionerName || "Doctor"}
                  onChange={handleDoctorSelect}
                  dropdownMaxHeight="200px"
                  placeholder="Select a doctor"
                  width="100%"
                  height="70px"
                  className="md:!w-[600px]"
                />
              ) : (
                <p className="text-[#afafaf] text-[14px] md:text-[18px]">
                  No doctors available for this branch
                </p>
              )}

              <div className="flex gap-4 mt-4">
                <Button text="Back" variant="secondary" onClick={back} />
                <Button
                  text="Next"
                  variant="primary"
                  onClick={next}
                  disabled={!selectedInjury || !selectedDoctor}
                />
              </div>
            </div>
          )}

          {/* STEP 3: Date & Time Selection */}
          {step === 3 && (
            <div className="w-full flex flex-col lg:flex-row justify-center items-center lg:items-start gap-6 md:gap-16">
              {/* LEFT SIDE - Calendar */}
              <div className="left flex flex-col items-center lg:items-start w-full lg:w-[50%]">
                <h3 className="text-[22px] sm:text-[26px] md:text-[40px] font-bold bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent text-center lg:text-left">
                  Select the date
                </h3>

                {slotsLoading ? (
                  <div className="flex items-center justify-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#1e5598]"></div>
                    <span className="ml-3 text-[#1e5598]">Loading available dates...</span>
                  </div>
                ) : slotsError || (slotsResponse && !slotsResponse.ok) ? (
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mt-4 text-center">
                    <p className="text-orange-700 text-[16px] md:text-[20px] font-medium">
                      🏖️ Dr. {selectedDoctor?.practitionerName} is currently on vacation
                    </p>
                    <p className="text-orange-600 text-[14px] md:text-[16px] mt-2">
                      No available slots at this time. Please try another doctor or check back later.
                    </p>
                  </div>
                ) : availableDates.length === 0 ? (
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mt-4 text-center">
                    <p className="text-gray-600 text-[16px] md:text-[20px]">
                      No available dates at this time
                    </p>
                  </div>
                ) : (
                  <div className="flex justify-center lg:justify-start w-full mt-4">
                    <Calendar
                      onSelect={handleDateSelect}
                      availableDates={availableDates}
                      selectedDate={selectedDate}
                    />
                  </div>
                )}

                <div className="mt-4">
                  <Button text="Back" variant="secondary" onClick={back} />
                </div>
              </div>

              {/* RIGHT SIDE - Time Slots & Confirmation */}
              <div className="flex flex-col gap-[30px] w-full lg:w-[50%] items-center lg:items-start">
                {/* Time Slot Selection */}
                {selectedDate && slotsForSelectedDate.length > 0 && (
                  <div className="w-full">
                    <h3 className="text-[22px] sm:text-[26px] md:text-[40px] font-bold bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent text-center lg:text-left">
                      Choose your time slot
                    </h3>

                    <CustomSelect
                      items={timeSlotOptions}
                      value={selectedSlot ? dayjs(selectedSlot.start).format("h:mm A") : "Select a time"}
                      onChange={handleSlotSelect}
                      width="100%"
                      height="70px"
                      className="md:!w-[500px] mt-4"
                      dropdownMaxHeight="260px"
                    />
                  </div>
                )}

                {/* Booking Success Message */}
                {bookingSuccess && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 w-full text-center">
                    <p className="text-green-700 text-[18px] md:text-[24px] font-bold">
                      ✅ Booking Confirmed!
                    </p>
                    <p className="text-green-600 text-[14px] md:text-[18px] mt-2">
                      Your session has been booked for {confirmationMessage}
                    </p>
                    <p className="text-green-500 text-[12px] md:text-[14px] mt-2">
                      You will receive a confirmation shortly.
                    </p>
                  </div>
                )}

                {/* Booking Error Message */}
                {bookingError && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 w-full text-center">
                    <p className="text-red-600 text-[14px] md:text-[16px]">
                      ❌ {bookingError}
                    </p>
                  </div>
                )}

                {/* Confirmation Section */}
                {selectedSlot && !bookingSuccess && (
                  <div className="text-center lg:text-left flex flex-col gap-[20px] w-full">
                    <h3 className="text-[22px] sm:text-[26px] md:text-[40px] font-bold bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent text-center lg:text-left">
                      Confirm your booking
                    </h3>

                    <div className="bg-[#f8fafc] rounded-xl p-4 md:p-6">
                      <p className="text-[#1e5598] text-[14px] sm:text-[16px] md:text-[20px] font-medium">
                        <span className="text-gray-500">Branch:</span> {selectedBranch}
                      </p>
                      <p className="text-[#1e5598] text-[14px] sm:text-[16px] md:text-[20px] font-medium mt-2">
                        <span className="text-gray-500">Doctor:</span> {selectedDoctor?.practitionerName}
                      </p>
                      <p className="text-[#1e5598] text-[14px] sm:text-[16px] md:text-[20px] font-medium mt-2">
                        <span className="text-gray-500">Date & Time:</span>{" "}
                        <span className="text-[#167c4f] font-bold">{confirmationMessage}</span>
                      </p>
                    </div>

                    <p className="text-[#9ca3af] text-[12px] sm:text-[14px] md:text-[16px] leading-5 mt-1">
                      Please note that bookings can be rescheduled or cancelled at least 24 hours
                      before the appointment
                    </p>

                    {!patientId && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-yellow-700 text-[12px] md:text-[14px]">
                          ⚠️ Please{" "}
                          <a href="/sign-in" className="underline font-medium">
                            sign in
                          </a>{" "}
                          to confirm your booking
                        </p>
                      </div>
                    )}

                    <div className="mt-3 flex justify-center lg:justify-start">
                      <Button
                        text="Confirm Booking"
                        variant="primary"
                        onClick={handleConfirmBooking}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* PAGINATION */}
        <div className="mt-4 mb-4">
          <Pagination total={totalSteps} current={step} onChange={() => { }} />
        </div>
      </div>
    </div>
  );
};

export default Book;