"use client";
import React from "react";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import CorneredBoxes from "@/components/atoms/CorneredBoxes";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import ReportList, { Report } from "@/components/organisms/Reports/ReportList";

// Mock Data
const reports: Report[] = [
    { id: "1", reportName: "Week 1", status: "Uploaded", dateInfo: "Uploaded Sep 30" },
    { id: "2", reportName: "Week 2", status: "Uploaded", dateInfo: "Uploaded Oct 2nd" },
    { id: "3", reportName: "Week 3", status: "Waiting", dateInfo: "ETA" },
];

const PatientReportsPage = ({ params }: { params: { id: string } }) => {
    return (
        <div className="w-full h-full flex flex-col">
            <DashBoardHeader therapyName="" nav={false} />

            <DashBoardContent>
                <div className="flex items-baseline gap-4">
                    <Typography text="Reports" variant="heading2" className="font-bold text-3xl" gradient={true} />
                    <Typography text="Patient Name" variant="bodyRegular" className="text-[#1C9A55] font-medium text-lg" />
                </div>

                <div className="w-full flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-y-2">
                    <ReportList reports={reports} type="patient" />
                </div>
            </DashBoardContent>
        </div>
    );
};

export default PatientReportsPage;
