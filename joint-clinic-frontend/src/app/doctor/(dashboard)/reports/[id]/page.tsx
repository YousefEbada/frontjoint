"use client";
import React from "react";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import ReportList, { Report } from "@/components/organisms/Reports/ReportList";
import { usePatient } from "@/hooks/usePatient";

const PatientReportsPage = ({ params }: { params: { id: string } }) => {
    const { data: patient, isLoading } = usePatient(params.id);

    // Derive reports from patient data.
    // If medicalReports is just an array of strings (URLs/names), we map them to the Report interface.
    // If undefined, empty array.
    const reports: Report[] = patient?.injuryDetails?.medicalReports?.map((r, index) => ({
        id: index.toString(),
        reportName: `Report ${index + 1}`, // Or parse name from string if feasible
        status: "Uploaded",
        dateInfo: "Uploaded recently", // No date in string[] usually
        downloadUrl: r // Assuming the string is a URL
    })) || [];

    return (
        <div className="w-full h-full flex flex-col">
            <DashBoardHeader therapyName="" nav={false} />

            <DashBoardContent>
                <div className="flex items-baseline gap-4">
                    <Typography text="Reports" variant="heading2" className="font-bold text-3xl" gradient={true} />
                    {isLoading ? (
                        <span className="text-gray-400 text-sm">Loading...</span>
                    ) : (
                        <Typography text={patient?.fullName || "Patient Name"} variant="bodyRegular" className="text-[#1C9A55] font-medium text-lg" />
                    )}
                </div>

                <div className="w-full flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-y-2">
                    {isLoading ? (
                        <div className="text-center py-10 text-gray-400">Loading reports...</div>
                    ) : reports.length > 0 ? (
                        <ReportList reports={reports} type="patient" />
                    ) : (
                        <div className="text-center py-10 text-gray-400">No reports found for this patient.</div>
                    )}
                </div>
            </DashBoardContent>
        </div>
    );
};

export default PatientReportsPage;
