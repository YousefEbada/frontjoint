"use client";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import AppointmentList from "@/components/organisms/AppointmentList";
import ExerciseAssignList from "@/components/organisms/ExerciseAssignList";
import { useDoctor, useDoctorBookings, useDoctorPatients } from "@/hooks/useDoctor";
import { Rectangle, LineGroup } from "react-loadly";

const OverviewPage = () => {
  // TODO: Replace with actual logged-in doctor ID
  const doctorId = "HLC-PRAC-2022-00001";

  const { data: doctor, isLoading: isLoadingDoctor } = useDoctor(doctorId);
  const { data: bookings, isLoading: isLoadingBookings } = useDoctorBookings(doctorId, {
    period: 'day',
    date: new Date().toISOString()
  });
  // Fetch active patients for "Exercise Assigns" suggestion list
  const { data: patients, isLoading: isLoadingPatients } = useDoctorPatients(doctorId, 'active');

  const appointments = bookings?.map(b => ({
    id: b._id,
    name: b.patientName || "Unknown Patient",
    status: b.status.charAt(0).toUpperCase() + b.status.slice(1),
    date: new Date(b.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    statusColor: b.status === 'confirmed' ? "text-[#1C9A55]" : "text-[#1E5598]"
  })) || [];

  const assigns = patients?.map(p => ({
    id: p._id, // Number expected by interface but _id is string, need to handle or cast
    // For now we might need to cast or simple hash if strict, but let's assume component can handle or use index
    name: p.fullName,
    injury: p.condition || "No specified injury",
    due: "Active Plan", // Mock replacement
    dueColor: "text-[#1E5598]",
    isRead: false
  })) as any || [];

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
          {isLoadingDoctor ? (
            <div style={{ paddingTop: "8px" }}>
              <Rectangle
                width="200px"
                height="40px"
                color="#EAF2FF"
                borderRadius="8px"
              />
            </div>
          ) : (
            <Typography
              text={doctor?.practitionerName || "Doctor"}
              variant="heading1"
              style={{ color: "#9FD5E2", fontWeight: "bold", fontSize: "32px" }}
            />
          )}
        </div>

        {/* Section 1: Today's appointments */}
        {isLoadingBookings ? (
          <div className="w-full">
            <LineGroup
              count={3}
              lineHeight="60px"
              lineWidth="100%"
              spacing="10px"
              color="#EAF2FF"
              secondaryColor="#FFFFFF"
            />
          </div>
        ) : (
          <AppointmentList appointments={appointments} />
        )}

        <hr className="border-t border-[#EAF2FF] w-full" />

        {/* Section 2: Exercise Assigns */}
        {isLoadingPatients ? (
          <div className="w-full mt-6">
            <LineGroup count={2} lineHeight="60px" lineWidth="100%" color="#EAF2FF" />
          </div>
        ) : (
          <ExerciseAssignList assigns={assigns} />
        )}
      </DashBoardContent>
    </>
  );
};

export default OverviewPage;
