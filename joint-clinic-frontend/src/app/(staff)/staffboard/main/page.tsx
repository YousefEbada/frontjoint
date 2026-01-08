"use client";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import ProgressBar from "@/components/atoms/ProgressBar";
import SummaryItem from "@/components/molecules/SummaryItem";
import { color } from "@/lib/constants/colors";
import { mockDashboardData as data } from "@/lib/data/dashboardData";
import PatientRow from "@/components/atoms/PatientRow";
import PatientCallRow from "@/components/atoms/PatientCallRow";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import { useSupportTickets } from "@/hooks/useSupport";

const Page = () => {
  const { tickets: pendingTickets, isLoading } = useSupportTickets({ completed: false, limit: 5 });

  return (
    <>
      <DashBoardHeader therapyName={data.therapyName} nav={false} />
      <DashBoardContent>
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-baseline">
          <Typography text="Welcome Back," variant="heading1" className="bg-gradient-to-b from-[#0D294D] to-[#1E5598] bg-clip-text text-transparent" />
          <Typography text={data.patientName} variant="heading1" style={{ color: color.primary }} />
        </div>

        {/* Progress Section */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-2 justify-between w-full items-center">
            <Typography text="Today’s appointments" variant="heading2" style={{ color: color.secondary }} />
            <a href="#" className="text-[#1e5598] underline text-[22px] font-medium transition-all duration-300 hover:text-[#4a8528]">View All</a>
          </div>
          <div className="flex flex-col gap-y-3">
            {/* Note: Appointments integration is separate, keeping mock rows for now or should we fetch? 
                 Sticking to task: integrate Call Requests. Keeping mock appointments is safer to minimize diff unless asked. */}
            <PatientRow
              name="John Doe"
              status="Confirmed"
              statusColor="text-[#167c4f]"
              date="Oct 12 - 3:00Pm"
            />
            <PatientRow
              name="Anwer maged"
              status="Done"
              statusColor="text-[#1E5598]"
              date="Oct 12 - 3:00Pm"
            />
          </div>
        </div>

        <hr className="border-t border-gray-300 w-full" />

        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-2 justify-between w-full items-center">
            <Typography text="Call Requests" variant="heading2" style={{ color: color.secondary }} />
            <a href="/staffboard/support" className="text-[#1e5598] underline text-[22px] font-medium transition-all duration-300 hover:text-[#4a8528]">View All</a>
          </div>
          <div className="flex flex-col gap-3">
            {isLoading ? (
              <div className="text-gray-400">Loading requests...</div>
            ) : pendingTickets.length === 0 ? (
              <div className="text-gray-400">No pending requests.</div>
            ) : (
              pendingTickets.map((ticket) => (
                <PatientCallRow
                  key={ticket._id}
                  name={typeof ticket.patientId === 'object' ? (ticket.patientId as any).fullName || "Unknown" : "Unknown"}
                  type={ticket.inquiryDept}
                  phone={ticket.contact}
                  due={"Pending"} // Simplified logic as backend doesn't seem to give priority
                  dueColor={color.info}
                  completed={ticket.completed}
                />
              ))
            )}
          </div>
        </div>
      </DashBoardContent>
    </>
  );
};

export default Page;
