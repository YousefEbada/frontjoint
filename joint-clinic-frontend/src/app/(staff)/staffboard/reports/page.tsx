"use client";
import React, { useState } from 'react'
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import Link from 'next/link';
import ReportList from "@/components/organisms/Reports/ReportList";
import ReportsHistory from "@/components/organisms/Reports/ReportsHistory";
import { color } from 'framer-motion';
import DashBoardContent from '@/components/atoms/DashBoardContent';

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState<"view" | "history">("view");

  const reports = [
    {
      id: "1",
      reportName: "Week 1 Report",
      status: "Uploaded" as const,
      dateInfo: "Uploaded Sep 30",
    },
    {
      id: "2",
      reportName: "Week 2 Report",
      status: "Uploaded" as const,
      dateInfo: "Uploaded Oct 2nd"
    },
    {
      id: "3",
      reportName: "Week 3 Report",
      status: "Waiting" as const,
      dateInfo: "ETA"
    }
  ];

  return (
    <>
      <DashBoardHeader therapyName="Shoulder Therapy" />

      <DashBoardContent>
        {activeTab === "view" ? (
          <>
            <div className="flex flex-col md:flex-row gap-4 md:gap-[30px] items-start md:items-center px-0 md:px-[30px]">
              <Typography text="Reports" variant="heading2" className="bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent font-bold mb-2" />
              <p className={`text-[20px] font-medium text-[#167c4f] w-full md:w-[200px]`}>Patient Name</p>
            </div>
            <ReportList reports={reports} type="staff" />
          </>
        ) : (
          <ReportsHistory />
        )}
      </DashBoardContent>
    </>
  )
}

export default ReportsPage;