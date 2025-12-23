"use client";
import React, { useState } from "react";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import CorneredBoxes from "@/components/atoms/CorneredBoxes";
import SearchInput from "@/components/atoms/searchInput";
import ScrollableArea from "@/components/atoms/ScrollableArea";
import PatientCard from "@/components/molecules/PatientCard";
import Link from "next/link";
import DashBoardContent from "@/components/atoms/DashBoardContent";

// Mock Data
const allPatients = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    name: "Patient Name",
    injury: "Back injury",
    status: i % 3 === 0 ? "Inactive" : "Active",
    statusColor: i % 3 === 0 ? "text-[#8A8A8A]" : "text-[#1C9A55]"
}));

const MedicalReportsPage = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredReports = allPatients.filter(r =>
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.injury.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full h-full flex flex-col">
            <DashBoardHeader therapyName="" nav={false} />

            <DashBoardContent>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <Typography
                        text="Medical Reports"
                        variant="heading2"
                        className="font-bold text-3xl self-start"
                        gradient={true}
                    />

                    <div className="w-full md:w-[300px]">
                        <SearchInput
                            placeholder="Search By Report or Patient"
                            value={searchTerm}
                            onChange={(value) => setSearchTerm(value)}
                            className="w-full"
                        />
                    </div>
                </div>

                <div className="w-full flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-y-2 md:block md:bg-white md:rounded-[24px] md:shadow-sm md:p-8">
                    <ScrollableArea className="w-full h-full px-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                            {filteredReports.length > 0 ? (
                                filteredReports.map((report) => (
                                    <Link key={report.id} href={`/doctor/reports/${report.id}`} className="w-full">
                                        <PatientCard
                                            name={report.name}
                                            injury={report.injury}
                                            status={report.status}
                                            statusColor={report.statusColor}
                                        />
                                    </Link>
                                ))
                            ) : (
                                <div className="col-span-full flex items-center justify-center text-gray-400 h-40">
                                    No reports found.
                                </div>
                            )}
                        </div>
                    </ScrollableArea>
                </div>
            </DashBoardContent>
        </div>
    );
};

export default MedicalReportsPage;
