"use client";
import React, { useState } from 'react'
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import Link from 'next/link';
import ReportList from "@/components/organisms/Reports/ReportList";
import ReportsHistory from "@/components/organisms/Reports/ReportsHistory";

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState<"view" | "history">("view");

  const reports = [
    {
      id: "1",
      reportName: "Week 1 Report",
      status: "Ready" as const,
      dateInfo: "Uploaded Sep 30"
    },
    {
      id: "2",
      reportName: "Week 2 Report",
      status: "Ready" as const,
      dateInfo: "Uploaded Oct 2nd"
    },
    {
      id: "3",
      reportName: "Week 3 Report",
      status: "In progress" as const,
      dateInfo: "ETA"
    }
  ];

  return (
    <>
      <DashBoardHeader therapyName="Shoulder Therapy">
        <div className="flex gap-8">
          <div onClick={() => setActiveTab("view")} className="cursor-pointer">
            <Typography
              text="View Reports"
              variant="bodyRegular"
              className={`${activeTab === "view" ? "text-[#1e5598]" : "text-gray-400 hover:text-[#1e5598]"} font-medium transition-colors`}
            />
          </div>
          <div onClick={() => setActiveTab("history")} className="cursor-pointer">
            <Typography
              text="History"
              variant="bodyRegular"
              className={`${activeTab === "history" ? "text-[#1e5598]" : "text-gray-400 hover:text-[#1e5598]"} font-medium transition-colors`}
            />
          </div>
        </div>
      </DashBoardHeader>

      <main className="w-full h-full flex flex-col gap-4 p-4 md:p-8 overflow-y-auto custom-scrollbar">
        {activeTab === "view" ? (
          <>
            <Typography text="Reports" variant="heading2" className="text-[#0D294D] font-bold text-3xl mb-2" />
            <ReportList reports={reports} />
          </>
        ) : (
          <ReportsHistory />
        )}
      </main>
    </>
  )
}

export default ReportsPage;