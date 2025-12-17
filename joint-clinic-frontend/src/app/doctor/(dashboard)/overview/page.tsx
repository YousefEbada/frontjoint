import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import AppointmentList from "@/components/organisms/AppointmentList";
import ExerciseAssignList from "@/components/organisms/ExerciseAssignList";

// Mock Data for Appointments
const appointments = [
  { id: 1, name: "Patient 1", status: "Done", date: "Oct 12th 2025 at 3:00 Pm", statusColor: "text-[#1E5598]" },
  { id: 2, name: "Patient 2", status: "Confirmed", date: "Oct 12th 2025 at 7:00 Pm", statusColor: "text-[#1C9A55]" },
];

// Mock Data for Exercise Assigns
const assigns = [
  { id: 1, name: "Patient 1", injury: "Shoulder injury", due: "Due Today", dueColor: "text-[#EE3124]", isRead: false },
  { id: 2, name: "Patient 2", injury: "Leg injury", due: "Due Tomorrow", dueColor: "text-[#F5A623]", isRead: true },
];

const OverviewPage = () => {
  return (
    <>
      <DashBoardHeader therapyName="" nav={false} dateTime={true} />
      <DashBoardContent>
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-[32px] font-bold text-[#0D294D]">
            Welcome Back, <span className="text-[#9FD5E2]">Doctor Name</span>
          </h1>
        </div>

        {/* Section 1: Today's appointments */}
        <AppointmentList appointments={appointments} />

        <hr className="border-t border-[#EAF2FF] w-full" />

        {/* Section 2: Exercise Assigns */}
        <ExerciseAssignList assigns={assigns} />
      </DashBoardContent>
    </>
  );
};

export default OverviewPage;
