"use client";
import React from "react";
import ProgressCard from "@/components/organisms/ProgressCard/ProgressCard";
import DoctorDetails from "@/components/molecules/DoctorDetails";

export default function MyProgressPage() {
    const stats = [
        { label: "Number Of Exercises:", value: 16 },
        { label: "Exercises completed:", value: 5, valueColor: "#1C9A55" },
        { label: "Exercises Assigned By doctor:", value: 8 },
        { label: "Exercises completed:", value: 12, valueColor: "#1C9A55" },
    ];

    return (
        <main className="w-full h-full flex flex-col gap-8 p-4 md:p-8 overflow-y-auto custom-scrollbar">
            <ProgressCard percentage={35} stats={stats} />
            <DoctorDetails />
        </main>
    );
}
