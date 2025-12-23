"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import Calendar from "@/components/molecules/Calendar";
import CustomSelect from "@/components/atoms/CustomSelect";
import ActionButton from "@/components/atoms/ActionButton";
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
        <div className="flex flex-col md:flex-row gap-8 lg:gap-16 w-full h-full">
            <div className="flex flex-col gap-6 flex-1 items-center md:items-start">
                <Typography text="Select the date" variant="heading2" gradient={true} className=" text-center md:text-left" />

                <div className="w-full flex justify-center md:justify-start">
                    <Calendar />
                </div>

                <div className="hidden md:flex flex-col gap-2 mt-4 w-full max-w-[380px]">
                    <div className="flex justify-between items-center">
                        <Typography text="Remaining Sessions:" variant="bodyBold" className="text-[#1e5598]" />
                        <Typography text="11" variant="bodyBold" className="text-[#167c4f]" />
                    </div>
                    <div className="flex justify-between items-center">
                        <Typography text="Remaining Weeks:" variant="bodyBold" className="text-[#1e5598]" />
                        <Typography text="5 Weeks" variant="bodyBold" className="text-[#167c4f]" />
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
                    <Typography text="Confirm your booking" variant="heading2" gradient={true} className="text-center lg:text-left" />

                    <div className="text-left flex flex-col gap-y-4 md:gap-y-0">
                        <Typography text="Your Session will be on: " variant="bodyBold" className="text-[#1E5598]" />
                        <Typography text={`${selectedDate} at ${selectedTime}`} variant="bodyRegular" className="text-[#167C4F]" />
                    </div>

                    <Typography text="Please note that the bookings can be rescheduled or cancelled at least 24 hours before the appointment" variant="bodyRegular" className="hidden md:block text-gray-400 text-center lg:text-left text-[14px]" />

                    <div className="flex w-full h-full justify-end md:justify-start mt-4">
                        <ActionButton text="Confirm" variant="outline" />
                    </div>
                </div>

                {/* Session Info */}
                <div className="hidden md:flex flex-col gap-2 w-full max-w-[500px] mt-auto">
                    <div className="flex justify-between items-center">
                        <Typography text="Now you're booking :" variant="bodyBold" className="text-[#1e5598]" />
                        <Typography text="6th Session" variant="bodyBold" className="text-[#167c4f]" />
                    </div>
                    <div className="hidden md:flex justify-between items-center">
                        <Typography text="Current Week:" variant="bodyBold" className="text-[#1e5598]" />
                        <Typography text="3" variant="bodyBold" className="text-[#167c4f]" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default BookingContent;
