"use client";
import React from "react";
import Typography from "@/components/atoms/Typography";
import ReportList from "@/components/organisms/Reports/ReportList";

interface Report {
    id: string;
    reportName: string;
    status: "Ready" | "In progress" | "Pending";
    dateInfo: string;
}

interface HistorySectionProps {
    title: string;
    status: "Active" | "Completed";
    reports: Report[];
}

const HistorySection: React.FC<HistorySectionProps> = ({
    title,
    status,
    reports,
}) => {
    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center px-2">
                <Typography
                    text={title}
                    variant="heading2"
                    className="text-[#0D294D] font-bold text-2xl md:text-3xl"
                />
                <Typography
                    text={status}
                    variant="bodyRegular"
                    className={`${status === "Active" ? "text-[#167c4f]" : "text-gray-400"
                        } font-medium`}
                />
            </div>
            <ReportList reports={reports} />
        </div>
    );
};

const ReportsHistory = () => {
    const shoulderReports: Report[] = [
        {
            id: "h1",
            reportName: "Week 1 Report",
            status: "Ready",
            dateInfo: "Uploaded Sep 30",
        },
        {
            id: "h2",
            reportName: "Week 2 Report",
            status: "Ready",
            dateInfo: "Uploaded Sep 30",
        },
        {
            id: "h3",
            reportName: "Week 3 Report",
            status: "Pending",
            dateInfo: "Uploaded Sep 30",
        },
    ];

    const backReports: Report[] = [
        {
            id: "b1",
            reportName: "Week 1 Report",
            status: "Ready",
            dateInfo: "Uploaded Sep 30",
        },
        {
            id: "b2",
            reportName: "Week 2 Report",
            status: "Ready",
            dateInfo: "Uploaded Sep 30",
        },
        {
            id: "b3",
            reportName: "Week 3 Report",
            status: "Ready",
            dateInfo: "Uploaded Sep 30",
        },
    ];

    return (
        <div className="flex flex-col gap-8">
            <HistorySection
                title="Shoulder Injury"
                status="Active"
                reports={shoulderReports}
            />
            <HistorySection
                title="Back Injury"
                status="Completed"
                reports={backReports}
            />
        </div>
    );
};

export default ReportsHistory;
