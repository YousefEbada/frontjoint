"use client";
import React, { useState, useEffect } from 'react'
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import Link from 'next/link';
import ReportList from "@/components/organisms/Reports/ReportList";
import ReportsHistory from "@/components/organisms/Reports/ReportsHistory";
import DashBoardContent from '@/components/atoms/DashBoardContent';
import { usePatient, usePatientByUserId } from "@/hooks/usePatient";

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState<"view" | "history">("view");
  const [patientId, setPatientId] = useState<string | null>(null);

  useEffect(() => {
    const storedPatientId = localStorage.getItem('patientId');
    if (storedPatientId) {
      setPatientId(storedPatientId);
    }
  }, []);

  const { data: patient } = usePatient(patientId || "");

  // Map patient medical reports to UI format
  // Assuming medicalReports is an array of strings (urls or names)
  const reports = patient?.injuryDetails?.medicalReports?.map((report, index) => ({
    id: `report-${index}`,
    reportName: `Report ${index + 1}`, // Fallback name since we only have strings usually
    status: "Ready" as const,
    dateInfo: "Available" // We don't have date on the string array
  })) || [];

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

      <DashBoardContent>
        {activeTab === "view" ? (
          <>
            <Typography text="Reports" variant="heading2" className="text-[#0D294D] font-bold text-3xl mb-2" />
            {reports.length > 0 ? (
              <ReportList reports={reports} type='staff' />
            ) : (
              <Typography text="No reports available." variant="bodyRegular" className="mt-4 text-gray-500" />
            )}
          </>
        ) : (
          <ReportsHistory />
        )}
      </DashBoardContent>
    </>
  )
}

export default ReportsPage;