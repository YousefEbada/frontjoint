"use client";
import React from "react";
import Typography from "@/components/atoms/Typography";
import Profile from "@/components/atoms/icons/Profile"; // Using Profile icon as placeholder for avatar

const DoctorDetails = () => {
    return (
        <div className="w-fullmd:p-6">
            <Typography
                text="Doctor Details"
                variant="heading2"
                className="text-[#1E5598] font-bold text-2xl mb-6"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Typography text="Doctor Name:" variant="bodyBold" className="text-[#1E5598] font-medium" />
                    <Typography text="Name Here" variant="bodyBold" className="text-[#1E8F67] font-medium" />
                    <Typography text="Last time check by doctor on:" variant="bodyBold" className="text-[#1E5598] font-medium" />
                    <Typography text="Monday, January 2nd 2026 at 8:00 Am" variant="bodyBold" className="text-[#1E8F67] font-medium" />
            </div>
        </div>
    );
};

export default DoctorDetails;
