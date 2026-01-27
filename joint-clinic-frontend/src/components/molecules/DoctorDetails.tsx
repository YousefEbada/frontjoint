"use client";
import React, { useEffect } from "react";
import Typography from "@/components/atoms/Typography";
import Profile from "@/components/atoms/icons/Profile"; // Using Profile icon as placeholder for avatar
import { findDoctorByNixpendId } from "@/lib/api/doctor.api";

const DoctorDetails = () => {
    const [doctorName, setDoctorName] = React.useState("Dr. Name Here");
    const [lastCheckDate, setLastCheckDate] = React.useState("Monday, January 2nd 2026 at 8:00 Am");

    useEffect(() => {
        async function getDoctorName(id: string) {
            const doctorName = await findDoctorByNixpendId(id);
            setDoctorName(`Dr. ${doctorName.practitionerName}`);
        }
        const doctorNixpendId = localStorage.getItem('doctorNixpendId');
        if (doctorNixpendId) {
            getDoctorName(doctorNixpendId);
        } else {
            const storedName = localStorage.getItem('doctorName');
            if (storedName) setDoctorName(`Dr. ${storedName}`);
        }
    }, []);

    return (
        <div className="w-fullmd:p-6">
            <Typography
                text="Doctor Details"
                variant="heading2"
                className="text-[#1E5598] font-bold text-2xl mb-6"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Typography text="Doctor Name:" variant="bodyBold" className="text-[#1E5598] font-medium" />
                    <Typography text={doctorName} variant="bodyBold" className="text-[#1E8F67] font-medium" />
                    <Typography text="Last time check by doctor on:" variant="bodyBold" className="text-[#1E5598] font-medium" />
                    <Typography text={lastCheckDate} variant="bodyBold" className="text-[#1E8F67] font-medium" />
            </div>
        </div>
    );
};

export default DoctorDetails;
