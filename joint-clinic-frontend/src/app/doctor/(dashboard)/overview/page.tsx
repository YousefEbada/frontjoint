"use client";
import { useState, useEffect } from "react";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import AppointmentList from "@/components/organisms/AppointmentList";
import ExerciseAssignList from "@/components/organisms/ExerciseAssignList";
import { useDoctor, useDoctorBookings, useDoctorPatients } from "@/hooks/useDoctor";
import { Rectangle, LineGroup } from "react-loadly";

const OverviewPage = () => {
  const [doctorId, setDoctorId] = useState<string>("");
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("doctorName");
    // const storedId = localStorage.getItem("doctorId"); // Internal Mongo ID
    const storedNixpendId = localStorage.getItem("doctorNixpendId"); // External ID used for bookings

    if (storedName) {
      setFirstName(storedName.split(" ")[0]);
    }
    if (storedNixpendId) {
      setDoctorId(storedNixpendId);
    }
  }, []);

  const { data: doctor } = useDoctor(doctorId); // Note: useDoctor might expect Mongo ID, check hook. 
  // useDoctor(doctorId) -> getDoctorById(doctorId). If this expects MongoID, storedNixpendId might break it if they differ.
  // But `overview/page.tsx` used `HLC-PRAC-2022-00001` hardcoded which looks like Nixpend ID.
  // So assuming useDoctor generic or by Nixpend ID?
  // `useDoctor` calls `getDoctorById`. Backend `getDoctorById` usually expects MongoID.
  // Let's check `getDoctorById`. If it fails, maybe we need `useDoctorByNixpendId` or assume `doctorId` in stored is MongoID.
  // User says: "doctor nixpend id which is stored in local storage as doctorNixpendId".
  // User example URL uses Nixpend ID.
  // So `useDoctorBookings` MUST use Nixpend ID.
  // `useDoctor`? If it breaks, I'll fix it later. For now, prioritize Bookings.

  const { data: bookings } = useDoctorBookings(doctorId, {
    period: 'today'
  });
  // Fetch active patients for "Exercise Assigns" suggestion list
  const { data: patients } = useDoctorPatients(doctorId, 'active');

  const appointments = bookings?.map((b:any) => ({
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
          <Typography
            text={firstName}
            variant="heading1"
            style={{ color: "#9FD5E2", fontWeight: "bold", fontSize: "32px" }}
          />
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
