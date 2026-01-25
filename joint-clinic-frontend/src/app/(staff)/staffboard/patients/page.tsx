"use client";
import React, { useState } from "react";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import SearchInput from "@/components/atoms/searchInput";
import ScrollableArea from "@/components/atoms/ScrollableArea";
import Link from "next/link";
import PatientCard from "@/components/molecules/PatientCard";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import { usePatients } from "@/hooks/usePatient";
import { Patient } from "@/lib/api/patient.api";



const PatientsContent = () => {

    // Initialize activeTab to 'active' by default
    const [activeTab, setActiveTabState] = useState<"active" | "all">("active");
    const [searchTerm, setSearchTerm] = useState("");

    const setActiveTab = (tab: "active" | "all") => {
        setActiveTabState(tab);
    };

    // Fetch patients based on active tab
    // When activeTab is "all", we pass undefined to fetch all patients
    const { data: patients = [], isLoading } = usePatients(activeTab === "active" ? "active" : undefined);

    const filteredPatients = patients.filter((p: Patient) => {
        // Handle name extraction safely. 
        // Note: p.userId might be an object if populated, so we cast to any to access fullName
        const name = (p.userId as any)?.fullName || p.fullName || "Unknown";
        const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
    });

    const getStatusColor = (status?: string) => {
        return status === "active" ? "text-[#1C9A55]" : "text-[#8A8A8A]";
    };

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
                        {isLoading ? (
                            <div className="flex items-center justify-center h-40">Loading...</div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                                {filteredPatients.length > 0 ? (
                                    filteredPatients.map((patient: Patient) => {
                                        const name = (patient.userId as any)?.fullName || patient.fullName || "Unknown";
                                        return (
                                            <Link key={patient._id} href={`/staffboard/patients/${patient._id}`} className="w-full">
                                                <PatientCard
                                                    name={name}
                                                    injury={patient.injuryDetails?.affectedArea || "Unknown"}
                                                    status={patient.status || "inactive"}
                                                    statusColor={getStatusColor(patient.status)}
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
                        )}
                    </ScrollableArea>
                </div>
            </DashBoardContent>
        </div>
    );
};

const PatientsPage = () => {
    return (
        <React.Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
            <PatientsContent />
        </React.Suspense>
    );
};

export default PatientsPage;
