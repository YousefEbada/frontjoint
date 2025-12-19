"use client";
import React from "react";
import ReportItem from "@/components/molecules/ReportItem";

interface Report {
    id: string;
    reportName: string;  
    status: "Ready" | "In progress" | "Pending" | "Uploaded" | "Waiting";
    dateInfo: string;
}

interface ReportListProps {
    reports: Report[];
    type: "staff" | "patient";
}

const ReportList: React.FC<ReportListProps> = ({ reports }) => {
    return (
        <div className="w-full bg-white rounded-[24px] shadow-sm p-6 md:p-8 h-full overflow-y-auto custom-scrollbar">
            {reports.map((report) => (
                <ReportItem
                    key={report.id}
                    reportName={report.reportName}
                    status={report.status}
                    dateInfo={report.dateInfo}
                    onView={() => console.log("View", report.id)}
                    onDownload={() => console.log("Download", report.id)}
                />
            ))}
        </div>
    );
};

export default ReportList;
