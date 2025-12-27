import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import AppointmentList from "@/components/organisms/AppointmentList";
import ExerciseAssignList from "@/components/organisms/ExerciseAssignList";
import { useDoctor, useDoctorBookings } from "@/hooks/useDoctor";
// Mock Data for Appointments
// const appointments = [ ... ]; // Replaced by dynamic data
const appointments = [
  { id: 1, name: "Patient 1", status: "Done", date: "Oct 12th - 3:00 Pm", statusColor: "text-[#1E5598]" },
  { id: 2, name: "Patient 2", status: "Confirmed", date: "Oct 12th - 7:00 Pm", statusColor: "text-[#1C9A55]" },
];

// Mock Data for Exercise Assigns
const assigns = [
  { id: 1, name: "Patient 1", injury: "Shoulder injury", due: "Due Today", dueColor: "text-[#EE3124]", isRead: false },
  { id: 2, name: "Patient 2", injury: "Leg injury", due: "Due Tomorrow", dueColor: "text-[#F5A623]", isRead: true },
];

const OverviewPage = () => {
  // TODO: Replace with actual logged-in doctor ID
  const doctorId = "672ca9029f64264624b45070";

  const { data: doctor, isLoading: isLoadingDoctor } = useDoctor(doctorId);
  const { data: bookings, isLoading: isLoadingBookings } = useDoctorBookings(doctorId, {
    period: 'day',
    date: new Date().toISOString()
  });

  const appointments = bookings?.map(b => ({
    id: b._id,
    name: b.patientName || "Unknown Patient",
    status: b.status.charAt(0).toUpperCase() + b.status.slice(1),
    date: new Date(b.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    statusColor: b.status === 'confirmed' ? "text-[#1C9A55]" : "text-[#1E5598]"
  })) || [];

  return (
    <>
      <DashBoardHeader therapyName="" nav={false} dateTime={true} />
      <DashBoardContent>
        {/* Title */}
        <div className="mb-6 flex flex-col md:flex-row gap-2">
          <Typography
            text="Welcome Back,"
            variant="heading1"
            style={{ color: "#0D294D", fontWeight: "bold", fontSize: "32px" }}
          />
          <Typography
            text={isLoadingDoctor ? "Loading..." : (doctor?.userId || "Doctor")}
            variant="heading1"
            style={{ color: "#9FD5E2", fontWeight: "bold", fontSize: "32px" }}
          />
        </div>

        {/* Section 1: Today's appointments */}
        {isLoadingBookings ? (
          <div className="p-4">Loading appointments...</div>
        ) : (
          <AppointmentList appointments={appointments} />
        )}

        <hr className="border-t border-[#EAF2FF] w-full" />

        {/* Section 2: Exercise Assigns */}
        <ExerciseAssignList assigns={assigns} />
      </DashBoardContent>
    </>
  );
};

export default OverviewPage;
