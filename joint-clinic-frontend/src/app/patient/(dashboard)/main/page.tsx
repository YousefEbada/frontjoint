"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import Typography from "@/components/atoms/Typography";
import SummaryItem from "@/components/molecules/SummaryItem";
import StatsGrid from "@/components/organisms/StatsGrid";
import { color } from "@/lib/constants/colors";
import { usePatientDashboard } from "@/hooks/usePatient";

const Page = () => {
  const router = useRouter();

  // TODO: Get patientId from auth context or localStorage
  // For now, we'll try to get it from localStorage (set during login/registration)
  const [patientId, setPatientId] = useState<string | null>(null);

  useEffect(() => {
    // Try to get patientId from localStorage
    const storedPatientId = localStorage.getItem('patientId');
    if (storedPatientId) {
      setPatientId(storedPatientId);
    }
  }, []);

  const { dashboardData, hasActiveTreatment, isLoading, error } = usePatientDashboard(patientId);

  // Handle loading state
  if (isLoading) {
    return (
      <>
        <DashBoardHeader therapyName="Loading..." nav={false} dateTime={true} />
        <DashBoardContent>
          <div className="flex items-center justify-center h-64">
            <Typography text="Loading dashboard..." variant="bodyRegular" />
          </div>
        </DashBoardContent>
      </>
    );
  }

  // Handle no active treatment (first time patient)
  if (!hasActiveTreatment) {
    return (
      <>
        <DashBoardHeader therapyName="Your Treatment" nav={false} dateTime={true} />
        <DashBoardContent>
          <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-baseline">
            <Typography text="Welcome," variant="heading1" gradient={true} />
            <Typography text={dashboardData?.patientName || "Patient"} variant="heading1" style={{ color: color.primary }} />
          </div>

          {/* Progress Section with Zero Values */}
          <StatsGrid
            title="Progress"
            items={[
              { label: "Number Of sessions:", value: "0" },
              { label: "Treatment length:", value: "0 weeks" },
              { label: "Sessions completed:", value: "0" },
              { label: "Exercises completed:", value: "0" },
            ]}
          />

          <hr className="border-t border-gray-300 w-full" />

          {/* No Active Treatment Message */}
          <div className="flex flex-col items-center justify-center gap-6 py-10">
            <div className="text-center">
              <Typography
                text="You don't have any active treatment plan yet"
                variant="heading2"
                style={{ color: color.secondary }}
              />
              <Typography
                text="Book your first session to start your recovery journey"
                variant="bodyRegular"
                style={{ color: color.secondary, marginTop: '8px' }}
              />
            </div>

            <button
              onClick={() => router.push('/patient/booking')}
              className="px-8 py-4 bg-[#ea392f] text-white rounded-full font-semibold text-lg
                         hover:bg-[#d63228] transition-all duration-300 shadow-md hover:shadow-lg
                         transform hover:scale-105"
            >
              Book a Session Now
            </button>
          </div>
        </DashBoardContent>
      </>
    );
  }

  // Normal dashboard with active treatment
  return (
    <>
      <DashBoardHeader therapyName={dashboardData?.therapyName || "Your Treatment"} nav={false} dateTime={true} />
      <DashBoardContent>
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-baseline">
          <Typography text="Welcome Back," variant="heading1" gradient={true} />
          <Typography text={dashboardData?.patientName || "Patient"} variant="heading1" style={{ color: color.primary }} />
        </div>

        {/* Progress Section */}
        <StatsGrid
          title="Progress"
          items={[
            { label: "Number Of sessions:", value: (dashboardData?.totalSessions || 0).toString() },
            { label: "Treatment length:", value: dashboardData?.treatmentLength || "0 weeks" },
            { label: "Sessions completed:", value: (dashboardData?.sessionsCompleted || 0).toString() },
            { label: "Exercises completed:", value: (dashboardData?.exercisesCompleted || 0).toString() },
          ]}
        />

        <hr className="border-t border-gray-300 w-full" />

        {/* Summary Section */}
        <div className="flex flex-col gap-4">
          <Typography text={dashboardData?.weekSummary || "Week Summary"} variant="heading2" style={{ color: color.secondary }} />
          <div className="flex flex-col gap-2">
            {dashboardData?.summaryItems?.map((item, index) => (
              <SummaryItem key={index} {...item} />
            )) || (
                <Typography text="No summary items available" variant="bodyRegular" />
              )}
          </div>
        </div>
      </DashBoardContent>
    </>
  );
};

export default Page;

