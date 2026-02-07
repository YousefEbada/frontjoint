"use client";
import React from "react";
import DashBoardHeader from "@/components/molecules/DashBoardHeader";
import Typography from "@/components/atoms/Typography";
import Link from "next/link";
import DashBoardContent from "@/components/atoms/DashBoardContent";
import ProgressBar from "@/components/atoms/ProgressBar";
import { usePatient } from "@/hooks/usePatient";
import { Rectangle } from "react-loadly";
import { useAssignedExercises, useAssignedExercisesByDoctor, useExercises } from "@/hooks/useExercises";

const PatientDetailsPage = ({ params }: any) => {
    const { id } = React.use(params) as any
    const [doctorNixpendId, setDoctorNixpendId] = React.useState<string | null>(null);
    const { data: patientData, isLoading } = usePatient(id);
    const {data: noOfExercises} = useAssignedExercises(id); 
    const {data: noOfAssignedExercisesByDoctor} = useAssignedExercisesByDoctor(id, doctorNixpendId || "");

    console.log("PatientDetailsPage - Assigned exercises for patient:", noOfExercises);
    console.log("PatientDetailsPage - Assigned exercises for doctor:", noOfAssignedExercisesByDoctor);

    React.useEffect(() => {
        const storedId = localStorage.getItem("doctorNixpendId");
        if (storedId) {
            setDoctorNixpendId(storedId);
        }
    }, []);

    console.log("PatientDetailsPage - patientData:", patientData);

    // Map API data to UI model or use defaults
    const patient = {
        name: (patientData?.userId as any)?.fullName || patientData?.nixpendId || "Patient",
        status: patientData?.status === 'active' ? "Active" : "Inactive",
        injury: patientData?.condition || patientData?.injuryDetails?.affectedArea || "Unspecified Injury",
        // Stats - falling back to defaults if not in API
        sessions: patientData?.statistics?.sessions || 0,
        sessionsCompleted: patientData?.statistics?.sessionsCompleted || 0,
        treatmentLength: patientData?.statistics?.treatmentLength || "N/A",
        exercisesCompleted: patientData?.statistics?.exercisesCompleted || 0,
        numExercises:noOfExercises?.length || 0,
        exercisesAssigned: noOfAssignedExercisesByDoctor?.length || 0,
        nextAppointment: patientData?.statistics?.nextAppointment || "No upcoming appointment",
        nextExercise: patientData?.statistics?.nextExercise || "None",
    };

    if (isLoading) {
        return (
            <div className="w-full h-full flex flex-col">
                <DashBoardHeader therapyName="" nav={false} />
                <DashBoardContent>
                    <div className="flex flex-col gap-4 p-8">
                        <Rectangle width="100%" height="200px" color="#f0f0f0" />
                    </div>
                </DashBoardContent>
            </div>
        );
    }

    return (
        <>
            <DashBoardHeader therapyName="" nav={false}>
                {/* DashBoardHeader handles the layout and Back button */}
            </DashBoardHeader>

            <DashBoardContent>
                {/* Header Title Row */}
                <div className="hidden md:flex justify-between items-end">
                    <Typography text={patient.name} variant="heading2" className="font-bold text-3xl" gradient={true} />
                    <span className="text-[#1C9A55] font-bold text-lg">{patient.status}</span>
                </div>

                <div className="w-full flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-y-2 md:block md:bg-white md:rounded-[24px] md:shadow-sm md:p-8">
                    <div className="md:hidden flex justify-between items-end">
                        <Typography text={patient.name} variant="heading2" className="font-bold text-3xl" gradient={true} />
                        <span className="text-[#1C9A55] font-bold text-lg">{patient.status}</span>
                    </div>
                    {/* Top Section */}
                    <div className="flex flex-col w-full gap-4">
                        <div className="flex justify-between w-full items-start">
                            <div className="flex flex-col gap-1">
                                <Typography text={patient.injury} variant="subheader" className="text-[#1E5598] font-bold" />
                                <Link href={`/doctor/patients/${id}/personal-details`} className="underline text-[#0D294D] font-medium text-sm">View Personal Details</Link>
                            </div>
                            <div className="flex flex-col gap-2 items-end">
                                <Link href={`/doctor/reports`} className="underline text-[#1E5598] font-bold text-base">View Reports</Link>
                                <Link href={`/doctor/exercises`} className="hidden md:block underline text-[#1E5598] font-bold text-base">Assign New Exercise</Link>
                            </div>
                        </div>

                        {/* Progress Bar - Calculation */}
                        <ProgressBar percentage={patient.numExercises > 0 ? (patient.exercisesCompleted / patient.numExercises) * 100 : 0} className="my-4" />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-y-6 gap-x-12 w-full py-6 md:py-0">
                        <div className="flex justify-between">
                            <Typography text="Number Of sessions:" variant="bodyBold" className="text-[#1E5598]" />
                            <Typography text={patient.sessions.toString()} variant="bodyBold" className="text-[#1C9A55]" />
                        </div>
                        <div className="flex justify-between">
                            <Typography text="Sessions completed:" variant="bodyBold" className="text-[#1E5598]" />
                            <Typography text={patient.sessionsCompleted.toString()} variant="bodyBold" className="text-[#1C9A55]" />
                        </div>

                        <div className="flex justify-between">
                            <Typography text="Treatment length:" variant="bodyBold" className="text-[#1E5598]" />
                            <Typography text={patient.treatmentLength} variant="bodyBold" className="text-[#1C9A55]" />
                        </div>
                        <div className="flex justify-between">
                            <Typography text="Exercises completed:" variant="bodyBold" className="text-[#1E5598]" />
                            <Typography text={patient.exercisesCompleted.toString()} variant="bodyBold" className="text-[#1C9A55]" />
                        </div>

                        <div className="flex justify-between">
                            <Typography text="Number Of Exercises:" variant="bodyBold" className="text-[#1E5598]" />
                            <Typography text={patient.numExercises.toString()} variant="bodyBold" className="text-[#1C9A55]" />
                        </div>
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <Typography text="Exercises Assigned" variant="bodyBold" className="text-[#1E5598]" />
                                <Typography text="By doctor:" variant="bodyBold" className="text-[#1E5598]" />
                            </div>
                            <Typography text={patient.exercisesAssigned.toString()} variant="bodyBold" className="text-[#1C9A55]" />
                        </div>
                    </div>

                    <div className="w-full h-px bg-gray-200"></div>

                    {/* Bottom Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 mt-[20px] w-full h-[30%] md:h-[18%] text-sm md:text-base">
                        <Typography text="Next Patient Appointment is on:" variant="bodyBold" className="text-[#1E5598]" />
                        <Typography text="Patient 's Next Exercise:" variant="bodyBold" className="text-[#1E5598]" />
                        <Typography text={patient.nextAppointment} variant="bodyBold" className="text-[#1C9A55] md:row-start-2 md:col-start-1" />
                        <Typography text={patient.nextExercise} variant="bodyBold" className="text-[#1C9A55] md:row-start-2 md:col-start-2" />
                    </div>
                    <div className="w-full flex justify-center md:justify-end">
                        <Link href="./" className="underline text-[#1E5598] font-bold self-center md:self-end">Cancel</Link>
                    </div>


                </div>
            </DashBoardContent>
        </>
    );
};

export default PatientDetailsPage;
