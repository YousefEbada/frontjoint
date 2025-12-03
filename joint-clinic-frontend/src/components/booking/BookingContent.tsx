"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import Calendar from "@/components/molecules/calender";
import CustomSelect from "@/components/atoms/CustomSelect";
import Button from "@/components/atoms/button";
import Typography from "@/components/atoms/Typography";
import Divider from "@/components/atoms/Divider";

const BookingContent = () => {
    const searchParams = useSearchParams();
    const dateParam = searchParams?.get("date");
    const parsedDate = dateParam ? dayjs(dateParam) : dayjs();
    const isValidDate = parsedDate.isValid();
    const selectedDate = isValidDate ? parsedDate.format("dddd, MMMM D, YYYY") : dayjs().format("dddd, MMMM D, YYYY");
    const [selectedTime, setSelectedTime] = useState("8:00 Am");


    return (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 w-full h-full">

            {/* Left Column */}
            <div className="flex flex-col gap-6 flex-1 items-center lg:items-start">
                <Typography variant="heading2" className="text-[#0D294D] text-center lg:text-left">
                    Select the date
                </Typography>

                <div className="w-full flex justify-center lg:justify-start">
                    <Calendar />
                </div>

                <div className="flex flex-col gap-2 mt-4 w-full max-w-[380px]">
                    <div className="flex justify-between items-center">
                        <Typography variant="bodyBold" className="text-[#1e5598]">Remaining Sessions:</Typography>
                        <Typography variant="bodyBold" className="text-[#167c4f]">11</Typography>
                    </div>
                    <div className="flex justify-between items-center">
                        <Typography variant="bodyBold" className="text-[#1e5598]">Remaining Weeks:</Typography>
                        <Typography variant="bodyBold" className="text-[#167c4f]">5 Weeks</Typography>
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="hidden lg:block h-full min-h-[400px]">
                <Divider orientation="vertical" />
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-8 flex-1 items-center lg:items-start w-full">

                {/* Time Slot */}
                <div className="w-full max-w-[500px]">
                    <Typography variant="heading2" className="text-[#0D294D] mb-4 text-center lg:text-left">
                        Choose your time slot
                    </Typography>
                    <CustomSelect
                        items={["8:00 Am", "9:00 Am", "10:00 Am", "11:00 Am", "12:00 Pm"]}
                        onChange={setSelectedTime}
                        width="100%"
                        height="60px"
                        className="w-full"
                    />
                </div>

                {/* Confirm Booking */}
                <div className="w-full max-w-[500px] flex flex-col gap-4">
                    <Typography variant="heading2" className="text-[#0D294D] text-center lg:text-left">
                        Confirm your booking
                    </Typography>

                    <div className="text-center lg:text-left">
                        <span className="text-[#0D294D] font-bold text-[16px] md:text-[18px]">Your Session will be on: </span>
                        <span className="text-[#167c4f] font-bold text-[16px] md:text-[18px]">{selectedDate} at {selectedTime}</span>
                    </div>

                    <Typography variant="bodyRegular" className="text-gray-400 text-center lg:text-left text-[14px]">
                        Please note that the bookings can be rescheduled or cancelled at least 24 hours before the appointment
                    </Typography>

                    <div className="flex justify-center lg:justify-start mt-4">
                        <Button text="Confirm" variant="primary" />
                    </div>
                </div>

                {/* Session Info */}
                <div className="flex flex-col gap-2 w-full max-w-[500px] mt-auto">
                    <div className="flex justify-between items-center">
                        <Typography variant="bodyBold" className="text-[#1e5598]">Now you're booking :</Typography>
                        <Typography variant="bodyBold" className="text-[#167c4f]">6th Session</Typography>
                    </div>
                    <div className="flex justify-between items-center">
                        <Typography variant="bodyBold" className="text-[#1e5598]">Current Week:</Typography>
                        <Typography variant="bodyBold" className="text-[#167c4f]">3</Typography>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BookingContent;
