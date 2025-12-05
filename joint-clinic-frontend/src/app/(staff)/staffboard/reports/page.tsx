"use client";
import React, { useState } from 'react'
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import Link from 'next/link';
import ReportList from "@/components/organisms/Reports/ReportList";
import ReportsHistory from "@/components/organisms/Reports/ReportsHistory";
import { color } from 'framer-motion';

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
      <DashBoardHeader therapyName="Shoulder Therapy" />

      <main className="w-full h-full flex flex-col gap-4 p-4 md:p-8 overflow-y-auto custom-scrollbar">
        {activeTab === "view" ? (
          <>
            <div className="flex flex-row gap-[30px] items-center px-[30px]">
              <Typography text="Reports" variant="heading2" className="bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent font-bold mb-2" />
              <p className={`text-[20px] font-medium text-[#167c4f] w-[200px]`}>Patient Name</p>
            </div>
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