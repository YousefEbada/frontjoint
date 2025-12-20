"use client";
import React from "react";
import ReportItem from "@/components/molecules/ReportItem";

export interface Report {
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
        <div className="w-full h-full overflow-y-auto custom-scrollbar flex flex-col gap-y-2 md:bg-white md:rounded-[24px] md:shadow-sm md:p-8 md:gap-y-8">
            {reports.map((report) => (
                <>
                    <div key={report.id}>
                        <ReportItem
                            reportName={report.reportName}
                            status={report.status}
                            dateInfo={report.dateInfo}
                            onView={() => console.log("View", report.id)}
                            onDownload={() => console.log("Download", report.id)}
                        />
                    </div>
                    <hr className="hidden md:block w-full h-px bg-black" />
                </>
            ))}
        </div>
    );
};

export default ReportList;
