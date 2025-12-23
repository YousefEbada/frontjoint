"use client";
import React from "react";
import Typography from "@/components/atoms/Typography";
import PreviousMessages from "@/components/molecules/PreviousMessages";
import NewMessage from "@/components/molecules/NewMessage";
import DoctorDetails from "@/components/molecules/DoctorDetails";

const RequestDoctorHelp = () => {
    return (
        <div className="w-full h-full flex flex-col gap-4">
            <Typography
                text="Contact Your Doctor"
                variant="heading2"
                className="text-[#0D294D] font-bold text-2xl md:text-3xl mb-4"
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <PreviousMessages />
                <NewMessage />
            </div>
            <DoctorDetails />
        </div>
    );
};

export default RequestDoctorHelp;
