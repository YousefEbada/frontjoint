"use client";
import React, { useState } from "react";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import CorneredBoxes from "@/components/atoms/CorneredBoxes";
import SearchInput from "@/components/atoms/searchInput";
import ScrollableArea from "@/components/atoms/ScrollableArea";
import BackTo from "@/components/molecules/BackTo";
import Link from "next/link";
import PatientCard from "@/components/molecules/PatientCard";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import { usePatients } from "@/hooks/usePatient";

// Mock Data removed

const PatientsPage = () => {
    const [activeTab, setActiveTab] = useState<"active" | "all">("active");
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch patients with status filter based on active tab
    const statusFilter = activeTab === "active" ? "active" : undefined;
    const { data: patients, isLoading } = usePatients(statusFilter);

    const filteredPatients = patients?.filter(p => {
        // Get fullName from userId populated field or from patient directly
        const patientName = (p as any).userId?.fullName || (p as any).fullName || '';
        const matchesSearch = patientName.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    }) || [];

    return (
        <div className="w-full h-full flex flex-col">
            <DashBoardHeader therapyName="" nav={false}>
                <div className="flex gap-8">
                    <div onClick={() => setActiveTab("active")} className="cursor-pointer">
                        <Typography
                            text="Active Patients"
                            variant="bodyRegular"
                            className={`${activeTab === "active" ? "text-[#1E5598]" : "text-[#9CA3AF]"} font-bold text-lg transition-colors`}
                        />
                    </div>
                    <div onClick={() => setActiveTab("all")} className="cursor-pointer">
                        <Typography
                            text="All Patients"
                            variant="bodyRegular"
                            className={`${activeTab === "all" ? "text-[#1E5598]" : "text-[#9CA3AF]"} font-bold text-lg transition-colors`}
                        />
                    </div>
                </div>
            </DashBoardHeader>

            <DashBoardContent>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <Typography
                        text={activeTab === "active" ? "Active Patients" : "All Patients"}
                        variant="heading2"
                        className="self-start font-bold text-3xl"
                        gradient={true}
                    />

                    <div className="w-full md:w-[300px]">
                        <SearchInput
                            placeholder="Search By patient"
                            value={searchTerm}
                            onChange={(value) => setSearchTerm(value)}
                            className="w-full"
                        />
                    </div>
                </div>

                <div className="w-full flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-y-2 md:block md:bg-white md:rounded-[24px] md:shadow-sm md:p-8">
                    <ScrollableArea className="w-full h-full px-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                            {filteredPatients.length > 0 ? (
                                filteredPatients.map((patient, index) => {
                                    // Get patient name from populated userId or fallback
                                    const patientName = (patient as any).userId?.fullName || patient.fullName || 'Unknown Patient';
                                    // Get injury from injuryDetails or condition
                                    const injury = patient.injuryDetails?.affectedArea || (patient as any).condition || "No specified injury";

                                    return (
                                        <Link key={patient._id || index} href={`/doctor/patients/${patient._id}`} className="w-full">
                                            <PatientCard
                                                name={patientName}
                                                injury={injury}
                                                status={patient.status === 'active' ? "Active" : "Inactive"}
                                                statusColor={patient.status === 'active' ? "text-[#1C9A55]" : "text-[#8A8A8A]"}
                                            />
                                        </Link>
                                    );
                                })
                            ) : (
                                <div className="col-span-full flex items-center justify-center text-gray-400 h-40">
                                    No patients found.
                                </div>
                            )}
                        </div>
                    </ScrollableArea>
                </div>
            </DashBoardContent>
        </div>
    );
};

export default PatientsPage;
