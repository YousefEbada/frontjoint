"use client";
import React from "react";
import ProgressCard from "@/components/organisms/ProgressCard/ProgressCard";
import DoctorDetails from "@/components/molecules/DoctorDetails";
import DashBoardContent from "@/components/atoms/DashBoardContent";

export default function MyProgressPage() {
    const stats = [
        { label: "Number Of Exercises:", value: 16 },
        { label: "Exercises completed:", value: 5, valueColor: "#1C9A55" },
        { label: "Exercises Assigned By doctor:", value: 8 },
        { label: "Exercises completed:", value: 12, valueColor: "#1C9A55" },
    ];

    return (
        <DashBoardContent>
            <div className="w-full h-full md:bg-white md:rounded-[30px] md:shadow-[0_4px_20px_rgba(0,0,0,0.02)] md:p-8 flex flex-col gap-y-6 md:gap-6">
                <ProgressCard percentage={35} stats={stats} />
                <hr className=" bg-black h-px w-full" />
                <DoctorDetails />
            </div>
        </DashBoardContent>
    );
}
